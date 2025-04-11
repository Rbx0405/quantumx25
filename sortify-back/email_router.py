import imaplib
import email
from email.header import decode_header
import smtplib
from email.message import EmailMessage
import time
import logging
from typing import Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Your Gmail credentials
EMAIL = "sorting.agent@gmail.com"
APP_PASSWORD = "ltrfbyayykhhnxmt"  # no spaces

# Keywords and forwarding addresses
CATEGORY_KEYWORDS = {
    "Billing": ["refund", "payment", "invoice", "charged"],
    "Technical": ["error", "crash", "bug", "fail", "not working"],
    "Login": ["login", "password", "reset", "account"],
    "General": ["query", "support", "help", "question"]
}

CATEGORY_EMAILS = {
    "Billing": "billing@yourcompany.com",
    "Technical": "tech@yourcompany.com",
    "Login": "login@yourcompany.com",
    "General": "support@yourcompany.com"
}

def classify_issue(text: str) -> str:
    """Classify email content into predefined categories."""
    try:
        text = text.lower()
        for category, keywords in CATEGORY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in text:
                    return category
        return "General"
    except Exception as e:
        logging.error(f"Error in classify_issue: {str(e)}")
        return "General"

def send_email(to_email: str, subject: str, body: str) -> bool:
    """Send email to specified address."""
    try:
        msg = EmailMessage()
        msg['From'] = EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.set_content(body)

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL, APP_PASSWORD)
            smtp.send_message(msg)
            logging.info(f"Email sent to {to_email}")
            return True
    except Exception as e:
        logging.error(f"Error sending email: {str(e)}")
        return False

def check_emails() -> None:
    """Check and process new emails."""
    try:
        imap = imaplib.IMAP4_SSL("imap.gmail.com")
        try:
            imap.login(EMAIL, APP_PASSWORD)
            imap.select("inbox")

            status, messages = imap.search(None, 'UNSEEN')
            email_ids = messages[0].split()

            for eid in email_ids:
                try:
                    _, msg_data = imap.fetch(eid, "(RFC822)")
                    for response_part in msg_data:
                        if isinstance(response_part, tuple):
                            msg = email.message_from_bytes(response_part[1])
                            subject = msg["subject"]
                            from_ = msg["from"]

                            body = ""
                            if msg.is_multipart():
                                for part in msg.walk():
                                    if part.get_content_type() == "text/plain":
                                        body = part.get_payload(decode=True).decode()
                                        break
                            else:
                                body = msg.get_payload(decode=True).decode()

                            category = classify_issue(body)
                            target_email = CATEGORY_EMAILS[category]

                            if send_email(target_email, f"[{category}] {subject}", body):
                                logging.info(f" Forwarded mail from {from_} to {target_email}")
                            else:
                                logging.error(f" Failed to forward mail from {from_}")
                except Exception as e:
                    logging.error(f"Error processing email {eid}: {str(e)}")
        except Exception as e:
            logging.error(f"IMAP connection error: {str(e)}")
        finally:
            try:
                imap.logout()
            except:
                pass
    except Exception as e:
        logging.error(f"Critical error in check_emails: {str(e)}")

# Call the function
check_emails()
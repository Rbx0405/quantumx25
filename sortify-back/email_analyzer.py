import imaplib
import email
from email.header import decode_header
from email.message import Message
import json
import os
import logging
from typing import List, Dict, Tuple
from datetime import datetime, timedelta

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Gmail credentials (same as in email_router.py)
EMAIL = "sorting.agent@gmail.com"
APP_PASSWORD = "ltrfbyayykhhnxmt"  # no spaces

# Categories for classification
CATEGORIES = [
    "Billing",
    "Technical",
    "Login",
    "General"
]

def connect_to_gmail() -> imaplib.IMAP4_SSL:
    """Establish a connection to Gmail's IMAP server."""
    try:
        imap = imaplib.IMAP4_SSL("imap.gmail.com")
        imap.login(EMAIL, APP_PASSWORD)
        return imap
    except Exception as e:
        logging.error(f"Failed to connect to Gmail: {str(e)}")
        raise

def extract_email_text(msg: Message) -> str:
    """Extract text content from an email message."""
    try:
        body = ""
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    body = part.get_payload(decode=True).decode()
                    break
        else:
            body = msg.get_payload(decode=True).decode()
        
        # Clean the text
        body = body.lower()
        body = body.replace("\n", " ").replace("\r", " ")
        body = " ".join(body.split())  # Remove extra whitespace
        return body
    except Exception as e:
        logging.error(f"Error extracting email text: {str(e)}")
        return ""

def extract_keywords(text: str) -> List[str]:
    """Extract potential keywords from email text."""
    import re
    
    # Remove common stop words
    stop_words = set([
        'the', 'and', 'is', 'in', 'to', 'for', 'of', 'that', 'with', 'on',
        'at', 'by', 'from', 'it', 'this', 'an', 'as', 'be', 'are', 'was',
        'were', 'will', 'can', 'about', 'after', 'all', 'also', 'any',
        'before', 'but', 'could', 'do', 'each', 'first', 'good', 'have',
        'how', 'if', 'into', 'like', 'more', 'most', 'new', 'not', 'now',
        'old', 'other', 'see', 'some', 'such', 'than', 'then', 'there',
        'these', 'they', 'thing', 'time', 'two', 'use', 'very', 'what',
        'when', 'who', 'why', 'work', 'your'
    ])
    
    # Extract words and remove stop words
    words = [word for word in re.findall(r'\b\w+\b', text) 
             if word not in stop_words and len(word) > 2]
    
    return words

def create_training_data() -> Tuple[List[Dict], List[str]]:
    """Create training data from sent emails."""
    try:
        imap = connect_to_gmail()
        imap.select("[Gmail]/Sent Mail")
        
        # Get emails from the last 30 days
        date_30_days_ago = (datetime.now() - timedelta(days=30)).strftime("%d-%b-%Y")
        status, messages = imap.search(None, f'SINCE "{date_30_days_ago}"')
        
        training_data = []
        all_keywords = set()
        
        for msg_num in messages[0].split():
            try:
                _, msg_data = imap.fetch(msg_num, "(RFC822)")
                msg = email.message_from_bytes(msg_data[0][1])
                
                # Extract text
                text = extract_email_text(msg)
                if not text:
                    continue
                
                # Extract keywords
                keywords = extract_keywords(text)
                all_keywords.update(keywords)
                
                # Create training example
                training_example = {
                    "text": text,
                    "keywords": keywords,
                    "timestamp": datetime.now().isoformat()
                }
                training_data.append(training_example)
                
            except Exception as e:
                logging.error(f"Error processing email {msg_num}: {str(e)}")
        
        imap.logout()
        
        return training_data, list(all_keywords)
        
    except Exception as e:
        logging.error(f"Error creating training data: {str(e)}")
        raise

def save_training_data(training_data: List[Dict], keywords: List[str]) -> None:
    """Save training data to JSON files."""
    try:
        # Create data directory if it doesn't exist
        os.makedirs("training_data", exist_ok=True)
        
        # Save training examples
        with open("training_data/email_data.json", "w") as f:
            json.dump(training_data, f, indent=2)
        
        # Save keywords
        with open("training_data/keywords.json", "w") as f:
            json.dump(keywords, f, indent=2)
        
        logging.info("Training data saved successfully")
        
    except Exception as e:
        logging.error(f"Error saving training data: {str(e)}")
        raise

def main():
    """Main function to create and save training data."""
    try:
        logging.info("Starting email data extraction...")
        training_data, keywords = create_training_data()
        save_training_data(training_data, keywords)
        logging.info("Data extraction completed successfully")
        
    except Exception as e:
        logging.error(f"Main process failed: {str(e)}")

if __name__ == "__main__":
    main()

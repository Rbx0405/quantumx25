import time
from email_router import check_emails
import signal
import sys

# Signal handler for graceful shutdown
def signal_handler(sig, frame):
    print("\n👋 Shutting down gracefully...")
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

while True:
    try:
        print("🔁 Checking for new mails...")
        check_emails()
    except Exception as e:
        print(f"❌ Error occurred: {str(e)}")
    finally:
        time.sleep(30)
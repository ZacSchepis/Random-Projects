# python3 "D:\Python Projects\Daily Searches\Project.py" --device "both" -v=1 -r=1
# import argparse

from DailySearches import search, searchBoth
import os
import sys
import datetime
from plyer import notification

def main():
    # Check if the script has been run today
    log_file = os.path.join(os.path.dirname(__file__), "hasRan_logs.txt")
    if os.path.exists(log_file):
        with open(log_file, "r") as file:
            last_run_date = file.read()
        today = str(datetime.date.today())
        if last_run_date == today:
            notification.notify(
                title='Already Searched',
                message=f'Today\'s ({today}) Daily Searches have already been completed. Check back tomorrow.'
            )
            sys.exit()

    # ... Your script code ...
    # print(f'Today\'s ({today}) Daily Searches have not already been completed. Check back tomorrow.')

    searchBoth(1)
    notification.notify(
        title='Searches Finished',
        message=f'Today\'s ({today}) Daily Searches have now been completed. Check back tomorrow.'
    )
    # Log that it has been run today
    with open(log_file, "w") as file:
        file.write(today)

    # Self-terminate
    # print(f'Searches have been finished. See you tomorrow :)')
    sys.exit()


if __name__ == "__main__":
    main()

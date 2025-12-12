import time
import MySQLdb
import os

def wait_for_db():
    print("Waiting for database...")
    while True:
        try:
            # Connect using credentials from settings/docker-compose
            conn = MySQLdb.connect(
                host='db',
                user='myuser',
                passwd='mypassword',
                db='mydatabase',
                port=3306
            )
            conn.close()
            print("Database is ready!")
            break
        except MySQLdb.OperationalError as e:
            print(f"Database not ready ({e}), waiting 1s...")
            time.sleep(1)
        except Exception as e:
            print(f"Unexpected error: {e}")
            time.sleep(1)

if __name__ == "__main__":
    wait_for_db()

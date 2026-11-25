from app import get_db
from werkzeug.security import generate_password_hash
from getpass import getpass

email = input("Enter your new admin email: ").strip().lower()
password = getpass("Enter your new admin password: ")

if len(password) < 6:
    print("Password must be at least 6 characters.")
else:
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE role = 'admin' LIMIT 1"
    )
    admin = cursor.fetchone()

    if admin:
        cursor.execute(
            "UPDATE users SET email = %s, password_hash = %s WHERE id = %s",
            (email, generate_password_hash(password), admin[0])
        )
        db.commit()
        print("Admin credentials updated successfully!")
    else:
        print("No admin account found.")

    cursor.close()
    db.close()
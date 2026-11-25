import os
import secrets
import uuid
from datetime import datetime

import mysql.connector
from flask import Flask, jsonify, request, session, send_from_directory
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", secrets.token_hex(32))
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

# Change these values if your MySQL username/password are different.
# Serve the existing frontend from this same folder, so the browser and API
# share one origin (no separate Live Server/CORS setup is needed).
@app.get("/")
def home():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), "index.html")


@app.get("/<path:filename>")
def frontend_files(filename):
    if filename in {"script.js", "style.css"}:
        return send_from_directory(os.path.dirname(os.path.abspath(__file__)), filename)
    return jsonify({"error": "Not found."}), 404


DB_CONFIG = {
    "host": os.getenv("DB_HOST", "127.0.0.1"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "smartqueue_db"),
    "port": int(os.getenv("DB_PORT", "3306")),
}


def get_db():
    """Open a new MySQL connection for one operation."""
    return mysql.connector.connect(**DB_CONFIG)


def iso(value):
    return value.isoformat() if value else None


def row_to_user(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "role": row["role"],
        "createdAt": iso(row["created_at"]),
    }


def row_to_token(row, viewer_is_admin=False, viewer_id=None):
    is_owner = viewer_id and row["user_id"] == viewer_id
    return {
        "id": row["id"],
        "tokenNo": row["token_no"],
        # Hide another customer's identity from ordinary customers.
        "userId": row["user_id"] if (viewer_is_admin or is_owner) else None,
        "userName": row["user_name"] if (viewer_is_admin or is_owner) else "Customer",
        "locationId": row["location_id"],
        "locationName": row["location_name"],
        "district": row["district"],
        "village": row["village"],
        "address": row["address"],
        "service": row["service"],
        "status": row["status"],
        "createdAt": iso(row["created_at"]),
        "updatedAt": iso(row["updated_at"]),
        "calledAt": iso(row["called_at"]),
        "completedAt": iso(row["completed_at"]),
    }


def current_user():
    user_id = session.get("user_id")
    if not user_id:
        return None

    db = get_db()
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute(
            "SELECT id, name, email, role, created_at FROM users WHERE id = %s",
            (user_id,),
        )
        row = cursor.fetchone()
        return row_to_user(row) if row else None
    finally:
        db.close()


def require_login():
    user = current_user()
    if not user:
        return None, (jsonify({"error": "Please sign in first."}), 401)
    return user, None


def require_admin():
    user, error = require_login()
    if error:
        return None, error
    if user["role"] != "admin":
        return None, (jsonify({"error": "Administrator access is required."}), 403)
    return user, None


def initialize_admin():
    """Create the first demo admin only when no admin exists."""
    admin_email = os.getenv("ADMIN_EMAIL", "admin@smartqueue.demo").strip().lower()
    admin_password = os.getenv("ADMIN_PASSWORD", "Admin123!")
    db = get_db()
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id FROM users WHERE role = 'admin' LIMIT 1")
        if cursor.fetchone() is None:
            cursor.execute(
                """INSERT INTO users (id, name, email, password_hash, role)
                   VALUES (%s, %s, %s, %s, 'admin')""",
                (
                    "admin-" + uuid.uuid4().hex[:16],
                    "Queue Administrator",
                    admin_email,
                    generate_password_hash(admin_password),
                ),
            )
            db.commit()
            print("Demo administrator created.")
            print(f"Admin email: {admin_email}")
            print("Admin password is the ADMIN_PASSWORD value (default: Admin123!).")
    finally:
        db.close()


@app.get("/api/health")
def health():
    """Check that Flask can connect to MySQL."""
    db = get_db()
    try:
        cursor = db.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        return jsonify({"ok": True, "message": "Flask and MySQL are connected."})
    finally:
        db.close()


@app.get("/api/me")
def me():
    user, error = require_login()
    if error:
        return error
    return jsonify({"user": user})


@app.post("/api/register")
def register():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    if not name or len(name) > 70 or not email or len(email) > 190 or not password:
        return jsonify({"error": "Enter your name, email and password."}), 400
    if "@" not in email or "." not in email.rsplit("@", 1)[-1]:
        return jsonify({"error": "Enter a valid email address."}), 400
    if len(password) < 6:
        return jsonify({"error": "Password must contain at least 6 characters."}), 400

    db = get_db()
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"error": "An account with this email already exists."}), 409

        user_id = uuid.uuid4().hex
        cursor.execute(
            """INSERT INTO users (id, name, email, password_hash, role)
               VALUES (%s, %s, %s, %s, 'user')""",
            (user_id, name, email, generate_password_hash(password)),
        )
        db.commit()
        return jsonify({"message": "Account created. You can now sign in."}), 201
    finally:
        db.close()


@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}
    email = str(data.get("email", "")).strip().lower()
    password = str(data.get("password", ""))

    db = get_db()
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute(
            """SELECT id, name, email, password_hash, role, created_at
               FROM users WHERE email = %s""",
            (email,),
        )
        user = cursor.fetchone()
        if not user or not check_password_hash(user["password_hash"], password):
            return jsonify({"error": "Email or password is incorrect."}), 401

        session.clear()
        session["user_id"] = user["id"]
        return jsonify({"message": "Signed in successfully.", "user": row_to_user(user)})
    finally:
        db.close()


@app.post("/api/logout")
def logout():
    session.clear()
    return jsonify({"message": "Signed out."})


@app.get("/api/tokens")
def get_tokens():
    user, error = require_login()
    if error:
        return error

    db = get_db()
    try:
        cursor = db.cursor(dictionary=True)
        # Admins can see all customer details. Customers receive queue status
        # for everyone, but other customers' names and user IDs are hidden.
        cursor.execute(
            """SELECT t.*, u.name AS user_name
               FROM tokens t
               JOIN users u ON u.id = t.user_id
               ORDER BY t.created_at ASC, t.token_no ASC"""
        )
        rows = cursor.fetchall()
        return jsonify({
            "tokens": [
                row_to_token(
                    row,
                    viewer_is_admin=(user["role"] == "admin"),
                    viewer_id=user["id"],
                )
                for row in rows
            ]
        })
    finally:
        db.close()


@app.post("/api/tokens")
def create_token():
    user, error = require_login()
    if error:
        return error
    if user["role"] != "user":
        return jsonify({"error": "Only customer accounts can create tokens."}), 403

    data = request.get_json(silent=True) or {}
    location_id = str(data.get("locationId", "")).strip()
    location_name = str(data.get("locationName", "")).strip()
    district = str(data.get("district", "")).strip()
    village = str(data.get("village", "")).strip()
    address = str(data.get("address", "")).strip()
    service = str(data.get("service", "")).strip()

    if not all([location_id, location_name, district, village, address, service]):
        return jsonify({"error": "Location and service details are required."}), 400
    if any(len(value) > limit for value, limit in [
        (location_id, 100), (location_name, 150), (district, 120),
        (village, 120), (address, 255), (service, 150)
    ]):
        return jsonify({"error": "One or more fields are too long."}), 400

    db = get_db()
    try:
        cursor = db.cursor(dictionary=True)
        db.start_transaction()

        cursor.execute(
            """SELECT id FROM tokens
               WHERE user_id = %s AND location_id = %s AND service = %s
                 AND status IN ('Waiting', 'Serving')
               LIMIT 1 FOR UPDATE""",
            (user["id"], location_id, service),
        )
        if cursor.fetchone():
            db.rollback()
            return jsonify({"error": "You already have an active token for this queue."}), 409

        # Lock/update a counter row so simultaneous token requests do not
        # receive the same number.
        cursor.execute(
            """INSERT INTO queue_counters (location_id, service, last_number)
               VALUES (%s, %s, 0)
               ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)""",
            (location_id, service),
        )
        cursor.execute(
            """UPDATE queue_counters
               SET last_number = last_number + 1
               WHERE location_id = %s AND service = %s""",
            (location_id, service),
        )
        cursor.execute(
            """SELECT last_number FROM queue_counters
               WHERE location_id = %s AND service = %s FOR UPDATE""",
            (location_id, service),
        )
        number = cursor.fetchone()["last_number"]
        prefix = location_id[:1].upper() + "".join(
            char for char in service if char.isalpha()
        )[:1].upper()
        token_no = f"{prefix}{number:03d}"
        token_id = uuid.uuid4().hex

        cursor.execute(
            """INSERT INTO tokens
               (id, token_no, user_id, location_id, location_name, district,
                village, address, service, status)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'Waiting')""",
            (
                token_id, token_no, user["id"], location_id, location_name,
                district, village, address, service,
            ),
        )
        db.commit()
        return jsonify({
            "message": "Token generated successfully.",
            "token": {
                "id": token_id,
                "tokenNo": token_no,
                "userId": user["id"],
                "userName": user["name"],
                "locationId": location_id,
                "locationName": location_name,
                "district": district,
                "village": village,
                "address": address,
                "service": service,
                "status": "Waiting",
            },
        }), 201
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


@app.patch("/api/tokens/<token_id>")
def update_token(token_id):
    user, error = require_login()
    if error:
        return error

    data = request.get_json(silent=True) or {}
    new_status = str(data.get("status", "")).strip()
    allowed = {"Waiting", "Serving", "Completed", "Cancelled", "Skipped"}
    if new_status not in allowed:
        return jsonify({"error": "Invalid token status."}), 400

    db = get_db()
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM tokens WHERE id = %s FOR UPDATE", (token_id,))
        token = cursor.fetchone()
        if not token:
            return jsonify({"error": "Token not found."}), 404

        if user["role"] == "user":
            if token["user_id"] != user["id"]:
                return jsonify({"error": "You cannot update another customer's token."}), 403
            if token["status"] != "Waiting" or new_status != "Cancelled":
                return jsonify({"error": "Customers can cancel waiting tokens only."}), 403
        else:
            transitions = {
                "Waiting": {"Serving", "Skipped"},
                "Serving": {"Completed", "Skipped"},
            }
            if new_status not in transitions.get(token["status"], set()):
                return jsonify({"error": "That status change is not allowed."}), 400

            if new_status == "Serving":
                cursor.execute(
                    """SELECT id FROM tokens
                       WHERE location_id = %s AND service = %s
                         AND status = 'Serving' AND id <> %s
                       LIMIT 1""",
                    (token["location_id"], token["service"], token_id),
                )
                if cursor.fetchone():
                    return jsonify({"error": "Complete the currently serving token first."}), 409
                cursor.execute(
                    """SELECT id FROM tokens
                       WHERE location_id = %s AND service = %s
                         AND status = 'Waiting' AND id <> %s
                       ORDER BY created_at ASC LIMIT 1""",
                    (token["location_id"], token["service"], token_id),
                )
                if cursor.fetchone():
                    return jsonify({"error": "Please call tokens in queue order."}), 409

        called_at = datetime.now() if new_status == "Serving" else token["called_at"]
        completed_at = datetime.now() if new_status == "Completed" else token["completed_at"]
        cursor.execute(
            """UPDATE tokens SET status = %s, called_at = %s, completed_at = %s
               WHERE id = %s""",
            (new_status, called_at, completed_at, token_id),
        )
        db.commit()
        return jsonify({"message": "Token status updated.", "status": new_status})
    finally:
        db.close()


@app.errorhandler(mysql.connector.Error)
def database_error(error):
    app.logger.error("Database error: %s", error)
    return jsonify({
        "error": "Could not connect to MySQL. Check XAMPP MySQL and DB_CONFIG."
    }), 500


if __name__ == "__main__":
    try:
        initialize_admin()
    except mysql.connector.Error as error:
        print("\nCould not connect to MySQL.")
        print("1. Start MySQL in XAMPP.")
        print("2. Import database.sql in phpMyAdmin.")
        print("3. Check DB_CONFIG in app.py.")
        raise error

    # Local development server only. Do not expose Flask's debug server publicly.
    app.run(host="127.0.0.1", port=5000, debug=True)

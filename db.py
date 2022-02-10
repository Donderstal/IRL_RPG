import hashlib
import psycopg2
import psycopg2.extras

def get_connection():
	return psycopg2.connect("dbname=postgres user=postgres password=4l3x105");

def get_cursor(connection):
	return connection.cursor(cursor_factory=psycopg2.extras.DictCursor);

def close_connection(connection):
	connection.close();

def close_cursor(cursor):
	cursor.close();

def create_useraccounts_table(cursor):
	cursor.execute("""
		CREATE TABLE IF NOT EXISTS useraccounts (
			user_id serial PRIMARY KEY,
			username VARCHAR ( 50 ) UNIQUE NOT NULL,
			password VARCHAR ( 255 ) NOT NULL,
			email VARCHAR ( 255 ) UNIQUE NOT NULL,
			activation_code VARCHAR ( 6 ),
			account_activated BOOLEAN DEFAULT '0',
			created_on TIMESTAMP NOT NULL,
			last_login TIMESTAMP 
		);"""
	);

def try_register_new_user(cursor, username, password, email, activation_code):
	encodedpass = password.encode('utf-8');
	cursor.execute("""
		INSERT INTO 
			useraccounts (username, password, email, activation_code, account_activated, created_on) 
		VALUES (%s, %s, %s, %s, FALSE, NOW())""",
		(username, hashlib.sha256(encodedpass).hexdigest(), email, activation_code)
	);

def get_user(cursor, username):
	cursor.execute("""
		SELECT 
			* 
		FROM
			useraccounts
		WHERE
			username = %s
		""",
		(username,)
	);

	return cursor.fetchone()

def get_user_if_passwords_match(cursor, username, password):
	user = get_user(cursor, username) or False;
	encodedpass = password.encode('utf-8');
	if user :
		return user if hashlib.sha256(encodedpass).hexdigest() == user['password'] else False;

def try_login_user(cursor, username, password):
	encodedpass = password.encode('utf-8');
	cursor.execute("""
		SELECT 
			username, email, created_on, last_login 
		FROM
			useraccounts
		WHERE
			username = %s AND password = %s AND account_activated = TRUE
		""",
		(username, hashlib.sha256(encodedpass).hexdigest())
	);

	user = cursor.fetchone()

	return user if user else False;

def try_validate_user(cursor, username, password, activation_code):
	encodedpass = password.encode('utf-8');
	cursor.execute("""
		UPDATE
			useraccounts
		SET
			account_activated = TRUE
		WHERE
			username = %s AND password = %s AND activation_code = %s
		""",
		(username, hashlib.sha256(encodedpass).hexdigest(), activation_code)
	);

def try_set_password(cursor, username, email, password):
	encodedpass = password.encode('utf-8');
	cursor.execute("""
		UPDATE
			useraccounts
		SET
			password = %s
		WHERE
			username = %s AND email = %s
		""",
		(hashlib.sha256(encodedpass).hexdigest(), username, email)
	);

def get_usernames(cursor):
	cursor.execute("""
		SELECT 
			username
		FROM
			useraccounts
		"""
	);

	return cursor.fetchall()

def get_user_emails(cursor):
	cursor.execute("""
		SELECT 
			email
		FROM
			useraccounts
		"""
	);

	return cursor.fetchall()
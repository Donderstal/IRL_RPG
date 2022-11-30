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

def init_tables():
	connection = get_connection();
	cursor = get_cursor(connection);

	create_useraccounts_table(cursor);
	create_savefiles_table(cursor);
	create_user_cookie_keys_table(cursor);

	connection.commit();

	close_cursor(cursor);
	close_connection(connection);

def create_useraccounts_table(cursor):
	cursor.execute("""
		CREATE TABLE IF NOT EXISTS useraccounts (
			user_id INT GENERATED ALWAYS AS IDENTITY,
			username VARCHAR ( 50 ) UNIQUE NOT NULL,
			password VARCHAR ( 255 ) NOT NULL,
			email VARCHAR ( 255 ) UNIQUE NOT NULL,
			activation_code VARCHAR ( 6 ),
			account_activated BOOLEAN DEFAULT '0',
			created_on TIMESTAMP NOT NULL,
			last_login TIMESTAMP,
			PRIMARY KEY(customer_id)
		)"""
	);

def create_savefiles_table(cursor):
	cursor.execute("""
		CREATE TABLE IF NOT EXISTS savefiles ( 
			user_id serial PRIMARY KEY, 
			save_1 TEXT DEFAULT NULL, 
			save_2 TEXT DEFAULT NULL, 
			save_3 TEXT DEFAULT NULL, 
			FOREIGN KEY (user_id) REFERENCES useraccounts(user_id)
		);"""
	);

def create_user_cookie_keys_table(cursor):
	cursor.execute("""
		CREATE TABLE IF NOT EXISTS usercookiekeys ( 
			user_id serial PRIMARY KEY, 
			key TEXT NOT NULL,
			created_on TIMESTAMP NOT NULL,
			FOREIGN KEY (user_id) REFERENCES useraccounts(user_id)
		);"""
	);

#user table interactions
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

def try_login_user(cursor, username, password):
	encodedpass = password.encode('utf-8');
	cursor.execute("""
		SELECT 
			user_id
		FROM
			useraccounts
		WHERE
			username = %s AND password = %s AND account_activated = TRUE
		""",
		(username, hashlib.sha256(encodedpass).hexdigest())
	);

	user = cursor.fetchone();

	return user if user else False;

def get_user_data(cursor, user_id):
	cursor.execute("""
		SELECT 
			username, email, created_on, last_login, save_1, save_2, save_3
		FROM
			useraccounts
		INNER JOIN
			savefiles 
		ON 
			savefiles.user_id = useraccounts.user_id
		WHERE
			useraccounts.user_id = %s
		""",
		(user_id,)
	);
	return cursor.fetchone();

def try_validate_user(cursor, username, password, activation_code):
	encodedpass = password.encode('utf-8');
	cursor.execute("""
		UPDATE
			useraccounts
		SET
			account_activated = TRUE
		WHERE
			username = %s AND password = %s AND activation_code = %s
		RETURNING 
			user_id
		""",
		(username, hashlib.sha256(encodedpass).hexdigest(), activation_code)
	);

	result = cursor.fetchone();
	return result if result else False;

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

def update_user_last_login(cursor, user_id):
	cursor.execute("""
		UPDATE
			useraccounts
		SET
			last_login = NOW()
		where
			user_id = %s
		""",
		(user_id, )
	);

#save file table interactions
def add_savefile_row_for_new_user(cursor, user_id):
	cursor.execute("""
		INSERT INTO 
			savefiles (user_id) 
		VALUES (%s)""",
		(user_id,)
	);

def update_user_savefile(cursor, user_id, index, json):
	if ( index == 1 ):
		cursor.execute("""
			UPDATE
				savefiles
			SET
				save_1 = %s
			WHERE 
				user_id = %s""",
			(json, user_id)
		);
	if ( index == 2 ):
		cursor.execute("""
			UPDATE
				savefiles
			SET
				save_2 = %s
			WHERE 
				user_id = %s""",
			(json, user_id)
		);
	if ( index == 3 ):
		cursor.execute("""
			UPDATE
				savefiles
			SET
				save_3 = %s
			WHERE 
				user_id = %s""",
			(json, user_id)
		);

# user keys table
def set_user_cookie_key(cursor, user_id, key):
	cursor.execute("""
		INSERT INTO
			usercookiekeys (user_id, key, created_on)
		VALUES
			(%s, %s, NOW())
		""",
		(user_id, key)
	);

def delete_user_cookie_key(cursor, user_id):
	cursor.execute("""
		DELETE FROM
			usercookiekeys
		WHERE
			user_id = %s
		""",
		(user_id,)
	);

def get_user_cookie_key(cursor, user_id):
	cursor.execute("""
		SELECT
			key, created_on
		FROM
			usercookiekeys
		WHERE
			user_id = %s
			""",
		(user_id,)
	);

	return cursor.fetchone();

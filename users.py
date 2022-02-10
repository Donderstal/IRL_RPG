from flask import jsonify, make_response, session

import tokens
import string;
import db;
import random;
import emails;

def register_user( app, request ):
    returnValue = None;
    statusCode = None;

    # open connection
    connection = db.get_connection();
    cursor = db.get_cursor(connection);

    # process request
    jsonUser = request.get_json(force=True);

    # check is email or username is taken
    username_is_taken = is_username_taken( cursor, jsonUser["username-input-sign-up"] );
    email_is_taken = is_email_taken( cursor, jsonUser["email-input-sign-up"] );
    if username_is_taken:
        returnValue = jsonify({'error': 'USERNAME_TAKEN'});
        statusCode = 202;
    if email_is_taken:
        returnValue = jsonify({'error': 'EMAIL_TAKEN'});
        statusCode = 202;

    if username_is_taken == False and email_is_taken == False:
        try:
            # register new user
            db.try_register_new_user( cursor, jsonUser["username-input-sign-up"], jsonUser["password-input-sign-up"], jsonUser["email-input-sign-up"], generate_random_string( 6 ));
            user = db.get_user(cursor, jsonUser["username-input-sign-up"])
            # email activation code
            emails.send_activate_account_email( app, user['email'], (user['username'], user['activation_code']) )
            
            returnValue = jsonify({'succes': True});
            statusCode = 200;
            connection.commit();
        except Exception as e:
            print('Caught this error: ' + repr(e))
            returnValue = jsonify({'error': str(e)});
            statusCode = 500;

    # close connection
    db.close_cursor(cursor);
    db.close_connection(connection);

    return make_response(returnValue, statusCode);

def login_user( request ):
    returnValue = None;
    statusCode = None;
    setCookie = False;

    # open connection
    connection = db.get_connection();
    cursor = db.get_cursor(connection);

    try:
        # process request
        jsonUser = request.get_json(force=True);
        user = db.try_login_user(cursor, jsonUser["username-input-login"], jsonUser["password-input-login"]);
        if user:
            tokens.set_user_session( user );
            setCookie = True;
            returnValue = jsonify(user);
            statusCode = 200;
        else:
            returnValue = jsonify({'error': 'UNKNOWN_CREDENTIALS'});
            statusCode = 202;
    except Exception as e:
        print('Caught this error: ' + repr(e))
        returnValue = jsonify({'error': str(e)});
        statusCode = 500;
    finally:
        # close connection
        db.close_cursor(cursor);
        db.close_connection(connection);

    response = make_response(returnValue, statusCode);
    if setCookie:
        tokens.set_user_cookie( response );
    return response;

def restore_password( app, request ):
    returnValue = None;
    statusCode = None;

    # open connection
    connection = db.get_connection();
    cursor = db.get_cursor(connection);
    # process request
    jsonUser = request.get_json(force=True);

    # check is email or username is taken
    username_exists = is_username_taken( cursor, jsonUser["username-input-restore-password"] );
    email_exists = is_email_taken( cursor, jsonUser["email-input-restore-password"] );
    if email_exists and username_exists:
        try:
            password = generate_random_string( 10 );
            db.try_set_password(cursor, jsonUser["username-input-restore-password"], jsonUser["email-input-restore-password"], password);
            connection.commit();
            
            # email user
            emails.send_restore_password_email( app, jsonUser["email-input-restore-password"], (jsonUser["username-input-restore-password"], password) )

            returnValue = jsonify({'succes': True});
            statusCode = 200;
            connection.commit();
        except Exception as e:
            print('Caught this error: ' + repr(e))
            returnValue = jsonify({'error': str(e)});
            statusCode = 500;
    else:
        returnValue = jsonify({'error': 'UNKNOWN_CREDENTIALS'});
        statusCode = 202;

    # close connection
    db.close_cursor(cursor);
    db.close_connection(connection);

    return make_response(returnValue, statusCode);

def activate_account( request ):
    returnValue = None;
    statusCode = None;

    # open connection
    connection = db.get_connection();
    cursor = db.get_cursor(connection);

    try:
        # process request
        jsonUser = request.get_json(force=True);
        db.try_validate_user(cursor, jsonUser["username-input-login"], jsonUser["password-input-login"], jsonUser["activation-code-input-login"]);
        connection.commit();
        user = db.try_login_user(cursor, jsonUser["username-input-login"], jsonUser["password-input-login"]);
        if user:
            tokens.set_user_session( user );
            returnValue = jsonify(user);
            statusCode = 200;
        else:
            returnValue = jsonify(db.get_user(cursor, jsonUser["username-input-login"]));
            statusCode = 202;
    except Exception as e:
        print('Caught this error: ' + repr(e))
        returnValue = jsonify({'error': str(e)});
        statusCode = 500;
    finally:
        # close connection
        db.close_cursor(cursor);
        db.close_connection(connection);

    response = make_response(returnValue, statusCode);
    tokens.set_user_cookie( response );
    return response;

def log_out_user( ):
    session.clear();
    response = make_response(jsonify({'succes': True}), 200);
    response.delete_cookie('Username');
    response.delete_cookie('Key');
    response.location = '/';
    return response;

def generate_random_string( n ):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=n))

def is_username_taken( cur, username ):
    arr = db.get_usernames(cur);
    return [username] in arr;

def is_email_taken( cur, email ):
    arr = db.get_user_emails(cur)
    return [email] in arr;

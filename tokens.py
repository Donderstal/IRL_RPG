import hashlib
import db
import uuid
from flask import session, request

cookie_key = 's0d_wee0dmmmw+qqq1239v.xq'

def get_cookie_key( ):
    encodedpass = cookie_key.encode('utf-8');
    return hashlib.sha256(encodedpass).hexdigest();

def generate_user_cookie_key():
    uid = uuid.uuid4();
    return uid.hex;

def set_user_session( user_id ):
    user_cookie_key     = generate_user_cookie_key();
    session['id']       = str(user_id);
    session['key']     = user_cookie_key;
    
    conn = db.get_connection();
    cursor = db.get_cursor(conn);

    db.delete_user_cookie_key(cursor, user_id);
    db.set_user_cookie_key(cursor, user_id, user_cookie_key);

    conn.commit();
    db.close_cursor(cursor);
    db.close_connection(conn);

def set_user_cookie( response ):
    response.set_cookie('id', session['id']);
    response.set_cookie('key', get_cookie_key( ));
    response.set_cookie('key2', session['key']);

def check_for_valid_cookie( ):
    user_id = request.cookies.get('id', None);
    key = request.cookies.get('key', None);
    userKey = request.cookies.get('key2', None);

    if user_id == None or key == None or userKey == None:
        return;

    conn = db.get_connection();
    cursor = db.get_cursor(conn);
    user_key_object = db.get_user_cookie_key(cursor, int(user_id));
    db.close_cursor(cursor);
    db.close_connection(conn);

    return get_cookie_key( ) == key and user_key_object != None and userKey == user_key_object[0];
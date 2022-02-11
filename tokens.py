import hashlib
import sys
from flask import session, request

cookie_key = 's0d_wee0dmmmw+qqq1239v.xq'

def get_cookie_key( ):
    encodedpass = cookie_key.encode('utf-8');
    return hashlib.sha256(encodedpass).hexdigest();

def set_user_session( user ):
    session['username']     = user['username'];

def set_user_cookie( response ):
    response.set_cookie('Username', session['username']);
    response.set_cookie('Key', get_cookie_key( ));

def check_for_valid_cookie( ):
    user = request.cookies.get('Username', None)
    key = request.cookies.get('Key', None)
    return get_cookie_key( ) == key and user != None;

def compare_session_and_cookie( ):
    if session.get("username") != None:
        return session['username'] == request.cookies.get('Username', None);
    else:
        return False;

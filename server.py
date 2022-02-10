from flask import Flask, request, send_from_directory, request, redirect;
import users;
import tokens;

app = Flask(__name__)
app.secret_key = b'ext2-0fma=2p3l4l4'
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'daanonderstal@gmail.com'
app.config['MAIL_PASSWORD'] = 'likmereet'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

# Path for our main Svelte page
@app.route("/")
def base():
    if tokens.check_for_valid_cookie() and tokens.compare_session_and_cookie( ):
        return send_from_directory('client/public', 'index.html')
    else:
        return redirect("/login", code=302);

@app.route("/login")
def login():
    if tokens.check_for_valid_cookie() and tokens.compare_session_and_cookie( ):
        return redirect("/", code=302);
    else:
        return send_from_directory('client/public', 'index.html');

@app.route("/login-validate")
def login_validate():
    if tokens.check_for_valid_cookie() and tokens.compare_session_and_cookie( ):
        return redirect("/", code=302);
    else:
        return send_from_directory('client/public', 'index.html');

# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/<path:path>")
def home(path):
    return send_from_directory('client/public', path)

@app.route("/post-logout", methods=['POST'])
def post_logout():
    return users.logout_user( );

@app.route("/post-login", methods=['POST'])
def post_login():
    return users.login_user( request );

@app.route("/post-sign-up", methods=['POST'])
def post_registration():
    return users.register_user( app, request );

@app.route("/post-restore-password", methods=['POST'])
def post_restore_password():
    return users.restore_password( app, request );

@app.route("/post-validate-account", methods=['POST'])
def post_activate_account():
    return users.activate_account( request );

if __name__ == "__main__":
    app.run(debug=True)
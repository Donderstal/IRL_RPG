from flask import Flask, jsonify, request, send_from_directory, request, session, make_response;
import users;
import tokens;
import db;

app = Flask(__name__)
app.secret_key = 'test'
app.config['MAIL_SERVER']= 'test'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'test'
app.config['MAIL_PASSWORD'] = 'test'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

db.init_tables()

# Path for our main Svelte page
@app.route("/")
def base():
    return send_from_directory('client/public', 'index.html');

# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/<path:path>")
def home(path):
    return send_from_directory('client/public', path)

@app.route("/check-login", methods=['POST'])
def check_login():
    return users.validate_user( );

@app.route("/post-log-out", methods=['POST'])
def post_logout():
    return users.log_out_user( );

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

@app.route("/post-savegame", methods=['POST'])
def post_savegame():
    return users.post_savefile(request);

if __name__ == "__main__":
    app.run(debug=True)
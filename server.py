from flask import Flask, request, send_from_directory, request;
import users;

app = Flask(__name__)

app.config['MAIL_SERVER']= 'placeholder'
app.config['MAIL_PORT'] = 'placeholder'
app.config['MAIL_USERNAME'] = 'placeholder'
app.config['MAIL_PASSWORD'] = 'placeholder'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

# Path for our main Svelte page
@app.route("/")
def base():
    return send_from_directory('client/public', 'index.html')

@app.route("/login")
def login():
    return redirect("/", code=302) if False else send_from_directory('client/public', 'index.html');

@app.route("/login-validate")
def login_validate():
    return redirect("/", code=302) if False else send_from_directory('client/public', 'index.html');

# Path for all the static files (compiled JS/CSS, etc.)
@app.route("/<path:path>")
def home(path):
    return send_from_directory('client/public', path)

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
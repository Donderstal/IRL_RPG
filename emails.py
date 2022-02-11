from flask_mail import Mail, Message

def send_mail(app, message):
    mail = Mail(app)
    with app.app_context():
        mail.send(message);

def send_activate_account_email( app, recipient, contentTuple ):
    message = Message('Thanks for registering!', sender = 'jimmyfuturo@noreply.com', recipients = [recipient]);
    message.html = get_activate_account_email( contentTuple[0], contentTuple[1] );
    send_mail(app, message)

def send_restore_password_email( app, recipient, contentTuple ):
    message = Message('Password reset!', sender = 'jimmyfuturo@noreply.com', recipients = [recipient]);
    message.html = get_restore_password_email( contentTuple[0], contentTuple[1] );
    send_mail(app, message)

def get_activate_account_email( username, activation_code ):
    return """
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width">
        <title></title>
        <style></style>
    </head>

    <body>
        <div id="email" style="width:600px;">

        <!-- Header --> 
            <table style="border: 1px solid black; margin-top: 6px; margin-bottom: 6px;" role="presentation" cellspacing="0" width="100%%">
                <tr>
                    <td style="color:white; text-align:center; vertical-align:middle;" bgcolor="#00384D">
                        <h1> Welcome %s! </h1>
                    </td>
                </tr>
            </table>

            <!-- Body --> 
            <table style="border: 1px solid black; margin-top: 12px; margin-bottom: 12px;" role="presentation" cellspacing="0" width="100%%">
                <tr >
                    <td style="color:white;text-align:center; vertical-align:middle" bgcolor="#00384D">
                        Thanks for registering to our website! To get started, please activate your account.
                    </td> 
                </tr>
                <tr>
                    <td style="color:white;text-align:center; vertical-align:middle" bgcolor="#00384D">
                        Your activation code is: %s
                    </td> 
                </tr>
                <tr>
                    <td style="color:white;text-align:center; vertical-align:middle" bgcolor="#00384D">
                        Activate your account on our website and start playing!
                    </td> 
                </tr>
            </table>

            <!-- Footer -->
            <table style="border: 1px solid black; margin-top: 6px; margin-bottom: 6px;" role="presentation" border="1" cellspacing="0" width="100%%">
                <tr>
                    <td style="color:white; text-align:center; vertical-align:middle;" bgcolor="#00384D"> 
                        © - Neckbeard Studio 2022
                    </td>
                </tr>
            </table> 
        </div>
    </body>
    </html>
    """ %(username, activation_code);


def get_restore_password_email( username, password ):
    return """
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width">
        <title></title>
        <style></style>
    </head>

    <body>
        <div id="email" style="width:600px;">

        <!-- Header --> 
            <table style="border: 1px solid black; margin-top: 6px; margin-bottom: 6px;" role="presentation" cellspacing="0" width="100%%">
                <tr>
                    <td style="color:white; text-align:center; vertical-align:middle;" bgcolor="#00384D">
                        <h1> Hello %s! </h1>
                    </td>
                </tr>
            </table>

            <!-- Body --> 
            <table style="border: 1px solid black; margin-top: 12px; margin-bottom: 12px;" role="presentation" cellspacing="0" width="100%%">
                <tr >
                    <td style="color:white;text-align:center; vertical-align:middle" bgcolor="#00384D">
                        It seems you have forgotten your password...
                    </td> 
                </tr>
                <tr>
                    <td style="color:white;text-align:center; vertical-align:middle" bgcolor="#00384D">
                        No worries player, it happens to the best of us!
                    </td> 
                </tr>
                <tr>
                    <td style="color:white;text-align:center; vertical-align:middle" bgcolor="#00384D">
                        Your temporary password is: %s
                    </td> 
                </tr>
                <tr>
                    <td style="color:white;text-align:center; vertical-align:middle" bgcolor="#00384D">
                        Recover your account and don't forget to change your password!
                    </td> 
                </tr>
            </table>

            <!-- Footer -->
            <table style="border: 1px solid black; margin-top: 6px; margin-bottom: 6px;" role="presentation" border="1" cellspacing="0" width="100%%">
                <tr>
                    <td style="color:white; text-align:center; vertical-align:middle;" bgcolor="#00384D"> 
                        © - Neckbeard Studio 2022
                    </td>
                </tr>
            </table> 
        </div>
    </body>
    </html>
    """ %(username, password);
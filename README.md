# Romail #

Romail is a library working with email in Gosu.  It wraps the standard Java email library
[JavaMail] (http://www.oracle.com/technetwork/java/javamail/index.html) which is a very
complete library but, as is so often the case in Java, is difficult to use in the common
case.  

Romail makes the common cases (sending an email, following a folder) very simple and
leverages many of the language features available in Gosu to keep things tight and
simple.

Romail has been designed to work well with [Ronin] (http://ronin-web.org), the Gosu-based
web framework, but it has no dependencies on it and can be used in any gosu environment.

## Set Up ##

Typically a system will have one email server it uses for sending emails (usually over SMTP)
and, less commonly, a server it polls for incoming emails. Romail wraps the idea of sending
and receiving emails up in a single class, `romail.Server`.  There is a default server that
will be used when no other server specified, at the static property `Server.BASE`.

Here is some typical code for setting up the default server, which should be done during
your program set up (e.g. in your RoninConfig constructor):

  Server.Base = new Server() {
    :SendServer = "smtp.gmail.com",
    :FetchServer = "imap.gmail.com",
    :UserName = "example@gmail.com",
    :Password = "opensaysme"
  }   
 
This sets up a server that will send email through GMail's SMTP server and read email from 
GMail's IMAP servers.

## Sending Email ##

Sending an email in Romail is trivial:

  var email = new Email() {
    :To = "example2@gmail.com",
    :From = "example@gmail.com",
    :Subject = "Example Email",
    :Text = "Hello, this is an example email...\n\nDid you get it?"
  }
  email.send()

Easy as pie.  This will use the `Server.BASE` configuration to send this email through the
`smtp.gmail.com`.

The code above will open a new connection every time you call `send()`.  You can keep the
connection open for multiple emails by using the `Server#connect()` method:

  using( Server.Base.connect() ) {
    for( user in getAllUser() ) {
      var email = new Email() {
        :To = user.Email,
        :From = "example@gmail.com",
        :Subject = "Thank You!",
        :Text = "Thanks for using our application!"
      }
      email.send()
    }
  }

This will create one SMTP connection and send all the emails through that connection, rather
than opening a new SMTP connection for each user. 

## Reading Email ##

Romail makes a common pattern, following an email folder for new messages, very easy to 
implement:

  Server.Base.folder( "UserResponses" ).follow( \ email -> print( "Got an email from a user! " + email.From ) )

You use the `folder()` method to get a folder on the server and then call the `follow()` method,
passing in a block that takes an email.  This block will be invoked when new mail arrives in the
"UserResponses" folder.


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

Reflecting a philosophy of easy should be easy and hard should be possible Romail tries
to make set up an easy thing. Setting up Romail to send and receive mail using a GMail
account is straight forward:

    var account = new GmailIMAPAccount("userName", "password")

Romail intends to support well known email systems such as Exchange, Yahoo! mail and so forth.
Adding support for a new system, say Hotmail, should be simple.

## Sending Email ##

Sending an email in Romail is trivial:

    var email = new Email() {
      :To = "example2@gmail.com",
      :From = "example@gmail.com",
      :Subject = "Example Email",
      :Text = "Hello, this is an example email...\n\nDid you get it?"
    }

    account.send(email)


In the near future the need to refer directly to the account will be removed. In other words
instead of

    account.send(email)

one will be able to do

    email.send()

Easy as pie.

## Reading Email ##

Reading email in Romail is currently not too big a deal:

    var account = new GmailIMAPAccount("userName", "password")
    var unreadMessages = account.Inbox.UnreadEmailMessages
    for(var message in unreadMessages){
        // Mark all the unread messages as read
        unreadMessage.markRead()
    }

In the near future Romail will make a common pattern, following an email folder for new messages, very easy to
implement:

    account.Inbox.follow( \ email -> print( "Got an email from a user! " + email.From ) )

account.Inbox returns an EmailFolder which has the `follow()` method that accepts a block that takes an email.
This block will be invoked when new mail arrives in the Inbox, or any other folder on the server.

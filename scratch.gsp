classpath "lib,src"

uses romail.Email
uses romail.Server
uses java.lang.Thread

// Server setup - this is the default server config that emails will use
Server.Base = new Server() {
  :SendServer = "smtp.gmail.com",
  :FetchServer = "imap.gmail.com",
  :UserName = "",
  :Password = ""
}

//------------------------------------------------------
// Reading Email
//------------------------------------------------------

// The given block will be fired when new messages arrive in the Inbox
Server.Base.folder( "Scala" ).follow( \ e ->{
  print( "Got an email from " + e.From )
})

// Prints out all the senders of all messages in the "Scala" folder
Server.Base.folder( "Scala" ).AllMessages.each( \ e -> print( e.From )  )

// Prints out all the senders of unread messages in the "Scala" folder
Server.Base.folder( "Scala" ).UnreadMessages.each( \ e -> print( e.From )  )

//------------------------------------------------------
// Sending Email
//------------------------------------------------------

//The common case is very simple
var email = new Email() {
  :To = "carsongross@gmail.com",
  :From = "carsongross@gmail.com",
  :Subject = "Test Email",
  :Text = "Hello, this is a test email...\n\nDid you get it?"
}
email.send()

// You can use this to keep the connection open between 
// email instances for better performance when sending bulk mail
using( Server.Base.connect() ) {
  var email = new Email() {
    :To = "carsongross@gmail.com",
    :From = "carsongross@gmail.com",
    :Subject = "Test Email",
    :Text = "Hello, this is a test email...\n\nDid you get it?"
  }

  email.send()
}
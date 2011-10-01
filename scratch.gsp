classpath "lib,src"

uses romail.Email
uses romail.Server

// Server setup - this is the default server config that emails will use
Server.Base = new Server() {
  :SendServer = "smtp.gmail.com",
  :FetchServer = "imap.gmail.com",
  :UserName = "",
  :Password = ""
}

// The given block will be fired when new messages arrive in the Inbox
// API demo only, doesn't currently work!
Server.Base.Inbox.follow( \ e ->{
  print( "Got an email from " + e.From )
})

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
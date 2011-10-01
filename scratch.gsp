classpath "lib,src"

uses romail.Email
uses romail.Server

Server.Base = new Server() {
  :SendServer = "smtp.gmail.com",
  :UserName = "",
  :Password = ""
}

using( Server.Base.connect() ) {
  var email = new Email() {
    :To = "carsongross@gmail.com",
    :From = "carsongross@gmail.com",
    :Subject = "Test Email",
    :Text = "Hello, this is a test email...\n\nDid you get it?"
  }

  email.send()
}
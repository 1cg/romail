classpath "lib,src"

uses romail.Email
uses romail.Account

var account = new Account()
account.FullName = "Romail Testaccount"
account.EmailAddress = "romailtesting@gmail.com"
account.OutgoingSMTPServer = "smtp.gmail.com"
account.UserName = "romailtesting@gmail.com"
account.Password = "letmein1234"

var em = new Email()
em.To = "rkitts@loudhouse.org"
em.Subject = "Romail testing"
em.Text = "Hello from romail!"
account.send(em)

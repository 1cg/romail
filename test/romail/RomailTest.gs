package romail

uses junit.framework.TestCase

class RomailTest extends TestCase {

  function testSomething()
  {
    var account = new Account()
    account.FullName = "Rick Kitts"
    account.EmailAddress = "rkitts@loudhouse.org"
    account.OutgoingSMTPServer = "smtp.gmail.com"
    account.UserName = "rkitts@loudhouse.org"
    account.Password = "XXX"

    var em = new Email()
    em.To = "rkitts@loudhouse.org"
    em.Subject = "Romail testing"
    em.Text = "Hello from romail!"
    account.send(em)
  }

}
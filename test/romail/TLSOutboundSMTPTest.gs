package romail

uses junit.framework.TestCase
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/16/12
 * Time: 2:11 PM
 * To change this template use File | Settings | File Templates.
 */
class TLSOutboundSMTPTest extends RomailTestCase{

  function  testCanSendMailWithoutException()
  {
    var smtpUser = TestAccountConfig.SMTP_USER
    var smtp = new TLSOutboundSMTP(TestAccountConfig.SMTP_SERVER, 587, smtpUser, TestAccountConfig.SMTP_PASSWORD)
    var email = new EmailMessage () {
        :From = smtpUser,
        :To = TestAccountConfig.RECIPIENT_EMAIL,
        :Subject = "Testing",
        :Text = "From romail in the debugger. Sweet!"
    }
    smtp.sendEmail(email)
    return;
  }
}
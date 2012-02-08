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
    var smtpUser = TestAccountProperties.getProperty("smtp.user")
    var smtp = new TLSOutboundSMTP(TestAccountProperties.getProperty("smtp.server"), 587, smtpUser, TestAccountProperties.getProperty("smtp.password"))
    var email = new EmailMessage () {
        :From = smtpUser,
        :To = TestAccountProperties.getProperty("recipient"),
        :Subject = "Testing",
        :Text = "From romail in the debugger. Sweet!"
    }
    smtp.sendEmail(email)
    return;
  }
}
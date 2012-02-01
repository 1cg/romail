package romail

uses junit.framework.TestCase
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/16/12
 * Time: 2:11 PM
 * To change this template use File | Settings | File Templates.
 */
class TLSOutbounSMTPTest extends TestCase{

  function  testCanSendMailWithoutException()
  {
    var smtp = new TLSOutboundSMTP("smtp.gmail.com", 587, "romailtesting@gmail.com", "letmein1234")
    var email = new Email() {
      :From = "romailtest@gmail.com",
      :To = "rkitts@gmail.com",
      :Subject = "Testing",
      :Text = "From romail in the debugger. Sweet!"
    }
    smtp.sendEmail(email)
    return;
  }
}
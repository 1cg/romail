package romail

uses junit.framework.TestCase
uses java.lang.System

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/1/12
 * Time: 2:18 PM
 * To change this template use File | Settings | File Templates.
 */
class GMailInboundIMAPTest extends RomailTestCase{

  function testInboxIsNotNull()
  {
    var gmailIMAP = new GMailInboundIMAP(TestAccountConfig.GMAIL_USERNAME, TestAccountConfig.GMAIL_PASSWORD)
    var folder = gmailIMAP.getFolder("Inbox")
    assertNotNull(folder)
  }
}
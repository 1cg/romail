package romail

uses java.lang.System
uses java.lang.IllegalStateException
uses java.lang.Thread

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/8/12
 * Time: 1:10 PM
 *
 * A bunch of disjoint and generally unrelated tests for Romail.
 */
class RomailTest extends RomailTestCase{

  public function testMarkingUnsetEmailMessageReadThrows()
  {
    var message = new EmailMessage()
    try {
      message.markRead()
      fail("Exception not thrown")
    }
    catch(ise : IllegalStateException){
    }
  }

  public function testUnreadMessageCountEqualsUnreadEmailMessagesSize()
  {
    var account = new GmailIMAPAccount(TestAccountProperties.getProperty("gmail.username"), TestAccountProperties.getProperty("gmail.password"))
    var unreadMessages = account.Inbox.UnreadEmailMessages
    assertEquals(account.Inbox.UnreadMessageCount, unreadMessages.size())
    assertTrue(account.Inbox.UnreadMessageCount > 0)
  }

  public function testMarkingMessageReadReducesUnreadMessageCount()
  {
    var account = new GmailIMAPAccount(TestAccountProperties.getProperty("gmail.username"), TestAccountProperties.getProperty("gmail.password"))
    var unrCount = account.Inbox.UnreadMessageCount
    var unreadMessages = account.Inbox.UnreadEmailMessages
    unreadMessages[0].markRead()
    assertEquals(unrCount - 1, account.Inbox.UnreadMessageCount)
  }

  public function testSendingMailSeemsToWork()
  {
    // Send mail to ourselves, wait a little bit, see if it shows up
    var account = new GmailIMAPAccount(TestAccountProperties.getProperty("gmail.username"), TestAccountProperties.getProperty("gmail.password"))
    var start = account.Inbox.UnreadMessageCount
    var email = new EmailMessage () {
        :From = TestAccountProperties.getProperty("gmail.username"),
        :To = TestAccountProperties.getProperty("gmail.username"),
        :Subject = "Testing",
        :Text = "From romail in the debugger. Sweet!"
    }
    account.send(email)
    var now = System.currentTimeMillis()
    while(System.currentTimeMillis() < now + 60000 * 3){
      if(account.Inbox.UnreadMessageCount != start){
        break
      }
      Thread.sleep(5000)
    }
    assertEquals(start + 1, account.Inbox.UnreadMessageCount)
  }
}
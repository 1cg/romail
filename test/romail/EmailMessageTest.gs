package romail

uses java.lang.IllegalStateException
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/9/12
 * Time: 9:13 AM
 * To change this template use File | Settings | File Templates.
 */
class EmailMessageTest extends RomailTestCase
{
  public function testDeletingUnsentEmailMessageThrows()
  {
    var message = new EmailMessage()
    try {
      message.delete()
      fail("Exception not thrown")
    }
    catch(ise : IllegalStateException){
    }
  }

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

  public function testUsingTOWithMoreThanOneTOThrows()
  {
    var email = new EmailMessage()
    email.addRecipients({"abc@foo.com", "foo@bar.com"})
    try{
      email.TO = "crap@foo.bar"
    }
        catch(ise : IllegalStateException){
        }
  }
  
  public function testTOOverwritesExistingTOIfOnlyOne()
  {
    var email = new EmailMessage()
    email.TO = "nonsense@nothing.com"
    var expected = "crap@foo.bar"
    email.TO = expected
    assertEquals(expected, email.Recipients.single())
  }
}
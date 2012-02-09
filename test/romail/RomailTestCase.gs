package romail

uses junit.framework.TestCase
uses java.util.Properties
uses java.io.InputStream
uses java.io.FileInputStream

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/8/12
 * Time: 9:21 AM
 *
 * Simply class that loads up a romailtest.properties file. This file contains user names and passwords to be
 * used to test email accounts and should never(!) be checked in. This makes it a little easier to have actual
 * tests but not give away usernames and passwords
 */
abstract class RomailTestCase extends TestCase{

  private var _romailTestProperties : Properties

  protected property get TestAccountProperties() : Properties
  {
    if(_romailTestProperties == null){
      var propsLocation = RomailTestCase.Type.SourceFileHandle.FilePath
      propsLocation = propsLocation.substring(0, propsLocation.lastIndexOf('/'))
      var input = new FileInputStream(propsLocation + "/romailtest.properties")
      _romailTestProperties = new Properties()
      _romailTestProperties.load(input)
    }
    return(_romailTestProperties)
  }

  protected function clearFolder(folder : EmailFolder)
  {
    folder.AllEmailMessages.each( \ elt -> elt.delete())
    folder.flush()
    return
  }
  
  protected function addUnreadMessages(account : Account, emailBasis: EmailMessage, messageCount : int)
  {
    for(cntr in 1..messageCount){
      emailBasis.Subject = emailBasis.Subject + cntr
      account.send(emailBasis)
    }
    return
  }
}
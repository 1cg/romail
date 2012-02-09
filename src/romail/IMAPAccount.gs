package romail
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/8/12
 * Time: 11:34 AM
 * To change this template use File | Settings | File Templates.
 */
abstract class IMAPAccount extends Account{
  var _inboundServer : InboundIMAP

  construct(inboundServer : InboundIMAP, outboundServer : OutboundSMTP)
  {
    super(outboundServer)
    _inboundServer =inboundServer
    return
  }

  override property get Inbox(): EmailFolder {
    var retVal = getFolder("Inbox")
    return(retVal)
  }

  /**
   * Returns the folder with the given name, or null if the folder does not exist on the server
   */
  public function getFolder(name : String) : EmailFolder
  {
    var retVal  = _inboundServer.getFolder(name)
    return(retVal)
  }
}
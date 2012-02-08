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
    var retVal = _inboundServer.Inbox
    return(retVal)
  }
}
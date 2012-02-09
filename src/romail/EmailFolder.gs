package romail

uses javax.mail.Folder
uses java.util.ArrayList
uses javax.mail.search.FlagTerm
uses sun.jvm.hotspot.runtime.VM.Flag
uses javax.mail.Flags
uses javax.mail.Message

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/1/12
 * Time: 4:08 PM
 */
class EmailFolder {
  private var _basis : Folder
  private static var UNREAD_FLAGTERM : FlagTerm = new FlagTerm(new Flags(Flags.Flag.SEEN), false)

  internal construct(basis : Folder)
  {
    _basis = basis
    return;
  }

  public property get AllEmailMessages() : List<EmailMessage>
  {
    var messages = OpenedBasis.Messages
    var retVal = messageArrayToList(messages)
    return(retVal)
  }

  public property get UnreadEmailMessages() : List<EmailMessage>
  {
    var messages = OpenedBasis.search(UNREAD_FLAGTERM)
    var retVal = messageArrayToList(messages)
    return(retVal)
  }
  
  public property get UnreadMessageCount() : int
  {
    return(OpenedBasis.UnreadMessageCount)
  }

  public function close()
  {
    if(_basis.Open == true){
      _basis.close(true)
    }
    return
  }

  /**
   * Returns _basis guaranteed to be opened in READ_ONLY mode. Do not(!) access basis except through
   * this method unless you know what you are doing
   */
  private property get OpenedBasis() : Folder
  {
    if(_basis.Open == false){
      _basis.open(Folder.READ_ONLY)
    }
    return(_basis)
  }

  private function messageArrayToList(messages : Message[]) : List<EmailMessage>
  {
    var retVal = new ArrayList<EmailMessage>()
    for(message in messages){
      var emailMessage = new EmailMessage(message)
      retVal.add(emailMessage)
    }
    return(retVal)
  }
}
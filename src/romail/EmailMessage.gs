package romail

uses gw.util.GosuExceptionUtil

uses javax.mail.internet.AddressException
uses javax.mail.internet.InternetAddress
uses java.io.File
uses java.util.ArrayList
uses java.util.List
uses java.lang.StringBuilder
uses javax.mail.Message
uses javax.mail.Flags
uses java.lang.IllegalStateException

class EmailMessage {
  var _to : String as To
  var _from : String as From
  var _subject : String as Subject
  var _text : String as Text
  var _basis : Message as Basis

  construct()
  {
  }

  construct(basis : Message)
  {
    To = basis.AllRecipients[0].toString()
    From = basis.From[0].toString()
    Subject = basis.Subject
    Text = parseMessageForText(basis)
    _basis = basis
    return
  }

  /**
   * Marks the message as read. Note that for messages retrieved from a POP mailbox this
   * has no lasting effect.
  */
  public function isMarkedRead() : boolean
  {
    var retVal = false
    if(_basis != null){
      for(var flag in _basis.Flags.SystemFlags){
        if(flag == Flags.Flag.SEEN){
          retVal = true;
          break;
        }
      }
    }
    return(retVal)
  }

  /**
   * Marks a message as read, even if it has already been marked as read. Note that for
   * messages retrieved from a POP mailbox this has no lasting effect.
   *
   * @throws java.lang.IllegalStateException if an attempt is made to call this method on a
   * message that has not been sent.
   */
  public function markRead()
  {
    if(_basis != null){
      _basis.setFlag(Flags.Flag.SEEN, true)
    }
    else{
      throw(new IllegalStateException("Cannot mark a message that has not yet been sent."))
    }
  }

  private function parseMessageForText(basis : Message) : String
  {
    var retVal = ""
    if(basis.isMimeType("text/*")){
      retVal = basis.Content as String
    }
    return(retVal)
  }
}
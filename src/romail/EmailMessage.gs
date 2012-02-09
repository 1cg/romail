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
uses javax.mail.Address
uses java.util.Set
uses java.util.HashSet
uses javax.mail.Folder
uses com.sun.tools.corba.se.idl.constExpr.BooleanOr
uses java.lang.Double

/**
 * Encapsulation of, really, a MimeMessage with some restrictions.
 *
 * <ul>
 *   <li>Only a single From is supported</li>
 *   <li>Only support To, CC, BCC to headers. No custom header support</li>
 * </ul>
 */

class EmailMessage {
  var _toRecipients: List<Address> = new ArrayList<Address>()
  var _ccRecipients : List<Address> = new ArrayList<Address>()
  var _bccRecipients : List<Address> = new ArrayList<Address>()

  var _from : String as From
  var _subject : String as Subject
  var _text : String as Text
  var _basis : Message as Basis

  construct()
  {
  }

  construct(basis : Message)
  {        
    From = basis.From[0].toString()
    Subject = basis.Subject
    Text = parseMessageForText(basis)
    _toRecipients = basis.getRecipients(Message.RecipientType.TO).toList()
    if(basis.getRecipients(Message.RecipientType.CC) != null){
      _ccRecipients = basis.getRecipients(Message.RecipientType.CC).toList()
    }
    if(basis.getRecipients(Message.RecipientType.BCC) != null){
      _bccRecipients = basis.getRecipients(Message.RecipientType.BCC).toList()
    }

    _basis = basis
    return
  }


  /**
   * Returns the addresses that are in the To: header of the message as a list of strings in RFC-822ish format.
   */
  public property get Recipients() : List<String>
  {
    var retVal = _toRecipients.map( \ elt -> elt.toString())
    return(retVal)
  }

  /**
   * This is a convenience setter that has some restrictions. It is intended to support the common case of an email
   * message with a single TO recipient. If an attempt is made to use this setter on an instance that has more than
   * one TO recipient an IllegalStateException will be thrown. Otherwise if there is an existing TO recipient on the
   * email it will be replace with the given argument value.
   */
  public property set TO(recipient : String)
  {
    var address = new InternetAddress(recipient, false)
    if(_toRecipients.size() > 1){
      throw(new IllegalStateException("Cannot use TO property on message that has more than one TO recipient set on it."))
    }
    else{
      _toRecipients.clear();
      addRecipientInternal(address, _toRecipients)
    }
    return
  }

  /**
   * Adds a single recipient as a To. Attempts to add the same address multiple times is
   * silently ignored. This class maintains the order in which addresses are added but the
   * underlying Javamail implementation might change that.
   *
   * @throws AddressException if the string is not RFC-822ish. See javax.mail.InternetAddress#parse.
   *
   */
  public function addRecipient(recipient : String)
  {
    var address = new InternetAddress(recipient, false)
    addRecipientInternal(address, _toRecipients)
  }

  /**
   * As above but processes the list. This method is atomic. Either all of the email
   * addresses are RFC-822ish, or they are not.
   */
  public function addRecipients(recipients : List<String>)
  {
    addRecipientsInternal(recipients, _toRecipients)
  }

  /**
   * Returns the addresses that are in the CC: header of the message as a list of strings in RFC-822ish format
   */
  public property get CCs() : List<String>
  {
    var retVal = _ccRecipients.map( \ elt -> elt.toString())
    return(retVal)
  }

  /**
   * Adds a single recipient as a CC. Attempts to add the same address multiple times is
   * silently ignored. This class maintains the order in which addresses are added but the
   * underlying Javamail implementation might change that.
   *
   * @throws AddressException if the string is not RFC-822ish. See javax.mail.InternetAddress#parse.
   *
   */
  public function addCC(recipient : String)
  {
    var address = new InternetAddress(recipient, false)
    addRecipientInternal(address, _ccRecipients)
  }

  /**
   * As above but processes the list. This method is atomic. Either all of the email
   * addresses are RFC-822ish, or they are not.
   */
  public function addCCs(recipients : List<String>)
  {
    addRecipientsInternal(recipients, _ccRecipients)
  }

  /**
   * Adds a single recipient as a BCC. Attempts to add the same address multiple times is
   * silently ignored. This class maintains the order in which addresses are added but the
   * underlying Javamail implementation might change that.
   *
   * @throws AddressException if the string is not RFC-822ish. See javax.mail.InternetAddress#parse.
   *
   */
  public function addBCC(recipient : String)
  {
    var address = new InternetAddress(recipient, false)
    addRecipientInternal(address, _bccRecipients)
  }

  /**
   * Returns the addresses that are in the CC: header of the message as a list of strings in RFC-822ish format
   */
  public property get BCCs() : List<String>
  {
    var retVal = _ccRecipients.map( \ elt -> elt.toString())
    return(retVal)
  }

  /**
   * As above but processes the list. This method is atomic. Either all of the email
   * addresses are RFC-822ish, or they are not.
   */
  public function addBCCs(recipients : List<String>)
  {
    addRecipientsInternal(recipients, _bccRecipients)
  }

  private function addRecipientsInternal(recipients : List<String>, destination : List<Address>)
  {
    var addrList = recipients.map( \ elt -> new InternetAddress(elt, false))
    addrList.each( \ elt -> addRecipientInternal(elt, destination))
    return;
  }

  private function addRecipientInternal(recipient : Address, recipients : List<Address>)
  {
    if(recipients.contains(recipient) == false){
      recipients.add(recipient)
    }
    return
  }

  /**
   * Marks the message as read. Note that for messages retrieved from a POP mailbox this
   * has no lasting effect.
  */
  public function isMarkedRead() : boolean
  {
    var retVal = false
    if(Basis != null){
      retVal = Basis.Flags.SystemFlags.where( \ elt -> elt == Flags.Flag.SEEN).length != 0;
    }
    return(retVal)
  }

  /**
   * Marks a message deleted. The message will not show up in further requests to it's containing folder.
   */
  public function delete()
  {
    if(Basis != null){
      setFlag(Flags.Flag.DELETED, true)
    }
    else{
      throw(new IllegalStateException("Cannot delete a message that is not on the server"))
    }
    return
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
      setFlag(Flags.Flag.SEEN, true)
    }
    else{
      throw(new IllegalStateException("Cannot mark a message that has not yet been sent."))
    }
  }
  
  private function setFlag(flag : Flags.Flag, state : boolean)
  {
    if(Basis.Folder.Open == true){
      Basis.Folder.close(true)
    }
    Basis.Folder.open(Folder.READ_WRITE)
    Basis.setFlag(flag, state)
    Basis.Folder.close(true)
    Basis.Folder.open(Folder.READ_ONLY)
    return
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
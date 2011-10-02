package romail

uses gw.util.GosuExceptionUtil

uses javax.mail.internet.AddressException
uses javax.mail.internet.InternetAddress
uses java.io.File
uses java.util.ArrayList
uses java.util.List
uses java.lang.StringBuilder
uses javax.mail.Message

class Email {

  internal var _from : InternetAddress
  internal var _to : List<InternetAddress> = new ArrayList<InternetAddress>()
  internal var _cc : List<InternetAddress> = new ArrayList<InternetAddress>()
  internal var _bcc : List<InternetAddress> = new ArrayList<InternetAddress>()
  internal var _fileAttachments : List<File> = new ArrayList<File>()
  var _subject : String as Subject = ""
  var _text : String as Text = "" 
  var _html : String as HTML = "" 
  var _server : Server as Server = Server.Base
  
  construct(){}
  
  internal construct(m : Message) {
    _from = m.From?.first() as InternetAddress
    _to = m.getRecipients( Message.RecipientType.TO )?.whereTypeIs( InternetAddress )?.toList()
    _cc = m.getRecipients( Message.RecipientType.CC )?.whereTypeIs( InternetAddress )?.toList()
    _bcc = m.getRecipients( Message.RecipientType.BCC )?.whereTypeIs( InternetAddress )?.toList()
    Subject = m.Subject
    Text = m.Content?.toString() // obviously wrong!
  }

  property set From(s : String) {
    _from = parseEmail(s)
  }

  property get From() : String {
    return serializeAddr(_from)
  }

  property set To(s : String) {
    _to = { parseEmail(s) }
  }

  property get To() : String {
    return serializeAddrs(_to)
  }

  function addTo(s : String) {
    _to.add(parseEmail(s))
  }

  function addTo(email : String, name : String) {
    _to.add(new InternetAddress(email, name))
  }

  property set CC(s : String) {
    _cc = { parseEmail(s) }
  }

  property get CC() : String {
    return serializeAddrs(_cc)
  }

  function addCC(s : String) {
    _cc.add(parseEmail(s))
  }

  function addCC(email : String, name : String) {
    _cc.add(new InternetAddress(email, name))
  }

  property set BCC(s : String) {
    _bcc = { parseEmail(s) }
  }

  property get BCC() : String {
    return serializeAddrs(_bcc)
  }

  function addBCC(s : String) {
    _bcc.add(parseEmail(s))
  }

  function addBCC(email : String, name : String) {
    _bcc.add(new InternetAddress(email, name))
  }

  internal static function parseEmail(email : String) : InternetAddress {
    return new InternetAddress(email)
  }
  
  private function serializeAddrs(emails : List<InternetAddress>) : String {
    var sb = new StringBuilder()
    for( e in emails index i) {
      if(i != 0) {
         sb.append( ", " )
      }
      sb.append(serializeAddr(e))
    }
    return sb.toString()
  }
  
  private function serializeAddr(e : InternetAddress) : String {
    if(e.Personal != null) {
      return '"${e.Personal}" <${e.Address}>"'
    } else {
       return '${e.Address}"'
   }
  }

  function attach(f : File) {
    _fileAttachments.add(f)
  }
  
  function send() {
    _server.sendEmail(this)
  }

  function delete() {
    //TODO implement?
  }

  function reply() : Email {
    return null //TODO cgross implement
  }

  function forwardTo(address : String) : Email {
    return  null //TODO cgross implement
  }
}
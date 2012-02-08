package romail

uses java.net.Inet4Address
uses java.net.InetAddress
uses java.util.Properties
uses javax.mail.Session
uses javax.mail.Authenticator
uses javax.mail.PasswordAuthentication
uses javax.mail.Transport
uses javax.mail.Message
uses javax.mail.internet.MimeMessage
uses javax.mail.internet.InternetAddress
uses javax.mail.Message.RecipientType

/**
 * The basis for email accounts. Accounts are presumed here to be either Pop or IMAP type accounts. This
 * class just holds the stuff that's common to both
 */
abstract class Account {
  var _fullName: String as FullName
  var _emailAddress: String as EmailAddress
  var _userName: String as UserName
  var _password: String as Password

  var _outboundServer : OutboundSMTP as OutBoundSMTPServer

  construct(outboundServer : OutboundSMTP)
  {
    _outboundServer = outboundServer
    return
  }

  public function send(email: EmailMessage)
  {
    _outboundServer.sendEmail(email)
    return
  }

  /**
   * Returns an EmailFolder that represents the accounts Inbox. Both IMAP and POP servers
   * have the concept of a mailbox called Inbox. IMAP allows for other mailboxes.
   */
  abstract public property get Inbox() : EmailFolder

}
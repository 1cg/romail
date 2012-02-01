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
  // Incoming and outgoing servers. Out going is of course always an SMTP
  // server...
  var _incomingServer: String as IncomingServer
  var _outgoingServer: String as OutgoingSMTPServer
  var _userName: String as UserName
  var _password: String as Password

  abstract public function send(email: Email)
}
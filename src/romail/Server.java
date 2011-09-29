package romail;

import gw.util.GosuExceptionUtil;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class Server {

  public static Server Default = new Server();

  private String _SMTPProtocol = "smtps";
  private String _SMTPUrl = "";
  private String _IMAPUrl = "";
  private String _userName = "";
  private String _password = "";

  public String getSMTPProtocol() {
    return _SMTPProtocol;
  }

  public void setSMTPProtocol(String SMTPProtocol) {
    _SMTPProtocol = SMTPProtocol;
  }

  public String getSMTPUrl() {
    return _SMTPUrl;
  }

  public void setSMTPUrl(String SMTPUrl) {
    _SMTPUrl = SMTPUrl;
  }

  public String getIMAPUrl() {
    return _IMAPUrl;
  }

  public void setIMAPUrl(String IMAPUrl) {
    _IMAPUrl = IMAPUrl;
  }

  public String getUserName() {
    return _userName;
  }

  public void setUserName(String userName) {
    _userName = userName;
  }

  public String getPassword() {
    return _password;
  }

  public void setPassword(String password) {
    _password = password;
  }

  public void sendEmail(Email email) {
    if (_SMTPUrl.equals("")) {
      throw new IllegalStateException("Need to set a URL for the email server!");
    }
    try {
      Properties props = new Properties();
      Session session = Session.getInstance(props, null);
      Message msg = new MimeMessage(session);
      for (InternetAddress to : email._to) {
        msg.addRecipient(Message.RecipientType.TO, to);
      }

      for (InternetAddress cc : email._cc) {
        msg.addRecipient(Message.RecipientType.CC, cc);
      }

      for (InternetAddress bcc : email._bcc) {
        msg.addRecipient(Message.RecipientType.BCC, bcc);
      }

      msg.setSubject(email.getSubject());

      msg.setText(email.getText());

      msg.setFrom(email._from);
      msg.saveChanges();
      Transport tr = session.getTransport(_SMTPProtocol);
      tr.connect(_SMTPUrl, _userName, _password);
      tr.sendMessage(msg, msg.getAllRecipients());
      tr.close();
    } catch (Exception e) {
      throw GosuExceptionUtil.forceThrow(e);
    }
  }

  public void follow(String inbox, Protocol protocol, OnMailCallback onMailCallback) {
    //TODO implement
  }

  public interface OnMailCallback {
  }
  public enum Protocol {
    POP,
    IMAP
  }
}

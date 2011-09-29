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

  private SendProtocol _sendProtocol = SendProtocol.SMTPS;
  private FetchProtocol _fetchProtocol = FetchProtocol.IMAPS;
  private String _sendServer = "";
  private String _fetchServer = "";
  private String _userName = "";
  private String _password = "";

  public SendProtocol getSendProtocol() {
    return _sendProtocol;
  }

  public void setSendProtocol(SendProtocol sendProtocol) {
    _sendProtocol = sendProtocol;
  }

  public String getSendServer() {
    return _sendServer;
  }

  public void setSendServer(String url) {
    _sendServer = url;
  }

  public String getFetchServer() {
    return _fetchServer;
  }

  public void setFetchServer(String url) {
    _fetchServer = url;
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
    if (_sendServer.equals("")) {
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
      Transport tr = session.getTransport(_sendProtocol.getCode());
      tr.connect(_sendServer, _userName, _password);
      tr.sendMessage(msg, msg.getAllRecipients());
      tr.close();
    } catch (Exception e) {
      throw GosuExceptionUtil.forceThrow(e);
    }
  }

  public EmailFolder folder(String inbox) {
    return null;
  }

  public EmailFolder getInbox() {
    return folder("INBOX");
  }

  public enum FetchProtocol {
    POP("pop3"),
    IMAP("imap"),
    IMAPS("imap");

    private String _code;

    private FetchProtocol(String code) {
      _code = code;
    }

    public String getCode() {
      return _code;
    }
  }

  public enum SendProtocol {
    SMTP("smtp"),
    SMTPS("smtps");

    private String _code;

    private SendProtocol(String code) {
      _code = code;
    }

    public String getCode() {
      return _code;
    }
  }
}

package romail;

import gw.util.GosuExceptionUtil;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class Email {

  InternetAddress _from = null;
  List<InternetAddress> _to = new ArrayList<InternetAddress>();
  List<InternetAddress> _cc = new ArrayList<InternetAddress>();
  List<InternetAddress> _bcc = new ArrayList<InternetAddress>();
  private List<File> _fileAttachments = new ArrayList<File>();
  private String _subject = "";
  private String _text = "";
  private String _html = "";
  private Server _server = Server.Default;

  public void setFrom(String from) {
    _from = parseEmail(from);
  }

  public void setTo(String to) {
    _to.add(parseEmail(to));
  }

  public void addTo(String email) {
    _to.add(parseEmail(email));
  }

  public void addTo(String email, String name) {
    try {
      _to.add(new InternetAddress(email, name));
    } catch (Exception e) {
      throw GosuExceptionUtil.forceThrow(e);
    }
  }

  public void setCC(String cc) {
    _cc.add(parseEmail(cc));
  }

  public void addCC(String email) {
    _cc.add(parseEmail(email));
  }

  public void addCC(String email, String name) {
    try {
      _cc.add(new InternetAddress(email, name));
    } catch (Exception e) {
      throw GosuExceptionUtil.forceThrow(e);
    }
  }

  public void setBCC(String bcc) {
    _bcc.add(parseEmail(bcc));
  }

  public void addBCC(String email) {
    _bcc.add(parseEmail(email));
  }

  public void addBCC(String email, String name) {
    try {
      _bcc.add(new InternetAddress(email, name));
    } catch (Exception e) {
      throw GosuExceptionUtil.forceThrow(e);
    }
  }

  private InternetAddress parseEmail(String to) {
    try {
      return new InternetAddress(to);
    } catch (AddressException e) {
      throw GosuExceptionUtil.forceThrow(e);
    }
  }

  public void setSubject(String subject) {
    _subject = subject;
  }

  public void setText(String text) {
    _text = text;
  }

  public void setHTML(String html) {
    _html = html;
  }

  public void attach(File f) {
    _fileAttachments.add(f);
  }
  
  public void send() {
    _server.sendEmail(this);
  }

  public String getSubject() {
    return _subject;
  }

  public String getText() {
    return _text;
  }

  public void delete() {
    //TODO implement?
  }

  public Email reply() {
    return null; //TODO cgross implement
  }

  public Email forwardTo(String address) {
    return  null; //TODO cgross implement
  }
}
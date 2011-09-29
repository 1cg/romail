package romail;

public class Scratch {
  public static void main(String[] args) {


//    Server.Default.setDefaultFrom("test@test.com");
    Server.Default.setSMTPUrl("smtp.gmail.com");
    Server.Default.setIMAPUrl("imap.gmail.com");
    Server.Default.setUserName("joker@gmail.com");
    Server.Default.setPassword("joker");
    /*
      Gosu:

    Server.Default.SMTPUrl = "smtp.gmail.com"
    Server.Default.IMAPUrl = "imap.gmail.com"
    Server.Default.UserName = "joker@gmail.com"
    Server.Default.Password = "joker"

     */

    Server.Default.follow("INBOX", Server.Protocol.IMAP, new Server.OnMailCallback() {
      public void onMail(Email mail) {
        String content = mail.getText();

        if (content.startsWith("Hello!")) {
          Email reply = mail.reply();
          reply.setText("Thanks!");
          reply.send();

          Email forward = mail.forwardTo("example@example.com");
          forward.send();
        }
        mail.delete();
      }
    });
    /*
      Gosu:

      Server.Default.follow( "INBOX", IMAP,  \ mail -> {
        var content = mail.Text
        if (content.startsWith("Hello!")) {
          var reply = mail.reply()
          reply.Text = "Thanks!"
          reply.send()

          var forward = mail.forwardTo("example@example.com")
          forward.send()
        }
        mail.delete()
      }

     */

    Email mail = new Email();
    mail.setFrom("test@gmail.com");
    mail.setTo("test@gmail.com");
    mail.setSubject("Test");
    mail.setText("Hello");
    mail.send();
    /*
      Gosu:

      var mail = new Email() {
        :From = "carsongross@gmail.com",
        :To = "carsongross@gmail.com",
        :Subject = "Test",
        :Text = "Hello"
      }
      mail.send()
     */

  }
}

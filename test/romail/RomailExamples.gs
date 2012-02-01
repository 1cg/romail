package romail
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/23/12
 * Time: 3:40 PM
 * To change this template use File | Settings | File Templates.
 */
class RomailExamples {
  
  public function examples()
  {
    GmailIMAPAccount gmailAccount = new GMailIMAPAccount(){
    :FullName("Rick Kitts"),
    :EmailAddress("from@gmail.com"),
    :Password("somepassword")
  }
    
    var email = new Email()
    email.Subject = "My Subject"
    email.To = "rkitts@loudhouse.org"
    email.Text = "Hey there!"
    
    gmailAccount.sendEmail(email)
    email.send(gmailAccount)
    
    
    var emails = gmailAccount.NewMail

    
    
  }
  

}
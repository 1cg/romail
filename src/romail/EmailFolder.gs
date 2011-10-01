package romail

uses java.util.List

class EmailFolder {
  
  var _server : Server
  var _name : String as Name
  
  construct( server : Server, folderName : String ) {
    _server = server
    _name = folderName
  }

  function follow(callback : block(Email)) {

  }

  property get AllMessages() : List<Email> {
    return _server.getAllMessages( this )
  }

  property get UnreadMessages() : List<Email> {
    return _server.getUnreadMessages( this )
  }

  function deleteAllMessages() {
    
  }

}

package romail

uses java.util.List
uses java.util.Timer
uses java.util.concurrent.ScheduledExecutorService
uses java.util.concurrent.Executors
uses java.lang.Runnable

class EmailFolder {
  
  var _server : Server
  var _name : String as Name
  var _listener : block(Email) as readonly Listener

  static var SCHEDULER = Executors.newScheduledThreadPool(1)
  
  construct( server : Server, folderName : String ) {
    _server = server
    _name = folderName
  }

  function follow(callback : block(Email)) {
    //TODO verify that there are no existing followers
    _listener = callback
    SCHEDULER.scheduleAtFixedRate( \-> processNewMessages(), 0, 60, SECONDS )
  }
  
  function processNewMessages() {
    _server.processNewMessages( this )
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

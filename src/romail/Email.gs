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
    var _to : String as To
    var _from : String as From
    var _subject : String as Subject
    var _text : String as Text
}
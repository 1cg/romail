package romail

uses junit.framework.TestCase

class RomailTest extends TestCase {

  function testSomething() {
    var em = new Email()
    em.To = "foo@bar.com"
    assertEquals("foo@bar.com\"", em.To) //why?
  }

}
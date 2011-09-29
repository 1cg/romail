uses java.io.File
uses java.lang.System
uses gw.vark.Aardvark
uses org.apache.tools.ant.types.Path

//=======================================================================
// Change to gosu distro home 
//=======================================================================

var ghVar = System.getenv( "GOSU_HOME" )
if(ghVar == null) {
  Ant.fail( :message = "Please define the GOSU_HOME system variable" )
}
var gosuHome = file( ghVar )

//=======================================================================
// 
//=======================================================================

var src = file( "src" )
var lib = file( "lib" )
var test = file( "test" )
var build = file( "build" )

function deps() {
  Ivy.configure(:file = file("ivy-settings.xml"))
  Ivy.retrieve(:sync = true, :log = "download-only")
}

function clean() {
  build.deleteRecursively()
}

@Depends({"deps"})
function build() {
  var classesDir = build.file( "classes" )
  classesDir.mkdirs()
  Ant.javac( :srcdir = path(src),
             :destdir = classesDir,
             :classpath = classpath(lib.fileset()),
             :debug = true,
             :includeantruntime = false)
  Ant.copy( :filesetList = {src.fileset( :excludes = "**/*.java") },
            :todir = classesDir )
  Ant.jar( :destfile = build.file( "romail.jar" ), 
           :basedir = classesDir )
}

@Depends( {"build"} )
function buildTest() {
  var classesDir = build.file( "test" )
  classesDir.mkdirs()
  Ant.javac( :srcdir = path(src),
             :destdir = classesDir,
             :classpath = classpath(lib.fileset()),
             :debug = true,
             :includeantruntime = false)
}

@Depends({"buildTest"})
@Target
function test() {
  var cp = classpath(lib.fileset())
             .withFile(build.file("romail.jar"))
             .withFile(build.file("test"))
  Ant.java(:classpath=cp,
           :classname="ronin.TestScanner",
           :fork=true,
           :failonerror=true,
           :args=build.file("test").AbsolutePath)
}

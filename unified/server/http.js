var express = require('express');
var fs = require('fs');
var app = express();

// settings
var FILE_ENCODING = 'utf-8', EOL = '\n';

// setup
var _fs = require('fs');

function concat(opts) {
	var fileList = opts.src;
	var distPath = opts.dest;
	var out = fileList.map(function(filePath) {
		return _fs.readFileSync(filePath, FILE_ENCODING);
	});
	_fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
	console.log(' ' + distPath + ' built.');
}

concat({
	src : [__dirname + "/htdocs/js/lib/jquery-1.8.1.min.js", __dirname + "/htdocs/js/lib/MathGL.js", __dirname + "/htdocs/js/lib/GLUtil.js", __dirname + "/htdocs/js/lib/ModelGL.js", __dirname + "/htdocs/js/lib/TextGL.js", __dirname + "/htdocs/js/lib/CameraGL.js", __dirname + "/htdocs/js/RedditGL-Main.js", __dirname + "/htdocs/js/RedditGL-Render.js", __dirname + "/htdocs/js/RedditGL-Service.js"],
	dest : __dirname + "/htdocs/js/super.js"
});

app.get('/', function(req, res) {
	fs.readFile(__dirname + '/htdocs/index.html', 'utf8', function(err, text) {
		res.send(text);
	});
});
app.use(express.directory(__dirname + '/htdocs'));
app.use(express.static(__dirname + '/htdocs'));

app.listen(3000); 
/*
 * William Miller 2012
 */
var AlphabetGL = [
	'!','#','$','&',
	'(',')','+','.',
	'0','1','2','3',
	'4','5','6','7',
	'8','9','<','>',
	'?','@','A','B',
	'C','D','E','F',
	'G','H','I','J',
	'K','L','M','N',
	'O','P','Q','R',
	'S','T','U','V',
	'W','X','Y','Z',
];

function getCharIndex (aChar) {
	for(var i in AlphabetGL) {
		var object = RedditMain.scene.sceneObjects[i];
		if(object.name == aChar) {
			return object;
		}
	}
	
	return null;
};

var TextGL = function() 
{
	this.wordCount = 0;
};

// Load up at least one instance of every character
TextGL.prototype.initAlphabet = function(callback) 
{
	if(!callback) {callback = this.CharacterCallback;}
	var path = "root/models/FontHappyMonkey/FontHappyMonkey_0";
	
	redditGL_LOG("Initiating TextGL Alphabet");
	redditGL_LOG("Initiating TextGL Alphabet Count: " + AlphabetGL.length);
	
	for(var i in AlphabetGL) {
		var aChar = AlphabetGL[i];
		initBufferObject(gl, "model", path + aChar.charCodeAt() + ".json", null, callback, this);
	}
};

// Default callback
TextGL.prototype.CharacterCallback = function(model, ref) 
{	
	addObjectInstance(model, 1);
	setObjectInstanceScale(model.instances[0], 1.0);
	var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  	position = [Math.random() * 10 * plusOrMinus, Math.random() * 2 * plusOrMinus, Math.random() * 10 * plusOrMinus];
  	setObjectInstancePosition(model.instances[0], position);
  	setObjectInstanceSpeed(model.instances[0], 0.1);
  	model.loaded = true;
	
  	RedditMain.addObject(model);
};	

TextGL.prototype.addWord = function(txt) 
{
	for(var i in txt) {
		var aChar = txt[i];
		aChar = aChar.toUpperCase();
		
	}
};

TextGL.prototype.createCharInstance = function(aChar, count) 
{	
	var object = getCharIndex(aChar);
	if(count) {
		addObjectInstance(object, count);
		var u = object.instanceCount;
		for(var i = 0; i < count; i++) {
			setObjectInstanceScale(object.instances[i + u], 1.0);
  			setObjectInstancePosition(object.instances[i + u], vec3.create());
  			setObjectInstanceSpeed(object.instances[i + u], 0.1);	
  		}	
	}
	else {
		addObjectInstance(object, count);
		var u = object.instanceCount;
		addObjectInstance(object, 1);
		setObjectInstanceScale(object.instances[i + u], 1.0);
  		setObjectInstancePosition(object.instances[i + u], vec3.create());
  		setObjectInstanceSpeed(object.instances[i + u], 0.1);
	}	
};
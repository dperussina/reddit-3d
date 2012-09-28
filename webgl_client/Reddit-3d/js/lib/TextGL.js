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
	for(var i in RedditMain.scene.sceneObjects) {
		var object = RedditMain.scene.sceneObjects[i];
		if(object.name == aChar) {
			return object;
		}
	}
	
	return null;
};

// Load up at least one instance of every character
function initAlphabet (callback) 
{
	if(!callback) {callback = CharacterCallback;}
	var path = "root/models/FontHappyMonkey/FontHappyMonkey_0";
	
	redditGL_LOG("Initiating TextGL Alphabet");
	redditGL_LOG("Initiating TextGL Alphabet Count: " + AlphabetGL.length);
	
	for(var i in AlphabetGL) {
		var aChar = AlphabetGL[i];
		var completePath = path + aChar.charCodeAt() + ".json";
		initBufferObject(gl, "model", completePath, null, callback);
	}
};

// Default callback
function CharacterCallback (model) 
{	
	
	addObjectInstance(model, 1);
	var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  	position = [Math.random() * 10 * plusOrMinus, Math.random() * 2 * plusOrMinus, Math.random() * 10 * plusOrMinus];
  	setObjectInstancePosition(model.instances[0], position);
  	setObjectInstanceScale(model.instances[0], 1.0);
  	setObjectInstanceSpeed(model.instances[0], 0.1);
  	model.loaded = true;
  	RedditMain.addObject(model);
};	

function addWord (txt, objectType, index) 
{
	var sceneObjects = RedditMain.scene.sceneObjects;
	for(var i in sceneObjects) {
		var object = sceneObjects[i];
		if(object.name == objectType) {
			var objectInstance = object.instances[index];
			var space = 0.5;
			var vPos = vec3.create(objectInstance.position);
			vPos[1] += 2.0;
			// Adjust for object to attach to
			vPos[0]	*= 	objectInstance.scale;
			vPos[1]	*= 	objectInstance.scale;
			vPos[2]	*= 	objectInstance.scale;
			
			var vRot = vec3.create(objectInstance.rotation);
			var fSpeed = objectInstance.speed;
			
			for(var j in txt) {
				var aChar = txt[j];
				aChar = aChar.toUpperCase();
				console.log(aChar);
				createCharInstance(aChar, vPos, vRot, fSpeed);
				vPos[0] += space;
			}		
		}
	}
};

function createCharInstance (aChar, vPos, vRot, fSpeed, count) 
{	
	var object = getCharIndex(aChar);
	console.log(object);
	var u = object.instanceCount;
	if(count) {
		addObjectInstance(object, count);
		for(var i = 0; i < count; i++) {
			setObjectInstanceRotation(object.instances[i + u], vRot);
			setObjectInstancePosition(object.instances[i + u], vPos);
			setObjectInstanceScale(object.instances[i + u], 2.0);			
  			setObjectInstanceSpeed(object.instances[i + u], 0.1);	
  		}	
	}
	else {
		addObjectInstance(object, 1);
		setObjectInstanceRotation(object.instances[0 + u], vRot);
		setObjectInstancePosition(object.instances[0 + u], vPos);
		setObjectInstanceScale(object.instances[0 + u], 2.0);
  		setObjectInstanceSpeed(object.instances[0 + u], 0.1);
	}	
};
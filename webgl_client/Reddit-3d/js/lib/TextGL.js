/*
 * William Miller 2012
 */
var AlphabetGL = 
[
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

function getCharIndex (aChar) 
{
	var sceneObjects=RedditMain.scene.sceneObjects
	var n=sceneObjects.length;
	var k=n;
	do
	{
		var i=k-n;
		var object=sceneObjects[i];
		if(object.name == aChar) {return object;}
	}
	while(--n);
	
	return null;
};

// Load up at least one instance of every character
function initAlphabet (callback) 
{
	if(!callback) {callback=CharacterCallback;}
	var path="root/models/FontHappyMonkey/FontHappyMonkey_0";
	
	RedditGL_LOG("Initiating TextGL Alphabet");
	RedditGL_LOG("Initiating TextGL Alphabet Count: "+AlphabetGL.length);
	
	for(var i in AlphabetGL) 
	{
		var aChar=AlphabetGL[i];
		var completePath=path+aChar.charCodeAt()+".json";
		initBufferObject(gl,"model",completePath,null,callback);
	}
};

// Default callback
function CharacterCallback (model) 
{	
  	model.loaded = true;
  	RedditMain.addObject(model);
};	

function addWord (txt, objectName, index) 
{
	var sceneObjects=RedditMain.scene.sceneObjects;
	var n=sceneObjects.length;
	var k=n;
	do 
	{
		var i=k-n
		var object=sceneObjects[i];
		if(objectName==object.name)
		{
			var objectInstance=object.instances[index];
			var txtSize=2.0;
			var space=0.5;
			var vPos=vec3.create(objectInstance.position);
			vPos[0]-=(space*1.9*txt.length)/2;
				
			vPos[1]+=2.5;
			// Adjust for object to attach to
			vPos[0]*=objectInstance.scale/txtSize;
			vPos[1]*=objectInstance.scale/txtSize;
			vPos[2]*=objectInstance.scale/txtSize;
				
			var vRot=vec3.create(objectInstance.rotation);
			var fSpeed=objectInstance.speed;
				
			var nn=txt.length;
			var kk=nn;
			do
			{
				var ii=kk-nn;	
				var aChar=txt[ii];
				aChar=aChar.toUpperCase();
				var isChar = false;
				for(var tt = 0; tt < AlphabetGL.length; tt++) 
				{
					if(aChar == AlphabetGL[tt])
					{
						isChar = true;
					}
				}
				if(aChar != " " && isChar == true)
				{
					createCharInstance(aChar,vPos,vRot,fSpeed,txtSize);	
				}
				vPos[0]=vPos[0]+space;
			}
			while(--nn);	
		}
	}
	while(--n);
};

function createCharInstance (aChar, vPos, vRot, fSpeed, fSize, count) 
{	
	var object=getCharIndex(aChar);
	var u=object.instanceCount;
	if(count)
	{
		addObjectInstance(object,count);
		for(var i=0;i<count;i++) 
		{
			setObjectInstanceRotation(object.instances[i+u],vRot);
			setObjectInstancePosition(object.instances[i+u],vPos);
			setObjectInstanceScale(object.instances[i+u],fSize);			
  			setObjectInstanceSpeed(object.instances[i+u],fSpeed);	
  		}	
	}
	else 
	{
		addObjectInstance(object);
		setObjectInstanceRotation(object.instances[0+u],vRot);
		setObjectInstancePosition(object.instances[0+u],vPos);
		setObjectInstanceScale(object.instances[0+u],fSize);
  		setObjectInstanceSpeed(object.instances[0+u],fSpeed);
	}	
};
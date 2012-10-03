<!DOCTYPE  html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<title>Reddit-3D</title>
		
		<?php 
		static $stylescss = array(
			"css/base.css",
		);
		
		foreach ($stylescss as $css) {
			echo ("<link href=\"$css\" media=\"all\"  rel=\"stylesheet\"  type=\"text/css\" />\n");
		}
		
		static $javascrips = array(
			"js/RedditGL-Main.js",
			"js/RedditGL-Render.js",
			"js/RedditGL-Service.js",
			"js/lib/GLUtil.js",
			"js/lib/CameraGL.js",
			"js/lib/ModelGL.js",
			"js/lib/TextGL.js",		
			"js/lib/MathGL.js",
			"js/lib/jquery-1.8.1.min.js",
		);
		
		foreach ($javascrips as $javascrip) {
			echo ("\n<script src=\"$javascrip\" type=\"text/javascript\"></script>\n");
		}		 
		?>
		
		<script id="shader-vs" type="x-shader/x-vertex">
		    attribute vec3 aVertexPosition;
		    attribute vec2 aTextureCoord;
		
			uniform mat4 uViewMatrix;
		    uniform mat4 uMVMatrix;
		    uniform mat4 uPMatrix;
		
		    varying vec2 vTextureCoord;
		
		
		    void main(void) 
		    {
		    	mat4 modelViewMat=uViewMatrix*uMVMatrix;    

        		vec4 vPosition=modelViewMat*vec4(aVertexPosition,1.0);
        		gl_Position=uPMatrix*vPosition;
		        vTextureCoord=aTextureCoord;
		    }
		</script>
		
		<script id="shader-fs" type="x-shader/x-fragment">
    		precision mediump float;

    		varying vec2 vTextureCoord;

    		uniform sampler2D uSampler;

    		void main(void) 
    		{
        		gl_FragColor=texture2D(uSampler,vec2(vTextureCoord.s,vTextureCoord.t));
    		}
		</script>
		
		<script id="shaderColor-vs" type="x-shader/x-vertex">
		    attribute vec3 aVertexPosition;
		    attribute vec4 aColor;
		
			uniform mat4 uViewMatrix;
		    uniform mat4 uMVMatrix;
		    uniform mat4 uPMatrix;
		
		    varying vec4 vColor;
		
		    void main(void) 
		    {
		    	mat4 modelViewMat=uViewMatrix*uMVMatrix;    

        		vec4 vPosition = modelViewMat*vec4(aVertexPosition,1.0);
        		gl_Position = uPMatrix*vPosition;
		        vColor=aColor;
		    }
		</script>
		
		<script id="shaderColor-fs" type="x-shader/x-fragment">
    		precision mediump float;

    		varying vec4 vColor;

    		void main(void) {
        		gl_FragColor=vColor;
    		}
		</script>

		<script type="text/javascript">
		var RedditMain;
		
		function init() {
			RedditMain=new RedditGL();
			RedditMain.init();
		};
		
		</script>
	</head>
	
	<body onload="init()">
		
		<div class="FrameGL">
			
			<canvas id="webglCanvas"  width ="900" height ="555"></canvas>
			
		</div>
		
		<p style="text-align: center;"><h1>Reddit-3D Render</h1></p>
	</body>
	
</html>
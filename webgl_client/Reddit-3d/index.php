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
			"js/RedditGLMain.js",
			"js/RedditGL-Render.js",
			"js/lib/camera.js",
			"js/lib/GLUtil.js",
			"js/lib/MathGL.js",
			"js/lib/jquery-1.8.1.min.js",
		);
		
		foreach ($javascrips as $javascrip) {
			echo ("<script src=\"$javascrip\" type=\"text/javascript\"></script>\n");
		}		 
		?>
		
		<script id="shader-vs" type="x-shader/x-vertex">
		    attribute vec3 aVertexPosition;
		    attribute vec2 aTextureCoord;
		
			uniform mat4 uViewMatrix;
		    uniform mat4 uMVMatrix;
		    uniform mat4 uPMatrix;
		
		    varying vec2 vTextureCoord;
		
		
		    void main(void) {
		    	mat4 modelViewMat = uViewMatrix * uMVMatrix;    

        		vec4 vPosition = modelViewMat * vec4(aVertexPosition, 1.0);
        		gl_Position = uPMatrix * vPosition;
		        vTextureCoord = aTextureCoord;
		    }
		</script>
		
		<script id="shader-fs" type="x-shader/x-fragment">
    		precision mediump float;

    		varying vec2 vTextureCoord;

    		uniform sampler2D uSampler;

    		void main(void) {
        		gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    		}
		</script>

		<script type="text/javascript">
		var redditMain;
		
		function init() {
			redditMain = new RedditGL();
			redditMain.init();
		};
		
		</script>
	</head>
	
	<body onload="init()">
		
		<div class="frameGL">
			
			<canvas id="webglCanvas"  width ="900" height ="555"></canvas>
			
		</div>
		
		<p style="text-align: center;">Reddit-3D Render</p>
	</body>
	
</html>
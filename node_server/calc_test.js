var main = (function() {
	console.time('calc-test.js');

	var radi = 90;
	var latitudeBands = 45;
	var longitudeBands = 45;
	var radius = radi;

	var indexData = [];
	var textureCoordData = [];
	var vertexPositionData = [];

	for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
		var theta = latNumber * Math.PI / latitudeBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);

		for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
			var first = (latNumber * (longitudeBands + 1)) + longNumber;
			var second = first + longitudeBands + 1;

			var phi = longNumber * 2 * Math.PI / longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);

			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			var u = 1 - (longNumber / longitudeBands);
			var v = 1 - (latNumber / latitudeBands);

			indexData.push(second);
			indexData.push(second + 1);
			indexData.push(first + 1);
			textureCoordData.push(u);
			textureCoordData.push(v);
			vertexPositionData.push(radius * x);
			vertexPositionData.push(radius * y);
			vertexPositionData.push(radius * z);
		}
	}
	var _obj = {
		indexData : indexData,
		textureCoordData : textureCoordData,
		vertexPositionData : vertexPositionData
	}
	console.log('indexData length : ' + _obj.indexData.length);
	console.log('textureCoordData length : ' + _obj.textureCoordData.length);
	console.log('vertexPositionData length : ' + _obj.vertexPositionData.length);
	var json = JSON.stringify(_obj);
	console.log('Array JSON searlizing complete.')
	console.timeEnd('calc-test.js');
})()


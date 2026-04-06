class WebGL_Interface 
{
    constructor() 
	{
        this.vertexShaderSource = document.getElementById("2dVertexShader").text;
        this.fragmentShaderSource = document.getElementById("2dFragmentShader").text;
        
        this.vertexShader = this.createShader(gl.VERTEX_SHADER, this.vertexShaderSource);
        this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource);
        
        // Link to program
        this.program = this.createProgram(this.vertexShader, this.fragmentShader);
        
        // Setup viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        // Set clear colors (white background)
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);        
        
        // Enable Depth Testing so shapes occlude each other properly
        gl.enable(gl.DEPTH_TEST);
        
		gl.useProgram(this.program);

		var worldLoc = gl.getUniformLocation(this.program, "worldLoc");
		gl.uniform3fv(worldLoc, new Float32Array([0.0, 0.0, 0.0]));
		var worldrot = gl.getUniformLocation(this.program, "worldRot");
		gl.uniform3fv(worldrot, new Float32Array([0.0, 0.0, 0.0]));

		var tempLoc = gl.getUniformLocation(this.program, "n");
		gl.uniform1f(tempLoc, .1);
		tempLoc = gl.getUniformLocation(this.program, "f");
		gl.uniform1f(tempLoc, 500);
		tempLoc = gl.getUniformLocation(this.program, "r");
		gl.uniform1f(tempLoc, 320);
		tempLoc = gl.getUniformLocation(this.program, "t");
		gl.uniform1f(tempLoc, 240);

    }
    
    createShader(type, source) 
	{
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
		{
			return shader;
		}
        
        console.error("Shader Error: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    
    createProgram(vs, fs) 
	{
        var program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) 
		{
			return program;
		}
		
        console.error("Program Error: " + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);  
    }
}
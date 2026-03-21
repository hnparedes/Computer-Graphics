class WebGLInterface
{

    constructor()
    {

        this.canvas = document.getElementById("canvas");
        this.gl = this.canvas.getContext("webgl");

        if(!this.gl)
        {

            alert("WebGL not supported");
            return;

        }
        // Set the viewport to match the 640x400 canvas size
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        const vSource = document.getElementById("2dVertexShader").text;
        const fSource = document.getElementById("2dFragmentShader").text;

        this.program = this.createProgram(vSource, fSource);
        this.gl.useProgram(this.program);

        // Set global reference for the loop
        window.gl = this.gl
    }

    createShader(type, source)
    {

        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        {

            console.error(this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;

    }

    createProgram(vSource, fSource)
    {

        const vShader = this.createShader(this.gl.VERTEX_SHADER, vSource);
        const fShader = this.createShader(this.gl.FRAGMENT_SHADER, fSource);
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vShader);
        this.gl.attachShader(program, fShader);
        this.gl.linkProgram(program);
        return program;

    }

}
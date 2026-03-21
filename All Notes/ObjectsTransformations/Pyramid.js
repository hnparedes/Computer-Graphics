class Pyramid
{

    constructor()
    {

        this.translate = [0, 0, 0];
        this.rot = [0, 0, 0]; // [X, Y, Z]

        // Vertex Positions (x, y, z)
        const top = [0, 0, -0.5];
        const frontLeft = [-0.5, -0.5, 0.5];
        const frontRight = [0.5, -0.5, 0.5];
        const backRight = [0.5, 0.5, 0.5];
        const backLeft = [-0.5, 0.5, 0.5];

        // 4 Faces (Triangles) + 2 Triangles for the Base
        this.vertices = new Float32Array([
            // BOTTOM (Red) - Two triangles to make the square base
            ...frontLeft, 1, 0, 0, ...backRight, 1, 0, 0, ...frontRight, 1, 0, 0,
            ...frontLeft, 1, 0, 0, ...backLeft, 1, 0, 0, ...backRight, 1, 0, 0,

            // SIDE 1 (Blue)
            ...top, 0, 0, 1, ...frontLeft, 0, 0, 1, ...frontRight, 0, 0, 1,
            // SIDE 2 (Yellow)
            ...top, 1, 1, 0, ...frontRight, 1, 1, 0, ...backRight, 1, 1, 0,
            // SIDE 3 (Green)
            ...top, 0, 1, 0, ...backRight, 0, 1, 0, ...backLeft, 0, 1, 0,
            // SIDE 4 (Purple)
            ...top, 0.5, 0, 0.5, ...backLeft, 0.5, 0, 0.5, ...frontLeft, 0.5, 0, 0.5
        ]);

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

    }

    render(program) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        // Attributes
        const positionLoc = gl.getAttribLocation(program, "a_position");
        const colorLoc = gl.getAttribLocation(program, "vert_color");

        gl.enableVertexAttribArray(positionLoc);
        gl.enableVertexAttribArray(colorLoc);

        // 6 floats per vertex (3 pos, 3 color), 4 bytes per float
        gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 6 * 4, 0);
        gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 6 * 4, 3 * 4);

        // Uniforms
        gl.uniform3fv(gl.getUniformLocation(program, "translate"), this.translate);
        gl.uniform3fv(gl.getUniformLocation(program, "rotation"), this.rot);

        gl.drawArrays(gl.TRIANGLES, 0, 18); // 6 triangles * 3 vertices
    }
}
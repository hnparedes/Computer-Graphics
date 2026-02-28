class Vehicle
{
	constructor()
	{
		this.speed = 10;	
	}	
}
class Car extends Vehicle
{
	constructor()
	{
		super();
		this.x =100;
		this.y =100;
	}
	update()
	{
		this.x+=4;
	}
	render()
	{	
			console.log("The speed is "+this.speed);
			ctx.lineJoin = "miter";
			ctx.lineWidth = 3;
			ctx.fillStyle = "#00F"
			ctx.strokeStyle = "#333";
			ctx.beginPath();
			ctx.arc(this.x,this.y,25,0,2*Math.PI,false);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.x-25,this.y+25,15,0,2*Math.PI, false);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(this.x+25,this.y+25,15,0,2*Math.PI, false);	
			ctx.stroke();
	}
	
	
}
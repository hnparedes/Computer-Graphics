//Inheritance!

class Parent
{
	constructor()
	{
		this.name = "Parent";
	}
	PrintName()
	{
		console.log(this.name);
	}
}

class Child extends Parent
{
	constructor()
	{
		//Must call Parent firstChild
		super();
		this.name = "Child";
	}
	
	
}
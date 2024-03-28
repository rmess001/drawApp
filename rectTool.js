function rectangleTool(){
	this.icon = "assets/rect.png"; //Path to line tool image
	this.name = "Rectangle Tool"; //Name of tool

	var startMouseX = -1;	//Initialize startMouseX to -1
	var startMouseY = -1;	//Initialize startMouseY to -1
	var drawing = false;

	var previousMouseState = false;

	this.draw = function(){

		if(mouseIsPressed){
			previousMouseState = mouseIsPressed;
			if(startMouseX == -1){  //Trigger if line was not already being drawn
				startMouseX = mouseX; //X coordinate when mouse is clicked saved to startMouseX
				startMouseY = mouseY; ////Y coordinate when mouse is clicked saved to startMouseX
				drawing = true;  //while the mouse is pressed, the drawing variable is set to true
				loadPixels(); //Stores canvas into pixels array
			}

			else{
				updatePixels();  //Call updatePixels function to update the canvas with pixels stored in pixels array
				rect(startMouseX, startMouseY, mouseX-startMouseX, mouseY-startMouseY); //Draw line from start point to current mouse point
			}

		}

		else if(drawing){  //triggers when the mouse is released after drawing
			drawing = false;   //Update drawing variable to false
			startMouseX = -1;  //Reset startMouseX to -1
			startMouseY = -1;  //Reset startMouseY to -1
		}
		if(previousMouseState != mouseIsPressed) {undoB.storeCanvas(); previousMouseState = false;}
	};


}

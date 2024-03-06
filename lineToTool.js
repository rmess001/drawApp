function LineToTool(){
	this.icon = "assets/lineTo.jpg"; //Path to line tool image
	this.name = "LineTo"; //Name of tool

	var startMouseX = -1;	//Initialize startMouseX to -1
	var startMouseY = -1;	//Initialize startMouseY to -1
	var drawing = false;

	this.draw = function(){

		if(mouseIsPressed){
			if(startMouseX == -1){  //Trigger if line was not already being drawn
				startMouseX = mouseX; //X coordinate when mouse is clicked saved to startMouseX
				startMouseY = mouseY; ////Y coordinate when mouse is clicked saved to startMouseX
				drawing = true;  //while the mouse is pressed, the drawing variable is set to true
				loadPixels(); //Stores canvas into pixels array
			}

			else{
				updatePixels();  //Call updatePixels function to update the canvas with pixels stored in pixels array
				line(startMouseX, startMouseY, mouseX, mouseY); //Draw line from start point to current mouse point
			}

		}

		else if(drawing){  //triggers when the mouse is released after drawing
			drawing = false;   //Update drawing variable to false
			startMouseX = -1;  //Reset startMouseX to -1
			startMouseY = -1;  //Reset startMouseY to -1
		}
	};


}

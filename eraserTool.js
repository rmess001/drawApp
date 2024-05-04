function eraser(){
	this.icon = "assets/eraser.png"; //Path to line tool image
	this.name = "Eraser"; //Name of tool

    var previousMouseX = -1; //Initialize startMouseX to -1 to indicate that a rectangle is not currently being drawn
	var previousMouseY = -1; //Initialize startMouseX to -1 to indicate that a rectangle is not currently being drawn

	var previousMouseState = false;

	this.draw = function(){
        updatePixels();

        if(mouseIsPressed){
			previousMouseState = mouseIsPressed;
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
                stroke(255); //Set stroke to white for eraser
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
                loadPixels();
				stroke(colourP.selectedColour); //Return stroke color to selected palette color
			}
		}
		else{
			previousMouseX = -1; //Reset value for mouse coordinate
			previousMouseY = -1; //Reset value for mouse coordinate
		}
		if(previousMouseState != mouseIsPressed) {undoB.storeCanvas(); previousMouseState = false;} //Store history
    }


}

function undo(){
	this.icon = "assets/undo.png"; //Path to fill tool image

    this.history = []; //Array to store previous canvasses in

    this.initiate = function() {
        sideBarItem = createDiv("<img src='" + this.icon + "'></div>"); //Add element to html
		sideBarItem.class("sideBarItem"); //Add element to html
		sideBarItem.id("undoSideBarItem"); //Add element to html
		sideBarItem.parent("sidebar"); //Add element to html
		sideBarItem.mouseClicked(this.undoClicked); //Trigger undo when element is clicked

        loadPixels();  //load blank canvas into pixels array
        this.history.push(pixels) //Store blank canvas into history
    }
	
    
    let stored = 5 //history will only store previous 5 changes. This variable can be changed to store more canvasses

    this.storeCanvas = function() { //Called from outside this constructor to indicate that canvas should be added sto history
        loadPixels();
        //print("TRIG")
        if (pixels.toString() != this.history[this.history.length - 1].toString()) { //Check if current canvas has changed since previously stored version
            if (this.history.length < stored + 1) {this.history.push(pixels);} //Check to see if history if full
            else {this.history.splice(0, 1); this.history.push(pixels);} //If history is full remove oldest canvas and add current canvas
            //print(this.history)
        }
    }


    this.undoClicked = function() { //Update the canvas with the previous canvas stored in history
        loadPixels();
        let l = undoB.history.length //Store length of history array as variable
        pixels.set(undoB.history[l - 2]); //Update canvas with the previously stored version of the canvas
        undoB.history.splice(l - 1, 1); //Remove the version that is now on the canvas from history.
        updatePixels(); //Update pixels
    }

    this.displayUndoButton = function() {  //Only display undo button if there is history to undo
        if (this.history.length > 1) {sideBarItem.show();} else {sideBarItem.hide();}
        }
}

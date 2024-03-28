function undo(){
	this.icon = "assets/undo.png"; //Path to fill tool image

    this.history = [];

    this.initiate = function() {
        sideBarItem = createDiv("<img src='" + this.icon + "'></div>");
		sideBarItem.class("sideBarItem");
		sideBarItem.id("undoSideBarItem");
		sideBarItem.parent("sidebar");
		sideBarItem.mouseClicked(this.undoClicked);

        loadPixels();  //Store blank canvas into history
        this.history.push(pixels)
    }
	
    //history will only store previous 5 changes
    this.storeCanvas = function() { //Called from outside this constructor
        loadPixels();
        print("TRIG")
        if (pixels.toString() != this.history[this.history.length - 1].toString()) {
            if (this.history.length < 6) {this.history.push(pixels);}
            else {this.history.splice(0, 1); this.history.push(pixels);}
            print(this.history)
        }
    }


    this.undoClicked = function() { //Update the canvas with the previous canvas stored in history
        loadPixels();
        let l = undoB.history.length
        pixels.set(undoB.history[l - 2]);
        undoB.history.splice(l - 1, 1);
        updatePixels();
    }

    this.displayUndoButton = function() {  // Only display if there is history to undo
        if (this.history.length > 1) {sideBarItem.show();} else {sideBarItem.hide();}
        }
}

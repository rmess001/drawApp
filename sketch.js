// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;
var undoB = null;

function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new sprayCan());
	toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new eraser());
	toolbox.addTool(new fillBucket());
	toolbox.addTool(new rectangleTool());
	toolbox.addTool (new BlurTool());
	background(255); //Set canvas to white

	undoB = new undo();
	undoB.initiate(); //Initiate the undoB object
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
	undoB.displayUndoButton(); //Change visibility of the undo button based on if there is history saved to undo
	colourP.updateStroke(); //Update the stroke color to the selected color
}

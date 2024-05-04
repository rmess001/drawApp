function BlurTool() 
{
    this.icon = "assets/blurIcon.jpg";
    this.name = "blur";

    var startPointX = -1;	//Initialize startPointX to -1 to indicate that there is no selection being made
	var startPointY = -1;	//Initialize startPointY to -1 to indicate that there is no selection being made
    var endPointX;
    var endPointY;

    var previousMouseState = false; //Track pressed state of mouse for comparison

    let d = pixelDensity();

    //Blur kernel for convolution
    const kernel = [
        [1/9, 1/9, 1/9,],
        [1/9, 1/9, 1/9,],
        [1/9, 1/9, 1/9]
    ];
    
        this.draw = function(){
            if(mouseIsPressed){
                previousMouseState = mouseIsPressed; //Store mouse state

                if(startPointX == -1){  //Trigger if area was not already being selected
                    startPointX = mouseX; //X coordinate when mouse is clicked saved to startPointX
                    startPointY = mouseY; ////Y coordinate when mouse is clicked saved to startPointX
                }
    
                else{
                    updatePixels();  //Call updatePixels function to update the canvas with pixels stored in pixels array
                    noFill(); //Set no fill for selecting rectangle
                    stroke(0); //set stroke color for selecting rectangle
                    strokeWeight(2); //set stroke weight for selecting rectangle
                    rect(startPointX, startPointY, mouseX-startPointX, mouseY-startPointY); //Draw rect from start point to current mouse point to show blur area
                    stroke(colourP.selectedColour) //reset stroke to selected palette colour
                    fill(colourP.selectedColour) //reset fill to selected palette colour
                }
                
            }
    
            else if(previousMouseState != mouseIsPressed) {  //triggers when the mouse is released after selecting an area to blur
                endPointX = mouseX; //Store X coordinate of blur endpoint
                endPointY = mouseY; //Store Y coordinate of blur endpoint
                setSelectOrigin(); //Correct coordinates so origin is the top left of the selection
                updatePixels(); //Erase rectangle outline

                loadPixels();
                //Begin our loop for every pixel in the section of the canvas that we want to blur
                for (let y = startPointY; y < endPointY; y++) {
                    for (let x = startPointX; x < endPointX; x++) {
                            let c = convolution(x, y, kernel, 3); //Apply convolution to calculate new color
                                pixelSet(x, y, c); //Replace pixel with new color
                        }
                }

                startPointX = -1;  //Reset startPointX to -1
                startPointY = -1;  //Reset startPointY to -1
                undoB.storeCanvas();  //Store modified canvas into history
                previousMouseState = false; //Reset mouse state
            }
        };

    //Function to perform blurring operation using convolution. Takes in a pixel and uses neighboring pixels to determine a new pixel value.
    convolution = function(x, y, matrix, matrixsize) {
        let rTotal = 0.0; //Red total to be used to generate new pixel color
        let gTotal = 0.0; //Green total to be used to generate new pixel color
        let bTotal = 0.0; //Blue total to be used to generate new pixel color
        const offset = Math.floor(matrixsize / 2); //Calculate halfway point of kernel so we can sample pixels around input pixel
        
        for (let i = 0; i < matrixsize; i++) { //Runs through the matrix applying the kernel to each pixel in the area
            for (let j = 0; j < matrixsize; j++) {

            const xLocation = x + i - offset; //Calculates the x coordinate of the pixel
            const yLocation = y + j - offset; //Calculates the y coordinate of the pixel
            let location =  4 * ((yLocation * d) * width * d + (xLocation * d)); //Converts coordinates into index to find pixel in the pixels array
        
            location = constrain(location, 0, pixels.length - 1); //Keep our pixel within the pixels array
        
            //Calculate the convolution using the pixel and the kernel/matrix
            rTotal += pixels[location] * matrix[i][j];
            gTotal += pixels[location + 1] * matrix[i][j];
            bTotal += pixels[location + 2] * matrix[i][j];
            }
        }
        //Make sure RGB value is within 0 through 255
        rTotal = constrain(rTotal, 0, 255);
        gTotal = constrain(gTotal, 0, 255);
        bTotal = constrain(bTotal, 0, 255);
        return color(rTotal, gTotal, bTotal); //Return the resulting color
    }

    //Function to correct coordinates so origin is the top left of the selection
    setSelectOrigin = function() {
        if (startPointX > endPointX) {
            temp = startPointX;
            startPointX = endPointX;
            endPointX = temp;
        }
        if (startPointY > endPointY) {
            temp = startPointY;
            startPointY = endPointY;
            endPointY = temp;
        }
    }

    //Function to change the color of a pixel by directly accessing the pixel array. Takes into account the pixel density
    pixelSet = function(x, y, color) {
        for (let i = 0; i < d; i += 1) {
          for (let j = 0; j < d; j += 1) {
            let index = 4 * ((y * d + j) * width * d + (x * d + i)); //Calculate index of the pixel to change

            pixels[index] = color.levels[0];
            pixels[index + 1] = color.levels[1];
            pixels[index + 2] = color.levels[2];
            pixels[index + 3] = color.levels[3];
          }
        }

        updatePixels();
      }
}
function fillBucket() {
  this.icon = "assets/fill.png"; //Path to fill tool image
  this.name = "Fill Bucket"; //Name of tool

  let previousMouseState = false; //Track pressed state of mouse for comparison

  this.draw = function() {
      if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) { //Only trigger when mouse is pressed on canvas area
        previousMouseState = mouseIsPressed; //Update mouse state
        floodFill(mouseX, mouseY, get(mouseX, mouseY), color(colourP.selectedColour).levels); //Apply floodfill function based on the clicked pixel
      }
      if(previousMouseState != mouseIsPressed) {undoB.storeCanvas(); previousMouseState = false;} //When mouse released and floodfill completed reset mouse variable and store canvas into history
  };

  //Function to perform floodfill based on coordinates, color of coordinate, and new color
  floodFill = function(startX, startY, oColor, nColor) {
      let stack = []; //declare a variabble to be used as a stack for iterative flood fill

      stack.push({x: startX, y: startY}); //Push starting pixel into the stack

      while (stack.length > 0) { //While there are pixels in the stack
          let currentPixel = stack.pop(); //Pop the last pixel from the stack and saves it in variable
          let x = currentPixel.x;
          let y = currentPixel.y;

          if (x < 0 || x > width || y < 0 || y > height) {
              continue; //Skip if out of bounds
          }

          let pixelColor = get(x, y); //If in bounds get the color of the pixel

          if (!colorsMatch(pixelColor, oColor) || colorsMatch(pixelColor, nColor)) {
              continue; //Skip if color doesn't match or already filled
          }

          pixelSet1(x, y, nColor); //Set pixel to the desired floodfill color

          stack.push({x: x + 1, y: y}); //Add pixel to the right to the stack
          stack.push({x: x - 1, y: y}); //Add pixel to the left to the stack
          stack.push({x: x, y: y + 1}); //Add pixel below to the stack
          stack.push({x: x, y: y - 1}); //Add pixel above to the stack
      }
  }

  //Function to check if colors match or not
  colorsMatch = function(color1, color2) {
      for (let i = 0; i < 4; i++) {
          if (color1[i] != color2[i]) { //Check every value of the color
              return false;
          }
      }
      return true;
  }

  //Function to change the color of a pixel by directly accessing the pixel array. Takes into account the pixel density
  pixelSet1 = function(x, y, color) {
    let d = pixelDensity();
          
    // Set the pixel(s) at the center of the canvas black.
    for (let i = 0; i < d; i += 1) {
      for (let j = 0; j < d; j += 1) {
        let index = 4 * ((y * d + j) * width * d + (x * d + i)); //Calculate index of the pixel to change
        pixels[index] = color[0];
        pixels[index + 1] = color[1];
        pixels[index + 2] = color[2];
        pixels[index + 3] = color[3];
      }
    }
    updatePixels();
  }
}

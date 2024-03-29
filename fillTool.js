function fillBucket() {
  this.icon = "assets/fill.png"; //Path to fill tool image
  this.name = "Fill Bucket"; //Name of tool

  let previousMouseState = false;

  this.draw = function() {
      if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        previousMouseState = mouseIsPressed;
        this.floodFill(mouseX, mouseY, get(mouseX, mouseY), color(colourP.selectedColour).levels);
      }
      if(previousMouseState != mouseIsPressed) {undoB.storeCanvas(); previousMouseState = false;}
  };

  this.floodFill = function(startX, startY, oColor, nColor) {
      let stack = []; // Initialize a stack for iterative flood fill

      stack.push({x: startX, y: startY}); // Push starting pixel onto the stack

      while (stack.length > 0) {
          let currentPixel = stack.pop(); // Pop a pixel from the stack
          let x = currentPixel.x;
          let y = currentPixel.y;

          if (x < 0 || x > width || y < 0 || y > height) {
              continue; // Skip if out of bounds
          }

          let pixelColor = get(x, y);

          if (!colorsMatch(pixelColor, oColor) || colorsMatch(pixelColor, nColor)) {
              continue; // Skip if color doesn't match or already filled
          }

          set(x, y, nColor)
          //pixelSet(x, y, nColor);
          updatePixels();

          stack.push({x: x + 1, y: y}); // Right
          stack.push({x: x - 1, y: y}); // Left
          stack.push({x: x, y: y + 1}); // Down
          stack.push({x: x, y: y - 1}); // Up
      }
  }

  colorsMatch = function(color1, color2) {
      for (let i = 0; i < 4; i++) {
          if (color1[i] != color2[i]) {
              return false;
          }
      }
      return true;
  }

  pixelSet = function(x, y, color) {
    for (let i = 0; i < pixelDensity(); i += 1) {
      for (let j = 0; j < pixelDensity(); j += 1) {
        let index = 4 * ((y * pixelDensity() + j) * width * pixelDensity() + (x * pixelDensity() + i));
        pixels[index + 0] = color[0];
        pixels[index + 1] = color[1];
        pixels[index + 2] = color[2];
        pixels[index + 3] = color[3];
      }
    }
  }
}

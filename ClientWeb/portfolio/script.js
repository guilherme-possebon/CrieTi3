function run() {
  let text1 = "o Guilherme Possebon";
  let text2 = "um dev Frontend Junior";
  let currentText = text1;
  let index = 0;
  let adding = true; // Whether we are adding or deleting text

  function updateText() {
    if (adding) {
      if (index < currentText.length) {
        // Add one letter at a time
        document.getElementById("titleSpan").innerHTML = currentText.slice(
          0,
          index + 1
        );
        index++;
        setTimeout(updateText, 200); // Delay between each letter
      } else {
        // Start deleting after the full text is displayed
        adding = false;
        setTimeout(updateText, 200);
      }
    } else {
      if (index > 0) {
        // Remove one letter at a time
        document.getElementById("titleSpan").innerHTML = currentText.slice(
          0,
          index - 1
        );
        index--;
        setTimeout(updateText, 200); // Delay between each letter
      } else {
        // After deleting, switch text and start adding again
        adding = true;
        currentText = currentText === text1 ? text2 : text1;
        setTimeout(updateText, 200);
      }
    }
  }

  updateText(); // Start the loop
}

run();

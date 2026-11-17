// Gallery: shows one artwork at a time.
// Placeholder artworks are solid coloured squares.

var artworks = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6"];
var titles = ["Red", "Blue", "Green", "Yellow", "Purple"];

// If the user just made a drawing, show it first
var userArt = localStorage.getItem("webseumArt");
if (userArt) {
  artworks.unshift(userArt);
  titles.unshift("Your artwork");
}

var current = 0;
var artwork = document.getElementById("artwork");
var title = document.getElementById("artwork-title");

function show() {
  var art = artworks[current];
  if (art.charAt(0) === "#") {
    artwork.style.backgroundImage = "none";
    artwork.style.backgroundColor = art;
  } else {
    artwork.style.backgroundColor = "#ffffff";
    artwork.style.backgroundImage = "url(" + art + ")";
  }
  title.textContent = titles[current] + " (" + (current + 1) + " / " + artworks.length + ")";
}

document.getElementById("prev").addEventListener("click", function () {
  current = (current - 1 + artworks.length) % artworks.length;
  show();
});

document.getElementById("next").addEventListener("click", function () {
  current = (current + 1) % artworks.length;
  show();
});

show();

document.addEventListener('DOMContentLoaded', function() {
  let gameData;
  let score = 0;
  let timer;
  let elapsedTime = 0;
  let differencesFound = 0;

  // Load JSON Data with error handling
  fetch('Difference.json')
    .then(response => response.json())
    .then(data => {
      gameData = data;
      document.getElementById('game-title').textContent = gameData.gameTitle;
      document.getElementById('image1').src = gameData.images.image1;
      document.getElementById('image2').src = gameData.images.image2;
      setupGame();
    })
    .catch(error => {
      console.error('Error loading game data:', error);
    });

  function setupGame() {
    const image2 = document.getElementById('image2');
    const image2Container = document.getElementById('image2-container');
    
    // Timer reset and start
    elapsedTime = 0;
    document.getElementById('timer').textContent = `Time: 0s`;
    clearInterval(timer);
    timer = setInterval(() => {
      elapsedTime++;
      document.getElementById('timer').textContent = `Time: ${elapsedTime}s`;
    }, 1000);

    image2.onload = function() {
      // Set up the differences (using coordinates from JSON)
      gameData.differences.forEach((diff, index) => {
        const diffDiv = document.createElement('div');
        diffDiv.classList.add('difference');
        diffDiv.dataset.index = index;
        diffDiv.style.opacity = 0;

        // Function to position the difference marker based on percentages
        function positionMarkers() {
          const imageWidth = image2Container.offsetWidth;
          const imageHeight = image2Container.offsetHeight;

          const x = (parseFloat(diff.x) / 100) * imageWidth;
          const y = (parseFloat(diff.y) / 100) * imageHeight;
          const width = (parseFloat(diff.width) / 100) * imageWidth;
          const height = (parseFloat(diff.height) / 100) * imageHeight;

          diffDiv.style.left = `${x}px`;
          diffDiv.style.top = `${y}px`;
          diffDiv.style.width = `${width}px`;
          diffDiv.style.height = `${height}px`;
        }

        // Position the markers and add them to the image container
        positionMarkers();
        image2Container.appendChild(diffDiv);

        // Update markers on window resize
        window.addEventListener('resize', positionMarkers);
      });

      // Event listener for clicks on the image2 container
      image2Container.addEventListener('click', function(e) {
        const clickedElement = e.target;

        // Check if the clicked element is a difference marker
        if (clickedElement.classList.contains('difference') && !clickedElement.classList.contains('found')) {
          // Mark the difference as found
          clickedElement.style.opacity = 1;  // Reveal the difference
          clickedElement.classList.add('found');  // Prevent future clicks on this marker
          score++;  // Increase the score
          differencesFound++;

          // Update the score display
          const totalDifferences = gameData.differences.length;
          document.getElementById('score').textContent = `Score: ${Math.min(score, totalDifferences)}`;

          // If all differences are found, stop the timer and show a message
          if (differencesFound === totalDifferences) {
            clearInterval(timer);
            document.getElementById('message').textContent = "Congratulations! You've found all the differences!";
          }
        }
      });
    };
  }
});

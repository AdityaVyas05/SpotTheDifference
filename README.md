# Spot the Difference - Animal Game

## Description
A fun and interactive "Spot the Difference - Animal" game where players need to find the differences between two images. The game configuration, including the images and the locations of the differences, is loaded from a JSON file.

## How to Play
1. Look at the two images side by side.
2. Click on the areas on the right picture where it is different from the left picture.
3. The game keeps track of your time and marks the differences you find.

## How to Run the Game
1. Clone this repository to your local machine.
2. Open the "index.html" file in a web browser.
3. Alternatively, deploy the game on any static hosting platform like Vercel or GitHub Pages.

## How the Game Works
- The game uses a JSON file (Difference.json) to load the images and their respective differences dynamically.
- Each difference is represented by a set of coordinates and dimensions in the JSON file.
- The game checks if the player's click matches any of the predefined differences and highlights them when found.
- It is responsive for mobile devices.

## Technologies Used
- HTML
- CSS
- JavaScript
- JSON for game configuration

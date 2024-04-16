document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch images from the URL and add them to the DOM
    function fetchImages() {
      const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  
      fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
          // Get the container where images will be added
          const dogImageContainer = document.getElementById("dog-image-container");
  
          // Loop through the array of image URLs and create img elements
          data.message.forEach(imageUrl => {
            const img = document.createElement("img");
            img.src = imageUrl;
            // Add the image to the container
            dogImageContainer.appendChild(img);
          });
        })
        .catch(error => console.error("Error fetching images:", error));
    }
  
    // Function to fetch all dog breeds and add them to the page
    function fetchBreeds() {
      const breedUrl = "https://dog.ceo/api/breeds/list/all";
  
      fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
          // Get the <ul> element where breeds will be added
          const dogBreedsList = document.getElementById("dog-breeds");
  
          // Loop through the object containing breeds and sub-breeds
          for (const breed in data.message) {
            // If there are sub-breeds, loop through them as well
            if (data.message[breed].length > 0) {
              data.message[breed].forEach(subBreed => {
                const breedItem = createBreedListItem(`${subBreed} ${breed}`);
                // Add the breed to the list
                dogBreedsList.appendChild(breedItem);
              });
            } else {
              const breedItem = createBreedListItem(breed);
              // Add the breed to the list
              dogBreedsList.appendChild(breedItem);
            }
          }
        })
        .catch(error => console.error("Error fetching breeds:", error));
    }
  
    // Function to create a list item for a breed
    function createBreedListItem(breedName) {
      const breedItem = document.createElement("li");
      breedItem.textContent = breedName;
      // Add event listener to change font color on click
      breedItem.addEventListener("click", function() {
        breedItem.style.color = "blue"; // Change the font color to blue
      });
      return breedItem;
    }
  
    // Function to filter breeds based on the selected letter from the dropdown
    function filterBreedsByLetter(letter) {
      const dogBreedsList = document.getElementById("dog-breeds");
      const breeds = dogBreedsList.getElementsByTagName("li");
  
      // Loop through all breeds and hide/show based on the selected letter
      for (const breed of breeds) {
        const breedText = breed.textContent.toLowerCase();
        if (breedText.startsWith(letter)) {
          breed.style.display = "block"; // Show the breed
        } else {
          breed.style.display = "none"; // Hide the breed
        }
      }
    }
  
    // Event listener for dropdown change to filter breeds
    const breedDropdown = document.getElementById("breed-dropdown");
    breedDropdown.addEventListener("change", function() {
      const selectedLetter = breedDropdown.value;
      filterBreedsByLetter(selectedLetter);
    });
  
    // Call the fetchImages and fetchBreeds functions when the DOM is loaded
    fetchImages();
    fetchBreeds();
  });
  
function getUserProfile() {
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + window.access_token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Update the HTML element with the user profile picture
      const profilePicture = document.getElementById("spot_picture");
      
      // Check if images array is not empty before accessing the URL
      if (data.images && data.images.length > 0) {
        profilePicture.src = data.images[0].url;
      } else {
        // Handle the case where there is no profile picture
        profilePicture.src = "path_to_default_image.jpg"; // Replace with the path to your default image
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
}



getUserProfile();

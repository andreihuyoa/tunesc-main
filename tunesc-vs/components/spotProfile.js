function getUserProfile() {
  // Log the access token for debugging
  console.log("Access Token:", window.access_token);

  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + window.access_token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        // Log the response status and text for debugging
        console.error(`HTTP error! Status: ${response.status}, Text: ${response.statusText}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract the profile picture URL
      const profilePicture = data.images && data.images.length > 0
        ? data.images[0].url
        : "path_to_default_image.jpg"; // Replace with the path to your default image

      // Update the HTML element with the user profile picture
      const profilePictureElement = document.getElementById("spot_picture");
      profilePictureElement.src = profilePicture;
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error.message);
      // Handle the error, e.g., display an error message to the user
    });
}

getUserProfile();

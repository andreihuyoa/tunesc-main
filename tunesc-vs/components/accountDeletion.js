document.getElementById('delete-account-btn').addEventListener('click', function() {
    // Confirm with the user that they want to delete their account
    if (window.confirm("Wea er sad to see you go but thank you for using our service. Are you sure you want to delete your account? This cannot be undone.")) {
      // Delete the user's account
      firebase.auth().currentUser.delete().then(function() {
        // User deleted successfully.
        alert("Your account has been deleted.");
        // Redirect to home page or login page
        window.location.href = "Login.html";
      }).catch(function(error) {
        // An error happened.
        alert("An error occurred while trying to delete your account. Please try again.");
        console.error(error);
      });
    }
  });
  
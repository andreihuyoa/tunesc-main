import { getAuth, deleteUser } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, remove } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Assuming firebaseConfig is the same as in signup.js and has been initialized there.
// If it's not the case, you'll need to initializeApp(firebaseConfig) here as well.

// Initialize Firebase only if it hasn't been initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const auth = getAuth();
const db = getDatabase();

document.getElementById('delete-account-btn').addEventListener('click', function() {
  const user = auth.currentUser;
  
  if(user) {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      // Delete the user's account
      deleteUser(user).then(() => {
        // User deleted
        alert('Your account has been deleted.');

        // You may also want to delete the user's data from the database
        const userRef = ref(db, "UsersAuthList/" + user.uid);
        remove(userRef).then(() => {
          // Data deleted
          console.log('User data deleted from the database.');
        }).catch((error) => {
          console.error('Error removing user data:', error);
        });

        // Redirect to home page or login page after deletion
        window.location.href = '/login.html';

      }).catch((error) => {
        // An error occurred
        alert('An error occurred while trying to delete your account. Please try again.');
        console.error('Error deleting user:', error);
      });
    }
  } else {
    alert('No user is signed in to delete.');
  }
});

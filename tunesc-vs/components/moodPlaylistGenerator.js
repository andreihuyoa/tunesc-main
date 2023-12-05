document.addEventListener('DOMContentLoaded', function() {
    const moodForm = document.getElementById('moodForm');
  
    moodForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting the traditional way
      const selectedMood = document.getElementById('moodDropdown').value;
      generatePlaylistForMood(selectedMood);
    });
  });
  
  function generatePlaylistForMood(mood) {
    fetchSpotifyUserID().then(userId => {
      const attributes = mapMoodToAttributes(mood);
      fetchTracksWithAttributes(attributes).then(tracks => {
        if (tracks.length > 0) {
          createOrUpdatePlaylist(userId, tracks);
        } else {
          alert('No tracks found for this mood. Please try a different mood.');
        }
      }).catch(error => {
        console.error('Error fetching tracks:', error);
        alert('An error occurred while generating the playlist.');
      });
    }).catch(error => {
      console.error('Error fetching user ID:', error);
    });
  }
  
  function fetchSpotifyUserID() {
    // Replace 'access_token' with the actual access token
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(response => response.json())
    .then(data => data.id);
  }
  
  function mapMoodToAttributes(mood) {
    // Map the mood to Spotify track attributes
    // Replace with actual logic based on Spotify's API
    return {
      valence: mood === 'happy' ? 0.8 : mood === 'sad' ? 0.2 : 0.5,
      energy: mood === 'energetic' ? 0.8 : 0.4,
      // Add other attributes if needed
    };
  }
  
  function fetchTracksWithAttributes(attributes) {
    // Replace with actual Spotify API call
    return fetch(`https://api.spotify.com/v1/recommendations?seed_genres=pop&target_valence=${attributes.valence}&target_energy=${attributes.energy}`, {
      headers: {
        'Authorization': `Bearer ${access_token}` // Using access_token from spot.js
      }
    })
    .then(response => response.json())
    .then(data => {
      return data.tracks.map(track => track.uri);
    });
  }
  
  function createOrUpdatePlaylist(userId, tracks) {
    // Replace with actual Spotify API call for playlist creation/updating
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`, // Using access_token from spot.js
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `Mood Playlist: ${new Date().toLocaleDateString()}`, // Playlist name with current date
        description: 'Generated by TuneSculpt',
        public: false
      })
    })
    .then(response => response.json())
    .then(playlist => {
      return fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`, // Using access_token from spot.js
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: tracks })
      });
    })
    .then(() => {
      alert('Playlist generated successfully!');
    })
    .catch(error => {
      console.error('Error creating or updating playlist:', error);
      alert('An error occurred while creating the playlist.');
    });
  }
  
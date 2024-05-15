document.addEventListener('DOMContentLoaded', function() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
      logoutButton.addEventListener('click', function(event) {
          event.preventDefault();
          fetch('/api/users/logout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include'
          }).then(response => {
              if (response.ok) {
                  window.location.href = '/login';
              } else {
                  throw new Error('Failed to logout');
              }
          }).catch(error => console.error('Error logging out:', error));
      });
  }
});
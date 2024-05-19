var logoutButton = document.getElementById('logoutButton');
var loginButton = document.getElementById('loginButton');
console.log(logoutButton);
if (logoutButton) {
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Logout button clicked');
        fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then(response => {
            console.log('Logout response:', response);
            if (response.ok) {
                window.location.href = '/login';
            } else {
                throw new Error('Failed to logout');
            }
        }).catch(error => console.error('Error logging out:', error));
    });
}




document.querySelector('#upload-form').addEventListener('click', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch('/api/profile/upload-photo', {
        method: 'POST',
        body: formData,
    }); 

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to upload photo');
    }

    const result = await response.json();
    document.querySelector('.profile-image img').src = result.imageURL;
});
async function fetchUserCreations(userId) {
    const response = await fetch(`/api/games/user/${userId}`);
    const creations = await response.json();
    return creations;
}
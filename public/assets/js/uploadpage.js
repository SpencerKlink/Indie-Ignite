function checkWidth() {
    const dropZone = document.getElementById('drop_zone');
    const mainContentContainer = document.getElementById('main-content-container');
    const supporterPackages = document.getElementById('supporter-packages');

    if (window.innerWidth < 992) {
        dropZone.classList.add('hidden');
    } else {
        dropZone.classList.remove('hidden');
    }

    if (window.innerWidth > 768) {
        mainContentContainer.appendChild(supporterPackages);
    } else {
        document.querySelector('.container').appendChild(supporterPackages);
    }

    if (window.innerWidth > 1200) {
        mainContentContainer.appendChild(supporterPackages);
    } else {
        document.querySelector('.container').appendChild(supporterPackages);
    }
}

window.addEventListener('resize', checkWidth);
window.addEventListener('load', checkWidth);



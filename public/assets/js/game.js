const displayContainer = document.querySelector('.displayContainer');
const scrollableElement = document.querySelector('.smallImageContainer'); 

// displayContainer.addEventListener("click", (event) => {
//     const item = event.target;

//     if(item.matches(".next")) {
//         const scrollPosition = scrollableElement.scrollLeft;
//         scrollableElement.scrollTo({
//             left: scrollPosition + 750,
//             behavior: 'smooth'
//         });
//     } else if  (item.matches('.prev')) {
//         const scrollPosition = scrollableElement.scrollLeft;
//         scrollableElement.scrollTo({
//             left: scrollPosition - 750,
//             behavior: 'smooth'
//         });
//     }
// });

displayContainer.addEventListener("click", (event) => {
    let item = event.target;
    if (item.matches(".icon")) {
        item = item.parentElement;
    }

    if(item.matches(".next")) {
        const scrollPosition = scrollableElement.scrollLeft;
        scrollableElement.scrollTo({
            left: scrollPosition + 750,
            behavior: 'smooth'
        });
    } else if  (item.matches('.prev')) {
        const scrollPosition = scrollableElement.scrollLeft;
        scrollableElement.scrollTo({
            left: scrollPosition - 750,
            behavior: 'smooth'
        });
    }
});
const smallImageContainer = document.querySelector('.smallImageContainer');
const featuredImage = document.querySelector('.featuredImage');

smallImageContainer.addEventListener('click', (event) => {
    event.preventDefault();
    let item = event.target;
    if (item.tagName === 'IMG') {
        featuredImage.src = item.src;
    }
});




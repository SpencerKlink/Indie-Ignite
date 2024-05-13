const displayContainer = document.querySelector('.displayContainer');
const scrollableElement = document.querySelector('.smallImageContainer'); // replace with the actual selector of your scrollable element

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

    // If the clicked item is the icon, treat it as if the button was clicked
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

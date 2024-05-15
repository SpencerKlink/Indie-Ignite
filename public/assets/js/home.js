// const giantContainer = document.querySelector('.giantContainer')



// giantContainer.addEventListener("click", (event) => {
//        const item = event.target
   
//         if(item.matches(".next")) {
//             item.previousElementSibling.scrollLeft += 500;
            
//         } else if  (item.matches('.prev')) {
//                 item.nextElementSibling.scrollLeft -= 500;
//         }
           
        
// })

const giantContainer = document.querySelector('.giantContainer')

giantContainer.addEventListener("click", (event) => {
    let item = event.target;
    
    if (item.matches(".icon")) {
        item = item.parentElement;
    }
    if(item.matches(".next")) {
        const scrollPosition = item.previousElementSibling.scrollLeft;
        item.previousElementSibling.scrollTo({
            left: scrollPosition + 1333,
            behavior: 'smooth'
        });
    } else if  (item.matches('.prev')) {
        const scrollPosition = item.nextElementSibling.scrollLeft;
        item.nextElementSibling.scrollTo({
            left: scrollPosition - 1333,
            behavior: 'smooth'
        });
    }
})

document.querySelectorAll('.gamecard').forEach(gamecard => {
    gamecard.addEventListener('click', () => {
        const gameId = gamecard.id;
        if (gameId) {
            window.location.href = '/game?id=' + gameId;
        } else {
            console.error('Game ID is not set');
        }
    });
});
console.log('home.js loaded');

export
    
const studentsLink = document.querySelector('.students');
const modalWindow = document.getElementById('modal')
const modalBtn = document.querySelector('.modal-btn');

studentsLink.addEventListener('click', () => {
    modalWindow.classList.remove("is-hidden");
});

modalBtn.addEventListener('click', () => {
    modalWindow.classList.add('is-hidden');
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" || e.code === 27) {
        modalWindow.classList.add('is-hidden');
    }
});
// modalWindow.addEventListener('click', () => {
//     modalWindow.classList.add('is-hidden')
// });
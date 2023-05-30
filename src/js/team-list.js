export const studentsLink = document.querySelector('.students');
const modalWindow = document.getElementById('modal');
const modalBtn = document.querySelector('.modal-btn');

const modalOpen = () => {
  if (modalWindow) {
    modalWindow.classList.remove('is-hidden');
    modalBtn.addEventListener('click', modalClose);
    window.addEventListener('keydown', modalCloseByEsc);
    window.addEventListener('click', backdropClose);
  }
}

const modalClose = () => {
  modalWindow.classList.add('is-hidden');
  modalBtn.removeEventListener('click', modalCloseByEsc);
  window.removeEventListener('keydown', modalClose);
  window.removeEventListener('click', backdropClose);
  }
  
const modalCloseByEsc =  (e) => {
    if (e.key === 'Escape' || e.code === 27) {
      modalClose();
    }
  };
  
 const backdropClose = (e) => {
    if (e.target === modalWindow) {
      modalClose();
    }
  }
  
studentsLink.addEventListener('click', modalOpen);
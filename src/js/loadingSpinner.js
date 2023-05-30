import icons from 'url:../icons/icons.svg';

export const renderLoadingSpinner = (htmlDocument) => {
  htmlDocument.innerHTML = '';
  htmlDocument.innerHTML = `
    <div id="loading-spinner"> 
      <svg>
        <use href="${icons}#loader-icon"></use>
      </svg>
    </div>
  `;
};

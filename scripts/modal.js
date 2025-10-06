export function openPopup(popup) {
  if (!popup) return; 
  
  popup.classList.add('popup_is-opened');
  
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
    }
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  };
  
  popup.dataset.escapeHandler = handleEscape;
  popup.dataset.overlayHandler = handleOverlayClick;
  
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('click', handleOverlayClick);
}

export function closePopup(popup) {
  if (!popup) return;
  
  popup.classList.remove('popup_is-opened');
  
  document.removeEventListener('keydown', popup.dataset.escapeHandler);
  popup.removeEventListener('click', popup.dataset.overlayHandler);
}

export function setupCloseButton(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => closePopup(popup));
  }
}
export function openPopup(popup) {
  if (!popup) return; 
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', (e) => closePopup(e, popup));
}

export function closePopup(event, popup) {
  if (!popup) return;
  if (event.target === popup || event.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', (e) => closePopup(e, popup));
  }
}

export function setupCloseButton(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  if (closeButton) {
      closeButton.addEventListener('click', () => {
          closePopup({ target: popup }, popup);
      });
  }
}
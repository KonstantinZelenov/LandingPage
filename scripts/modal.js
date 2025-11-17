export function openPopup(popup) {
  if (!popup) return; 
  
  popup.classList.add('popup_is-opened');
  document.body.classList.add('body_no-scroll');
 
   const mainElement = document.querySelector('main');
  if (mainElement) {
    mainElement.classList.add('main-blur');
  }
  
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

  // Сохраняем ссылки на функции в свойствах popup
  popup._escapeHandler = handleEscape;
  popup._overlayHandler = handleOverlayClick;
  
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('click', handleOverlayClick);
}

export function closePopup(popup) {
  if (!popup) return;
  
  popup.classList.remove('popup_is-opened');
  document.body.classList.remove('body_no-scroll');

  const mainElement = document.querySelector('main');
  if (mainElement) {
    mainElement.classList.remove('main-blur');
  }
  
  // Используем сохраненные функции
  document.removeEventListener('keydown', popup._escapeHandler);
  popup.removeEventListener('click', popup._overlayHandler);
  
  // Очищаем ссылки
  delete popup._escapeHandler;
  delete popup._overlayHandler;
}

export function setupCloseButton(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  if (closeButton) {
    // Удаляем старый обработчик перед добавлением нового (на всякий случай)
    closeButton.replaceWith(closeButton.cloneNode(true));
    const newCloseButton = popup.querySelector('.popup__close-button');
    
    newCloseButton.addEventListener('click', () => closePopup(popup));
  }
}
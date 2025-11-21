let isMenuOpen = false;
let menuPopup = null;

export function openPopup(popup) {
  if (!popup) return; 
  
  // Запоминаем если это меню
  if (popup.classList.contains('popup_main-menu')) {
    isMenuOpen = true;
    menuPopup = popup;
  } else {
    // Если открывается не меню - закрываем меню
    if (isMenuOpen && menuPopup) {
      menuPopup.classList.remove('popup_is-opened');
      isMenuOpen = false;
    }
  }
  
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

  popup._escapeHandler = handleEscape;
  popup._overlayHandler = handleOverlayClick;
  
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('click', handleOverlayClick);
}

export function closePopup(popup) {
  if (!popup) return;
  
  popup.classList.remove('popup_is-opened');

  // Убираем обработчики ДО открытия меню
  document.removeEventListener('keydown', popup._escapeHandler);
  popup.removeEventListener('click', popup._overlayHandler);
  
  delete popup._escapeHandler;
  delete popup._overlayHandler;

  // Если закрыли не меню - открываем меню обратно
  if (!popup.classList.contains('popup_main-menu')) {
    const mainMenu = document.querySelector('.popup_main-menu');
    if (mainMenu) {
      // Небольшая задержка чтобы старый попап успел закрыться
      setTimeout(() => {
        openPopup(mainMenu);
      }, 10);
    }
  } 
}

export function setupCloseButton(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  if (closeButton) {
    closeButton.replaceWith(closeButton.cloneNode(true));
    const newCloseButton = popup.querySelector('.popup__close-button');
    
    newCloseButton.addEventListener('click', () => closePopup(popup));
  }
}
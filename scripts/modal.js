const popupStates = new WeakMap();
const menuPopupRef = { current: null };

function clearAllErrors(form) {
  const errorElements = form.querySelectorAll('.contact-form__error');
  const inputElements = form.querySelectorAll('.contact-form__input, .contact-form__textarea');
  
  errorElements.forEach(element => {
    element.textContent = '';
  });
  
  inputElements.forEach(element => {
    element.classList.remove('error');
  });
}

export function openPopup(popup) {
  if (!popup) return; 
  
  if (popup.classList.contains('popup_main-menu')) {
    popupStates.set(popup, { isMenuOpen: true });
    menuPopupRef.current = popup;
  } else {
    const currentMenu = menuPopupRef.current;
    if (currentMenu && popupStates.get(currentMenu)?.isMenuOpen) {
      currentMenu.classList.remove('popup_is-opened');
      popupStates.delete(currentMenu);
      menuPopupRef.current = null;
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

  const contactForm = popup.querySelector('.contact-form');
  if (contactForm) {
    clearAllErrors(contactForm);
  }
  
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', popup._escapeHandler);
  popup.removeEventListener('click', popup._overlayHandler);
  
  delete popup._escapeHandler;
  delete popup._overlayHandler;

  if (popup.classList.contains('popup_main-menu')) {
    popupStates.delete(popup);
    if (menuPopupRef.current === popup) {
      menuPopupRef.current = null;
    }
  }
  
  if (!popup.classList.contains('popup_main-menu')) {
    const mainMenu = document.querySelector('.popup_main-menu');
    if (mainMenu) {
      requestAnimationFrame(() => {
        openPopup(mainMenu);
      });
    }
  } 

  if (popup.classList.contains('popup_main-menu')) {
    const swordsButtons = document.querySelectorAll('.swords-button[data-swords-button]');
    swordsButtons.forEach(button => {
      const iconsContainer = button.querySelector('.swords-button__icons');
      if (iconsContainer && iconsContainer.classList.contains('active')) {
        // Убираем active и запускаем closing
        iconsContainer.classList.remove('active');
        iconsContainer.classList.add('closing');
        button.setAttribute('aria-expanded', 'false');
        
        // Через 800ms убираем closing
        setTimeout(() => {
          if (iconsContainer) {
            iconsContainer.classList.remove('closing');
          }
        }, 800);
      }
    });
  }
}

export function setupCloseButton(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  if (closeButton) {
    const newCloseButton = closeButton.cloneNode(false);
    closeButton.replaceWith(newCloseButton);
    
    newCloseButton.addEventListener('click', () => closePopup(popup));
  }
}
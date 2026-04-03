import { openPopup, setupCloseButton, closePopup } from './modal.js';
import { savePricingData } from './radio.js';

const popupConfigs = [
  { button: '.swords-button', popup: '.popup_main-menu' },
  { button: '[data-popup="contacts"]', popup: '.popup_navbar' },
  { button: '[data-popup="about-me"]', popup: '.popup_about-me' },
  { button: '[data-popup="about-projects"]', popup: '.popup_projects' },
  { button: '[data-popup="about-school"]', popup: '.popup_about-school' },
  { button: '[data-popup="price"]', popup: '.popup_prices' },
  { button: '.prices-form__button', popup: '.popup_contacts' }
];

export function initPopups() {
  popupConfigs.forEach(config => {
    const button = document.querySelector(config.button);
    const popup = document.querySelector(config.popup);
    
    if (button && popup) {
      button.addEventListener('click', () => {
        openPopup(popup);
        setupCloseButton(popup);
      });
    }
  });

  const nextButton = document.querySelector('.prices-form__button');
  const contactsPopup = document.querySelector('.popup_contacts');
  const pricesPopup = document.querySelector('.popup_prices');

  if (nextButton && contactsPopup && pricesPopup) {
    nextButton.addEventListener('click', () => {
      if (!savePricingData()) {
        return;
      }
      
      closePopup(pricesPopup);
      openPopup(contactsPopup);
      setupCloseButton(contactsPopup);
    });
  }

  const mainMenuPopup = document.querySelector('.popup_main-menu');
  const menuSwordsButton = document.querySelector('.popup_main-menu .swords-button');
  
  if (mainMenuPopup && menuSwordsButton) {
    menuSwordsButton.addEventListener('click', (e) => {
      e.stopPropagation();
      setTimeout(() => {
        if (mainMenuPopup.classList.contains('popup_is-opened')) {
          closePopup(mainMenuPopup);
        }
      }, 100);
    });
  }
}
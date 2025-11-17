// scripts/popupManager.js
import { openPopup, setupCloseButton } from './modal.js';
import { savePricingData } from './radio.js';

const popupConfigs = [
  { button: '.menu-button__icon', popup: '.popup_main-menu' },
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

  // Специальный обработчик для кнопки "Next" в форме цен
  const nextButton = document.querySelector('.prices-form__button');
  const contactsPopup = document.querySelector('.popup_contacts');

  if (nextButton && contactsPopup) {
    nextButton.addEventListener('click', () => {
      if (savePricingData()) {
        openPopup(contactsPopup);
        setupCloseButton(contactsPopup);
      } else {
        alert('Please select a training type');
      }
    });
  }
}
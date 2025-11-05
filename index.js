import { openPopup, setupCloseButton } from './scripts/modal.js';
import { savePricingData } from './scripts/radio.js';
import { initContactForm } from './scripts/formHandler.js';

const popupConfigs = [
  { button: '.menu-button__icon', popup: '.popup_main-menu' },
  { button: '[data-popup="contacts"]', popup: '.popup_navbar' },
  { button: '[data-popup="about-me"]', popup: '.popup_about-me' },
  { button: '[data-popup="about-projects"]', popup: '.popup_projects' },
  { button: '[data-popup="about-school"]', popup: '.popup_about-school' },
  { button: '[data-popup="price"]', popup: '.popup_prices' },
  { button: '.prices-form__button', popup: '.popup_contacts' }
];

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
    // Сохраняем данные перед переходом
    if (savePricingData()) {
      openPopup(contactsPopup);
      setupCloseButton(contactsPopup);
    } else {
      alert('Please select a training type');
    }
  });
}


function animateIcons(containerSelector, iconSelector, interval = 3500) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const icons = container.querySelectorAll(iconSelector);
  if (icons.length < 2) return;

  let currentIndex = 0;
  
  // Показываем первую иконку сразу
  icons[currentIndex].classList.add('active');
  
  // Запускаем анимацию
  return setInterval(() => {
    icons[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % icons.length;
    icons[currentIndex].classList.add('active');
  }, interval);
}

function initAnimations() {
  animateIcons('.lang-switcher', '.lang-switcher__flag');
  animateIcons('.contacts-button', '.contacts-button__icon');
  animateIcons('.theme-switcher', '.theme-switcher__icon');
}

function setViewportHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  setViewportHeight();
  initAnimations();
  new SmoothMenuWheel('.popup__wheel-container');
  window.addEventListener('resize', setViewportHeight);
});


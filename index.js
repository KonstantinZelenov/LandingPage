import { openPopup, setupCloseButton } from './scripts/modal.js';

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

function setupIconAnimation(containerSelector, iconSelector, interval = 7000) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const icons = container.querySelectorAll(iconSelector);
  if (icons.length === 0) return;

  let currentIndex = 0;
  let intervalId = null;

  function changeIcon() {
    icons[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % icons.length;
    icons[currentIndex].classList.add('active');
  }

  function startAnimation() {
    if (intervalId) return;
    changeIcon(); 
    intervalId = setInterval(changeIcon, interval);
  }

  function stopAnimation() {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation(); 
        }
      });
    },
    { threshold: 0.1 } 
  );

  observer.observe(container); 

  return () => {
    stopAnimation();
    observer.disconnect();
  };
}

function initAnimation() {
  setupIconAnimation('.contacts-button', '.contacts-button__icon');
  setupIconAnimation('.main__icon-translate', '.lang-switcher__flag');
}

function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Инициализация
window.addEventListener('DOMContentLoaded', setViewportHeight);
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
window.addEventListener('load', setViewportHeight);

// Запуск инициализации
document.addEventListener('DOMContentLoaded', () => {
  setViewportHeight();
  initAnimation();
});


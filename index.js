import { openPopup, closePopup, setupCloseButton } from './blocks/scripts/modal.js';
import { POPUPS_CONFIG } from './blocks/scripts/popup_config.js'

function createPopup(name, config) {
  const template = document.getElementById('popup-template');
  const popup = template.content.cloneNode(true).querySelector('.popup');
  popup.classList.add(`popup_${name}`);

  const body = popup.querySelector('.popup__body');
  
  body.insertAdjacentHTML('beforeend', config.content);

  document.body.appendChild(popup);
  popup.addEventListener('click', (e) => closePopup(e, popup));
  setupCloseButton(popup);

  return popup;
}

// Инициализация
function initAllPopups() {
  const popups = {};
  
  Object.entries(POPUPS_CONFIG).forEach(([name, config]) => {
    popups[name] = createPopup(name, config);
    
    config.triggers?.forEach(trigger => {
      document.querySelectorAll(trigger.selector).forEach(el => {
        el.addEventListener('click', () => {
          if (trigger.parentPopup) {
            closePopup({ target: popups[trigger.parentPopup] }, popups[trigger.parentPopup]);
          }
          openPopup(popups[name]);
        });
      });
    });
  });
}

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
  setupIconAnimation('.popup__image-list-item_contacts', '.popup__contacts-menu-icon');
  setupIconAnimation('.main-title__image-list-item_translate', '.main-title__translate-menu-icon');
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
  initAllPopups();
  initAnimation();
});
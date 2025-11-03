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





class SmoothMenuWheel {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.wheel = this.container.querySelector('.popup__wheel');
        this.items = Array.from(this.container.querySelectorAll('.popup__wheel-item'));
        this.totalItems = this.items.length;
        this.activeIndex = 0;
        
        // Защита от слишком быстрой прокрутки
        this.lastScrollTime = 0;
        this.scrollDelay = 300; // Минимальное время между прокрутками в ms
        
        this.init();
    }
    
    init() {
        this.updateItems();
        this.addEventListeners();
    }
    
    addEventListeners() {
        // Скролл мышью с ограничением
        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const now = Date.now();
            if (now - this.lastScrollTime < this.scrollDelay) return;
            
            if (e.deltaY > 0) {
                this.scrollDown();
            } else {
                this.scrollUp();
            }
            
            this.lastScrollTime = now;
        });
        
        // Тач события с улучшенной логикой
        let startY = 0;
        let startTime = 0;
        const minSwipeDistance = 50; // Минимальное расстояние свайпа
        const maxSwipeTime = 500; // Максимальное время свайпа
        
        this.container.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startTime = Date.now();
        });
        
        this.container.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            const diff = startY - endY;
            const timeDiff = endTime - startTime;
            
            // Проверяем что свайп был быстрым и достаточно длинным
            if (Math.abs(diff) > minSwipeDistance && timeDiff < maxSwipeTime) {
                const now = Date.now();
                if (now - this.lastScrollTime < this.scrollDelay) return;
                
                if (diff > 0) {
                    this.scrollDown();
                } else {
                    this.scrollUp();
                }
                
                this.lastScrollTime = now;
            }
        });
        
        
    }
    
    scrollUp() {
        this.activeIndex = (this.activeIndex - 1 + this.totalItems) % this.totalItems;
        this.updateItems();
    }
    
    scrollDown() {
        this.activeIndex = (this.activeIndex + 1) % this.totalItems;
        this.updateItems();
    }
    
    setActiveIndex(newIndex) {
        this.activeIndex = newIndex;
        this.updateItems();
    }
    
    updateItems() {
        this.items.forEach((item, index) => {
            item.classList.remove('active', 'adjacent', 'hidden');
            
            const diff = Math.abs(index - this.activeIndex);
            const wrapDiff = Math.min(diff, this.totalItems - diff);
            
            if (wrapDiff === 0) {
                item.classList.add('active');
            } else if (wrapDiff === 1) {
                item.classList.add('adjacent');
            } else {
                item.classList.add('hidden');
            }
        });
    }
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


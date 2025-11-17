import { initContactForm } from './scripts/formHandler.js';
import { SmoothMenuWheel } from './scripts/menuWheel.js';
import { initPopups } from './scripts/popupManager.js';
import { initAnimations } from './scripts/animatIcons.js';
import { ThemeSwitcher } from './scripts/theme-switcher.js';

function setViewportHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

document.addEventListener('DOMContentLoaded', () => {
  initPopups();
  initContactForm();
  setViewportHeight();
  initAnimations();
  new ThemeSwitcher();
  new SmoothMenuWheel('.popup__wheel-container');
  window.addEventListener('resize', setViewportHeight);
});

window.addEventListener('load', setViewportHeight);


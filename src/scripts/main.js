import { initContactForm } from './modules/contact/contactForm.js';
import { SmoothMenuWheel } from './modules/menuWheel.js';
import { initPopups } from './modules/popupManager.js';
import { ThemeSwitcher } from './modules/theme-switcher.js';
import { initSwordsButtons } from './modules/swordsButton.js';
import { initTranslations } from './modules/translations/translationSystem.js'; 


document.addEventListener('DOMContentLoaded', () => {
  initPopups();
  initContactForm();
  new ThemeSwitcher();
  new SmoothMenuWheel('.wheel');
  initSwordsButtons();
  initTranslations();
});




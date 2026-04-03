import { initContactForm } from './scripts/formHandler.js';
import { SmoothMenuWheel } from './scripts/menuWheel.js';
import { initPopups } from './scripts/popupManager.js';
import { ThemeSwitcher } from './scripts/theme-switcher.js';
import { initSwordsButtons } from './scripts/swordsButton.js';
import { initTranslations } from './scripts/lang-config.js'; 


document.addEventListener('DOMContentLoaded', () => {
  initPopups();
  initContactForm();
  new ThemeSwitcher();
  new SmoothMenuWheel('.wheel');
  initSwordsButtons();
  initTranslations();
});




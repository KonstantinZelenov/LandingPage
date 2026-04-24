import { 
  mainTranslations, 
  menuTranslations, 
  aboutMeTranslations, 
  projectsTranslations, 
  aboutSchoolTranslations, 
  pricesTranslations, 
  contactsTranslations, 
  navbarTranslations 
} from './translations.js';

// Конфигурация модулей перевода
const MODULES_CONFIG = [
  { selector: '.main', translations: mainTranslations },
  { selector: '.popup_main-menu', translations: menuTranslations },
  { selector: '.popup_about-me', translations: aboutMeTranslations },
  { selector: '.popup_projects', translations: projectsTranslations },
  { selector: '.popup_about-school', translations: aboutSchoolTranslations },
  { selector: '.popup_prices', translations: pricesTranslations },
  { selector: '.popup_navbar', translations: navbarTranslations }
];

// Процессор для плейсхолдеров контактной формы
const placeholderProcessor = (container, lang, translations) => {
  const placeholderElements = container.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang]?.[key]) {
      element.setAttribute('placeholder', translations[lang][key]);
    }
  });
};



const createTranslationManager = () => {
  const modules = [];
  let currentLang = 'en';
  
  return {
    addModule(container, translations, processor = null) {
      modules.push({ container, translations, processor });
    },
    
    translateModule(container, lang) {
      const module = modules.find(m => m.container === container);
      if (!module) return;
      
      const elements = module.container.querySelectorAll('[data-i18n]');
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (module.translations[lang]?.[key]) {
          element.textContent = module.translations[lang][key];
        }
      });
      
      if (module.processor) {
        module.processor(module.container, lang, module.translations);
      }
    },
    
    translateAll(lang) {
      modules.forEach(module => {
        this.translateModule(module.container, lang);
      });
      currentLang = lang;
    },
    
    getCurrentLang() {
      return currentLang;
    },
    
    translateModuleById(moduleId, lang) {
      const module = modules[moduleId];
      if (module) {
        this.translateModule(module.container, lang);
      }
    }
  };
};


export function initTranslations() {
  const translateButton = document.querySelector('.lang-switcher');
  const flags = document.querySelectorAll('.lang-switcher__flag');
  const translator = createTranslationManager();
  
  // Регистрация обычных модулей
  MODULES_CONFIG.forEach(({ selector, translations }) => {
    const container = document.querySelector(selector);
    if (container) {
      translator.addModule(container, translations);
    } else {
      console.warn(`Container not found for selector: ${selector}`);
    }
  });
  
  // Особый случай для контактов (с процессором плейсхолдеров)
  const contactsContainer = document.querySelector('.popup_contacts');
  if (contactsContainer) {
    translator.addModule(contactsContainer, contactsTranslations, placeholderProcessor);
  } else {
    console.warn('Container not found for selector: .popup_contacts');
  }
  
  // Установка языка по умолчанию
  translator.translateAll('en');
  
  // Обработчик переключения языка
  function handleTranslateClick() {
    const currentLang = translator.getCurrentLang();
    const nextLang = currentLang === 'en' ? 'ru' : 'en';
    translator.translateAll(nextLang);
    
    if (flags && flags.length) {
      flags[0].classList.toggle('active', nextLang === 'ru');
      flags[1].classList.toggle('active', nextLang === 'en');
    }
  }
  
  if (translateButton) {
    translateButton.addEventListener('click', handleTranslateClick);
  } else {
    console.warn('Language switcher button not found');
  }
}
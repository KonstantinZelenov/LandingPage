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

const MODULES_CONFIG = [
  { selector: '.main', translations: mainTranslations },
  { selector: '.popup_main-menu', translations: menuTranslations },
  { selector: '.popup_about-me', translations: aboutMeTranslations },
  { selector: '.popup_projects', translations: projectsTranslations },
  { selector: '.popup_about-school', translations: aboutSchoolTranslations },
  { selector: '.popup_prices', translations: pricesTranslations },
  { selector: '.popup_navbar', translations: navbarTranslations }
];

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
  
  const LANG_KEY = 'user-language';
  const LANG_RU = 'ru';
  const LANG_EN = 'en';
  
  const updateFlags = (activeLang) => {
    flags.forEach(flag => {
      const lang = flag.dataset.lang;
      flag.classList.toggle('active', lang === activeLang);
    });
  };
  
  const enableRussian = () => {
    translator.translateAll(LANG_RU);
    updateFlags(LANG_RU);
    localStorage.setItem(LANG_KEY, LANG_RU);
  };
  
  const enableEnglish = () => {
    translator.translateAll(LANG_EN);
    updateFlags(LANG_EN);
    localStorage.setItem(LANG_KEY, LANG_EN);
  };
  
  const toggleLanguage = () => {
    const currentLang = translator.getCurrentLang();
    if (currentLang === LANG_EN) {
      enableRussian();
    } else {
      enableEnglish();
    }
  };
  
  MODULES_CONFIG.forEach(({ selector, translations }) => {
    const container = document.querySelector(selector);
    if (container) {
      translator.addModule(container, translations);
    } else {
      console.warn(`Container not found for selector: ${selector}`);
    }
  });
  
  const contactsContainer = document.querySelector('.popup_contacts');
  if (contactsContainer) {
    translator.addModule(contactsContainer, contactsTranslations, placeholderProcessor);
  } else {
    console.warn('Container not found for selector: .popup_contacts');
  }
  
  const savedLang = localStorage.getItem(LANG_KEY);
  if (savedLang === LANG_RU) {
    enableRussian();
  } else {
    enableEnglish();
  }
  
  if (translateButton) {
    translateButton.addEventListener('click', toggleLanguage);
  } else {
    console.warn('Language switcher button not found');
  }
}
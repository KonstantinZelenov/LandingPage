/*function createTranslator() {
  let currentLang = 'en';
  let translations = {};
  
  const originalTexts = new Map();
  
  async function init() {
    await loadTranslations('ru');
    
    saveOriginalTexts();
    
    // Вешаем обработчик на кнопку перевода
    const translateBtn = document.querySelector('.main__icon-translate');
    if (translateBtn) {
      translateBtn.addEventListener('click', toggleLanguage);
    }
    
    updateFlags();
  }
  
  // Загружаем переводы
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`./locales/${lang}.json`);
      if (response.ok) {
        translations[lang] = await response.json();
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }
  
  // Сохраняем оригинальные тексты из верстки
  function saveOriginalTexts() {
    // Сохраняем ВСЕ тексты которые могут переводиться
    const textElements = document.querySelectorAll(`
      .main__header,
      .main__description,
      [data-popup],
      .popup h1, .popup h2, .popup h3,
      .popup p,
      .popup label,
      .popup button,
      .popup legend,
      .navbar__title,
      .navbar__links a,
      .navbar__links p,
      .projects-list h3,
      .projects-list p
    `);
    
    textElements.forEach(element => {
      const key = getElementKey(element);
      originalTexts.set(key, element.textContent);
    });
    
    // Сохраняем плейсхолдеры
    const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(input => {
      const key = `placeholder-${input.id || input.name}`;
      originalTexts.set(key, input.placeholder);
    });
    
    // Сохраняем option в select
    const options = document.querySelectorAll('option');
    options.forEach(option => {
      const key = `option-${option.value}`;
      originalTexts.set(key, option.textContent);
    });
  }
  
  // Создаем уникальный ключ для элемента
  function getElementKey(element) {
    if (element.id) return `id-${element.id}`;
    if (element.dataset.popup) return `popup-${element.dataset.popup}`;
    
    // Для элементов с классами
    const classes = Array.from(element.classList).join('.');
    const tagName = element.tagName.toLowerCase();
    const text = element.textContent.substring(0, 20);
    return `${tagName}.${classes}-${text}`;
  }
  
  // Переключаем язык
  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    updatePage();
    updateFlags();
  }
  
  // Обновляем страницу
  function updatePage() {
    if (currentLang === 'ru') {
      applyTranslations('ru');
    } else {
      restoreOriginalTexts();
    }
  }
  
  // Применяем переводы
  function applyTranslations(lang) {
    const langData = translations[lang];
    if (!langData) return;
    
    // Главная секция
    updateElement('.main__header', langData.main?.title);
    updateElement('.main__description', langData.main?.subtitle);
    
    // Меню
    updateElement('[data-popup="about-me"]', langData.menu?.about);
    updateElement('[data-popup="about-projects"]', langData.menu?.projects);
    updateElement('[data-popup="about-school"]', langData.menu?.school);
    updateElement('[data-popup="price"]', langData.menu?.prices);
    
    // About me
    updateElement('.popup_about-me__text h3', langData.about?.title);
    updateNestedElements('.popup_about-me__text p', [
      langData.about?.text1,
      langData.about?.text2, 
      langData.about?.text3
    ]);
    
    // Projects
    updateElement('.popup_projects h2', langData.projects?.title);
    updateElement('.projects-list li:nth-child(1) h3', langData.projects?.project1?.title);
    updateElement('.projects-list li:nth-child(1) p', langData.projects?.project1?.desc);
    updateElement('.projects-list li:nth-child(2) h3', langData.projects?.project2?.title);
    updateElement('.projects-list li:nth-child(2) p', langData.projects?.project2?.desc);
    updateElement('.projects-list li:nth-child(3) h3', langData.projects?.project3?.title);
    updateElement('.projects-list li:nth-child(3) p', langData.projects?.project3?.desc);
    
    // School
    updateElement('.video-content__description h2', langData.school?.title);
    updateElement('.video-content__description-text', langData.school?.text);
    
    // Prices
    updateElement('.popup_prices .popup__legend', langData.prices?.title);
    updateNestedElements('.popup__training-types label', [
      langData.prices?.trainingTypes?.personal,
      langData.prices?.trainingTypes?.split,
      langData.prices?.trainingTypes?.group,
      langData.prices?.trainingTypes?.video
    ]);
    updateNestedElements('.popup__details .popup__label', [
      langData.prices?.fields?.duration,
      langData.prices?.fields?.price,
      langData.prices?.fields?.description
    ]);
    updateElement('.popup__next-button', langData.prices?.nextButton);
    
    // Contact form
    updateElement('.popup_form .popup__legend', langData.contact?.title);
    updateNestedElements('.form__field .popup__label', [
      langData.contact?.fields?.name,
      langData.contact?.fields?.email,
      langData.contact?.fields?.lessons,
      langData.contact?.fields?.message
    ]);
    updateElement('.form__button--submit', langData.contact?.submitButton);
    
    // Placeholders
    updatePlaceholder('#name', langData.contact?.placeholders?.name);
    updatePlaceholder('#mail', langData.contact?.placeholders?.email);
    
    // Weapon options
    updateOption('SW', langData.contact?.weapons?.sword);
    updateOption('SP', langData.contact?.weapons?.spear);
    updateOption('RP', langData.contact?.weapons?.rapier);
    updateOption('SaS', langData.contact?.weapons?.swordShield);
    updateOption('DS', langData.contact?.weapons?.doubleSword);
    updateOption('SF', langData.contact?.weapons?.staff);
    
    // Navbar
    updateElement('.navbar__title', langData.navbar?.title);
    updateElement('.navbar__links li:nth-child(1) a', langData.navbar?.instagram?.link);
    updateElement('.navbar__links li:nth-child(1) p', langData.navbar?.instagram?.desc);
    updateElement('.navbar__links li:nth-child(2) a', langData.navbar?.vk?.link);
    updateElement('.navbar__links li:nth-child(2) p', langData.navbar?.vk?.desc);
    updateElement('.navbar__links li:nth-child(3) a', langData.navbar?.telegram?.link);
    updateElement('.navbar__links li:nth-child(3) p', langData.navbar?.telegram?.desc);
  }
  
  // Восстанавливаем оригинальные тексты
  function restoreOriginalTexts() {
    // Восстанавливаем все текстовые элементы
    const textElements = document.querySelectorAll(`
      .main__header,
      .main__description,
      [data-popup],
      .popup h1, .popup h2, .popup h3,
      .popup p,
      .popup label,
      .popup button,
      .popup legend,
      .navbar__title,
      .navbar__links a,
      .navbar__links p,
      .projects-list h3,
      .projects-list p
    `);
    
    textElements.forEach(element => {
      const key = getElementKey(element);
      if (originalTexts.has(key)) {
        element.textContent = originalTexts.get(key);
      }
    });
    
    // Восстанавливаем плейсхолдеры
    const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(input => {
      const key = `placeholder-${input.id || input.name}`;
      if (originalTexts.has(key)) {
        input.placeholder = originalTexts.get(key);
      }
    });
    
    // Восстанавливаем option в select
    const options = document.querySelectorAll('option');
    options.forEach(option => {
      const key = `option-${option.value}`;
      if (originalTexts.has(key)) {
        option.textContent = originalTexts.get(key);
      }
    });
  }
  
  // Вспомогательные функции
  function updateElement(selector, text) {
    if (!text) return;
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  }
  
  function updateNestedElements(selector, texts) {
    if (!texts) return;
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      if (texts[index]) element.textContent = texts[index];
    });
  }
  
  function updatePlaceholder(selector, text) {
    if (!text) return;
    const element = document.querySelector(selector);
    if (element) element.placeholder = text;
  }
  
  function updateOption(value, text) {
    if (!text) return;
    const option = document.querySelector(`option[value="${value}"]`);
    if (option) option.textContent = text;
  }
  
  // Обновляем флаги
  function updateFlags() {
    const flags = document.querySelectorAll('.lang-switcher__flag');
    flags.forEach(flag => {
      const isActive = flag.src.includes(currentLang === 'en' ? 'gb-flag' : 'rf-flag');
      flag.style.display = isActive ? 'block' : 'none';
    });
  }
  
  return { init };
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  const translator = createTranslator();
  translator.init();
}); */
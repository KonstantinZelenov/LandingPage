/* Возможные улучшения
Динамическая загрузка переводов

// Легко добавить загрузку с сервера
translator.addModule(container, await fetchTranslations('module-name'));


Горячая замена языков

// Можно менять языки без перезагрузки страницы
translator.translateAll('fr');


Ленивая загрузка модулей!!!!

const createTranslationManager = () => {
    const modules = [];
    let currentLang = 'en';
    let lazyModules = new Map(); // Для отложенной загрузки

    return {
        // ... существующие методы ...
        
        // Регистрация ленивого модуля
        addLazyModule(container, translationLoader, processor = null) {
            lazyModules.set(container, { translationLoader, processor });
        },
        
        // Загрузка и перевод ленивого модуля
        async loadAndTranslateModule(container, lang) {
            const lazyModule = lazyModules.get(container);
            if (!lazyModule) return;
            
            const { translationLoader, processor } = lazyModule;
            const translations = await translationLoader(lang);
            
            // Теперь делаем как обычный модуль
            this.addModule(container, translations, processor);
            this.translateModule(container, lang);
            
            lazyModules.delete(container); // Убираем из ленивых
        }
    };
};

// Использование:
translator.addLazyModule(
    heavyPopupContainer, 
    async (lang) => {
        // Грузим переводы только когда попап открывается
        const response = await fetch(`/api/translations/heavy-popup/${lang}`);
        return response.json();
    },
    customProcessor
);



ПЛАГИННАЯ СИСТЕМА
const createTranslationManager = () => {
    const modules = [];
    let currentLang = 'en';
    const plugins = []; // Массив плагинов

    return {
        // ... существующие методы ...
        
        // Регистрация плагинов
        use(plugin) {
            plugins.push(plugin);
            return this; // Для чейнинга
        },
        
        // Хук перед переводом
        translateAll(lang) {
            // Вызываем плагины перед переводом
            plugins.forEach(plugin => plugin.beforeTranslate?.(lang, modules));
            
            modules.forEach(module => {
                this.translateModule(module.container, lang);
            });
            
            currentLang = lang;
            
            // Вызываем плагины после перевода
            plugins.forEach(plugin => plugin.afterTranslate?.(lang, modules));
        }
    };
};

// Плагин для логирования
const loggerPlugin = {
    beforeTranslate(lang, modules) {
        console.log(`🔄 Switching to ${lang}, modules: ${modules.length}`);
    },
    afterTranslate(lang, modules) {
        console.log(`✅ Successfully translated to ${lang}`);
    }
};

// Плагин для аналитики
const analyticsPlugin = {
    afterTranslate(lang, modules) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'language_change', { language: lang });
        }
    }
};

// Использование:
translator
    .use(loggerPlugin)
    .use(analyticsPlugin);


    ИНТЕРПОЛЯЦИЯ ПЕРЕМЕННЫХ

    // Добавляем в процессор контактов
translator.addModule(contactsContainer, contactsTranslations, (container, lang, translations) => {
    // Стандартные placeholder'ы
    const placeholderElements = container.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang]?.[key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });
    
    // Интерполяция переменных
    const interpolatedElements = container.querySelectorAll('[data-i18n-interpolate]');
    interpolatedElements.forEach(element => {
        const key = element.getAttribute('data-i18n-interpolate');
        const variables = JSON.parse(element.getAttribute('data-i18n-vars') || '{}');
        
        if (translations[lang]?.[key]) {
            let text = translations[lang][key];
            
            // Заменяем {variable} на значения
            Object.entries(variables).forEach(([varName, varValue]) => {
                text = text.replace(new RegExp(`{${varName}}`, 'g'), varValue);
            });
            
            element.textContent = text;
        }
    });
});

// В HTML:
<div data-i18n-interpolate="welcome_message" 
     data-i18n-vars='{"name": "Константин", "days": 14}'>
     Добро пожаловать, {name}! Вы с нами уже {days} дней.
</div>


DEVTOOLS ДЛЯ РАЗРАБОТКИ

const createTranslationManager = () => {
    // ... существующий код ...
    
    return {
        // ... существующие методы ...
        
        // Devtools методы
        _getInternalState() {
            return {
                modules: modules.map(m => ({
                    container: m.container.className,
                    translations: Object.keys(m.translations),
                    hasProcessor: !!m.processor
                })),
                currentLang,
                totalKeys: this._getTotalKeys()
            };
        },
        
        _getTotalKeys() {
            const allKeys = new Set();
            modules.forEach(module => {
                Object.values(module.translations).forEach(langObj => {
                    Object.keys(langObj).forEach(key => allKeys.add(key));
                });
            });
            return allKeys.size;
        },
        
        // Валидация переводов
        validateTranslations() {
            const warnings = [];
            
            modules.forEach((module, index) => {
                const languages = Object.keys(module.translations);
                const baseLang = languages[0];
                const baseKeys = Object.keys(module.translations[baseLang]);
                
                languages.forEach(lang => {
                    const langKeys = Object.keys(module.translations[lang]);
                    const missingKeys = baseKeys.filter(key => !langKeys.includes(key));
                    const extraKeys = langKeys.filter(key => !baseKeys.includes(key));
                    
                    if (missingKeys.length > 0) {
                        warnings.push(`🚨 ${lang}: Missing keys: ${missingKeys.join(', ')}`);
                    }
                    if (extraKeys.length > 0) {
                        warnings.push(`⚠️ ${lang}: Extra keys: ${extraKeys.join(', ')}`);
                    }
                });
            });
            
            return warnings;
        }
    };
};

// В консоли разработчика:
console.log('Translation State:', translator._getInternalState());
console.log('Validation:', translator.validateTranslations());


ИНТЕЛЛЕКТУАЛЬНОЕ ОПРЕДЕЛЕНИЕ ЯЗЫКА

const createTranslationManager = () => {
    // ... существующий код ...
    
    return {
        // ... существующие методы ...
        
        // Автоопределение языка
        detectLanguage() {
            // 1. Из localStorage
            const saved = localStorage.getItem('preferred_language');
            if (saved && this.supportedLanguages.includes(saved)) {
                return saved;
            }
            
            // 2. Из браузера
            const browserLang = navigator.language.split('-')[0];
            if (this.supportedLanguages.includes(browserLang)) {
                return browserLang;
            }
            
            // 3. Из URL параметров
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang');
            if (urlLang && this.supportedLanguages.includes(urlLang)) {
                return urlLang;
            }
            
            return 'en'; // fallback
        },
        
        // Сохранение выбора
        setLanguage(lang) {
            this.translateAll(lang);
            localStorage.setItem('preferred_language', lang);
            
            // Обновляем URL без перезагрузки
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.history.replaceState({}, '', url);
        },
        
        supportedLanguages: ['en', 'ru', 'es', 'fr'] // можно расширять
    };
};

// Автоинициализация при загрузке
const preferredLang = translator.detectLanguage();
translator.setLanguage(preferredLang);


HOT RELOAD ДЛЯ РАЗРАБОТКИ

// Только для development mode
if (process.env.NODE_ENV === 'development') {
    // Hot reload переводов при изменении файлов
    const translationHotReload = setInterval(() => {
        fetch('/api/translations/last-updated')
            .then(r => r.json())
            .then(({ timestamp }) => {
                if (window.lastTranslationUpdate !== timestamp) {
                    window.lastTranslationUpdate = timestamp;
                    console.log('🔄 Translations updated, reloading...');
                    location.reload();
                }
            });
    }, 2000);
    
    // Экспортируем менеджер в глобальную область для дебага
    window.translationManager = translator;
}

ИСПОЛЬЗОВАНИЕ ВСЕХ ФИЧ ВМЕСТЕ:


const translator = createTranslationManager()
    .use(loggerPlugin)
    .use(analyticsPlugin)
    .use(cachePlugin);

// Инициализация с интеллектуальным определением языка
translator.setLanguage(translator.detectLanguage());

// Ленивая загрузка тяжёлых модулей
translator.addLazyModule(
    heavyPopupContainer,
    async (lang) => await fetchTranslations(`popup-${lang}`),
    advancedProcessor
);


*/
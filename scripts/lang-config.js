const translateButton = document.querySelector('.lang-switcher');
const flags = document.querySelectorAll('.lang-switcher__flag');
const mainContainer = document.querySelector('.main');
const menuContainer = document.querySelector('.popup_main-menu');
const aboutMeContainer = document.querySelector('.popup_about-me');
const projectsContainer = document.querySelector('.popup_projects');
const schoolContainer = document.querySelector('.popup_about-school');
const pricesContainer = document.querySelector('.popup_prices');
const contactsContainer = document.querySelector('.popup_contacts');
const navbarContainer = document.querySelector('.popup_navbar');

const mainTranslations = {
    ru: {
        name: 'Константин Зеленов',
        description: 'Тренер по фехтованию, каскадёр, спортсмен',
    },
    en: {
        name: 'Konstantin Zelenov',
        description: 'Fencing coach, stuntman, athlete',
    }
};

const menuTranslations = {
    ru: {
        about: 'Обо мне',
        projects: 'Проекты',
        school: 'О школе',
        prices: 'Цены',
    },
    en: {
        about: 'About me',
        projects: 'Projects',
        school: 'School',
        prices: 'Prices',
    }
};

const aboutMeTranslations = {
    ru: {
        about_title: 'Обо мне',
        about_text1: 'Привет, меня зовут Константин Зеленов, и я рад поделиться с вами своей историей. Последние 20 лет я посвятил фехтованию, оттачивая свои навыки как спортсмен, каскадёр, актёр театра и кино.',
        about_text2: 'Я дважды становился чемпионом мира по артистическому фехтованию. Несколько раз был чемпионом России и многократным победителем соревнований по артистическому фехтованию.',
        about_text3: 'Мечтаете ли вы подняться на пьедестал чемпионата или просто хотите ощутить thrill этого древнего искусства - я готов помочь вам на каждом этапе. Свяжитесь со мной сегодня, чтобы начать увлекательное приключение в мире владения мечом. Давайте создадим что-то extraordinary вместе!',
    },
    en: {
        about_title: 'About me',
        about_text1: 'Hello, my name is Konstantin Zelenov and I am happy to share my story with you. I devoted the last 20 years of my life to fencing, honing my skills as an athlete, stuntman, theater and film actor.',
        about_text2: 'I have twice become world champion in artistic fencing. Several times I was the champion of Russia and a multiple winner of competitions in artistic fencing.',
        about_text3: 'Whether you dream of climbing the championship podium or just want to experience the thrill of this ancient art form. I am here to help you every step of the way. Contact me today to start an exciting adventure in the world of swordsmanship. Lets create something extraordinary together!',
    }
};

const projectsTranslations = {
    ru: {
        projects_title: 'Мои проекты',
        projects_text1: 'Постановочные боевые сцены для театра и кинопроизводства',
        projects_text2: 'Безопасная постановка боевых сцен для боевиков',
        projects_text3: 'Реконструкция средневековых и ренессансных боевых техник',
    },
    en: {
        projects_title: 'My Projects',
        projects_text1: 'Choreographed fight scenes for theater and film productions',
        projects_text2: 'Safety-focused fight scene direction for action movies',
        projects_text3: 'Reconstruction of medieval and renaissance combat techniques',
    }
};

const aboutSchoolTranslations = {
    ru: {
        school_title: 'О школе',
        school_text: 'Добро пожаловать в нашу школу фехтования. Наши уроки фехтования не только научат вас основам техники, таким как атака, защита и движение, но также помогут развить гибкость, координацию и силу. Каждый ученик получит внимание и поддержку для достижения максимальных результатов в своем развитии как фехтовальщика.',
    },
    en: {
        school_title: 'About School',
        school_text: 'Welcome to our fencing school. Our fencing lessons will not only teach you the basics of technique such as attack, defense and movement, but will also help you develop flexibility, coordination and strength. Each student will receive attention and support in order to achieve maximum results in their development as a swordsman.',
    }
};

const pricesTranslations = {
    ru: {
        prices_title: 'Прайс-лист',
        training_personal: 'Персональная тренировка',
        training_split: 'Сплит тренировка',
        training_group: 'Групповые тренировки',
        making_video: 'Съёмка видео',
        prices_duration: 'Продолжительность:',
        prices_price: 'Цена:',
        prices_description: 'Описание',
        prices_next: 'Далее',
    },
    en: {
        prices_title: 'Price list',
        training_personal: 'Personal training',
        training_split: 'Split training',
        training_group: 'Group training',
        making_video: 'Shooting video',
        prices_duration: 'Duration:',
        prices_price: 'Price:',
        prices_description: 'Description:',
        prices_next: 'Next',
    }
}

const contactsTranslations = {
    ru: {
        contact_title: 'Свяжитесь со мной',
        contact_name: 'Имя:',
        contact_name_placeholder: 'Ваше имя',
        contact_email: 'Email:',
        contact_email_placeholder: 'Пример@gmail.com',
        contact_lessons: 'Занятия:',
        weapon_sword: 'Меч',
        weapon_spear: 'Копьё',
        weapon_rapier: 'Рапира',
        weapon_sword_shield: 'Меч и щит',
        weapon_double_sword: 'Два меча',
        weapon_staff: 'Шест',
        contact_message: 'Сообщение:',
        contact_submit: 'Отправить сообщение',
    },
    en: {
        contact_title: 'Contact me',
        contact_name: 'Name:',
        contact_name_placeholder: 'Your name',
        contact_email: 'Email:',
        contact_email_placeholder: 'example@gmail.com',
        contact_lessons: 'Lessons:',
        weapon_sword: 'Sword',
        weapon_spear: 'Spear',
        weapon_rapier: 'Rapier',
        weapon_sword_shield: 'Sword and Shield',
        weapon_double_sword: 'Double swords',
        weapon_staff: 'Staff',
        contact_message: 'Message:',
        contact_submit: 'Send your message',
    }
};

const navbarTranslations = {
    ru: {
        contacts_title: 'Контакты',
        contacts_instagram: 'Инстаграм',
        contacts_instagram_desc: 'Личный блог',
        contacts_vk: 'ВКонтакте',
        contacts_vk_desc: 'Больше фото в альбомах',
        contacts_telegram: 'Телеграм',
        contacts_telegram_desc: 'Напишите мне',
    },
    en: {
        contacts_title: 'Contacts',
        contacts_instagram: 'Instagram',
        contacts_instagram_desc: 'Personal blog',
        contacts_vk: 'VKontakte',
        contacts_vk_desc: 'More photos in albums',
        contacts_telegram: 'Telegram',
        contacts_telegram_desc: 'Write me',
    }
};

let currentLang = 'en';

function translateMainPage(lang) {
    const elements = mainContainer.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (mainTranslations[lang]?.[key]) {
            element.textContent = mainTranslations[lang][key];
        }
    });
    
}

function translateMainMenu(lang) {
    const elements = menuContainer.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (menuTranslations[lang]?.[key]) {
            element.textContent = menuTranslations[lang][key];
        }
    });
}

function translateAboutMe(lang) {
    const elements = aboutMeContainer.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (aboutMeTranslations[lang]?.[key]) {
            element.textContent = aboutMeTranslations[lang][key];
        }
    });
}

function translateProjects(lang) {
    const elements = projectsContainer.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (projectsTranslations[lang]?.[key]) {
            element.textContent = projectsTranslations[lang][key];
        }
    });
}

function translateSchool(lang) {
    const elements = schoolContainer.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (aboutSchoolTranslations[lang]?.[key]) {
            element.textContent = aboutSchoolTranslations[lang][key];
        }
    });
}

function translatePrices(lang) {
    const elements = pricesContainer.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (pricesTranslations[lang]?.[key]) {
            element.textContent = pricesTranslations[lang][key];
        }
    });
}

function translateContacts(lang) {
    const elements = contactsContainer.querySelectorAll('[data-i18n]');
    const placeholderElements = contactsContainer.querySelectorAll('[data-i18n-placeholder]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (contactsTranslations[lang]?.[key]) {
            element.textContent = contactsTranslations[lang][key];
        }
    });
    
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (contactsTranslations[lang]?.[key]) {
            element.setAttribute('placeholder', contactsTranslations[lang][key]);
        }
    });
}

function translateNavbar(lang) {
    const elements = navbarContainer.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (navbarTranslations[lang]?.[key]) {
            element.textContent = navbarTranslations[lang][key];
        }
    });
}


function handleTranslateClick() {
    const nextLang = currentLang === 'en' ? 'ru' : 'en';
    
    translateMainPage(nextLang);
    translateMainMenu(nextLang);
    translateAboutMe(nextLang);
    translateProjects(nextLang);
    translateSchool(nextLang);
    translatePrices(nextLang);
    translateContacts(nextLang);
    translateNavbar(nextLang);

    flags[0].classList.toggle('active', nextLang === 'ru');
    flags[1].classList.toggle('active', nextLang === 'en');
    
    currentLang = nextLang;
}

function initTranslations() {
    if (translateButton) {
        translateMainPage(currentLang);
        translateMainMenu(currentLang);
        translateAboutMe(currentLang);
        translateProjects(currentLang);
        translateSchool(currentLang);
        translatePrices(currentLang);
        translateContacts(currentLang);
        translateNavbar(currentLang);

        translateButton.addEventListener('click', handleTranslateClick);
    }
}

initTranslations();



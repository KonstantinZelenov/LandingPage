export class ThemeSwitcher {
  constructor() {
    this.button = document.querySelector('.theme-switcher');
    this.icons = document.querySelectorAll('.theme-switcher__icon');
    this.themeKey = 'user-theme';
    
    this.init();
  }
  
  init() {
    // Загружаем сохраненную тему или устанавливаем темную по умолчанию
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme === 'light') {
      this.enableLightTheme();
    } else {
      this.enableDarkTheme();
    }
    
    // Добавляем обработчик клика
    this.button.addEventListener('click', () => this.toggleTheme());
  }
  
  toggleTheme() {
    if (document.body.classList.contains('theme-light')) {
      this.enableDarkTheme();
    } else {
      this.enableLightTheme();
    }
  }
  
  enableLightTheme() {
    document.body.classList.add('theme-light');
    this.updateIcons('light');
    localStorage.setItem(this.themeKey, 'light');
  }
  
  enableDarkTheme() {
    document.body.classList.remove('theme-light');
    this.updateIcons('dark');
    localStorage.setItem(this.themeKey, 'dark');
  }
  
  updateIcons(activeTheme) {
    this.icons.forEach(icon => {
      icon.classList.remove('active');
      
      const isDarkIcon = icon.src.includes('theme-icon-dark');
      const isLightIcon = icon.src.includes('theme-icon-light');
      
      if ((activeTheme === 'dark' && isDarkIcon) || 
          (activeTheme === 'light' && isLightIcon)) {
        icon.classList.add('active');
      }
    });
  }
}

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

export function initAnimations() {
  animateIcons('.lang-switcher', '.lang-switcher__flag');
  animateIcons('.contacts-button', '.contacts-button__icon');
  animateIcons('.theme-switcher', '.theme-switcher__icon');
}
export function initSwordsButtons() {
  'use strict';

  const buttons = document.querySelectorAll('.swords-button[data-swords-button]');
  
  if (!buttons.length) return;

  buttons.forEach(button => {
    let timeoutId = null;
    
    function toggleIcons(event) {
      if (!button) return;
      
      const iconsContainer = button.querySelector('.swords-button__icons');
      if (!iconsContainer) return;
      
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      
      const isActive = iconsContainer.classList.contains('active');
      const isClosing = iconsContainer.classList.contains('closing');
      
      if (isActive) {
        iconsContainer.classList.remove('active');
        iconsContainer.classList.add('closing');
        button.setAttribute('aria-expanded', 'false');
        
        timeoutId = setTimeout(() => {
          iconsContainer.classList.remove('closing');
          timeoutId = null;
        }, 800);
      } else if (!isClosing) {
        iconsContainer.classList.remove('closing');
        iconsContainer.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    }
    
    button.addEventListener('click', toggleIcons);
    
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleIcons(e);
      }
    });
    
    const iconsContainer = button.querySelector('.swords-button__icons');
    if (iconsContainer) {
      iconsContainer.setAttribute('data-no-animation', '');
      requestAnimationFrame(() => {
        iconsContainer.removeAttribute('data-no-animation');
      });
    }
  });
}
export function initSwordsButtons() {
  'use strict';
  const buttons = document.querySelectorAll('.swords-button[data-swords-button]');
  
  if (!buttons.length) return;
  
  // Функция для синхронизации всех кнопок
  function syncAllButtons(isActive) {
    buttons.forEach(btn => {
      const iconsContainer = btn.querySelector('.swords-button__icons');
      if (!iconsContainer) return;
      
      // Убираем текущие классы
      iconsContainer.classList.remove('active', 'closing');
      
      if (isActive) {
        iconsContainer.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        iconsContainer.classList.add('closing');
        btn.setAttribute('aria-expanded', 'false');
        
        // Убираем класс closing после анимации
        setTimeout(() => {
          if (iconsContainer) {
            iconsContainer.classList.remove('closing');
          }
        }, 800);
      }
    });
  }
  
  // Обработчик клика для каждой кнопки
  buttons.forEach(button => {
    let timeoutId = null;
    let isProcessing = false;
    
    function toggleIcons() {
      if (isProcessing) return;
      isProcessing = true;
      
      if (!button) return;
      
      const iconsContainer = button.querySelector('.swords-button__icons');
      if (!iconsContainer) return;
      
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      
      const isActive = iconsContainer.classList.contains('active');
      const isClosing = iconsContainer.classList.contains('closing');
      
      // Новое состояние после клика
      const newState = !isActive && !isClosing;
      
      // Синхронизируем все кнопки
      syncAllButtons(newState);
      
      // Диспатчим кастомное событие для внешнего мира
      const customEvent = new CustomEvent('swordsButtonToggle', {
        detail: { 
          isOpen: newState,
          sourceButton: button
        },
        bubbles: true
      });
      button.dispatchEvent(customEvent);
      
      setTimeout(() => {
        isProcessing = false;
      }, 100);
    }
    
    button.addEventListener('click', toggleIcons);
    
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleIcons();
      }
    });
    
    // Убираем начальную анимацию
    const iconsContainer = button.querySelector('.swords-button__icons');
    if (iconsContainer) {
      iconsContainer.setAttribute('data-no-animation', '');
      requestAnimationFrame(() => {
        iconsContainer.removeAttribute('data-no-animation');
      });
    }
  });
  
  // Возвращаем функцию для программного управления
  return {
    openAll: () => syncAllButtons(true),
    closeAll: () => syncAllButtons(false)
  };
}
import { closePopup } from './modal.js';

const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 20,
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u
  },
  mail: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 300
  }
};

const errorTexts = {
  name_required: 'Имя обязательно',
  name_minLength: 'Минимум 2 символа', 
  name_maxLength: 'Максимум 20 символов',
  name_pattern: 'Только буквы и дефисы',
  email_required: 'Email обязателен',
  email_pattern: 'Неверный формат email',
  message_required: 'Сообщение обязательно',
  message_minLength: 'Минимум 10 символов',
  message_maxLength: 'Максимум 1000 символов'
};

// 🔥 Функция для показа тост-уведомления (глобального)
function showToast(message, type = 'success') {
  // Удаляем старый тост, если есть
  const oldToast = document.querySelector('.global-toast');
  if (oldToast) oldToast.remove();
  
  const toast = document.createElement('div');
  toast.className = `global-toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    padding: 14px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    animation: slideInRight 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    ${type === 'success' 
      ? 'background-color: #4CAF50; color: white; border-left: 4px solid #2e7d32;' 
      : 'background-color: #ff4444; color: white; border-left: 4px solid #cc0000;'}
  `;
  
  // Добавляем анимацию
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(toast);
  
  // Авто-скрытие через 3 секунды
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (toast && toast.parentNode) toast.remove();
      if (style.parentNode) style.remove();
    }, 300);
  }, 3000);
}

function showPreloader() {
  const preloader = document.querySelector('.swords-preloader');
  if (preloader) preloader.style.display = 'flex';
}

function hidePreloader() {
  const preloader = document.querySelector('.swords-preloader');
  if (preloader) preloader.style.display = 'none';
}

function setSubmitButtonState(form, isSubmitting) {
  const submitButton = form.querySelector('.contact-form__button');
  if (!submitButton) return;
  
  if (isSubmitting) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = 'Отправка...';
  } else {
    submitButton.disabled = false;
    submitButton.textContent = submitButton.dataset.originalText || 'Send your message';
  }
}

function sanitizeInput(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // 🔥 Исправлено: Валидация ТОЛЬКО на blur (потеря фокуса)
  form.addEventListener('blur', (e) => {
    if (e.target.name in validationRules) {
      validateField(e.target);
      updateSubmitButtonState(form);
    }
  }, true);
  
  // 🔥 На input - только подсветка правильного заполнения, без показа ошибок
  form.addEventListener('input', (e) => {
    if (e.target.name in validationRules) {
      const value = e.target.value.trim();
      const rules = validationRules[e.target.name];
      let isValid = true;
      
      // Проверяем валидность в реальном времени без показа ошибок
      if (rules.required && !value) isValid = false;
      else if (rules.minLength && value.length < rules.minLength) isValid = false;
      else if (rules.maxLength && value.length > rules.maxLength) isValid = false;
      else if (rules.pattern && !rules.pattern.test(value)) isValid = false;
      
      if (isValid && value !== '') {
        e.target.classList.add('valid');
        e.target.classList.remove('error');
      } else if (value === '') {
        e.target.classList.remove('valid');
        e.target.classList.remove('error');
      } else {
        e.target.classList.remove('valid');
        e.target.classList.add('error');
      }
    }
  });

  form.addEventListener('submit', handleContactSubmit);
  
  // 🔥 Исправлено: НЕ проверяем форму при инициализации
  // Просто устанавливаем кнопку в активное состояние
  setSubmitButtonState(form, false);
}

function validateField(field) {
  const rules = validationRules[field.name];
  if (!rules) return true;
  
  const value = field.value.trim();
  const errorElement = document.querySelector(`[data-field="${field.name}"]`);
  
  if (!errorElement) return true;
  
  field.classList.remove('error', 'valid');
  errorElement.textContent = '';
  
  // Пустое поле при первом touch - не показываем ошибку
  if (!value && !field.classList.contains('touched')) {
    field.classList.add('touched');
    return true;
  }
  
  if (rules.required && !value) {
    showError(field, errorElement, `${field.name}_required`);
    return false;
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    showError(field, errorElement, `${field.name}_minLength`);
    return false;
  }
  
  if (rules.maxLength && value.length > rules.maxLength) {
    showError(field, errorElement, `${field.name}_maxLength`);
    return false;
  }
  
  if (rules.pattern && value && !rules.pattern.test(value)) {
    showError(field, errorElement, `${field.name}_pattern`);
    return false;
  }
  
  field.classList.add('valid');
  return true;
}

function showError(field, errorElement, errorKey) {
  field.classList.add('error');
  field.classList.remove('valid');
  errorElement.textContent = errorTexts[errorKey] || 'Ошибка';
}

function validateForm(form) {
  let isValid = true;
  
  for (let fieldName of Object.keys(validationRules)) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field && field.value.trim()) { // Проверяем только заполненные поля
      if (!validateField(field)) {
        isValid = false;
      }
    } else if (field && field.value.trim() === '') {
      // Пустые поля не считаем ошибкой до отправки
      field.classList.remove('error', 'valid');
    }
  }
  
  return isValid;
}

function updateSubmitButtonState(form) {
  // Проверяем все поля на валидность
  let allFieldsValid = true;
  
  for (let fieldName of Object.keys(validationRules)) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      const value = field.value.trim();
      const rules = validationRules[fieldName];
      
      if (rules.required && !value) {
        allFieldsValid = false;
        break;
      }
      if (rules.minLength && value.length < rules.minLength) {
        allFieldsValid = false;
        break;
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        allFieldsValid = false;
        break;
      }
      if (rules.pattern && value && !rules.pattern.test(value)) {
        allFieldsValid = false;
        break;
      }
    }
  }
  
  setSubmitButtonState(form, !allFieldsValid);
}

async function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  
  // Финальная валидация всех полей перед отправкой
  let isValid = true;
  for (let fieldName of Object.keys(validationRules)) {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field && !validateField(field)) {
      isValid = false;
    }
  }
  
  if (!isValid) {
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    showToast('Пожалуйста, исправьте ошибки в форме', 'error');
    return;
  }
  
  const formData = new FormData(form);
  const sanitizedData = {};
  
  for (let [key, value] of formData.entries()) {
    sanitizedData[key] = sanitizeInput(value);
  }
  
  let pricingData = {};
  try {
    pricingData = JSON.parse(sessionStorage.getItem('pricingData') || '{}');
  } catch (e) {
    console.warn('Failed to parse pricingData:', e);
  }
  
  // Блокируем кнопку и показываем прелоадер
  setSubmitButtonState(form, true);
  showPreloader();
  
  try {
    const baseURL = window.location.origin;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    const response = await fetch(`${baseURL}/api/send-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...sanitizedData, ...pricingData }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Скрываем прелоадер ДО закрытия формы
    hidePreloader();
    
    if (response.ok) {
      // Показываем тост об успехе
      showToast('Сообщение успешно отправлено! 🎉', 'success');
      
      // Небольшая задержка перед закрытием, чтобы пользователь увидел тост
      setTimeout(() => {
        const popup = form.closest('.popup');
        if (popup) closePopup(popup);
        sessionStorage.removeItem('pricingData');
        form.reset();
        setSubmitButtonState(form, false);
        
        // Сбрасываем классы валидации
        form.querySelectorAll('.valid, .error').forEach(el => {
          el.classList.remove('valid', 'error');
        });
      }, 500);
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Server error');
    }
  } catch (error) {
    console.error('Error:', error);
    hidePreloader();
    setSubmitButtonState(form, false);
    
    let errorMessage = '❌ Ошибка отправки. Попробуйте позже.';
    if (error.name === 'AbortError') {
      errorMessage = '⏱️ Сервер не отвечает. Проверьте соединение.';
    } else if (error.message.includes('Server error')) {
      errorMessage = '⚠️ Ошибка на сервере. Попробуйте позже.';
    }
    
    showToast(errorMessage, 'error');
  }
}
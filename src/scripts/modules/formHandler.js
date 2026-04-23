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
    maxLength: 1000
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

// 🔥 НОВОЕ: Показ уведомления внутри формы вместо alert
function showFormNotification(form, message, isError = true) {
  // Удаляем старое уведомление, если есть
  const oldNotification = form.querySelector('.form-notification');
  if (oldNotification) oldNotification.remove();
  
  const notification = document.createElement('div');
  notification.className = `form-notification ${isError ? 'form-notification--error' : 'form-notification--success'}`;
  notification.textContent = message;
  notification.style.cssText = `
    margin-top: 15px;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    ${isError ? 'background-color: rgba(255, 68, 68, 0.2); color: #ff4444; border: 1px solid #ff4444;' : 'background-color: rgba(76, 175, 80, 0.2); color: #4CAF50; border: 1px solid #4CAF50;'}
  `;
  
  form.appendChild(notification);
  
  // Авто-скрытие через 4 секунды
  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s';
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

function showPreloader() {
  const preloader = document.querySelector('.swords-preloader');
  if (preloader) preloader.style.display = 'flex';
}

function hidePreloader() {
  const preloader = document.querySelector('.swords-preloader');
  if (preloader) preloader.style.display = 'none';
}

// Блокировка/разблокировка кнопки отправки
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

  // 🔥 Валидация на input — показывает ошибки сразу
  form.addEventListener('input', (e) => {
    if (e.target.name in validationRules) {
      validateField(e.target);
      // Проверяем общее состояние формы
      const isFormValid = validateForm(form);
      setSubmitButtonState(form, !isFormValid); // если форма не валидна, кнопка disabled
    }
  });

  // 🔥 Валидация на blur — тоже проверяем
  form.addEventListener('blur', (e) => {
    if (e.target.name in validationRules) {
      validateField(e.target);
      const isFormValid = validateForm(form);
      setSubmitButtonState(form, !isFormValid);
    }
  }, true);

  form.addEventListener('submit', handleContactSubmit);
  
  // 🔥 При инициализации проверяем состояние кнопки
  const isFormValid = validateForm(form);
  setSubmitButtonState(form, !isFormValid);
}

function validateField(field) {
  const rules = validationRules[field.name];
  if (!rules) return true;
  
  const value = field.value.trim();
  const errorElement = document.querySelector(`[data-field="${field.name}"]`);
  
  if (!errorElement) return true;
  
  field.classList.remove('error');
  errorElement.textContent = '';
  
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
  
  if (rules.pattern && !rules.pattern.test(value)) {
    showError(field, errorElement, `${field.name}_pattern`);
    return false;
  }
  
  // 🔥 Добавляем класс valid при успехе
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
  
  Object.keys(validationRules).forEach(fieldName => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field && !validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

async function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  
  // Финальная валидация перед отправкой
  if (!validateForm(form)) {
    const firstError = form.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    showFormNotification(form, 'Пожалуйста, исправьте ошибки в форме');
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
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 секунд таймаут
    
    const response = await fetch(`${baseURL}/api/send-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...sanitizedData, ...pricingData }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      // Успех
      const popup = form.closest('.popup');
      if (popup) closePopup(popup);
      sessionStorage.removeItem('pricingData');
      form.reset();
      
      // 🔥 Показываем успех на родительском попапе или просто скрываем прелоадер
      hidePreloader();
      setSubmitButtonState(form, false);
      
      // Можно добавить уведомление об успехе, если нужно
      console.log('Message sent successfully');
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Server error');
    }
  } catch (error) {
    console.error('Error:', error);
    hidePreloader();
    setSubmitButtonState(form, false);
    
    // 🔥 Вместо alert — красивое уведомление
    let errorMessage = 'Ошибка отправки. Попробуйте позже.';
    if (error.name === 'AbortError') {
      errorMessage = 'Сервер не отвечает. Проверьте соединение.';
    } else if (error.message.includes('Server error')) {
      errorMessage = 'Ошибка на сервере. Попробуйте позже.';
    }
    
    showFormNotification(form, errorMessage);
  }
}
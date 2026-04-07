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


function showPreloader() {
  const preloader = document.querySelector('.swords-preloader');
  if (preloader) preloader.style.display = 'block';
}

function hidePreloader() {
  const preloader = document.querySelector('.swords-preloader');
  if (preloader) preloader.style.display = 'none';
}

// Функция для очистки входных данных от опасных символов
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

  form.addEventListener('input', (e) => {
    if (e.target.name in validationRules) {
      validateField(e.target);
    }
  });

  form.addEventListener('submit', handleContactSubmit);
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
  
  return true;
}

function showError(field, errorElement, errorKey) {
  field.classList.add('error');
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

/*async function handleContactSubmit(event) {
  event.preventDefault();
  
  if (!validateForm(event.target)) {
    const firstError = event.target.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }
  
  const formData = new FormData(event.target);
  const sanitizedData = {};
  
  for (let [key, value] of formData.entries()) {
    sanitizedData[key] = sanitizeInput(value);
  }
  
  const pricingData = JSON.parse(sessionStorage.getItem('pricingData') || '{}');й

  showPreloader();
  
  try {
    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/send-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...sanitizedData, ...pricingData })
    });
    
    if (response.ok) {
      hidePreloader();
      alert('Message sent successfully!');
      sessionStorage.removeItem('pricingData');
      event.target.reset();
      
      const popup = event.target.closest('.popup');
      if (popup) closePopup(popup);
    } else {
      throw new Error('Server error');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending message. Please try again.');
  }
}*/

async function handleContactSubmit(event) {
  event.preventDefault();
  
  if (!validateForm(event.target)) {
    const firstError = event.target.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }
  
  const formData = new FormData(event.target);
  const sanitizedData = {};
  
  for (let [key, value] of formData.entries()) {
    sanitizedData[key] = sanitizeInput(value);
  }
  
  const pricingData = JSON.parse(sessionStorage.getItem('pricingData') || '{}');

  showPreloader();
  
  try {
    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/send-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...sanitizedData, ...pricingData })
    });
    
    if (response.ok) {
      hidePreloader();
      const popup = event.target.closest('.popup');
      if (popup) closePopup(popup); 
      alert('Message sent successfully!');  
      sessionStorage.removeItem('pricingData');
      event.target.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending message. Please try again.');
  } finally {
    hidePreloader();
  }
}
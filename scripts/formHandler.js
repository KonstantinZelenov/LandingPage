import { closePopup } from './modal.js';

const validationRules = {
  name: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u
  },
  mail: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  message: {
    required: true,
    minLength: 10
  }
};

const errorTexts = {
  name_required: 'Имя обязательно',
  name_minLength: 'Минимум 2 символа', 
  name_pattern: 'Только буквы и дефисы',
  email_required: 'Email обязателен',
  email_pattern: 'Неверный формат email',
  message_required: 'Сообщение обязательно',
  message_minLength: 'Минимум 10 символов'
};

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
  const value = field.value.trim();
  const errorElement = document.querySelector(`[data-field="${field.name}"]`);
  
  if (!errorElement) return true;
  
  // Очищаем ошибку
  field.classList.remove('error');
  errorElement.textContent = '';
  
  // Проверяем правила
  if (rules.required && !value) {
    showError(field, errorElement, `${field.name}_required`);
    return false;
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    showError(field, errorElement, `${field.name}_minLength`);
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
  
  // Проверяем все поля
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
  
  if (!validateForm(event.target)) {
    // Показываем первую ошибку
    const firstError = event.target.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }
  
  const formData = new FormData(event.target);
  const pricingData = JSON.parse(sessionStorage.getItem('pricingData') || '{}');
  
  try {
    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/send-form`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...Object.fromEntries(formData), ...pricingData })
    });
    
    if (response.ok) {
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
}
import { validateFieldValue, validateFormData, validationRules } from './validation.js';
import { 
  showFieldError, 
  clearFieldError, 
  showFormPreloader, 
  hideFormPreloader,
  scrollToFirstError,
  showFormErrors,
  clearAllErrors
} from './formUI.js';
import { sanitizeFormData } from './sanitizer.js';
import { closePopup } from '../modal.js';

/**
 * Обработчик отправки формы
 * @param {Event} event
 */
async function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  // Валидация
  const { isValid, errors } = validateFormData(formData);
  
  if (!isValid) {
    clearAllErrors(form);
    showFormErrors(form, errors);
    scrollToFirstError(form);
    return;
  }
  
  // Подготовка данных
  const sanitizedData = sanitizeFormData(formData);
  const pricingData = JSON.parse(sessionStorage.getItem('pricingData') || '{}');
  
  const payload = {
    ...sanitizedData,
    ...pricingData
  };
  
  // Отправка
  try {
    showFormPreloader();
    
    const response = await fetch(`${window.location.origin}/api/send-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      // Успех
      const popup = form.closest('.popup');
      if (popup) {
        closePopup(popup);
      }
      
      sessionStorage.removeItem('pricingData');
      form.reset();
      clearAllErrors(form);
    } else {
      throw new Error(`Server error: ${response.status}`);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    alert('Ошибка отправки сообщения. Пожалуйста, попробуйте позже.');
  } finally {
    hideFormPreloader();
  }
}

/**
 * Инициализация формы контактов
 */
export function initContactForm() {
  const form = document.querySelector('.contact-form');
  
  if (!form) {
    console.warn('Contact form not found');
    return;
  }
  
  // Валидация при вводе
  form.addEventListener('input', (event) => {
    const field = event.target;
    
    // Проверяем, есть ли такое поле в правилах валидации
    if (field.name && field.name in validationRules) {
      const result = validateFieldValue(field.name, field.value);
      
      if (!result.isValid) {
        showFieldError(field, result.errorKey);
      } else {
        clearFieldError(field);
      }
    }
  });
  
  // Валидация при потере фокуса (опционально)
  form.addEventListener('blur', (event) => {
    const field = event.target;
    
    if (field.name && field.name in validationRules) {
      const result = validateFieldValue(field.name, field.value);
      
      if (!result.isValid) {
        showFieldError(field, result.errorKey);
      } else {
        clearFieldError(field);
      }
    }
  }, true);
  
  // Обработка отправки
  form.addEventListener('submit', handleContactSubmit);
}
import { closePopup } from './modal.js';
import { validateForm, createRealTimeValidator } from './validators.js';

let realTimeValidate;

export function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) return;
  
  initRealTimeValidation(contactForm);

  contactForm.addEventListener('submit', handleContactSubmit);
}

function initRealTimeValidation(form) {
  // Создаем валидатор с дебаунсом
  realTimeValidate = createRealTimeValidator((fieldName, result) => {
    showFieldError(fieldName, result);
  });
  
  // Находим поля и вешаем обработчики
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#mail');
  const messageInput = form.querySelector('#message');
  
  if (nameInput) {
    nameInput.addEventListener('input', () => realTimeValidate('name', nameInput.value));
    nameInput.addEventListener('blur', () => realTimeValidate('name', nameInput.value));
  }
  
  if (emailInput) {
    emailInput.addEventListener('input', () => realTimeValidate('email', emailInput.value));
    emailInput.addEventListener('blur', () => realTimeValidate('email', emailInput.value));
  }
  
  if (messageInput) {
    messageInput.addEventListener('blur', () => realTimeValidate('message', messageInput.value));
  }
}

function showFieldError(fieldName, validationResult) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const errorElement = document.querySelector(`[data-field="${fieldName}"]`);
  
  if (!field || !errorElement) return;
  
  // Очищаем предыдущие стили
  field.classList.remove('error', 'valid');
  errorElement.textContent = '';
  
  if (validationResult.isValid) {
    field.classList.add('valid');
  } else {
    field.classList.add('error');
    // Показываем первую ошибку
    const firstError = validationResult.errors[0];
    errorElement.textContent = getTranslatedError(firstError);
  }
}

function showAllErrors(formErrors) {
  // Показываем все ошибки при отправке
  Object.keys(formErrors).forEach(fieldName => {
    const validationResult = {
      isValid: false,
      errors: formErrors[fieldName]
    };
    showFieldError(fieldName, validationResult);
  });
  
  // Скроллим к первой ошибке
  const firstErrorField = document.querySelector('.contact-form__input.error');
  if (firstErrorField) {
    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstErrorField.focus();
  }
}

function getTranslatedError(errorKey) {
  // Здесь будет связь с твоей системой перевода
  // Пока возвращаем русские тексты
  const errorTexts = {
    'name_required': 'Имя обязательно для заполнения',
    'name_minLength': 'Имя должно содержать минимум 2 символа',
    'name_maxLength': 'Имя не должно превышать 50 символов',
    'name_pattern': 'Имя может содержать только буквы, пробелы и дефисы',
    'name_validate': 'Введите реальное имя',
    
    'email_required': 'Email обязателен для заполнения',
    'email_pattern': 'Введите корректный email адрес',
    'email_validate': 'Проверьте правильность email адреса',
    
    'lesson_type_required': 'Выберите тип оружия для тренировки',
    
    'message_required': 'Сообщение обязательно для заполнения',
    'message_minLength': 'Сообщение должно содержать минимум 10 символов',
    'message_maxLength': 'Сообщение не должно превышать 1000 символов',
    'message_validate': 'Сообщение содержит недопустимые слова или символы'
  };
  
  return errorTexts[errorKey] || 'Ошибка валидации';
}

function getFormData(form) {
  const formData = new FormData(form);
  return {
    name: formData.get('name'),
    mail: formData.get('mail'),
    lesson_type: formData.get('lesson_type'),
    message: formData.get('message')
  };
}

async function handleContactSubmit(event) {
  event.preventDefault();
  
  // Получаем данные формы
  const formData = getFormData(event.target);
  
  // ВАЛИДАЦИЯ: НОВЫЙ КОД
  const validation = validateForm(formData);
  
  if (!validation.isValid) {
    showAllErrors(validation.errors);
    return; // Останавливаем отправку если есть ошибки
  }
  // КОНЕЦ ВАЛИДАЦИИ
  
  // Получаем данные из sessionStorage
  const pricingData = JSON.parse(sessionStorage.getItem('pricingData') || '{}');
  
  // Объединяем данные в плоскую структуру
  const submissionData = {
    ...formData,
    ...pricingData
  };
  
  try {
    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/send-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    });
    
    if (response.ok) {
      // Успешная отправка
      alert('Message sent successfully!');
      
      // Очищаем sessionStorage и форму
      sessionStorage.removeItem('pricingData');
      event.target.reset();
      
      // Закрываем попап
      const popup = event.target.closest('.popup');
      if (popup) {
        closePopup(popup);
      }
    } else {
      throw new Error('Server response was not ok');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('There was an error sending your message. Please try again.');
  }
}



/*
2. Loading states:

javascript
// В handleContactSubmit
const submitBtn = event.target.querySelector('button[type="submit"]');
const originalText = submitBtn.textContent;
submitBtn.disabled = true;
submitBtn.textContent = 'Sending...';

// В finally или после response
submitBtn.disabled = false;
submitBtn.textContent = originalText;
3. Вместо alert():

css
 Добавить стили для уведомлений 
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 5px;
  z-index: 10000;
}
.notification.success { background: green; }
.notification.error { background: red; } */



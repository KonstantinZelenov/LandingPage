// validation.js
export const validationRules = {
  name: { required: true, minLength: 2, maxLength: 20, pattern: /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u },
  mail: { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  message: { required: true, minLength: 10, maxLength: 1000 }
};

export const errorMessages = {
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

export function validateFieldValue(name, value) {
  const rules = validationRules[name];
  if (!rules) return { isValid: true };
  
  if (rules.required && !value) {
    return { isValid: false, errorKey: `${name}_required` };
  }
  if (rules.minLength && value.length < rules.minLength) {
    return { isValid: false, errorKey: `${name}_minLength` };
  }
  // ... остальные проверки
  
  return { isValid: true };
}

export function validateFormData(formData) {
  const errors = {};
  Object.keys(validationRules).forEach(name => {
    const result = validateFieldValue(name, formData.get(name) || '');
    if (!result.isValid) errors[name] = result.errorKey;
  });
  return { isValid: Object.keys(errors).length === 0, errors };
}
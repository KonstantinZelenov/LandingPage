export const validationRules = {
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

export const errorMessages = {
  name_required: 'Имя обязательно',
  name_minLength: 'Минимум 2 символа',
  name_maxLength: 'Максимум 20 символов',
  name_pattern: 'Только буквы и дефисы',
  mail_required: 'Email обязателен',
  mail_pattern: 'Неверный формат email',
  message_required: 'Сообщение обязательно',
  message_minLength: 'Минимум 10 символов',
  message_maxLength: 'Максимум 1000 символов'
};

/**
 * Валидация одного поля
 * @param {string} name - имя поля
 * @param {string} value - значение поля
 * @returns {{isValid: boolean, errorKey?: string}}
 */
export function validateFieldValue(name, value) {
  const rules = validationRules[name];
  if (!rules) return { isValid: true };
  
  const trimmedValue = value?.trim() || '';
  
  // Required check
  if (rules.required && !trimmedValue) {
    return { isValid: false, errorKey: `${name}_required` };
  }
  
  // Min length check
  if (rules.minLength && trimmedValue.length < rules.minLength) {
    return { isValid: false, errorKey: `${name}_minLength` };
  }
  
  // Max length check
  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    return { isValid: false, errorKey: `${name}_maxLength` };
  }
  
  // Pattern check
  if (rules.pattern && trimmedValue && !rules.pattern.test(trimmedValue)) {
    return { isValid: false, errorKey: `${name}_pattern` };
  }
  
  return { isValid: true };
}

/**
 * Валидация всей формы
 * @param {FormData} formData
 * @returns {{isValid: boolean, errors: Object}}
 */
export function validateFormData(formData) {
  const errors = {};
  
  Object.keys(validationRules).forEach(name => {
    const value = formData.get(name) || '';
    const result = validateFieldValue(name, value);
    
    if (!result.isValid) {
      errors[name] = result.errorKey;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
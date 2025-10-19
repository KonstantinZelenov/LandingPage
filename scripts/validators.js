export const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u, // Только буквы, пробелы, дефисы, апострофы
    validate: (value) => {
      // Проверка на повторяющиеся символы "ааааа"
      if (/(.)\1{4,}/.test(value)) {
        return false;
      }
      // Проверка на осмысленность (хотя бы 2 разных символа)
      const uniqueChars = new Set(value.replace(/\s/g, ''));
      return uniqueChars.size >= 2;
    }
  },
  
  mail: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // Обязательно @ и домен 2+ символа
    validate: (value) => {
      // Дополнительные проверки email
      if (value.length < 5) return false;
      if (value.includes('..')) return false; // Две точки подряд
      if (value.startsWith('.') || value.endsWith('.')) return false;
      return true;
    }
  },
  
  lesson_type: {
    required: true
  },
  
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    validate: (value) => {
      // Проверка на спам/бессмыслицу
      const spamWords = ['viagra', 'casino', 'http://', 'https://'];
      if (spamWords.some(word => value.toLowerCase().includes(word))) {
        return false;
      }
      // Проверка на повторяющиеся слова/символы
      if (/(.)\1{10,}/.test(value)) return false; // 10+ одинаковых символов подряд
      if (/(\b\w+\b)\s+\1\s+\1/.test(value)) return false; // 3+ одинаковых слова подряд
      
      return true;
    }
  }
};

// Сообщения об ошибках
export const errorMessages = {
  name: {
    required: 'name_required',
    minLength: 'name_minLength', 
    maxLength: 'name_maxLength',
    pattern: 'name_pattern',
    validate: 'name_validate'
  },
  
  email: {
    required: 'email_required',
    pattern: 'email_pattern',
    validate: 'email_validate'
  },
  
  lesson_type: {
    required: 'lesson_type_required'
  },
  
  message: {
    required: 'message_required',
    minLength: 'message_minLength',
    maxLength: 'message_maxLength', 
    validate: 'message_validate'
  }
};

// Функции валидации отдельных полей
export function validateField(fieldName, value) {
  const rules = validationRules[fieldName];
  if (!rules) return { isValid: true };
  
  const errors = [];
  
  // Проверка на обязательность
  if (rules.required && (!value || value.trim() === '')) {
    errors.push(errorMessages[fieldName].required);
    return { isValid: false, errors };
  }
  
  // Если поле не обязательное и пустое - ок
  if (!rules.required && (!value || value.trim() === '')) {
    return { isValid: true, errors: [] };
  }
  
  // Проверка минимальной длины
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(errorMessages[fieldName].minLength);
  }
  
  // Проверка максимальной длины  
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(errorMessages[fieldName].maxLength);
  }
  
  // Проверка паттерна
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(errorMessages[fieldName].pattern);
  }
  
  // Кастомная валидация
  if (rules.validate && !rules.validate(value)) {
    errors.push(errorMessages[fieldName].validate);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Валидация всей формы
export function validateForm(formData) {
  const errors = {};
  let isValid = true;
  
  Object.keys(validationRules).forEach(fieldName => {
    const value = formData[fieldName];
    const validation = validateField(fieldName, value);
    
    if (!validation.isValid) {
      errors[fieldName] = validation.errors;
      isValid = false;
    }
  });
  
  return { isValid, errors };
}

// Real-time валидация с дебаунсом
export function createRealTimeValidator(callback, delay = 800) {
  let timeout;
  
  return function(fieldName, value) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // Валидируем только если есть достаточное количество символов
      const minChars = fieldName === 'email' ? 3 : 2;
      if (value && value.length >= minChars) {
        const result = validateField(fieldName, value);
        callback(fieldName, result);
      }
    }, delay);
  };
}
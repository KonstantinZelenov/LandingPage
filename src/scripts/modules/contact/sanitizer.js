// src/modules/contact/sanitizer.js

/**
 * Очистка строки от опасных HTML символов
 * @param {string} text
 * @returns {string}
 */
export function sanitizeInput(text) {
  if (typeof text !== 'string') return text;
  
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };
  
  return text
    .replace(/[&<>"']/g, char => htmlEntities[char])
    .trim();
}

/**
 * Очистка всех данных формы
 * @param {FormData} formData
 * @returns {Object}
 */
export function sanitizeFormData(formData) {
  const sanitized = {};
  
  for (let [key, value] of formData.entries()) {
    sanitized[key] = sanitizeInput(value);
  }
  
  return sanitized;
}
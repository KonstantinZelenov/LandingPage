// src/modules/contact/formUI.js

import { errorMessages } from './validation.js';

/**
 * Показать ошибку для поля
 * @param {HTMLElement} field - DOM элемент поля
 * @param {string} errorKey - ключ ошибки
 */
export function showFieldError(field, errorKey) {
  const errorElement = document.querySelector(`[data-field="${field.name}"]`);
  
  if (errorElement) {
    field.classList.add('error');
    errorElement.textContent = errorMessages[errorKey] || 'Ошибка валидации';
  }
}

/**
 * Очистить ошибку поля
 * @param {HTMLElement} field - DOM элемент поля
 */
export function clearFieldError(field) {
  const errorElement = document.querySelector(`[data-field="${field.name}"]`);
  
  if (errorElement) {
    field.classList.remove('error');
    errorElement.textContent = '';
  }
}

/**
 * Очистить все ошибки формы
 * @param {HTMLFormElement} form
 */
export function clearAllErrors(form) {
  const errorFields = form.querySelectorAll('.error');
  errorFields.forEach(field => field.classList.remove('error'));
  
  const errorMessages = form.querySelectorAll('[data-field]');
  errorMessages.forEach(msg => msg.textContent = '');
}

/**
 * Показать прелоадер
 */
export function showFormPreloader() {
  const preloader = document.querySelector('.swords-preloader');
  if (preloader) {
    preloader.style.display = 'flex';
  }
}

/**
 * Скрыть прелоадер
 */
export function hideFormPreloader() {
  const preloader = document.querySelector('.swords-preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
}

/**
 * Скролл к первой ошибке
 * @param {HTMLFormElement} form
 */
export function scrollToFirstError(form) {
  const firstError = form.querySelector('.error');
  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstError.focus();
  }
}

/**
 * Отобразить все ошибки формы
 * @param {HTMLFormElement} form
 * @param {Object} errors - объект с ошибками { fieldName: errorKey }
 */
export function showFormErrors(form, errors) {
  Object.entries(errors).forEach(([fieldName, errorKey]) => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      showFieldError(field, errorKey);
    }
  });
}
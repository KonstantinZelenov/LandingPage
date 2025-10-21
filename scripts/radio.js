const trainingData = {
  personal: {
    duration: '1 hour',
    price: '50 usd',
    description: 'Hall rent is paid separately. In an hour we manage to warm up, learn fencing elements and basic acrobatic elements, and cool down.'
  },
  split: {
    duration: '1.5 hour', 
    price: '60 usd',
    description: 'In an hour we manage to warm up, learn fencing elements, and cool down.'
  },
  group: {
    duration: '2 hour',
    price: '100 usd',
    description: 'Hall rental is included in the price. In 2 hours we manage to warm up, learn fencing elements, and cool down.'
  },
  video: {
    duration: '3 hour',
    price: '120 usd',
    description: 'Rent a location or transfer to a location separately. We are making a movie with you in the title role. The idea and costumes are discussed in advance.'
  }
};

const fields = {
  duration: document.getElementById('duration'),
  prices: document.getElementById('prices'),
  description: document.getElementById('description')
};

function getTrainingData(type) {
  return trainingData[type] || { duration: '', price: '', description: '' };
}

function handleTrainingTypeChange(event) {
  const data = getTrainingData(event.target.value);
  
  fields.duration.value = data.duration;
  fields.prices.value = data.price;
  fields.description.value = data.description;
}

export function savePricingData() {
  const trainingType = document.querySelector('input[name="trainingType"]:checked');
  if (!trainingType) return false;
  
  const pricingData = {
    trainingType: trainingType.value,
    ...Object.fromEntries(
      Object.entries(fields).map(([key, field]) => [key, field.value])
    )
  };
  
  sessionStorage.setItem('pricingData', JSON.stringify(pricingData));
  return true;
}

function initPricingForm() {
  document.querySelectorAll('.training-types__radio').forEach(radio => {
    radio.addEventListener('change', handleTrainingTypeChange);
  });
  
  // Автовыбор первого варианта
  const firstRadio = document.querySelector('.training-types__radio');
  if (firstRadio) {
    firstRadio.checked = true;
    firstRadio.dispatchEvent(new Event('change'));
  }
}

document.addEventListener('DOMContentLoaded', initPricingForm);

/*const trainingData = {
  personal: {
    duration: '1 hour',
    price: '50 usd',
    description: 'Hall rent is paid separately. In an hour we manage to warm up, learn fencing elements and basic acrobatic elements, and cool down.'
  },
  split: {
    duration: '1.5 hour', 
    price: '60 usd',
    description: 'In an hour we manage to warm up, learn fencing elements, and cool down.'
  },
  group: {
    duration: '2 hour',
    price: '100 usd',
    description: 'Hall rental is included in the price. In 2 hours we manage to warm up, learn fencing elements, and cool down.'
  },
  video: {
    duration: '3 hour',
    price: '120 usd',
    description: 'Rent a location or transfer to a location separately. We are making a movie with you in the title role. The idea and costumes are discussed in advance.'
  }
};

function handleTrainingTypeChange(event) {
  const durationField = document.getElementById('duration');
  const pricesField = document.getElementById('prices');
  const descriptionField = document.getElementById('description');
  
  const selectedValue = event.target.value;
  
  durationField.value = '';
  pricesField.value = '';
  descriptionField.value = '';
  
  if (event.target.checked && trainingData[selectedValue]) {
    const data = trainingData[selectedValue];
    durationField.value = data.duration;
    pricesField.value = data.price;
    descriptionField.value = data.description;
  }
}


// Функция для сохранения данных ценообразования в sessionStorage
export function savePricingData() {
  const trainingType = document.querySelector('input[name="trainingType"]:checked');
  const duration = document.getElementById('duration');
  const price = document.getElementById('prices');
  const description = document.getElementById('description');
  
  if (trainingType && duration && price && description) {
    const pricingData = {
      trainingType: trainingType.value,
      duration: duration.value,
      price: price.value,
      description: description.value
    };
    
    sessionStorage.setItem('pricingData', JSON.stringify(pricingData));
    return true;
  }
  return false;
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем обработчики на все радиокнопки
  document.querySelectorAll('.training-types__radio').forEach(radio => {
    radio.addEventListener('change', handleTrainingTypeChange);
  });
  
  // Выбираем Personal training по умолчанию
  const personalRadio = document.getElementById('personal');
  if (personalRadio) {
    personalRadio.checked = true;
    document.getElementById('duration').value = trainingData.personal.duration;
    document.getElementById('prices').value = trainingData.personal.price;
    document.getElementById('description').value = trainingData.personal.description;
  }
}); */






  /*


  function getSelectedTrainingType() {
  const selected = document.querySelector('input[name="trainingType"]:checked');
  return selected ? selected.value : null;
}

// Установить выбранный тип тренировки
function setSelectedTrainingType(value) {
  const radio = document.querySelector(`input[name="trainingType"][value="${value}"]`);
  if (radio) {
    radio.checked = true;
  }
}

// Сбросить выбор типа тренировки
function resetTrainingType() {
  const selected = document.querySelector('input[name="trainingType"]:checked');
  if (selected) {
    selected.checked = false;
  }
}

// Получить все данные формы
function getFormData() {
  const form = document.querySelector('.prices-form');
  const formData = new FormData(form);
  
  return {
    trainingType: getSelectedTrainingType(),
    duration: formData.get('duration'),
    price: formData.get('prices'),
    description: formData.get('description')
  };
}

// Валидация формы
function validateForm() {
  const trainingType = getSelectedTrainingType();
  const price = document.querySelector('#prices').value;
  
  const errors = [];
  
  if (!trainingType) {
    errors.push('Выберите тип тренировки');
  }
  
  if (!price || price <= 0) {
    errors.push('Укажите корректную цену');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Обработчик для кнопки "Next"
function handleNextButton() {
  const validation = validateForm();
  
  if (validation.isValid) {
    const formData = getFormData();
    console.log('Данные формы:', formData);
    
    // Здесь можно отправить данные на сервер
    // или перейти к следующему шагу
    alert('Форма заполнена корректно! Данные: ' + JSON.stringify(formData));
  } else {
    alert('Ошибки в форме:\n' + validation.errors.join('\n'));
  }
}

// Слушатель изменений радиокнопок (опционально)
function setupTrainingTypeListeners() {
  const radios = document.querySelectorAll('input[name="trainingType"]');
  
  radios.forEach(radio => {
    radio.addEventListener('change', (event) => {
      console.log('Выбран тип тренировки:', event.target.value);
      
      // Можно добавить логику в зависимости от выбора
      switch (event.target.value) {
        case 'personal':
          // Дополнительные действия для персональной тренировки
          break;
        case 'group':
          // Дополнительные действия для групповой тренировки
          break;
        // и т.д.
      }
    });
  });
}

// Обработчик закрытия popup
function setupPopupClose() {
  const closeButton = document.querySelector('.popup__close-button');
  const popup = document.querySelector('.popup_prices');
  
  if (closeButton && popup) {
    closeButton.addEventListener('click', () => {
      // Логика закрытия popup
      popup.style.display = 'none';
      resetForm();
    });
  }
}

// Сброс формы
function resetForm() {
  const form = document.querySelector('.prices-form');
  form.reset();
  resetTrainingType();
}

// Инициализация всех обработчиков
function initPricesForm() {
  const nextButton = document.querySelector('.prices-form__button');
  
  if (nextButton) {
    nextButton.addEventListener('click', handleNextButton);
  }
  
  setupTrainingTypeListeners();
  setupPopupClose();
  
  console.log('Форма цен инициализирована');
}

// Запуск при загрузке DOM
document.addEventListener('DOMContentLoaded', initPricesForm);

// Экспорт функций для использования в других модулях (если нужно)
window.PricesForm = {
  getSelectedTrainingType,
  setSelectedTrainingType,
  getFormData,
  validateForm,
  resetForm
};
} */



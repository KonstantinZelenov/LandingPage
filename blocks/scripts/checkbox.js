/*ВЫБИРАЕМ 1 ЧЕКБОКС, ОСТАЛЬНЫЕ ОТКЛЮЧАЮТСЯ */

/*Функция для обработки выбора флажка*/ 
function handleCheckboxSelection(event) { 
  const checkboxes = document.querySelectorAll('.checkbox'); 
  checkboxes.forEach(checkbox => { 
    if (checkbox !== event.target) { 
      checkbox.checked = false; 
    } 
  }); 

/* Обновить поля на основе выбора флажка */
const field1 = document.getElementById('duration'); 
const field2 = document.getElementById('price'); 
const field3 = document.getElementById('description'); 

if (event.target.value === 'option-one') { 
  field1.value = event.target.checked ? '1 hour' : ''; 
  field2.value = '50 usd'; 
  field3.value = 'Hall rent is paid separately. In an hour we manage to warm up, learn fencing elements and basic acrobatic elements, and cool down.'; } 
  
  else if (event.target.value === 'option-two') { field1.value = '1.5 hour'; 
  field2.value = event.target.checked ? '60 usd' : ''; 
  field3.value = 'In an hour we manage to warm up, learn fencing elements, and cool down.'; }
  
  else if (event.target.value === 'option-three') { field1.value = '2 hour'; 
  field2.value = '100'; 
  field3.value = event.target.checked ? 'Hall rental is included in the price. In 2 hours we manage to warm up, learn fencing elements, and cool down.' : ''; } 

  else if (event.target.value === 'option-four') { field1.value = '3 hour'; 
  field2.value = '120 usd'; 
  field3.value = event.target.checked ? 'Rent a location or transfer to a location separately. We are making a movie with you in the title role. The idea and costumes are discussed in advance.' : ''; }

} 
  /* Добавляем слушателя события для чекбоксов */ 
  document.querySelectorAll('.checkbox').forEach(checkbox => { 
    checkbox.addEventListener('change', handleCheckboxSelection);
  });

  /*ЗАКОНЧИЛИ С ЧЕКБОКСАМИ */


  /* Получаем доступ к полю ввода
const descriptionInput = document.getElementById("description");

// Добавляем текст в поле ввода
descriptionInput.value = "Hall rent is paid separately. In an hour we manage to warm up, learn fencing elements and basic acrobatic elements, and cool down.";

// Определяем высоту содержимого
let contentHeight = getComputedStyle(descriptionInput).getPropertyValue("height");
contentHeight = parseInt(contentHeight);

// Изменяем высоту поля ввода
descriptionInput.style.height = `${contentHeight + 20}px`; // Добавляем дополнительные 20 пикселей */

/* Создаём объект с данными о вариантах выбора
const options = {
  'option-one': {
    duration: '1 hour',
    price: '50 usd',
    description: 'Hall rent is paid separately. In an hour we manage to warm up, learn fencing elements and basic acrobatic elements, and cool down.'
  },
  'option-two': {
    duration: '1 hour',
    price: '',
    description: 'desc'
  },
  // ... Другие варианты
};

// Получаем значения полей
const field1 = document.querySelector('#duration');
const field2 = document.querySelector('#price');
const field3 = document.querySelector('#description');

// Обрабатываем событие изменения чекбокса
document.querySelectorAll('.checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', handleCheckboxSelection);
});

function handleCheckboxSelection() {
  // Получаем выбранный вариант
  const selectedOption = this.value;

  // Устанавливаем значения полей
  field1.value = options[selectedOption].duration;
  field2.value = options[selectedOption].price;
  field3.value = options[selectedOption].description;
} */



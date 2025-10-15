// formHandler.js
import { closePopup } from './modal.js';

export function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', handleContactSubmit);
}

async function handleContactSubmit(event) {
  event.preventDefault();
  
  // Получаем данные из sessionStorage
  const pricingData = JSON.parse(sessionStorage.getItem('pricingData') || '{}');
  
  // Получаем данные из контактной формы
  const formData = new FormData(event.target);
  const contactData = {
    name: formData.get('name'),
    mail: formData.get('mail'),
    lesson_type: formData.get('lesson_type'),
    message: formData.get('message')
  };
  
  // Объединяем данные в плоскую структуру
  const submissionData = {
    ...contactData,
    ...pricingData
  };


  // ВРЕМЕННО: Выводим объект в консоль для проверки
  console.log('📦 Данные для отправки на сервер:', submissionData);
  console.log('🔍 Разбор данных:');
  console.log('   👤 Имя:', submissionData.name);
  console.log('   📧 Email:', submissionData.mail);
  console.log('   🗡️ Тип урока:', submissionData.lesson_type);
  console.log('   💬 Сообщение:', submissionData.message);
  console.log('   🏋️‍♂️ Тип тренировки:', submissionData.trainingType);
  console.log('   ⏱️ Длительность:', submissionData.duration);
  console.log('   💰 Цена:', submissionData.price);
  console.log('   📝 Описание:', submissionData.description);
  
  // TODO: временно отключаем отправку для тестирования
  console.log('🚫 Отправка на сервер временно отключена для тестирования');
  return; 
  
  try {
    // Отправляем на сервер
    const response = await fetch('/api/send-form', {
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
export default async function handler(request, response) {
  // CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  if (request.method !== 'POST') {
    return response.status(405).json({ 
      success: false, 
      error: 'Only POST allowed' 
    });
  }
  
  try {
    // Vercel уже парсит body - используем готовое
    const formData = request.body || {};
    
    // Простая валидация
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
      errors.push('Имя обязательно');
    } else if (formData.name.length < 2 || formData.name.length > 30) {
      errors.push('Имя от 2 до 30 символов');
    }
    
    if (!formData.mail || formData.mail.trim() === '') {
      errors.push('Email обязателен');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.mail)) {
        errors.push('Неверный формат email');
      }
    }
    
    if (!formData.message || formData.message.trim() === '') {
      errors.push('Сообщение обязательно');
    } else if (formData.message.length < 10 || formData.message.length > 1000) {
      errors.push('Сообщение от 10 до 1000 символов');
    }
    
    if (errors.length > 0) {
      return response.status(400).json({ 
        success: false, 
        error: errors.join(', ')
      });
    }
    
    // Простое экранирование без HTML
    const cleanText = (text) => {
      if (!text) return 'Не указано';
      return String(text).replace(/[<>_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
    };
    
    // Проверка переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.error('Missing Telegram env vars');
      return response.status(500).json({ 
        success: false, 
        error: 'Server config error' 
      });
    }
    
    // Формируем сообщение
    const message = `
🎯 НОВАЯ ЗАЯВКА

👤 Имя: ${cleanText(formData.name)}
📧 Email: ${cleanText(formData.mail)}
🗡️ Оружие: ${cleanText(formData.lesson_type)}
💬 Сообщение: ${cleanText(formData.message)}
🏋️ Тренировка: ${cleanText(formData.trainingType)}
⏱️ Длительность: ${cleanText(formData.duration)}
💰 Стоимость: ${cleanText(formData.prices)}
📝 Описание: ${cleanText(formData.description)}
🕒 Время: ${new Date().toLocaleString('ru-RU')}
    `.trim();
    
    // Отправка с таймаутом
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
          // Без parse_mode - безопасно
        }),
        signal: controller.signal
      }
    );
    
    clearTimeout(timeoutId);
    const tgData = await tgResponse.json();
    
    if (tgData.ok) {
      response.status(200).json({ 
        success: true, 
        message: 'Отправлено!' 
      });
    } else {
      console.error('Telegram error:', tgData);
      response.status(500).json({ 
        success: false, 
        error: 'Ошибка отправки' 
      });
    }
    
  } catch (error) {
    console.error('Server error:', error);
    
    if (error.name === 'AbortError') {
      response.status(408).json({ 
        success: false, 
        error: 'Таймаут отправки' 
      });
    } else {
      response.status(500).json({ 
        success: false, 
        error: 'Ошибка сервера' 
      });
    }
  }
}
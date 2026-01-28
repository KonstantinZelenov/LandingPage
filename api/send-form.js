// send-form.js
export default async function handler(request, response) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  // Only POST allowed
  if (request.method !== 'POST') {
    return response.status(405).json({ 
      success: false, 
      error: 'Only POST allowed' 
    });
  }
  
  try {
    // Read request body
    let body = '';
    for await (const chunk of request) {
      body += chunk;
    }
    
    // Check if body is empty
    if (!body) {
      return response.status(400).json({ 
        success: false, 
        error: 'Empty request body' 
      });
    }
    
    // Parse JSON
    let formData;
    try {
      formData = JSON.parse(body);
    } catch (parseError) {
      return response.status(400).json({ 
        success: false, 
        error: 'Invalid JSON format' 
      });
    }
    
    // === СЕРВЕРНАЯ ВАЛИДАЦИЯ (обязательно!) ===
    const validationErrors = [];
    
    // Required fields
    if (!formData.name || formData.name.trim() === '') {
      validationErrors.push('Имя обязательно');
    }
    
    if (!formData.mail || formData.mail.trim() === '') {
      validationErrors.push('Email обязателен');
    }
    
    if (!formData.message || formData.message.trim() === '') {
      validationErrors.push('Сообщение обязательно');
    }
    
    // Email format
    if (formData.mail) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.mail)) {
        validationErrors.push('Неверный формат email');
      }
    }
    
    // Name validation
    if (formData.name) {
      // Length
      if (formData.name.length < 2 || formData.name.length > 20) {
        validationErrors.push('Имя должно быть от 2 до 20 символов');
      }
      // Characters
      const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u;
      if (!nameRegex.test(formData.name)) {
        validationErrors.push('Имя содержит недопустимые символы');
      }
    }
    
    // Message length
    if (formData.message && (formData.message.length < 10 || formData.message.length > 1000)) {
      validationErrors.push('Сообщение должно быть от 10 до 1000 символов');
    }
    
    // If validation errors, return them
    if (validationErrors.length > 0) {
      return response.status(400).json({ 
        success: false, 
        error: validationErrors.join(', ') 
      });
    }
    
    // === ОЧИСТКА ДАННЫХ ДЛЯ TELEGRAM ===
    // (так как ты используешь parse_mode: 'HTML')
    const sanitizeForTelegram = (text) => {
      if (typeof text !== 'string') return String(text);
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
    
    // Check environment variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram environment variables');
      return response.status(500).json({ 
        success: false, 
        error: 'Server configuration error' 
      });
    }
    
    // Format message with sanitized data
    const message = `
🎯 НОВАЯ ЗАЯВКА С ЛЕНДИНГА!
👤 Имя: ${sanitizeForTelegram(formData.name)}
📧 Email: ${sanitizeForTelegram(formData.mail)}
🗡️ Оружие: ${sanitizeForTelegram(formData.lesson_type || 'Не указано')}
💬 Сообщение: ${sanitizeForTelegram(formData.message)}
🏋️‍♂️ Тренировка: ${sanitizeForTelegram(formData.trainingType || 'Не указано')}
⏱️ Длительность: ${sanitizeForTelegram(formData.duration || 'Не указано')}
💰 Стоимость: ${sanitizeForTelegram(formData.prices || 'Не указано')}
📝 Описание: ${sanitizeForTelegram(formData.description || 'Не указано')}
🕒 Время: ${new Date().toLocaleString('ru-RU')}`.trim();

    // Send to Telegram with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 sec timeout
    
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        }),
        signal: controller.signal
      }
    );
    
    clearTimeout(timeoutId);
    
    const telegramData = await telegramResponse.json();
    
    if (telegramData.ok) {
      response.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully!' 
      });
    } else {
      console.error('Telegram API error:', telegramData);
      response.status(500).json({ 
        success: false, 
        error: 'Failed to send message to Telegram' 
      });
    }
    
  } catch (error) {
    console.error('Server error:', error);
    
    let errorMessage = 'Internal server error';
    let statusCode = 500;
    
    if (error.name === 'AbortError') {
      errorMessage = 'Telegram API timeout';
      statusCode = 408;
    }
    
    response.status(statusCode).json({ 
      success: false, 
      error: errorMessage 
    });
  }
}
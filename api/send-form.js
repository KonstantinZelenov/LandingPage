export default async function handler(request, response) {
  // Разрешаем запросы с любого сайта (CORS)
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Если браузер проверяет настройки CORS (предварительный запрос)
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Разрешаем только POST запросы
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    // Получаем данные из формы
    const formData = await request.json();
    
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    // Форматируем красивое сообщение
    const message = `
🎯 НОВАЯ ЗАЯВКА С ЛЕНДИНГА!

👤 Имя: ${formData.name}
📧 Email: ${formData.mail}
🗡️ Оружие: ${formData.lesson_type}
💬 Сообщение: ${formData.message}

🏋️‍♂️ Тренировка: ${formData.trainingType}
⏱️ Длительность: ${formData.duration}
💰 Стоимость: ${formData.price}
📝 Описание: ${formData.description}

🕒 Время: ${new Date().toLocaleString()}
    `.trim();

    // Отправляем сообщение в Телеграм
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const telegramData = await telegramResponse.json();

    if (telegramData.ok) {
      // Успех!
      response.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully!' 
      });
    } else {
      // Ошибка Телеграма
      console.error('Telegram error:', telegramData);
      response.status(500).json({ 
        error: 'Failed to send message to Telegram' 
      });
    }

  } catch (error) {
    // Любая другая ошибка
    console.error('Server error:', error);
    response.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
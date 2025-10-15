export default async function handler(request, response) {
  // Разрешаем CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    // Читаем тело запроса
    let body = '';
    for await (const chunk of request) {
      body += chunk;
    }
    
    const formData = JSON.parse(body);
    
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // остальной код без изменений...
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
🕒 Время: ${new Date().toLocaleString()}`.trim();

    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const telegramData = await telegramResponse.json();

    if (telegramData.ok) {
      response.status(200).json({ success: true, message: 'Form submitted successfully!' });
    } else {
      console.error('Telegram error:', telegramData);
      response.status(500).json({ error: 'Failed to send message to Telegram' });
    }

  } catch (error) {
    console.error('Server error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
}
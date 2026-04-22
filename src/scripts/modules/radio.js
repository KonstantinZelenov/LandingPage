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
  
  const firstRadio = document.querySelector('.training-types__radio');
  if (firstRadio) {
    firstRadio.checked = true;
    firstRadio.dispatchEvent(new Event('change'));
  }
}

document.addEventListener('DOMContentLoaded', initPricingForm);

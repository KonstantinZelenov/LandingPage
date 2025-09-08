function setToRussian() { 
  document.getElementById("header__name-link").innerHTML = "КОНСТАНТИН ЗЕЛЕНОВ"; 
  const headerList = document.getElementsByClassName("header__links-li"); 
  headerList[0].innerHTML = "Обо мне"; 
  headerList[1].innerHTML = "Проекты"; 
  headerList[2].innerHTML = "Школа"; 
  headerList[3].innerHTML = "Цены"; 
  headerList[4].innerHTML = "Контакты";

  const mainHeading = document.getElementsByTagName("h2");
  mainHeading[0].innerHTML = "КОНСТАНТИН ЗЕЛЕНОВ";

  const descriptionHeading = document.getElementsByClassName("description__title-text");
  descriptionHeading[0].innerHTML = "Тренер по фехтованию, каскадёр, спортсмен";

  const el = document.getElementsByTagName("h3");
  el[0].innerHTML = "Обо мне";
  el[1].innerHTML = "О школе";

  /* Секция Обо мне перевод без заголовка */
  const aboutTrainerText = document.getElementsByClassName ("about-trainer__text-p");

  aboutTrainerText[0].innerHTML = "Здравствуйте, меня зовут Константин Зеленов, и я рад поделиться с вами своей историей. Последние 20 лет своей жизни я посвятил фехтованию, оттачивая свое мастерство спортсмена, каскадера, актера театра и кино.";

aboutTrainerText[1].innerHTML = "Я дважды становился чемпионом мира по артистическому фехтованию. Несколько раз был чемпионом России и многократным призером соревнований по артистическому фехтованию.";

aboutTrainerText[2].innerHTML = "На протяжении всей своей карьеры я имел честь тренировать множество учеников, которые впоследствии заняли призовые места в соревнованиях по артистическому фехтованию. Мой опыт в фехтовании, трюках и актерском мастерстве позволяет мне привнести уникальный взгляд на тренировочный процесс.";

aboutTrainerText[3].innerHTML = "Присоединяйтесь ко мне в этом необыкновенном путешествии, где мы будем изучать сложные движения ног, технику владения оружием и актёрское мастерство.";

aboutTrainerText[4].innerHTML = "Мечтаете ли вы подняться на пьедестал чемпионата или просто хотите испытать острые ощущения от этой древней формы искусства, я здесь, чтобы помочь вам на каждом этапе пути.Свяжитесь со мной сегодня, чтобы начать захватывающее приключение в мир фехтования. Давайте создадим что-то необыкновенное вместе!";
/* Закончена секция Обо мне перевод без заголовка */

/*Перевод описание видео */
const videoContentDescription = document.getElementsByClassName("video-content__description-text");

videoContentDescription[0].innerHTML = "Добро пожаловать в нашу школу фехтования. Наши занятия фехтованием не только обучат вас основам техники, таким как атаки, защиты и перемещения, но и помогут развить гибкость, координацию движений и силу. Каждый ученик получит внимание и поддержку, чтобы достичь максимальных результатов в своем развитии как фехтовальщик.";
videoContentDescription[1].innerHTML = "Мы также предлагаем обучение каскадерскому искусству, где вы сможете освоить трюки, падения, и все необходимые навыки для создания захватывающих сцен боя на экране или на сцене.";
videoContentDescription[2].innerHTML = "Мы верим, что фехтование и каскадерство - это не только физические навыки, но и искусство самовыражения и творчества.";
  /*Закончили перевод описание видео */
  
  /*Перевод формы*/
  const formChoice = document.getElementsByTagName("option");
console.log("test", formChoice)
formChoice[0].innerHTML = "Меч";
formChoice[1].innerHTML = "Копьё";
formChoice[2].innerHTML = "Рапира";
formChoice[3].innerHTML = "Меч и щит";
formChoice[4].innerHTML = "Парные мечи";
formChoice[5].innerHTML = "Шест";

const legend = document.getElementsByTagName("legend");
legend[0].innerHTML = "Заявка";

const formLabel = document.getElementsByClassName("form__label");
formLabel[0].innerHTML = "Имя";
formLabel[1].innerHTML = "Е-мейл";
formLabel[2].innerHTML = "Оружие";
formLabel[3].innerHTML = "Сообщение";

const button = document.getElementsByClassName("form__button");
button[0].innerHTML = "Отправьте заявку";

const placeholderName = document.getElementById('name');
placeholderName.placeholder = "Ваше имя";

const placeholderMail  = document.getElementById('mail');
placeholderMail.placeholder = "пример@gmail.com";

  /*Закончили перевод формы*/

  /*Перевод футера */
  const contacts = document.getElementById("contacts");
  contacts.innerHTML = "Контакты";

  const navList = document.getElementsByClassName("nav-translate");

  navList[0].innerHTML = "Инстаграм";
  navList[1].innerHTML = "Личный блог";
  navList[2].innerHTML = "ВКонтакте";
  navList[3].innerHTML = "Больше фото в альбомах";
  navList[4].innerHTML = "Телеграм";
  navList[5].innerHTML = "Напишите мне";
  
  const firstSpan = document.getElementById('firstSpan');
  firstSpan.innerHTML = "Константин Зеленов, тренер,";

  const secondSpan = document.getElementById('secondSpan');
  secondSpan.innerHTML = "каскадёр, актёр.";
}
/*Закончили перевод футера  */

function setToEnglish() { 
  document.getElementById("header__name-link").innerHTML = "Konstantin Zelenov"; 
  const headerList = document.getElementsByClassName("header__links-li"); 
  headerList[0].innerHTML = "About Me"; 
  headerList[1].innerHTML = "Projects"; 
  headerList[2].innerHTML = "School"; 
  headerList[3].innerHTML = "Prices"; 
  headerList[4].innerHTML = "Contacts";

  const mainHeading = document.getElementsByTagName("h2");
  mainHeading[0].innerHTML = "Konstantin Zelenov";

  const descriptionHeading = document.getElementsByClassName("description__title-text");
  descriptionHeading[0].innerHTML = "Fencing coach, stuntman, athlete";

  const el = document.getElementsByTagName("h3");
  el[0].innerHTML = "About me";
  el[1].innerHTML = "About school";

  /* Секция Обо мне перевод без заголовка */
  const aboutTrainerText = document.getElementsByClassName ("about-trainer__text-p");

aboutTrainerText[0].innerHTML = "Hello, my name is Konstantin Zelenov and I am happy to share my story with you. I devoted the last 20 years of my life to fencing, honing my skills as an athlete, stuntman, theater and film actor.";

aboutTrainerText[1].innerHTML = "I have twice become world champion in artistic fencing. Several times he was the champion of Russia and a multiple winner of competitions in artistic fencing.";

aboutTrainerText[2].innerHTML = "Throughout my career, I have had the honor of coaching many students who have gone on to win prizes in artistic fencing competitions. My background in swordsmanship, stunts and acting allows me to bring a unique perspective to the training process.";

aboutTrainerText[3].innerHTML = "Join me on this extraordinary journey as we explore complex footwork, weaponry and acting.";

aboutTrainerText[4].innerHTML = "Whether you dream of climbing the championship podium or just want to experience the thrill of this ancient art form, I'm here to help you every step of the way. Contact me today to start an exciting adventure in the world of swordsmanship. Let's create something extraordinary together!";
/* Закончена секция Обо мне перевод без заголовка */

/*Перевод описание видео */
const videoContentDescription = document.getElementsByClassName("video-content__description-text");

videoContentDescription[0].innerHTML = "Welcome to our fencing school. Our fencing lessons will not only teach you the basics of technique such as attack, defense and movement, but will also help you develop flexibility, coordination and strength. Each student will receive attention and support in order to achieve maximum results in their development as a swordsman.";
videoContentDescription[1].innerHTML = "We also offer training in stunt art, where you can learn tricks, falls, and all the necessary skills to create spectacular fight scenes on screen or on stage.";
videoContentDescription[2].innerHTML = " We believe that swordsmanship and stuntmanship are not only physical skills, but also the art of self-expression and creativity.";
  /*Закончили перевод описание видео */

  /*Перевод формы*/

  const formChoice = document.getElementsByTagName("option");
  console.log("test", formChoice)
  formChoice[0].innerHTML = "Sword";
  formChoice[1].innerHTML = "Spear";
  formChoice[2].innerHTML = "Rapier";
  formChoice[3].innerHTML = "Sword and Shield";
  formChoice[4].innerHTML = "Double Sword";
  formChoice[5].innerHTML = "Staff";
  
  const legend = document.getElementsByTagName("legend");
  legend[0].innerHTML = "Contact me";
  
  const formLabel = document.getElementsByClassName("form__label");
  formLabel[0].innerHTML = "Name";
  formLabel[1].innerHTML = "Email";
  formLabel[2].innerHTML = "Lessons";
  formLabel[3].innerHTML = "Message";
  
  const button = document.getElementsByClassName("form__button");
  button[0].innerHTML = "Send your message";

  const placeholderName = document.getElementById('name');
  placeholderName.placeholder = "Your name";

  const placeholderMail  = document.getElementById('mail');
  placeholderMail.placeholder = "example@gmail.com";
  
  /*Закончили перевод формы*/

  /* Перевод футера */
  const contacts = document.getElementById("contacts");
  contacts.innerHTML = "Contacts";

  const navList = document.getElementsByClassName("nav-translate");

  navList[0].innerHTML = "Instagram";
  navList[1].innerHTML = "Personal blog";
  navList[2].innerHTML = "Vkontakte";
  navList[3].innerHTML = "More photos";
  navList[4].innerHTML = "Telegram";
  navList[5].innerHTML = "Write me";
 
  const firstSpan = document.getElementById('firstSpan');
  firstSpan.innerHTML = "Konstantin Zelenov, trainer,";

  const secondSpan = document.getElementById('secondSpan');
  secondSpan.innerHTML = "stuntmen, actor";
  
  /*Закончили перевод футера  */
}
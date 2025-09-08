export const POPUPS_CONFIG = {
  'main-menu': {
    content: `
      <ul class="popup__links">
        <li class="popup__links-li" id="about-me">About me</li>
        <li class="popup__links-li" id="project">Projects</li>
        <li class="popup__links-li" id="about-school">School</li>
        <li class="popup__links-li" id="price">Prices</li>
        <li class="popup__links-li popup__image-list-item popup__image-list-item_contacts" id="contacts">
          <img class="popup__icons popup__contacts-menu-icon active" src="./images/contacts-mail.png">
          <img class="popup__icons popup__contacts-menu-icon" src="./images/contacts-phone.png">
          <img class="popup__icons popup__contacts-menu-icon" src="./images/contacts-location.png">
        </li>
      </ul>
    `,
    triggers: [
      { selector: '.main-title__hamburger-menu-icon' }
    ]
  },

  'links-menu': {
    content: `
      <ul class="popup__links">
        <li class="popup__icons">
          <a href="https://www.instagram.com/konstantinartfencing/" target="_blank">
            <img src="./images/insta.svg" alt="Instagram icon">
          </a>
        </li>
        <li class="popup__icons">
          <a href="https://vk.com/viganorth" target="_blank">
            <img src="./images/vk.png" alt="VKontakte icon">
          </a>
        </li>
      </ul>
      <nav class="navbar">
        <h4 class="navbar__title">Contacts</h4>
        <hr class="hr">
        <ul class="navbar__links">
          <li class="navbar__link">
            <a href="https://www.instagram.com/konstantinartfencing/" target="_blank" class="nav-translate">Instagram</a>
            <p class="nav-translate">Personal blog</p>
          </li>
          <li class="navbar__link">
            <a href="https://vk.com/viganorth" target="_blank" class="nav-translate">VKontakte</a>
            <p class="nav-translate">More photos in albums</p>
          </li>
          <li class="navbar__link">
            <a href="https://t.me/KonstantinRehabilitation" target="_blank" class="nav-translate">Telegram</a>
            <p class="nav-translate">Write me</p>
          </li>
        </ul>
      </nav>
    `,
    triggers: [
      { selector: '.popup__image-list-item_contacts' }
    ]
  },

  'about-me': {
    content: `
      <div class="about-trainer__text">
        <h3>About me</h3>
        <p class="about-trainer__text-p">Hello, my name is Konstantin Zelenov and I am happy to share my story with you. I devoted the last 20 years of my life to fencing, honing my skills as an athlete, stuntman, theater and film actor.</p>
        <p class="about-trainer__text-p">I have twice become world champion in artistic fencing. Several times I was the champion of Russia and a multiple winner of competitions in artistic fencing.</p>
        <p class="about-trainer__text-p">Whether you dream of climbing the championship podium or just want to experience the thrill of this ancient art form. I am here to help you every step of the way. Contact me today to start an exciting adventure in the world of swordsmanship. Lets create something extraordinary together!</p>
      </div>
    `,
    triggers: [
      { selector: '#about-me', parentPopup: 'main-menu' }
    ]
  },

  'about-projects': {
    content: `
      <section class="projects-content">
        <h2>My Projects</h2>
        <ul class="projects-list">
          <li class="project-item">
            <h3>Artistic Fencing Performances</h3>
            <p>Choreographed fight scenes for theater and film productions</p>
          </li>
          <li class="project-item">
            <h3>Stunt Coordination</h3>
            <p>Safety-focused fight scene direction for action movies</p>
          </li>
          <li class="project-item">
            <h3>Historical Martial Arts</h3>
            <p>Reconstruction of medieval and renaissance combat techniques</p>
          </li>
        </ul>
      </section>
    `,
    triggers: [
      { selector: '#project', parentPopup: 'main-menu' }
    ]
  },

  'about-school': {
    content: `
      <section class="video-content" id="about-school">
        <div class="video-content__description">
          <h2>About School</h2>
          <p class="video-content__description-text">Welcome to our fencing school. Our fencing lessons will not only teach you the basics of technique such as attack, defense and movement, but will also help you develop flexibility, coordination and strength. Each student will receive attention and support in order to achieve maximum results in their development as a swordsman.</p>
        </div>
      </section>
    `,
    triggers: [
      { selector: '#about-school', parentPopup: 'main-menu' }
    ]
  },

  'prices': {
    content: `
      <section class="price">
        <h2 class="price__header">Price list</h2>
        <ul class="check-box__list">
          <li class="check-box__list-item">
            <label><input type="checkbox" id="personal" name="option"> Personal training</label>
          </li>
          <li class="check-box__list-item">
            <label><input type="checkbox" id="split" name="option"> Split training</label>
          </li>
          <li class="check-box__list-item">
            <label><input type="checkbox" id="group" name="option"> Group training</label>
          </li>
          <li class="check-box__list-item">
            <label><input type="checkbox" id="video" name="option"> Shooting video</label>
          </li>
        </ul>
        <ul class="description-price__list">
          <li class="description-price__list-item">
            <label class="description-price__list-label">Duration:<input type="text" id="duration" name="duration"></label>
          </li>
          <li class="description-price__list-item">
            <label class="description-price__list-label">Price:<input type="text" id="prices" name="prices"></label>
          </li>
          <li class="description-price__list-item">
            <label class="description-price__list-label">Description:<input type="text" id="description" name="description"></label>
          </li>
        </ul>
        <button type="button" class="priceButton">Next</button>
      </section>
    `,
    triggers: [
      { selector: '#price', parentPopup: 'main-menu' }
    ]
  },

  'form': {
    content: `
      <form class="form" action="http://localhost:3000/users" method="post">
        <fieldset class="form__fieldset">
          <legend class="form__legend">Contact me</legend>
          <ul class="form__list">
            <li class="form__list-item">
              <label class="form__label" for="name">Name:</label>
              <input class="form__input" type="text" id="name" name="user_name" placeholder="Your name" required>
            </li>
            <li class="form__list-item">
              <label class="form__label" for="mail">Email:</label>
              <input class="form__input" type="email" id="mail" name="user_mail" placeholder="example@gmail.com" required>
            </li>
            <li class="form__list-item">
              <label class="form__label" for="train">Lessons:</label>
              <select class="form__select" id="train" name="user_train">
                <option value="SW">Sword</option>
                <option value="SP">Spear</option>
                <option value="RP">Rapier</option>
                <option value="SaS">Sword and Shield</option>
                <option value="DS">Double Sword</option>
                <option value="SF">Staff</option>
              </select>
            </li>
            <li class="form__list-item">
              <label class="form__label" for="msg">Message:</label>
              <textarea class="form__textarea" id="msg" name="user_msg"></textarea>
            </li>
            <li class="form__list-item">
              <button class="form__button" type="submit">Send your message</button>
            </li>
          </ul>
        </fieldset>
      </form>
    `,
    triggers: [
      { selector: '.priceButton', parentPopup: 'prices' }
    ]
  }
};
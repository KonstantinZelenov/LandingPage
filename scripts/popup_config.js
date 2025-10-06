export const POPUPS_CONFIG = {

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
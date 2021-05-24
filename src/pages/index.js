import '/src/pages/index.css';
import { initialCards } from '/src/utils/initial-cards.js';
import Section from '/src/components/Section.js';
import Popup from '/src/components/Popup.js';
import PopupWithImage from '/src/components/PopupWithImage.js';
import PopupWithForm from '/src/components/PopupWithForm.js';
import UserInfo from '/src/components/UserInfo.js';
import FormValidator from '/src/components/FormValidator.js';
import Card from '/src/components/Card.js';
import Api from '/src/components/Api.js';
import {
  dataApi,
  profileElements,
  popupsSelectors,
  elements,
  editButton,
  profileFormElement,
  nameInputProfile,
  statusInputProfile,
  addNewCardButton,
  formAddNewCard,
  template,
  enableValidationConfig,
} from '/src/utils/constants.js';


/* -------------------------------------------------------------------------- */
/*                   ЭКЗЕМПЛЯР API ПОЛУЧЕНИЯ ДАННЫХ ПРОФАЙЛА                  */
/* -------------------------------------------------------------------------- */

const api = new Api(dataApi);


/* -------------------------------------------------------------------------- */
/*             ПЕРВОНАЧАЛЬНАЯ ПОДГРУЗКА ДАННЫХ ПРОФАЙЛА С СЕРВЕРА             */
/* -------------------------------------------------------------------------- */

function setUserDataProfile() {
  return api.getUserInfo()
    .then((result) => {
      profileElements.name.textContent = result.name;
      profileElements.status.textContent = result.about;
      profileElements.avatar.src = result.avatar;
    })
}
setUserDataProfile()




/* -------------------------------------------------------------------------- */
/*         ЭКЗЕМПЛЯР СЕКЦИИ КАРТОЧКИ + ГЕНЕРАЦИЯ КАРТОЧКИ С ЕЁ ДАННЫМИ        */
/* -------------------------------------------------------------------------- */


const sectionCard = new Section({ // СОЗДАНИЕ ЭКЗЕМПЛЯРА СЕКЦИИ
  renderer: (item) => { // initialCards - ПЕРВОНАЧАЛЬНЫЙ МАССИВ ОБЪЕКТОВ ДАННЫХ КАРТОЧЕК
    // item - КАЖДЫЙ ЭЛЕМЕНТ МАССИВА ДАННЫХ КАРТОЧКИ
    const newCard = createCard(item)
    sectionCard.addItem(newCard, 'append'); // ВСТАВКА НАПОЛНЕННОГО ШАБЛОНА В РАЗМЕТКУ
  }
}, elements)  // elements - DOM-ЭЛЕМЕНТ КУДА НУЖНО ВСТАВЛЯТЬ КАРТОЧКУ



/* -------------------------------------------------------------------------- */
/*                 ФУНКЦИЯ СОЗДАНИЯ ГОТОВОГО ЭЛЕМЕНТА КАРТОЧКИ                */
/* -------------------------------------------------------------------------- */

function createCard(item) {
  const card = new Card(template, item, { // СОЗДАЁМ ЭКЗЕМПЛЯР КАРТОЧКИ

    handleCardClick: (title, link) => { // ПОЛУЧАЕМ ТИТУЛЬНИК И ССЫЛКУ НА КАРТИНКУ
      zoomCardPopup.open(title, link); // ПОДКЛЮЧЕНИЕ ЭКЗЕМПЛЯРА ПОПАПА КАРТОЧКИ В МАСШТАБЕ
    }
  })
  return card.generateCard(); // ВОЗВРАЩАЕТ ЭЛЕМЕНТ ГОТОВОЙ НОВОЙ КАРТОЧКИ
}


/* -------------------------------------------------------------------------- */
/*            ПОЛУЧЕНИЕ ПЕРВОНАЧАЛЬНОГО МАССИВА КАРТОЧЕК С СЕРВЕРА            */
/* -------------------------------------------------------------------------- */

function getInitialCards() {
  api.getDataInitialCards()
    .then(arrCards => sectionCard.renderer(arrCards)) // ЗАПУПСК РЕНДЕРА КАРТОЧЕК ИЗ МАССИВА
}

getInitialCards()











/* const exemplarUserInfo = new UserInfo(selectorsProfileElements);
const createUserInfoExemplar = exemplarUserInfo.setUserInfo(); // ПЕРВОНАЧАЛЬНАЯ ПОДГРУЗКА ДАННЫХ ПРОФАЙЛА С СЕРВЕРА */















/* -------------------------------------------------------------------------- */
/*                 ЭКЗЕМПЛЯР ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ                 */
/* -------------------------------------------------------------------------- */

const addCardPopup = new PopupWithForm(popupsSelectors.popupAddNewCard, {
  handlerSubmitForm: (inputsValues) => {

    const arrayObjectInputsValues = createCard(inputsValues); // СОЗДАНИЕ ЭЛЕМЕНТА НОВОЙ КАРТОЧКИ С ПОЛУЧЕННЫМИ ДАННЫМИ ИЗ ФОРМЫ
    sectionCard.addItem(arrayObjectInputsValues, 'prepend'); // ДОБАВЛЯЕМ В РАЗМЕТКУ НОВУЮ КАРТОЧКУ
  }

});

addCardPopup.setEventListeners();




/* -------------------------------------------------------------------------- */
/*                          ЭКЗЕМПЛЯР ПОПАПА ПРОФАЙЛА                         */
/* -------------------------------------------------------------------------- */

const editProfilePopup = new PopupWithForm(popupsSelectors.popupProfile, {
  handlerSubmitForm: (inputsValues) => {
    exemplarUserInfo.setUserInfo(inputsValues);
  }
});

editProfilePopup.setEventListeners();




/* -------------------------------------------------------------------------- */
/*                    ЭКЗЕМПЛЯР ПОПАПА КАРТИНКИ В МАСШТАБЕ                    */
/* -------------------------------------------------------------------------- */

const zoomCardPopup = new PopupWithImage(popupsSelectors.popupZoomOpenCardImage); // ЭКЗЕМПЛЯР ПОПАПА КАРТОЧКИ В МАСШТАБЕ
zoomCardPopup.setEventListeners();




/* -------------------------------------------------------------------------- */
/*                             ВКЛЮЧЕНИЕ ВАЛИДАЦИИ                            */
/* -------------------------------------------------------------------------- */

function enableValidationForm(formConfig, formElement) {
  const createValidatorExemplar = new FormValidator(formConfig, formElement);
  createValidatorExemplar.enableValidation();
  return createValidatorExemplar;
}




/* -------------------------------------------------------------------------- */
/*                    ОТПРАВКА ФОРМ НА ВКЛЮЧЕНИЕ ВАЛИДАЦИИ                    */
/* -------------------------------------------------------------------------- */

const validityFormProfile = enableValidationForm(enableValidationConfig, profileFormElement);
const validityFormAddNewCard = enableValidationForm(enableValidationConfig, formAddNewCard);




/* -------------------------------------------------------------------------- */
/*                  СЛУШАТЕЛЬ - POPUP ПРОФАЙЛА => ОТКРЫВАЕТСЯ                 */
/* -------------------------------------------------------------------------- */

editButton.addEventListener("click", () => {
  nameInputProfile.value = profileElements.name.textContent;
  statusInputProfile.value = profileElements.status.textContent;
  validityFormProfile.resetValidation();
  editProfilePopup.open();
});




/* -------------------------------------------------------------------------- */
/*         СЛУШАТЕЛЬ - POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ         */
/* -------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  formAddNewCard.reset();
  validityFormAddNewCard.resetValidation();
  addCardPopup.open();
});



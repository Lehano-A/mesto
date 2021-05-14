import '/src/pages/index.css';
import { initialCards } from '/src/utils/initial-cards.js';
import Section from '/src/components/Section.js';
import Popup from '/src/components/Popup.js';
import PopupWithImage from '/src/components/PopupWithImage.js';
import PopupWithForm from '/src/components/PopupWithForm.js';
import UserInfo from '/src/components/UserInfo.js';
import FormValidator from '/src/components/FormValidator.js';
import Card from '/src/components/Card.js';
import {
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
  selectorsProfileElements,
} from '/src/utils/constants.js';





const exemplarUserInfo = new UserInfo(selectorsProfileElements);



/* -------------------------------------------------------------------------- */
/*                    ФУНКЦИЯ СОЗДАНИЯ ЭКЗЕМПЛЯРА КАРТОЧКИ                    */
/* -------------------------------------------------------------------------- */

function createCard(item) {
  const card = new Card(template, item, { // СОЗДАЁМ ЭКЗЕМПЛЯР КАРТОЧКИ

    handleCardClick: (title, link) => { // ПОЛУЧАЕМ ТИТУЛЬНИК И ССЫЛКУ НА КАРТИНКУ
      zoomCardPopup.open(title, link); // ПОДКЛЮЧЕНИЕ ЭКЗЕМПЛЯРА ПОПАПА КАРТОЧКИ В МАСШТАБЕ
    }
  })
  card.generateCard();
  return card;
}




/* -------------------------------------------------------------------------- */
/*         ЭКЗЕМПЛЯР СЕКЦИИ КАРТОЧКИ + ГЕНЕРАЦИЯ КАРТОЧКИ С ЕЁ ДАННЫМИ        */
/* -------------------------------------------------------------------------- */

const newSectionCard = function (dataCards, where) {
  // ОТОБРАЖЕНИЕ ПЕРВОНАЧАЛЬНЫХ КАРТОЧЕК
  const sectionCard = new Section({ // СОЗДАНИЕ ЭКЗЕМПЛЯРА СЕКЦИИ
    items: dataCards, renderer: (item) => {  // item - КАЖДЫЙ ЭЛЕМЕНТ МАССИВА ДАННЫХ КАРТОЧКИ

      const newCard = createCard(item)
      const generateCard = newCard.generateCard(); // НАПОЛНЕНИЕ ШАБЛОНА КАРТОЧКИ ДАННЫМИ
      sectionCard.addItem(generateCard, where); // ВСТАВКА НАПОЛНЕННОГО ШАБЛОНА В РАЗМЕТКУ
    }
  }, elements)  // elements - DOM-ЭЛЕМЕНТ КУДА НУЖНО ВСТАВЛЯТЬ КАРТОЧКУ

  sectionCard.renderer(); // ЗАПУСК ПРОЦЕССА СОЗДАНИЯ И ДОБАВЛЕНИЯ В РАЗМЕТКУ ПЕРВОНАЧАЛЬНЫХ КАРТОЧЕК
  return sectionCard;

}
// ЗАПУСК ОТОБРАЖЕНИЯ ПЕРВОНАЧАЛЬНОЙ БАЗЫ КАРТОЧЕК
newSectionCard(initialCards, 'append')




/* -------------------------------------------------------------------------- */
/*                 ЭКЗЕМПЛЯР ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ                 */
/* -------------------------------------------------------------------------- */

const addCardPopup = new PopupWithForm(popupsSelectors.popupAddNewCard, {
  handlerSubmitForm: (inputsValues) => {

  const arrayObjectInputsValues = [inputsValues]
    newSectionCard(arrayObjectInputsValues, 'prepend'); // ДОБАВЛЯЕМ В РАЗМЕТКУ НОВУЮ КАРТОЧКУ
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
  const getValuesProfile = exemplarUserInfo.getUserInfo();
  nameInputProfile.value = getValuesProfile.name;
  statusInputProfile.value = getValuesProfile.status;
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



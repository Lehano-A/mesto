import '/src/pages/index.css';
import Section from '/src/components/Section.js';
import PopupWithImage from '/src/components/PopupWithImage.js';
import PopupWithForm from '/src/components/PopupWithForm.js';
import FormValidator from '/src/components/FormValidator.js';
import Card from '/src/components/Card.js';
import Api from '/src/components/Api.js';
import PopupAreYouSure from '/src/components/PopupAreYouSure.js';
import UserInfo from '/src/components/UserInfo.js';
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
  selectorsProfileElements,
} from '/src/utils/constants.js';



/* -------------------------------------------------------------------------- */
/*                   ЭКЗЕМПЛЯР API ПОЛУЧЕНИЯ ДАННЫХ ПРОФАЙЛА                  */
/* -------------------------------------------------------------------------- */

const api = new Api(dataApi);



/* -------------------------------------------------------------------------- */
/*                       ЭКЗЕМПЛЯР ПОПАПА ПОДТВЕРЖДЕНИЯ                       */
/* -------------------------------------------------------------------------- */

const areYouSure = new PopupAreYouSure(popupsSelectors.popupAreYouSure, {
  handlerDeleteCardFromServer: (cardTemplate, idCard) => {

    api.deleteCardFromServer(idCard) // ОТПРАВЛЯЕМ ЗАПРОС НА УДАЛЕНИЕ КАРТОЧКИ С СЕРВЕРА
      .then(() => {
        areYouSure.close()
        cardTemplate.remove()
      })
      .catch(err => console.log(err))
  }
});

areYouSure.setEventListeners();



/* -------------------------------------------------------------------------- */
/*             ПЕРВОНАЧАЛЬНАЯ ПОДГРУЗКА ДАННЫХ ПРОФАЙЛА С СЕРВЕРА             */
/* -------------------------------------------------------------------------- */


const userInfo = new UserInfo(selectorsProfileElements)

/* -------------------------------------------------------------------------- */
/*         ЭКЗЕМПЛЯР СЕКЦИИ КАРТОЧКИ + ГЕНЕРАЦИЯ КАРТОЧКИ С ЕЁ ДАННЫМИ        */
/* -------------------------------------------------------------------------- */


const sectionCard = new Section({ // СОЗДАНИЕ ЭКЗЕМПЛЯРА СЕКЦИИ
  renderer: (item) => { // ПЕРВОНАЧАЛЬНЫЙ МАССИВ ОБЪЕКТОВ ДАННЫХ КАРТОЧЕК
    // item - КАЖДЫЙ ЭЛЕМЕНТ МАССИВА ДАННЫХ КАРТОЧКИ
    const newCard = createCard(item);
    sectionCard.addItem(newCard, 'append'); // ВСТАВКА НАПОЛНЕННОГО ШАБЛОНА В РАЗМЕТКУ
  }
}, elements);  // elements - DOM-ЭЛЕМЕНТ КУДА НУЖНО ВСТАВЛЯТЬ КАРТОЧКУ




/* -------------------------------------------------------------------------- */
/*                 ФУНКЦИЯ СОЗДАНИЯ ГОТОВОГО ЭЛЕМЕНТА КАРТОЧКИ                */
/* -------------------------------------------------------------------------- */

function createCard(item) {

  const card = new Card(template, item, dataApi, { // СОЗДАЁМ ЭКЗЕМПЛЯР КАРТОЧКИ

    // КОЛБЭК КЛИКА ПО ИЗОБРАЖЕНИЮ КАРТОЧКИ
    handleCardClick: (name, link) => { // ПОЛУЧАЕМ ТИТУЛЬНИК И ССЫЛКУ НА КАРТИНКУ
      zoomCardPopup.open(name, link); // ПОДКЛЮЧЕНИЕ ЭКЗЕМПЛЯРА ПОПАПА КАРТОЧКИ В МАСШТАБЕ
    }
  },


    { // КОЛБЭК УДАЛЕНИЯ КАРТОЧКИ
      deleteCardFromServer: ((cardTemplate, idCard) => {
        areYouSure.open(cardTemplate, idCard) // СПРАШИВАЕМ ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ
      })
    },


    { // КОЛБЭК ИЗМЕНЕНИЯ ЧИСЛА ЛАЙКОВ
      changeNumberLike: ((cardButtonLike, idCard) => {

        if (cardButtonLike.classList.contains('element__button-like_active')) { // ЕСЛИ ИКОНКА ЛАЙКА АКТИВНА

          api.plusNumberLikes(idCard) // ОТПРАВЛЯЕМ ЗАПРОС НА УВЕЛИЧЕНИЕ ЧИСЛА ЛАЙКОВ
            .then(res => card.changeNumberLike('plus', res)) // УСТАНАВЛИВАЕМ В КАЧЕСТВЕ ЧИСЛА ЛАЙКОВ - ДЛИНУ МАССИВА ИЗ ЛАЙКОВ
            .catch(err => console.log(err))

        } else {

          api.deleteLikes(idCard) // ОТПРАВЛЯЕМ ЗАПРОС НА УДАЛЕНИЕ ЛАЙКА
            .then((res) => {
              card.changeNumberLike('minus', res) // -1 ЛАЙК
            })
            .catch(err => console.log(err))
        }
      })
    },
  )

  return card.generateCard(); // ВОЗВРАЩАЕТ ЭЛЕМЕНТ ГОТОВОЙ НОВОЙ КАРТОЧКИ
};




/* -------------------------------------------------------------------------- */
/*            ПОЛУЧЕНИЕ ПЕРВОНАЧАЛЬНОГО МАССИВА КАРТОЧЕК С СЕРВЕРА            */
/* -------------------------------------------------------------------------- */

function getInitialCards() {
  api.getDataInitialCards()
  Promise.all([api.getUserInfo(), api.getDataInitialCards()])
    .then(([objdataProfile, arrCards]) => {
      userInfo.setUserInfo(objdataProfile); // УСТАНАВЛИВАЕМ ДАННЫЕ ПРОФАЙЛА
      userInfo.setNewAvatar(objdataProfile); // УСТАНАВЛИВАЕМ АВАТАР
      sectionCard.renderer(arrCards)
    }) // ЗАПУСК РЕНДЕРА КАРТОЧЕК ИЗ МАССИВА

    .catch(err => console.log(err))
};

getInitialCards();




/* -------------------------------------------------------------------------- */
/*                 ЭКЗЕМПЛЯР ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ                 */
/* -------------------------------------------------------------------------- */

const addCardPopup = new PopupWithForm(popupsSelectors.popupAddNewCard, {
  handlerSubmitForm: (inputsValues, buttonSave) => { // ПОЛУЧАЕМ ОБЪЕКТ ДАННЫХ КАРТОЧКИ ИЗ ФОРМЫ

    api.sendDataNewCardAtServer(inputsValues) // ОТПРАВЛЯЕМ В API ДАННЫЕ КАРТОЧКИ ИЗ ФОРМЫ
      .then((dataCardFromServer) => {
        const arrayObjectInputsValues = createCard(dataCardFromServer); // ОТПРАВЛЯЕМ ПОЛУЧЕННЫЙ ОБЪЕКТ ДАННЫХ КАРТОЧКИ НА ЕЁ СОЗДАНИЕ
        sectionCard.addItem(arrayObjectInputsValues, 'prepend'); // ДОБАВЛЯЕМ В РАЗМЕТКУ НОВУЮ КАРТОЧКУ
        addCardPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => { buttonSave.textContent = 'Сохранить'; })
  }
});

addCardPopup.setEventListeners();




/* -------------------------------------------------------------------------- */
/*                          ЭКЗЕМПЛЯР ПОПАПА ПРОФАЙЛА                         */
/* -------------------------------------------------------------------------- */

const editProfilePopup = new PopupWithForm(popupsSelectors.popupProfile, {
  handlerSubmitForm: (inputsValues, buttonSave) => {

    api.formEditDataProfile(inputsValues) // ОТПРАВЛЯЕМ ЗАПРОС НА ИЗМЕНЕНИЕ ДАННЫХ ПРОФАЙЛА
      .then((dataProfile) => {
        userInfo.setUserInfo(dataProfile) // УСТАНАВЛИВАЕМ ДАННЫЕ ПРОФАЙЛА
        editProfilePopup.close()
      })
      .catch(err => console.log(err))
      .finally(() => { buttonSave.textContent = 'Сохранить'; })
  }
});

editProfilePopup.setEventListeners();




/* -------------------------------------------------------------------------- */
/*                      ЭКЗЕМПЛЯР ПОПАПА АВАТАРА ПРОФАЙЛА                     */
/* -------------------------------------------------------------------------- */
const editAvatarProfile = new PopupWithForm(popupsSelectors.popupAvatarProfile, {
  handlerSubmitForm: (inputValue, buttonSave) => {

    api.changeAvatarProfile(inputValue)
      .then((dataProfile) => {
        userInfo.setNewAvatar(dataProfile); // УСТАНАВЛИВАЕМ АВАТАР
        editAvatarProfile.close();
      })
      .catch(err => console.log(err))
      .finally(() => { buttonSave.textContent = 'Сохранить'; })
  }
});

editAvatarProfile.setEventListeners();



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
const validityFormAvatar = enableValidationForm(enableValidationConfig, formPopupEditAvatar)




/* -------------------------------------------------------------------------- */
/*                  СЛУШАТЕЛЬ - POPUP ПРОФАЙЛА => ОТКРЫВАЕТСЯ                 */
/* -------------------------------------------------------------------------- */

editButton.addEventListener("click", () => {
  const dataUserInfo = userInfo.getUserInfo()
  nameInputProfile.value = dataUserInfo.name;
  statusInputProfile.value = dataUserInfo.status;

  validityFormProfile.resetValidation();
  editProfilePopup.open();
});




/* -------------------------------------------------------------------------- */
/*         СЛУШАТЕЛЬ - POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ         */
/* -------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  validityFormAddNewCard.resetValidation();
  addCardPopup.open();
});




/* -------------------------------------------------------------------------- */
/*             СЛУШАТЕЛЬ - POPUP ИЗМЕНЕНИЯ АВАТАРА => ОТКРЫВАЕТСЯ             */
/* -------------------------------------------------------------------------- */

profileElements.avatarBox.addEventListener('click', () => {
  validityFormAvatar.resetValidation();
  editAvatarProfile.open();
})





import '/src/pages/index.css';
import Section from '/src/components/Section.js';
import PopupWithImage from '/src/components/PopupWithImage.js';
import PopupWithForm from '/src/components/PopupWithForm.js';
import FormValidator from '/src/components/FormValidator.js';
import Card from '/src/components/Card.js';
import Api from '/src/components/Api.js';
import PopupAreYouSure from '/src/components/PopupAreYouSure.js';
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
  avatarElement,
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
      .then(() => cardTemplate.remove())
      .catch(err => console.log(err))
  }
});



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
    .catch(err => console.log(err))
};

setUserDataProfile();




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
        areYouSure.setEventListeners(cardTemplate, idCard); // ПОКАЗЫВАЕМ ПОПАП С ВОПРОСОМ ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ
      })
    },


    { // КОЛБЭК ИЗМЕНЕНИЯ ЧИСЛА ЛАЙКОВ
      changeNumberLike: ((cardButtonLike, idCard, numberLikes) => {

        if (cardButtonLike.classList.contains('element__button-like_active')) { // ЕСЛИ ИКОНКА ЛАЙКА АКТИВНА

          api.plusNumberLikes(idCard) // ОТПРАВЛЯЕМ ЗАПРОС НА УВЕЛИЧЕНИЕ ЧИСЛА ЛАЙКОВ
            .then(res => numberLikes.textContent = res.likes.length) // УСТАНАВЛИВАЕМ В КАЧЕСТВЕ ЧИСЛА ЛАЙКОВ - ДЛИНУ МАССИВА ИЗ ЛАЙКОВ
            .catch(err => console.log(err))

        } else {

          api.deleteLikes(idCard) // ОТПРАВЛЯЕМ ЗАПРОС НА УДАЛЕНИЕ ЛАЙКА
            .then((res) => {
              if (res.likes.length === 0) { // ЕСЛИ МАССИВ С ЛАЙКАМИ ПУСТОЙ
                numberLikes.textContent = 0; // ТОГДА СТАВИМ 0 ЛАЙКОВ ПОД КАРТОЧКОЙ
              } else { // ЕСЛИ > 0 =>
                numberLikes.textContent = res.likes.length; // ТОГДА УСТАНАВЛИВАЕМ ЧИСЛО ДЛИНЫ МАССИВА ЛАЙКОВ
              }
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
    .then(arrCards => sectionCard.renderer(arrCards)) // ЗАПУСК РЕНДЕРА КАРТОЧЕК ИЗ МАССИВА
};

getInitialCards();




/* -------------------------------------------------------------------------- */
/*                 ЭКЗЕМПЛЯР ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ                 */
/* -------------------------------------------------------------------------- */

const addCardPopup = new PopupWithForm(popupsSelectors.popupAddNewCard, {
  handlerSubmitForm: (inputsValues) => { // ПОЛУЧАЕМ ОБЪЕКТ ДАННЫХ КАРТОЧКИ ИЗ ФОРМЫ

    api.sendDataNewCardAtServer(inputsValues) // ОТПРАВЛЯЕМ В API ДАННЫЕ КАРТОЧКИ ИЗ ФОРМЫ
      .then((dataCardFromServer) => {
        const arrayObjectInputsValues = createCard(dataCardFromServer); // ОТПРАВЛЯЕМ ПОЛУЧЕННЫЙ ОБЪЕКТ ДАННЫХ КАРТОЧКИ НА ЕЁ СОЗДАНИЕ
        sectionCard.addItem(arrayObjectInputsValues, 'prepend'); // ДОБАВЛЯЕМ В РАЗМЕТКУ НОВУЮ КАРТОЧКУ
        addCardPopup.close();
      })

  }
});

addCardPopup.setEventListeners();




/* -------------------------------------------------------------------------- */
/*                          ЭКЗЕМПЛЯР ПОПАПА ПРОФАЙЛА                         */
/* -------------------------------------------------------------------------- */

const editProfilePopup = new PopupWithForm(popupsSelectors.popupProfile, {
  handlerSubmitForm: (inputsValues) => {

    api.formEditDataProfile(inputsValues) // ОТПРАВЛЯЕМ ЗАПРОС НА ИЗМЕНЕНИЕ ДАННЫХ ПРОФАЙЛА
      .then((dataProfile) => {
        profileElements.name.textContent = dataProfile.name;
        profileElements.status.textContent = dataProfile.about;
        editProfilePopup.close()
      })
      .catch(err => console.log(err))
  }
});

editProfilePopup.setEventListeners();




/* -------------------------------------------------------------------------- */
/*                      ЭКЗЕМПЛЯР ПОПАПА АВАТАРА ПРОФАЙЛА                     */
/* -------------------------------------------------------------------------- */
const editAvatarProfile = new PopupWithForm(popupsSelectors.popupAvatarProfile, {
  handlerSubmitForm: (inputValue) => {

    api.changeAvatarProfile(inputValue)
      .then((res) => {
        profileElements.avatar.src = res.avatar;
        avatarElement.value = res.avatar;
        editAvatarProfile.close();

      })
      .catch(err => console.log(err))
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




/* -------------------------------------------------------------------------- */
/*             СЛУШАТЕЛЬ - POPUP ИЗМЕНЕНИЯ АВАТАРА => ОТКРЫВАЕТСЯ             */
/* -------------------------------------------------------------------------- */

profileElements.avatarBox.addEventListener('click', () => {
  formPopupEditAvatar.classList.add('popup_opened')
  avatarElement.value = profileElements.avatar.src;
  validityFormAvatar.resetValidation();
  editAvatarProfile.open();
})





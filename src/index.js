import '/src/index.css';
import { initialCards } from '../utils/initial-cards.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
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
} from '../utils/constants.js';



/* -------------------------------------------------------------------------- */
/*                            БЛОК СОЗДАНИЯ КЛАССОВ                           */
/* -------------------------------------------------------------------------- */


//ОТОБРАЖЕНИЕ ПЕРВОНАЧАЛЬНЫХ КАРТОЧЕК
const rendererCard = new Section({ // СОЗДАНИЕ ЭКЗЕМПЛЯРА СЕКЦИИ
  items: initialCards, renderer: (item) => {

    const card = new Card(template, item, { // СОЗДАНИЕ ЭКЗЕМПЛЯРА КАРТОЧКИ
      handleCardClick: (name, link) => {
        const popupWithImage = new PopupWithImage(popupsSelectors.popupZoomOpenCardImage, name, link); // СОЗДАНИЕ ЭКЗЕМПЛЯРА КАРТОЧКИ В МАСШТАБЕ
        const createPopupWithImage = popupWithImage.open();
      }
    })
    const generateCard = card.generateCard(); // НАПОЛНЕНИЕ ШАБЛОНА КАРТОЧКИ ДАННЫМИ
    rendererCard.addItem(generateCard, 'append'); // ВСТАВКА НАПОЛНЕННОГО ШАБЛОНА В РАЗМЕТКУ
  }
}, elements)  // elements - DOM-ЭЛЕМЕНТ КУДА НУЖНО ВСТАВЛЯТЬ КАРТОЧКУ

rendererCard.renderer(); // ЗАПУСК ПРОЦЕССА СОЗДАНИЯ И ДОБАВЛЕНИЯ В РАЗМЕТКУ ПЕРВОНАЧАЛЬНЫХ КАРТОЧЕК





const valuesObjectPopups = Object.values(popupsSelectors); // ПОЛУЧЕНИЕ СЕЛЕКТОРОВ ВСЕХ ПОПАПОВ
valuesObjectPopups.forEach((item) => { //item - ОТДЕЛЬНЫЙ СЕЛЕКТОР ПОПАПА

  const popupExemplar = new Popup(item); // СОЗДАНИЕ ЭКЗЕМПЛЯРА ПОПАПА
  const createPopup = popupExemplar.setEventListeners();

  // ЧТОБЫ НЕ ДУБЛИРОВАТЬ ИТЕРАЦИЮ ПОПАП-СЕЛЕКТОРОВ, ОСУЩЕСТВИМ НУЖНЫЕ ДЕЙСТВИЯ ЗДЕСЬ ЖЕ
  const popupWithFormExemplar = new PopupWithForm(item, { // СОЗДАНИЕ ЭКЗЕМПЛЯРА ПОПАПА С ФОРМОЙ
    handlerSubmitForm: (inputsValues) => {
      const keysInputsForm = Object.keys(inputsValues).some((item) => { // ПОЛУЧЕНИЕ КЛЮЧА СВОЙСТВА В ОБЪЕКТЕ

        if (item === 'title') { // ЕСЛИ ПОПАЛСЯ КЛЮЧ 'TITLE' - ТО ЭТО ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
          const values = [inputsValues] // ДОБАВЛЯЕМ ОБЪЕКТ В МАССИВ

          const sectionForNewCardExemplar = new Section({ // СОЗДАЁМ ЭКЗЕМПЛЯР СЕКЦИИ
            items: values, renderer: (item) => { // ОТПРАВЛЯЕМ МАССИВ И ПОЛУЧАЕМ ДАННЫЕ КАРТОЧКИ

              const cardExemplar = new Card(template, item, { // СОЗДАЁМ ЭКЗЕМПЛЯР КАРТОЧКИ
                handleCardClick: (title, link) => { // ПОЛУЧАЕМ ТИТУЛЬНИК И ССЫЛКУ НА КАРТИНКУ

                  const popupWithImageExemplar = new PopupWithImage(popupsSelectors.popupZoomOpenCardImage, title, link) // СОЗДАЁМ ЭКЗЕМПЛЯР КАРТОЧКИ В МАСШТАБЕ
                  const createPopupWithImageExemplar = popupWithImageExemplar.open();
                }
              })
              const generateCard = cardExemplar.generateCard(); // ОТРИСОВЫВАЕМ КАРТОЧКУ
              sectionForNewCardExemplar.addItem(generateCard, 'prepend'); // ОТПРАВЛЯЕМ В РАЗМЕТКУ

            }
          }, elements) // ВТОРОЙ ПАРАМЕТР КЛАССА SECTION

          sectionForNewCardExemplar.renderer(); // ЗАПУСК ПРОЦЕССА СОЗДАНИЯ И ДОБАВЛЕНИЯ В РАЗМЕТКУ НОВОЙ КАРТОЧКИ

        } else if (item === 'name') { // ЕСЛИ ПОПАЛСЯ КЛЮЧ 'NAME' - ТО ЭТО ФОРМА ПРОФАЙЛА

          const UserInfoExemplar = new UserInfo(selectorsProfileElements); // СОЗДАЁМ ЭКЗЕМПЛЯР ПРОФАЙЛА
          const createUserInfoExemplar = UserInfoExemplar.setUserInfo(inputsValues); // ОТПРАВЛЯЕМ НОВЫЕ ДАННЫЕ ПОЛЕЙ

        }
      })
    }
  })
  const createPopupWithForm = popupWithFormExemplar.setEventListeners();
})



// ВКЛЮЧЕНИЕ ВАЛИДАЦИИ
function enableValidationForm(formConfig, formElement) {
  const createValidatorExemplar = new FormValidator(formConfig, formElement);
  createValidatorExemplar.enableValidation();
  return createValidatorExemplar;
}


// ОТПРАВКА ФОРМ НА ВКЛЮЧЕНИЕ ВАЛИДАЦИИ
const validityFormProfile = enableValidationForm(enableValidationConfig, profileFormElement);
const validityFormAddNewCard = enableValidationForm(enableValidationConfig, formAddNewCard);


// СЛУШАТЕЛЬ - POPUP ПРОФАЙЛА => ОТКРЫВАЕТСЯ
editButton.addEventListener("click", (evt) => {

  const exemplarUserInfo = new UserInfo(selectorsProfileElements);
  const createExemplarUserInfo = exemplarUserInfo.getUserInfo();
  nameInputProfile.value = createExemplarUserInfo.name;
  statusInputProfile.value = createExemplarUserInfo.status;
  validityFormProfile.resetValidation();
  const exemplarPopupProfile = new Popup('#popup-open-profile');
  const createPopupProfile = exemplarPopupProfile.open();
});


// СЛУШАТЕЛЬ - POPUP ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ => ОТКРЫВАЕТСЯ
addNewCardButton.addEventListener("click", () => {
  formAddNewCard.reset();
  validityFormAddNewCard.resetValidation();
  const popupExemplar = new Popup('#popup-add-new-card')
  const createPopupExemplar = popupExemplar.open();
});



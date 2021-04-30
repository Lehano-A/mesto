import { closePopupByEsc } from './close-popup.js';

// POPUP (ЛЮБОЙ) ОТКРЫВАЕТСЯ
export default function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_opened');
}


import { renderCard } from "../features/renderCard";
import {
    closeModal,
    closeModalOnClick,
    closeModalOverlay,
} from "../features/closeModal";
import { openModal } from "../features/openModal";
import { removeCard } from "../features/removeCard";
import { toggleLike } from "../features/toggleLike";
import { validateInput } from "../features/validateInput";

import { toggleImagePopup } from "../features/toggleImagePopup";
import {
    addLikeToCard,
    daleteCard,
    getInitialCards,
    postCard,
    removeLikeFromCard,
} from "../api/cards/cards";
import "../pages/index.css";

const editProfileBtn = document.querySelector(".profile__edit-button");
const addImageBtn = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const fetchCards = () => {
    getInitialCards()
        .then((res) => res.json())
        .then((data) => {
            data.forEach((obj) => {
                placesList.append(renderCard(obj));
            });
        });
};
fetchCards();

//Функция изменения данных профиля
function editProfile() {
    openModal(profilePopup);
    const closePopupBtn = profilePopup.querySelector(".popup__close");
    const profileForm = profilePopup.querySelector("form");

    const nameInput = profilePopup.querySelector(".popup__input_type_name");
    const majorInput = profilePopup.querySelector(
        ".popup__input_type_description"
    );

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    nameInput.value = profileTitle.textContent;
    majorInput.value = profileDescription.textContent;

    validateInput(nameInput, profileForm, 40);
    validateInput(majorInput, profileForm, 200);

    closeModalOverlay(profilePopup);
    closeModalOnClick(closePopupBtn, profilePopup);

    function handleProfileFormSubmit(evt) {
        evt.preventDefault();

        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = majorInput.value;

        closeModal(profilePopup);
    }

    profileForm.addEventListener("submit", handleProfileFormSubmit);
}
editProfileBtn.addEventListener("click", editProfile);

//функция добавления новой карточки
function addNewCard() {
    openModal(cardPopup);
    const closePopupBtn = cardPopup.querySelector(".popup__close");
    const cardForm = cardPopup.querySelector("form");

    const nameInput = cardPopup.querySelector(".popup__input_type_card-name");
    const linkInput = cardPopup.querySelector(".popup__input_type_url");

    validateInput(nameInput, cardForm);
    validateInput(linkInput, cardForm);

    closeModalOverlay(cardPopup);
    closeModalOnClick(closePopupBtn, cardPopup);

    function handleCardFormSubmit(evt) {
        evt.preventDefault();
        const name = nameInput.value;
        const link = linkInput.value;

        postCard(name, link).then(() => {
            placesList.innerHTML = "";
            fetchCards();
        });

        cardForm.removeEventListener("submit", handleCardFormSubmit);
        closeModal(cardPopup);
    }

    cardForm.addEventListener("submit", handleCardFormSubmit);
}

addImageBtn.addEventListener("click", addNewCard);

placesList.addEventListener("click", ({ target }) => {
    const { classList } = target;

    switch (true) {
        case classList.contains("card__like-button"):
            const cardID = target.closest(".card").getAttribute("id");

            if (!target.classList.contains("card__like-button_is-active")) {
                addLikeToCard(cardID).then(() => toggleLike(target));
            } else {
                removeLikeFromCard(cardID).then(() => toggleLike(target));
            }
            break;
        case classList.contains("card__delete-button"):
            const cardId = target.parentNode.getAttribute("id");
            daleteCard(cardId).then(() => removeCard(target));
            break;
        case classList.contains("card__image"):
            toggleImagePopup(target, imagePopup);
            break;
    }
});

import "../pages/index.css";

const editProfileBtn = document.querySelector(".profile__edit-button");
const addImageBtn = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const addCard = (obj) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.cloneNode(true);
    const cardImg = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");

    cardImg.setAttribute("src", obj.link);
    cardImg.setAttribute("alt", obj.name);

    cardTitle.textContent = obj.name;

    return card;
};

initialCards.forEach((obj) => {
    placesList.append(addCard(obj));
});

function openModal(popup) {
    popup.classList.add("popup_is-opened");

    document.addEventListener("keydown", (evt) => closeOnKeydown(evt, popup));
}

function closeModal(popup) {
    popup.classList.remove("popup_is-opened");

    document.removeEventListener("keydown", (evt) =>
        closeOnKeydown(evt, popup)
    );
}

function closeModalOnClick(btn, popup) {
    btn.addEventListener("click", () => {
        closeModal(popup);
    });
}

function closeModalOverlay(popup) {
    popup.addEventListener("click", (evt) => {
        const target = evt.target;

        if (target === popup) {
            closeModal(popup);
        }
    });
}

function closeOnKeydown(evt, popup) {
    if (evt.key === "Escape") {
        closeModal(popup);
    }
}

function validateInput(input, form, maxLength = null) {
    const submitBtn = form.querySelector("button");

    input.addEventListener("input", () => {
        const isEmpty = input.value.length === 0;
        const exceedsMaxLength = maxLength
            ? input.value.length >= maxLength
            : false;
        const isInvalid = !input.validity.valid;

        if (isEmpty || exceedsMaxLength || isInvalid) {
            input.classList.add("invalid");
            submitBtn.setAttribute("disabled", true);
        } else {
            input.classList.remove("invalid");
            submitBtn.removeAttribute("disabled");
        }
    });
}

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

    const obj = {};
    const nameInput = cardPopup.querySelector(".popup__input_type_card-name");
    const linkInput = cardPopup.querySelector(".popup__input_type_url");

    validateInput(nameInput, cardForm);
    validateInput(linkInput, cardForm);

    closeModalOverlay(cardPopup);
    closeModalOnClick(closePopupBtn, cardPopup);

    function handleCardFormSubmit(evt) {
        evt.preventDefault();
        obj["name"] = nameInput.value;
        obj["link"] = linkInput.value;

        placesList.prepend(addCard(obj));

        cardForm.removeEventListener("submit", handleCardFormSubmit);
        closeModal(cardPopup);
    }

    cardForm.addEventListener("submit", handleCardFormSubmit);
}

addImageBtn.addEventListener("click", addNewCard);

// //функция добавления лайка на карточку
function toggleLike(btn) {
    btn.classList.toggle("card__like-button_is-active");
}
//функция удаления карточки со страницы

function removeCard(btn) {
    btn.parentNode.remove();
}

//функция открытия/закрытия попапа для картинки
function toggleImagePopup(cardImage) {
    openModal(imagePopup);
    const closePopupBtn = imagePopup.querySelector(".popup__close");
    const image = imagePopup.querySelector("img");

    image.setAttribute("src", cardImage.getAttribute("src"));
    image.setAttribute("alt", cardImage.getAttribute("alt"));

    closeModalOverlay(imagePopup);
    closeModalOnClick(closePopupBtn, imagePopup);
}

placesList.addEventListener("click", (evt) => {
    const target = evt.target;
    if (target.classList.contains("card__like-button")) {
        toggleLike(target);
    } else if (target.classList.contains("card__delete-button")) {
        removeCard(target);
    } else if (target.classList.contains("card__image")) {
        toggleImagePopup(target);
    }
});

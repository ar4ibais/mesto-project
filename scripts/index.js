// @todo: Темплейт карточки

// @todo: DOM узлы
const editProfileBtn = document.querySelector(".profile__edit-button");
const addImageBtn = document.querySelector(".profile__add-button");
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

function openModal(popup) {
    popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
}

function closeModalOnClick(btn, popup) {
    btn.addEventListener("click", () => {
        closeModal(popup);
    });
}

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

//Функция изменения данных профиля
function editProfile() {
    openModal(profilePopup);
    const closePopupBtn = profilePopup.querySelector(".popup__close");
    const submitBtn = document.querySelector(".popup__button");

    const nameInput = profilePopup.querySelector(".popup__input_type_name");
    const majorInput = document.querySelector(".popup__input_type_description");

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    nameInput.value = profileTitle.textContent;
    majorInput.value = profileDescription.textContent;

    closeModalOnClick(closePopupBtn, profilePopup);

    function handleProfileFormSubmit(evt) {
        evt.preventDefault();

        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = majorInput.value;

        closeModal(profilePopup);
    }

    submitBtn.addEventListener("click", handleProfileFormSubmit);
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

    closeModalOnClick(closePopupBtn, cardPopup);

    function handleCardFormSubmit(evt) {
        evt.preventDefault();
        obj["name"] = nameInput.value;
        obj["link"] = linkInput.value;
        console.log(obj, addCard(obj));

        placesList.prepend(addCard(obj));

        closeModal(cardPopup);
    }

    cardForm.removeEventListener("submit", handleCardFormSubmit);
    cardForm.addEventListener("submit", handleCardFormSubmit);
}

addImageBtn.addEventListener("click", addNewCard);

//функция добавления лайка на карточку
function toggleLike(card) {
    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("card__like-button")) {
            e.target.classList.toggle("card__like-button_is-active");
        }
    });
}
//функция удаления карточки со страницы

function removeCard(card) {
    const removeBtn = card.querySelector(".card__delete-button");
    removeBtn.addEventListener("click", () => {
        card.remove();
    });
}

function toggleImagePopup(card) {
    card.querySelector(".card__image").addEventListener("click", () => {
        openModal(imagePopup);
        const closeBtn = imagePopup.querySelector(".popup__close");
        const image = imagePopup.querySelector("img");
        image.setAttribute(
            "src",
            card.querySelector(".card__image").getAttribute("src")
        );

        closeBtn.addEventListener("click", () => {
            closeModal(imagePopup);
        });
    });
}

placesList.addEventListener("click", (evt) => {
    const target = evt.target;
    if (target.parentNode.classList.contains("card")) {
        toggleLike(target.parentNode);
        removeCard(target.parentNode);
        toggleImagePopup(target.parentNode);
    }
});

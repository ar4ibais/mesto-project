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

const cardsContainer = document.querySelector(".places__list");

const fetchCard = (obj) => {
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
    cardsContainer.append(fetchCard(obj));
});

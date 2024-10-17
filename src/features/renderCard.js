export const renderCard = (obj) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.cloneNode(true);
    const cardImg = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");

    cardImg.setAttribute("src", obj.link);
    cardImg.setAttribute("alt", obj.name);

    cardTitle.textContent = obj.name;

    return card;
};

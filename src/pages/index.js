import {
  enableValidation,
  resetValidation,
  settings,
} from "../scripts/validation.js";
import "./index.css";
import logo from "../images/logo.svg";
import avatar from "../images/jaydenKing.png";
import editIcon from "../images/edit-icon.svg";
import plusIcon from "../images/plus-icon.svg";

document.querySelector(".header__logo").src = logo;
document.querySelector(".profile__avatar").src = avatar;
document.querySelector(".profile__edit-icon").src = editIcon;
document.querySelector(".profile__new-post-icon").src = plusIcon;

// === CONFIG ===
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// === UTILITY FUNCTIONS ===
const qs = (selector, parent = document) => parent.querySelector(selector);

const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
};

const setupModalClose = (modal) => {
  qs(".modal__close-btn", modal).addEventListener("click", () =>
    closeModal(modal)
  );
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
};

const closeAllModals = () => {
  document.querySelectorAll(".modal_is-opened").forEach(closeModal);
};

function handleEscape(e) {
  if (e.key === "Escape") {
    closeAllModals();
  }
}

// === MODALS ===
const editProfileModal = qs("#edit-profile-modal");
const newPostModal = qs("#new-post-modal");
const previewModal = qs("#preview-modal");

setupModalClose(editProfileModal);
setupModalClose(newPostModal);
setupModalClose(previewModal);

// === PROFILE ELEMENTS ===
const editProfileButton = qs(".profile__edit-button");
const profileForm = qs(".modal__form", editProfileModal);
const nameInput = qs("#profile-name-input", editProfileModal);
const descriptionInput = qs("#profile-description-input", editProfileModal);

const profileName = qs(".profile__name");
const profileDescription = qs(".profile__description");

// === NEW POST ELEMENTS ===
const newPostButton = qs(".profile__new-post-button");
const addCardForm = qs(".modal__form", newPostModal);
const linkInput = qs("#image-link-input", newPostModal);
const captionInput = qs("#image-caption-input", newPostModal);
const cardSubmitButton = qs(".modal__submit-btn", newPostModal);

// === CARD TEMPLATE AND LIST ===
const cardTemplate = qs("#card-template").content.querySelector(".card");
const cardsList = qs(".cards__list");

// === CREATE CARD ELEMENT ===
function createCardElement({ name, link }) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = qs(".card__image", card);
  const cardTitle = qs(".card__title", card);
  const likeButton = qs(".card__like-button", card);
  const deleteButton = qs(".card__delete-button", card);

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    if (confirm(`Are you sure you want to delete the post: "${name}"? `)) {
      card.remove();
    }
  });

  cardImage.addEventListener("click", () => {
    const previewImage = qs("#preview-image", previewModal);
    const previewCaption = qs("#preview-caption", previewModal);

    previewImage.src = link;
    previewImage.alt = name;
    previewCaption.textContent = name;

    openModal(previewModal);
  });

  return card;
}

// === EVENT LISTENERS ===

// Open Edit Profile Modal
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetValidation(profileForm, settings);
  openModal(editProfileModal);
});

// Submit Edit Profile Form
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
});

// Open New Post Modal
newPostButton.addEventListener("click", () => openModal(newPostModal));

// Submit New Post Form
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = {
    name: captionInput.value,
    link: linkInput.value,
  };

  cardsList.prepend(createCardElement(newCard));
  addCardForm.reset();
  resetValidation(addCardForm, settings);
  closeModal(newPostModal);
});

// === INITIAL CARDS ===
initialCards.forEach((card) => {
  cardsList.append(createCardElement(card));
});

// === INITIALIZE ===
enableValidation(settings);

// ========================================
// IMPORTS
// ========================================
import {
  enableValidation,
  resetValidation,
  settings,
} from "../scripts/validation.js";
import {
  handleSubmit,
  renderLoading,
  openModal,
  closeModal,
  qs,
} from "../utils/utils.js";
import "./index.css";
import logo from "../images/logo.svg";
import avatar from "../images/jaydenKing.png";
import editIcon from "../images/edit-icon.svg";
import plusIcon from "../images/plus-icon.svg";
import editIconLight from "../images/edit-icon-light.svg";
import Api from "../utils/Api.js";

// ========================================
// INITIAL SETUP & IMAGE LOADING
// ========================================
document.querySelector(".header__logo").src = logo;
document.querySelector(".profile__avatar").src = avatar;
document.querySelector(".profile__edit-icon").src = editIcon;
document.querySelector(".profile__new-post-icon").src = plusIcon;
document.querySelector(".profile__pencil-icon").src = editIconLight;

// ========================================
// API CONFIGURATION
// ========================================
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "57edc072-caed-4edd-a330-de0f2db62a71",
    "Content-Type": "application/json",
  },
});

// ========================================
// GLOBAL VARIABLES
// ========================================
let currentUser = null;
let cardToDelete = null;

// ========================================
// UTILITY FUNCTIONS
// ========================================
const setupModalClose = (modal) => {
  qs(".modal__close-btn", modal).addEventListener("click", () =>
    closeModal(modal)
  );
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
};

function handleEscape(e) {
  if (e.key === "Escape") {
    closeAllModals();
  }
}

// ========================================
// DOM ELEMENT SELECTORS
// ========================================

// === MODALS ===
const editProfileModal = qs("#edit-profile-modal");
const newPostModal = qs("#new-post-modal");
const previewModal = qs("#preview-modal");
const avatarModal = qs("#avatar-modal");
const deleteModal = qs("#delete-modal");

// === PROFILE ELEMENTS ===
const editProfileButton = qs(".profile__edit-button");
const profileForm = qs(".modal__form", editProfileModal);
const nameInput = qs("#profile-name-input", editProfileModal);
const descriptionInput = qs("#profile-description-input", editProfileModal);
const profileName = qs(".profile__name");
const profileDescription = qs(".profile__description");
const profileAvatar = qs(".profile__avatar");

// === AVATAR ELEMENTS ===
const avatarButton = qs(".profile__avatar-button");
const avatarForm = qs(".modal__form", avatarModal);
const avatarInput = qs("#avatar-input", avatarModal);

// === NEW POST ELEMENTS ===
const newPostButton = qs(".profile__new-post-button");
const addCardForm = qs(".modal__form", newPostModal);
const linkInput = qs("#image-link-input", newPostModal);
const captionInput = qs("#image-caption-input", newPostModal);

// === DELETE CONFIRMATION ELEMENTS ===
const deleteConfirmButton = qs(".modal__submit-btn_type_delete", deleteModal);
const deleteCancelButton = qs(".modal__submit-btn_type_cancel", deleteModal);

// === CARD TEMPLATE AND LIST ===
const cardTemplate = qs("#card-template").content.querySelector(".card");
const cardsList = qs(".cards__list");

// ========================================
// MODAL SETUP
// ========================================
setupModalClose(editProfileModal);
setupModalClose(newPostModal);
setupModalClose(previewModal);
setupModalClose(avatarModal);
setupModalClose(deleteModal);

// ========================================
// CARD CREATION FUNCTION
// ========================================
function createCardElement(cardData) {
  // Clone card template
  const card = cardTemplate.cloneNode(true);
  const cardImage = qs(".card__image", card);
  const cardTitle = qs(".card__title", card);
  const likeButton = qs(".card__like-button", card);
  const deleteButton = qs(".card__delete-button", card);

  // Set card content
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  card.dataset.cardId = cardData._id;

  // Check if card is already liked by current user
  const isLiked = cardData.isLiked;

  // Set initial like state
  if (isLiked) {
    likeButton.classList.add("card__like-button_active");
  }

  // === CARD EVENT LISTENERS ===

  // Like/Unlike functionality
  likeButton.addEventListener("click", () => {
    const cardId = cardData._id;
    const isLiked = likeButton.classList.contains("card__like-button_active");

    if (isLiked) {
      // Dislike the card
      api
        .dislikeCard(cardId)
        .then(() => {
          // Remove updatedCard parameter
          likeButton.classList.remove("card__like-button_active");
          cardData.isLiked = false;
        })
        .catch((err) => {
          console.error("Error disliking card:", err);
        });
    } else {
      // Like the card
      api
        .likeCard(cardId)
        .then(() => {
          // Remove updatedCard parameter
          likeButton.classList.add("card__like-button_active");
          cardData.isLiked = true;
        })
        .catch((err) => {
          console.error("Error liking card:", err);
        });
    }
  });

  // Delete card functionality
  deleteButton.addEventListener("click", () => {
    cardToDelete = card;
    openModal(deleteModal);
  });

  // Image preview functionality
  cardImage.addEventListener("click", () => {
    const previewImage = qs("#preview-image", previewModal);
    const previewCaption = qs("#preview-caption", previewModal);

    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewCaption.textContent = cardData.name;

    openModal(previewModal);
  });

  return card;
}

// ========================================
// API DATA LOADING
// ========================================
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    // Store user info globally
    currentUser = userInfo;

    // Render cards
    cards.forEach((card) => {
      cardsList.append(createCardElement(card, userInfo));
    });

    // Update profile information
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error("Error loading app data:", err);
  });

// ========================================
// FORM SUBMIT HANDLERS
// ========================================

// === PROFILE FORM SUBMIT ===
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return api
      .editUserInfo({ name: nameInput.value, about: descriptionInput.value })
      .then((userInfo) => {
        profileName.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        closeModal(editProfileModal);
      });
  }
  handleSubmit(makeRequest, evt);
}

// === AVATAR FORM SUBMIT ===
function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return api
      .updateUserAvatar({ avatar: avatarInput.value })
      .then((userInfo) => {
        profileAvatar.src = userInfo.avatar;
        closeModal(avatarModal);
      });
  }
  handleSubmit(makeRequest, evt);
}

// === NEW POST FORM SUBMIT ===
function handleNewPostFormSubmit(evt) {
  function makeRequest() {
    const newCardData = {
      name: captionInput.value,
      link: linkInput.value,
    };

    return api.postNewCard(newCardData).then((cardData) => {
      cardsList.prepend(createCardElement(cardData, currentUser));
      resetValidation(addCardForm, settings);
      closeModal(newPostModal);
    });
  }
  handleSubmit(makeRequest, evt);
}

// === DELETE CONFIRMATION SUBMIT ===
function handleDeleteConfirmation(evt) {
  evt.preventDefault();

  if (cardToDelete) {
    const cardId = cardToDelete.dataset.cardId;
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;

    renderLoading(true, submitButton, initialText, "Deleting...");

    api
      .deleteCard(cardId)
      .then(() => {
        cardToDelete.remove();
        cardToDelete = null;
        closeModal(deleteModal);
      })
      .catch(console.error)
      .finally(() => {
        renderLoading(false, submitButton, initialText);
      });
  }
}

// ========================================
// EVENT LISTENERS
// ========================================

// === PROFILE EDITING ===
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetValidation(profileForm, settings);
  openModal(editProfileModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

// === AVATAR EDITING ===
avatarButton.addEventListener("click", () => {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// === NEW POST CREATION ===
newPostButton.addEventListener("click", () => openModal(newPostModal));

addCardForm.addEventListener("submit", handleNewPostFormSubmit);

// === CARD DELETION ===
deleteConfirmButton.addEventListener("click", handleDeleteConfirmation);

deleteCancelButton.addEventListener("click", () => {
  cardToDelete = null;
  closeModal(deleteModal);
});

// ========================================
// INITIALIZATION
// ========================================
enableValidation(settings);

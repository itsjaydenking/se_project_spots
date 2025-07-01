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

// Profile Modal Functionality
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfile = editProfileModal.querySelector(".modal__close-btn");

const profileFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const descriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const profileContentElement = document.querySelector(".profile__content");
const profileName = profileContentElement.querySelector(".profile__name"); // Use querySelector()
const profileDescription = profileContentElement.querySelector(
  ".profile__description"
);

// New Post Modal Functionality
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const closeNewPost = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#image-link-input");
const captionInput = newPostModal.querySelector("#image-caption-input");

// Preview Modal Functionality
const previewButton = document.querySelector(".card__image");
const previewModal = document.querySelector("#preview-modal");
const closePreview = previewModal.querySelector(".modal__close-btn");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

getCardElement = (data) => {
  // Create a new card element from the template.
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  // Set the title and image source from the data.
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete?")) {
      cardElement.remove();
    }
  });

  cardImage.addEventListener("click", () => {
    const previewImage = previewModal.querySelector("#preview-image");
    const previewCaption = previewModal.querySelector("#preview-caption");
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
};

// Declare the openModal() function
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

// Declare the closeModal() function
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

closePreview.addEventListener("click", () => {
  closeModal(previewModal);
});

previewModal.addEventListener("click", (event) => {
  if (event.target === previewModal) {
    closeModal(previewModal);
  }
});

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

closeEditProfile.addEventListener("click", () => {
  closeModal(editProfileModal);
});

// Create the form submission handler.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Get the values of each form field from the value
  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  // Insert these new values into the textContent
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  // Close the modal.
  closeModal(editProfileModal);
}

// Set the submit listener.
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

closeNewPost.addEventListener("click", () => {
  closeModal(newPostModal);
});

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();
  // Get the values of each form field from the value
  const newCard = {
    name: captionInput.value,
    link: linkInput.value,
  };

  // Create a new card element using the getCardElement function.
  const newCardElement = getCardElement(newCard);
  cardsList.prepend(newCardElement);
  // Close the modal.
  closeModal(newPostModal);
}

// Create the submit listener.
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (card) {
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});

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

// Declare the openModal() function
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

// Declare the closeModal() function
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

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

  // Log both input values to the console.
  const linkValue = linkInput.value;
  const captionValue = captionInput.value;

  console.log("Image Link:", linkValue);
  console.log("Caption:", captionValue);
  // Close the modal.
  closeModal(newPostModal);
}

// Create the submit listener.
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((card) => console.log(card.name));

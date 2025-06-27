const cardsContainer = document.querySelector(".cards");

// Profile Modal Functionality
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfile = editProfileModal.querySelector(".modal__close-btn");

const profileFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#profile-name-input");
const descriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
// const profileFormSubmitButton =
//   editProfileModal.querySelector(".modal__submit-btn");

const profileContentElement = document.querySelector(".profile__content");
const profileName = profileContentElement.querySelector(".profile__name"); // Use querySelector()
const profileDescription = profileContentElement.querySelector(
  ".profile__description"
);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

closeEditProfile.addEventListener("click", () => {
  editProfileModal.classList.remove("modal_is-opened");
});

// Create the form submission handler.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Get the values of each form field from the value
  const newName = nameInput.value;
  const newDescription = descriptionInput.value;
  // property of the corresponding input element.

  // Insert these new values into the textContent
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
  // property of the corresponding profile elements.

  // Close the modal.
  editProfileModal.classList.remove("modal_is-opened");
}

// Set the submit listener.
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// New Post Modal Functionality
const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const closeNewPost = newPostModal.querySelector(".modal__close-btn");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#image-link-input");
const captionInput = newPostModal.querySelector("#image-caption-input"); // Use querySelector()

newPostButton.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-opened");
});

closeNewPost.addEventListener("click", () => {
  newPostModal.classList.remove("modal_is-opened");
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
  newPostModal.classList.remove("modal_is-opened");
}

// Uncomment the following code to add a new card to the cards container.
// function handleAddCardSubmit(evt) {
//   evt.preventDefault();

//   const linkValue = linkInput.value;
//   const captionValue = captionInput.value;

//   const newCard = document.createElement("div");
//   newCard.classList.add("card");
//   newCard.innerHTML = `
//     <img
//       src="${linkValue}"
//       alt="${captionValue}"
//       class="card__image"
//     />
//     <div class="card__footer">
//       <h2 class="card__title">${captionValue}</h2>
//       <button class="card__like-button" type="button"></button>
//     </div>
//   `;

//   cardsContainer.prepend(newCard);

//   linkInput.value = "";
//   captionInput.value = "";

//   newPostModal.classList.remove("modal_is-opened");
// }

// Create the submit listener.
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

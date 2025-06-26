const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfile = editProfileModal.querySelector(".modal__close-btn");

const newPostButton = document.querySelector(".profile__new-post-button");
const newPostModal = document.querySelector("#new-post-modal");
const closeNewPost = newPostModal.querySelector(".modal__close-btn");

editProfileButton.addEventListener("click", () => {
  editProfileModal.classList.add("modal_is-opened");
});

closeEditProfile.addEventListener("click", () => {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostButton.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-opened");
});

newPostModal.addEventListener("click", () => {
  newPostModal.classList.remove("modal_is-opened");
});

/*
// Select the necessary form elements. You should select
// these from inside the modal, not the document.
const profileFormElement = // Use querySelector()
const nameInput = // Use querySelector()
const jobInput = // Use querySelector()

// If you haven't done so already, select
// the profile elements from the document.
const profileNameElement = // Use querySelector()
const profileJobElement = // Use querySelector()

// Create the form submission handler.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Get the values of each form field from the value
  // property of the corresponding input element.

  // Insert these new values into the textContent
  // property of the corresponding profile elements.

  // Close the modal.
}

// Set the submit listener.
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
*/

/*
// Select the necessary form elements. You should select
// these from inside the modal, not the document.
const addCardFormElement = // Use querySelector()
const nameInput = // Use querySelector()
const linkInput = // Use querySelector()

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Log both input values to the console.

  // Close the modal.
}

// Create the submit listener.
addCardFormElement.addEventListener('submit', handleAddCardSubmit);
*/

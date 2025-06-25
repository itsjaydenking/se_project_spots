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

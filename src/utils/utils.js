// ========================================
// LOADING STATE UTILITIES
// ========================================

export function renderLoading(
  isLoading,
  button,
  buttonText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = buttonText;
    button.disabled = false;
  }
}

export function handleSubmit(request, evt, loadingText = "Saving...") {
  // Prevent the default form submission
  evt.preventDefault();

  // Get the submit button from the event
  const submitButton = evt.submitter;
  // Store the initial button text
  const initialText = submitButton.textContent;

  // Set loading state
  renderLoading(true, submitButton, initialText, loadingText);

  // Execute the request
  request()
    .then(() => {
      // Reset the form after successful submission
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      // Reset button state
      renderLoading(false, submitButton, initialText);
    });
}

// ========================================
// MODAL UTILITIES
// ========================================

export const openModal = (modal) => {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
};

export const closeModal = (modal) => {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
};

export const closeAllModals = () => {
  document.querySelectorAll(".modal_is-opened").forEach(closeModal);
};

function handleEscape(e) {
  if (e.key === "Escape") {
    closeAllModals();
  }
}

// ========================================
// DOM UTILITIES
// ========================================

export const qs = (selector, parent = document) =>
  parent.querySelector(selector);

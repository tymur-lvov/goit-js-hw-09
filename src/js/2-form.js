const body = document.querySelector('body');
const form = document.createElement('form');
form.classList.add('feedback-form');
form.autocomplete = 'off';
body.append(form);
form.innerHTML =
  "<label>Email<input type='email' name='email' autofocus /></label><label>Message<textarea name='message' rows='8'></textarea></label><button type='submit'>Submit</button>";

const localStorageKey = 'feedback-form-state';
let feedbackFormState = {};

if (localStorage.hasOwnProperty(localStorageKey)) {
  feedbackFormState = JSON.parse(localStorage.getItem(localStorageKey));
}

form.addEventListener('input', event => {
  const emailInput = event.currentTarget.elements.email.value;
  const messageInput = event.currentTarget.elements.message.value;
  const email = emailInput.trim();
  const message = messageInput.trim();
  feedbackFormState = { email, message };

  localStorage.setItem(localStorageKey, JSON.stringify(feedbackFormState));
});

const savedState = localStorage.getItem(localStorageKey);
if (savedState !== null) {
  const parsedfeedbackFormState = JSON.parse(
    localStorage.getItem(localStorageKey)
  );
  form.elements.email.value = parsedfeedbackFormState.email;
  form.elements.message.value = parsedfeedbackFormState.message;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (form.elements.email.value !== '' && form.elements.message.value !== '') {
    console.log(feedbackFormState);
    localStorage.removeItem(localStorageKey);
    form.reset();
  } else {
    alert('Fields cannot be empty!');
  }
});

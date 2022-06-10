const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.form-input'),
  textarea: document.querySelector('.form-textarea'),
};

refs.form.addEventListener('submit', onSubmitForm);
refs.input.addEventListener('input', throttle(onSaveFormInput, 500));
refs.textarea.addEventListener('input', throttle(onSaveFormInput, 500));

const LOCAL_KEY = 'feedback-form-state';

onLoadFormInput();

function onLoadFormInput() {
  const checkData = localStorage.getItem(LOCAL_KEY);
  if (checkData === null) {
    return;
  }

  const objectData = JSON.parse(checkData);

  refs.form.elements.email.value = objectData.email;
  refs.form.elements.message.value = objectData.message;
}

function onSubmitForm(event) {
  event.preventDefault();

  console.log(JSON.parse(localStorage.getItem(LOCAL_KEY)));

  localStorage.removeItem(LOCAL_KEY);
  refs.form.reset();
}

function onSaveFormInput() {
  let dataForm = {
    email: refs.form.elements.email.value,
    message: refs.form.elements.message.value,
  };

  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}
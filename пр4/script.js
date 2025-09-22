let menuButton = document.getElementById("menuButton");
let menuCloseButton = document.getElementById("menuCloseButton");
let menu = document.getElementById("burgerMenu");

menuButton.addEventListener('click', function(event) {
  event.preventDefault();
  menu.classList.add("burgerMenu--open");
});
menuCloseButton.addEventListener('click', function(event) {
  event.preventDefault();
  menu.classList.remove("burgerMenu--open");
});

let signUpButton = document.getElementById("signUpButton");
let emailInput = document.getElementById("emailInput");
let subscribeSection = document.getElementById("subscribeSection");
let rect__text = document.querySelector(".rect__text");

signUpButton.addEventListener('click', function(event) {
  event.preventDefault();
  let email = emailInput.value;
  if (email && emailInput.checkValidity()) {
    rect__text.textContent = `Мы отправили сообщение на почту ${email}`;
    subscribeSection.classList.add("subscribeSection--shown");
  }
});
subscribeSection.addEventListener('click', function(event) {
  event.preventDefault();
  subscribeSection.classList.remove("subscribeSection--shown");
});

let tags = document.querySelectorAll(".tags__tag");
let searchLine = document.querySelector(".search__input");
tags.forEach(tag => {
  tag.addEventListener('click', function(event) {
    searchLine.value = tag.textContent;
  });
});


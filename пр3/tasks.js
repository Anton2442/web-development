// 1
function task1() {
    document.getElementById("header").textContent = "Заголовок изменён!";
}

// 2
let box = document.querySelector(".box");
box.addEventListener('mouseover', function(event) {
    event.target.classList.add("hovered");
    event.target.textContent += ", hovered";
});
box.addEventListener('mouseout', function(event) {
    event.target.classList.remove("hovered");
    event.target.textContent = "classes: box";
});

// 3
let inputField = document.getElementById("inputField");
let prevInput = inputField.value;
let output = document.getElementById("output");
inputField.addEventListener('change', function(event) {
    let change = inputField.value.length - prevInput.length;
    output.textContent = change>=0?`Добавлено символов: ${change}`:`Удалено символов: ${-change}`;
    prevInput = inputField.value;
})

// 4
document.getElementById("backgroundBox").addEventListener('dblclick', function(event) {
    event.target.style.backgroundColor = "green";
})

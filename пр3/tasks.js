// Блок 1
// 1
function task1() {
    document.getElementById("header").textContent = "Заголовок изменён!";
}

window.addEventListener('load', function() {
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
});

// 4
document.getElementById("backgroundBox").addEventListener('dblclick', function(event) {
    event.target.style.backgroundColor = "green";
});

// 5
let submitButton = document.getElementById("submitButton");
let agreeCheckbox = document.getElementById("agreeCheckbox");
agreeCheckbox.addEventListener('change', function(event) {
    submitButton.disabled = !event.target.checked;
});

// 6
let windowSize = document.getElementById("windowSize");
windowSize.textContent = `Ширина: ${window.innerWidth}px, Высота: ${window.innerHeight}px`;
window.addEventListener('resize', function(event) {
    windowSize.textContent = `Ширина: ${window.innerWidth}px, Высота: ${window.innerHeight}px`;
});

// 7
let link = document.getElementById("link");
link.addEventListener('mouseover', function(event) {
    event.target.textContent = "Вы навели мышь";
});
link.addEventListener('mouseout', function(event) {
    event.target.textContent = "Это ссылка";
});

// 8
let textField = document.getElementById("textField");
textField.addEventListener('input', function(event) {
    if (event.target.value.length > 10) {
        event.target.value = event.target.value.slice(0, 10);
    }
});

// 9
let hideMe = document.getElementById("hideMe");
hideMe.addEventListener('click', function(event) {
    event.target.style.display = "none";
});

// 10
let toggleButton = document.getElementById("toggleButton");
let toggleBox = document.getElementById("toggleBox");
toggleButton.addEventListener('click', function(event) {
    toggleBox.classList.toggle("active");
    toggleBox.classList.toggle("inactive");
});

// Блок 2
// 1
let button1 = document.createElement("button");
button1.textContent = "Нажми меня";
document.getElementById("task2_1").insertAdjacentElement("afterend", button1);

// 2
let example = document.getElementById("example");
example.classList.add("highlight");

// 3
let button = document.getElementById("button");
button.classList.remove("active");

// 4
let box1 = document.querySelector(".box1");
box1.style.width = "100px";
box1.style.height = "100px";
box1.style.backgroundColor = "red";
box1.textContent = "box1";

// 5
let header = document.getElementById("header1");
header.textContent = "Добро пожаловать!";

// 6
let myButton = document.getElementById("myButton");
myButton.addEventListener('click', function(event) {
    console.log("Кнопка нажата");
});

// 7
let myList = document.getElementById("myList");
let newItem = document.createElement("li");
newItem.textContent = "Новый элемент";
myList.appendChild(newItem);

// 8
let deleteMe = document.getElementById("deleteMe");
deleteMe.remove();

});

// 9
let link1 = document.getElementById("link1");
link1.href = "https://www.example.com";

// 10
let highlight = document.querySelectorAll(".highlight");
highlight.forEach(function(item) {
    item.style.color = "blue";
});

// Блок 3
// 1
let arr = ["item1", "item2", "item3"];
let items = document.querySelectorAll(".item");
items.forEach(function(item, index) {
    item.textContent = arr[index];
});

// 2
let products = [
    { name: "Товар 1", price: 100 },
    { name: "Товар 2", price: 200 },
    { name: "Товар 3", price: 300 }
];
let productList = document.getElementById("productList");
products.forEach(function(product) {
    let li = document.createElement("li");
    li.textContent = product.name + " - " + product.price;
    productList.appendChild(li);
});

// 3
let arr1 = ["element1", "element2", "element3", "element4"];
arr1.forEach(function(element) {
    document.getElementById(element).classList.add("highlight");
});

// 4
let tableContainer = document.getElementById("tableContainer");
let table = document.createElement("table");
tableContainer.appendChild(table);
let arr2 = [
    { name: "John", age: 25, city: "New York" },
    { name: "Jane", age: 30, city: "Los Angeles" },
    { name: "Jim", age: 35, city: "Chicago" }
];
arr2.forEach(function(obj) {
    let row = document.createElement("tr");
    Object.values(obj).forEach(function(value) {
        let cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });
    table.appendChild(row);
});

// 5
let arr3 = [
    { id: "element5", style: { backgroundColor: "#ffe5e5", border: "1px solid #ff8a8a", padding: "4px" } },
    { id: "element6", style: { backgroundColor: "#e5ffe9", border: "1px solid #6bdc7d", padding: "4px" } },
    { id: "element7", style: { backgroundColor: "#e8f1ff", border: "1px solid #79a9ff", padding: "4px" } },
    { id: "element8", style: { backgroundColor: "#fff7d6", border: "1px solid #ffd76a", padding: "4px" } }
];
arr3.forEach(function(obj) {
    let el = document.getElementById(obj.id);
    if (!el) return;
    Object.keys(obj.style).forEach(function(prop) {
        el.style[prop] = obj.style[prop];
    });
});

// Блок 4
// 1
let gallery = document.getElementById("gallery");
let images = [
    { id: "image1", src: "assets/images/image.jpg" },
    { id: "image2", src: "assets/images/image.jpg" },
    { id: "image3", src: "assets/images/image.jpg" },
    { id: "image4", src: "assets/images/image.jpg" },
    { id: "image5", src: "assets/images/image.jpg" },
    { id: "image6", src: "assets/images/image.jpg" },
];
images.forEach(function(obj) {
    let img = document.createElement("img");
    img.src = obj.src;
    img.id = obj.id;
    gallery.appendChild(img);

    img.addEventListener("click", function() {
    let all = gallery.querySelectorAll("img");
    all.forEach(function(el) {
        el.classList.remove("active");
        el.classList.add("small");
    });
    img.classList.remove("small");
    img.classList.add("active");
    });
});

// 2
let form = document.getElementById("userForm");
let table1 = document.getElementById("userTable");

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nameInput = document.getElementById("name");
    let ageInput = document.getElementById("age");

    let name = nameInput.value.trim();
    let age = parseInt(ageInput.value);

    ageInput.classList.remove("error");

    if (age < 18) {
      ageInput.classList.add("error");
      return;
    }

    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.textContent = name;
    let ageCell = document.createElement("td");
    ageCell.textContent = age;

    row.appendChild(nameCell);
    row.appendChild(ageCell);

    table1.appendChild(row);

    form.reset();
  });
}

// 3
let products1 = [
    { name: "Телефон", price: 15000 },
    { name: "Ноутбук", price: 55000 },
    { name: "Наушники", price: 3000 },
    { name: "Монитор", price: 20000 },
    { name: "Клавиатура", price: 2500 }
  ];
  
  let table2 = document.getElementById("productTable");
  let input = document.getElementById("minPrice");
  
  for (let i = 0; i < products1.length; i++) {
    let row = document.createElement("tr");
  
    let nameCell = document.createElement("td");
    nameCell.textContent = products1[i].name;
  
    let priceCell = document.createElement("td");
    priceCell.textContent = products1[i].price;
  
    row.appendChild(nameCell);
    row.appendChild(priceCell);
  
    table2.appendChild(row);
  }
  
  input.addEventListener("input", function() {
    let value = input.value;
    let rows = table2.getElementsByTagName("tr");
  
    for (let i = 1; i < rows.length; i++) {
      let price = products1[i - 1].price;
  
      if (value === "" || price > parseInt(value)) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  });

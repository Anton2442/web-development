// Разогревочные задачи
// 1
function task1() {
    let a = parseInt(document.getElementById("task1_a").value);
    let b = parseInt(document.getElementById("task1_b").value);
    document.getElementById("task1_result").textContent = a*b;
}


// 2
a = 4;
console.log(4*a);

// 3
a = 36;
console.log((a*9/5)+32);

// 4
a = 12;
b = 10;
console.log(a%b);

// 5
a = 2;
b = 5;
console.log(a*b);

// 6
a = 7;
console.log(a%2==0?"Чётное":"Нечётное");

// 7
a = 5;
console.log(a*60);

// 8
a = 3;
b = 7;
console.log(a>b?"Первое число больше":b>a?"Второе число больше":"Числа равны");

// 9
a = 2006;
console.log(2025-a);

// 10
console.log(a+b);

// Циклы
// 1
for (let i=1;i<=10;i++) {
    console.log(i);
}

// 2
let sum = 0;
let n = 5;
for (let i=1;i<=n;i++) {
    sum += i;
}
console.log(sum);

// 3
let fact = 1;
n = 5;
for (let i=1;i<=n;i++) {
    fact *= i;
}
console.log(fact);

// 4
for (let i=1;i<=20;i++) {
    if (i%2==0) {
        console.log(i);
    }
}

// 5
for (let i=1;i<=10;i++) {
    console.log(`5x${i}=${5*i}`);
}

// 6
sum = 0;
for (let i=1;i<=50;i++) {
    if (i%3==0) sum += i;
}
console.log(sum);

// 7
for (let i=10;i>=1;i--) {
    console.log(i);
}

// 8
fact = 1;
n = 5;
for (let i=1;i<=n;i++) {
    fact *= i;
}
console.log(fact);

// 9
for (let i=1;i<=100;i++) {
    if (i%7==0) console.log(i);
}

// 10
let char = "f";
n = 5;
for (let i=1;i<=n;i++) {
    console.log(char);
}

// Условия
// 1
a = 5;
console.log(a<0?"отрицательное":"положительное");

// 2
scores = 92;
console.log(scores>=90?"отлично":scores>70?"хорошо":
    scores>60?"удовлетворительно":"неудовлетворительно");

// 3
a = 6;
console.log(a%3==0?"кратно 3":"не кратно");

// 4
a = 4;
console.log(a%2==0?"Чётное":"Нечётное");

// 5
a = 3;
b = 4;
console.log(a>b?a:b);

// 6
a = 2025;
if (a%4==0) {
    if (a%400==0) {
        console.log("високосный");
    } else if (a%100==0) {
        console.log("не високосный");
    } else {
        console.log("високосный");
    }
} else {
    console.log("не високосный");
}

// 7
let t = 12;
console.log(t<10?"нужно надеть куртку":"куртку надевать не нужно");

// 8
a = 55;
console.log(a%5==0&&a%11==0?"число делится на 5 и 11":"число не делится на 5 и 11");

// 9
a = 5;
b = 7;
console.log(a==b?"числа равны":"числа не равны");

// 10
char = "|";
console.log(/[A-Za-z]/.test(char)?"является буквой":"не является буквой");

// Функции
// 1
function addition(a,b) {
    return a+b;
}

// 2
function multiplication(a,b) {
    return a*b;
}

// 3
function evenCheck(a) {
    return a%2==0;
}

// 4
function calculateFact(n) {
    let fact = 1;
    for (let i=1;i<n;i++) {
        fact *= n;
    }
    return fact;
}

// 5
function multiple3Check(a) {
    return a%3==0;
}

// 6
function toFaringate(a) {
    return (a*9/5)+32;
}

// 7
function exponent(a,b) {
    return a**b;
}

// 8
function max(a,b) {
    return a>b?a:b;
}

// 9
function min(a,b) {
    return a<b?a:b;
}

// 10
function age18(a) {
    console.log(a>=18?"совершеннолетний":"несовершеннолетний");
}

// Массивы
// 1
let arr = [1,2,3,4,5];
arr.forEach(el => console.log(el));

// 2
arr = [1,2,3,4,5];
console.log(arr.find(el => el%2==0));

// 3
arr = [1,2,3,4,5];
arr.push(6);
console.log(arr);

// 4
arr = [1,2,3,4,5];
arr.unshift(0);
console.log(arr);

// 5
arr = [1,2,3,4,5];
console.log(arr.map(el => el*2));

// 6
arr = [1,2,3,4,5];
arr.pop();
console.log(arr);

// 7
arr = [1,2,3,4,5];
arr.shift();
console.log(arr);

// 8
arr = [1,2,3,4,5];
let arr2 = [6,7,8,9,10];
console.log(arr.concat(arr2));

// 9
arr = [1,2,3,4,5];
arr.splice(2);
console.log(arr);

// 10
arr = [1,2,3,4,5];
console.log(arr.slice(2,4));

// 11
arr = [1,2,3,4,5];
let str = "";
arr.forEach(el => str += el);
console.log(str);

// 12
str = "12345"
console.log(str.split(""));

// 13
arr = [1,2,3,4,5];
sum = 0;
arr.forEach(el => sum += el);
console.log(sum);

// 14
arr = [1,2,3,4,5];
console.log(arr.map(el => el += 10));

// 15
arr = [1,-2,3,-4,5];
console.log(arr.find(el => el<0));

// Объекты
// 1
let student1 = {
    name: "Антон",
    age: 19
};
console.log(student1.name);
console.log(student1.age);

// 2
student1 = {
    name: "Антон",
    age: 19
};
student1.city = "Батайск";
console.log(student1.city);

// 3
student1 = {
    name: "Антон",
    age: 19
};
delete student1.age;
console.log(student1.age);

// 4
student1 = {
    name: "Антон",
    age: 19
};
student1.name = "Рома";
console.log(student1.name);

// 5
student1 = {
    name: "Антон",
    age: 19
};
function checkProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}
console.log(checkProperty(student1, "age")?"есть такое свойство":"нет такого свойства");

// 6
student1 = {
    name: "Антон",
    age: 19
};
function getProperty(obj, prop) {
    return obj[prop];
}
console.log(getProperty(student1, "name"));

// 7
student1 = {
    name: "Антон",
    age: 19
};
student2 = {
    name: "Рома",
    age: 40
};
function compareStudents(obj1, obj2) {
    return obj1.age>obj2.age?`${obj1.name} старше`:`${obj2.name} старше`;
}
console.log(compareStudents(student1, student2));

// 8
student1 = {
    name: "Антон",
    age: 19
};
for (prop in student1) {
    console.log(prop);
}
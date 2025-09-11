// Разогревочные задачи
function task1() {
    let a = parseInt(document.getElementById("task1_a").value);
    let b = parseInt(document.getElementById("task1_b").value);
    document.getElementById("task1_result").textContent = a * b;
}
function task2() {
    let a = parseInt(document.getElementById("task2_a").value);
    document.getElementById("task2_result").textContent = 4 * a;
}
function task3() {
    let a = parseInt(document.getElementById("task3_a").value);
    let f = (a * 9 / 5) + 32;
    document.getElementById("task3_result").textContent = f;
}
function task4() {
    let a = parseInt(document.getElementById("task4_a").value);
    let b = parseInt(document.getElementById("task4_b").value);
    document.getElementById("task4_result").textContent = a % b;
}
function task5() {
    let a = parseInt(document.getElementById("task5_a").value);
    let b = parseInt(document.getElementById("task5_b").value);
    document.getElementById("task5_result").textContent = a * b;
}
function task6() {
    let a = parseInt(document.getElementById("task6_a").value);
    let res = (a % 2 == 0) ? "Чётное" : "Нечётное";
    document.getElementById("task6_result").textContent = res;
}
function task7() {
    let a = parseInt(document.getElementById("task7_a").value);
    document.getElementById("task7_result").textContent = a * 60;
}
function task8() {
    let a = parseInt(document.getElementById("task8_a").value);
    let b = parseInt(document.getElementById("task8_b").value);
    let res = a > b ? "Первое число больше" : b > a ? "Второе число больше" : "Числа равны";
    document.getElementById("task8_result").textContent = res;
}
function task9() {
    let a = parseInt(document.getElementById("task9_a").value);
    document.getElementById("task9_result").textContent = 2025 - a;
}
function task10() {
    let a = parseInt(document.getElementById("task10_a").value);
    let b = parseInt(document.getElementById("task10_b").value);
    document.getElementById("task10_result").textContent = a + b;
}

// Циклы
function loop1() {
    let n = parseInt(document.getElementById("loop1_n").value);
    let res = "";
    for (let i = 1; i <= n; i++) {
        res += i + "\n";
    }
    document.getElementById("loop1_result").textContent = res.trim();
}
function loop2() {
    let n = parseInt(document.getElementById("loop2_n").value);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    document.getElementById("loop2_result").textContent = sum;
}
function loop3() {
    let n = parseInt(document.getElementById("loop3_n").value);
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }
    document.getElementById("loop3_result").textContent = fact;
}
function loop4() {
    let n = parseInt(document.getElementById("loop4_n").value);
    let res = "";
    for (let i = 1; i <= n; i++) {
        if (i % 2 == 0) res += i + "\n";
    }
    document.getElementById("loop4_result").textContent = res.trim();
}
function loop5() {
    let base = parseInt(document.getElementById("loop5_base").value);
    let to = parseInt(document.getElementById("loop5_to").value);
    let res = "";
    for (let i = 1; i <= to; i++) {
        res += `${base}x${i}=${base * i}\n`;
    }
    document.getElementById("loop5_result").textContent = res.trim();
}
function loop6() {
    let n = parseInt(document.getElementById("loop6_n").value);
    let d = parseInt(document.getElementById("loop6_d").value);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        if (i % d == 0) sum += i;
    }
    document.getElementById("loop6_result").textContent = sum;
}
function loop7() {
    let start = parseInt(document.getElementById("loop7_start").value);
    let res = "";
    for (let i = start; i >= 1; i--) {
        res += i + "\n";
    }
    document.getElementById("loop7_result").textContent = res.trim();
}
function loop8() {
    let n = parseInt(document.getElementById("loop8_n").value);
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }
    document.getElementById("loop8_result").textContent = fact;
}
function loop9() {
    let n = parseInt(document.getElementById("loop9_n").value);
    let d = parseInt(document.getElementById("loop9_d").value);
    let res = "";
    for (let i = 1; i <= n; i++) {
        if (i % d == 0) res += i + "\n";
    }
    document.getElementById("loop9_result").textContent = res.trim();
}
function loop10() {
    let char = document.getElementById("loop10_char").value;
    let n = parseInt(document.getElementById("loop10_n").value);
    let res = "";
    for (let i = 1; i <= n; i++) {
        res += char + "\n";
    }
    document.getElementById("loop10_result").textContent = res.trim();
}

// Условия
function cond1() {
    let a = parseInt(document.getElementById("cond1_a").value);
    document.getElementById("cond1_result").textContent = a < 0 ? "отрицательное" : "положительное";
}
function cond2() {
    let scores = parseInt(document.getElementById("cond2_scores").value);
    let res = scores >= 90 ? "отлично" : scores > 70 ? "хорошо" :
        scores > 60 ? "удовлетворительно" : "неудовлетворительно";
    document.getElementById("cond2_result").textContent = res;
}
function cond3() {
    let a = parseInt(document.getElementById("cond3_a").value);
    document.getElementById("cond3_result").textContent = (a % 3 == 0) ? "кратно 3" : "не кратно";
}
function cond4() {
    let a = parseInt(document.getElementById("cond4_a").value);
    document.getElementById("cond4_result").textContent = (a % 2 == 0) ? "Чётное" : "Нечётное";
}
function cond5() {
    let a = parseInt(document.getElementById("cond5_a").value);
    let b= parseInt(document.getElementById("cond5_b").value);
    document.getElementById("cond5_result").textContent = (a > b) ? a : b;
}
function cond6() {
    let a = parseInt(document.getElementById("cond6_a").value);
    let res;
    if (a % 4 == 0) {
        if (a % 400 == 0) {
            res = "високосный";
        } else if (a % 100 == 0) {
            res = "не високосный";
        } else {
            res = "високосный";
        }
    } else {
        res = "не високосный";
    }
    document.getElementById("cond6_result").textContent = res;
}
function cond7() {
    let t = parseInt(document.getElementById("cond7_t").value);
    document.getElementById("cond7_result").textContent = t < 10 ? "нужно надеть куртку" : "куртку надевать не нужно";
}
function cond8() {
    let a = parseInt(document.getElementById("cond8_a").value);
    document.getElementById("cond8_result").textContent = (a % 5 == 0 && a % 11 == 0) ? "число делится на 5 и 11" : "число не делится на 5 и 11";
}
function cond9() {
    let a = parseInt(document.getElementById("cond9_a").value);
    let b = parseInt(document.getElementById("cond9_b").value);
    document.getElementById("cond9_result").textContent = (a == b) ? "числа равны" : "числа не равны";
}
function cond10() {
    let char = document.getElementById("cond10_char").value;
    document.getElementById("cond10_result").textContent = /^[A-Za-z]$/.test(char) ? "является буквой" : "не является буквой";
}

// Функции
function addition(a,b) {
    return a + b;
}
function multiplication(a,b) {
    return a * b;
}
function evenCheck(a) {
    return a % 2 == 0;
}
function calculateFact(n) {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }
    return fact;
}
function multiple3Check(a) {
    return a % 3 == 0;
}
function toFaringate(a) {
    return (a * 9 / 5) + 32;
}
function exponent(a,b) {
    return a ** b;
}
function max(a,b) {
    return a > b ? a : b;
}
function min(a,b) {
    return a < b ? a : b;
}
function age18(a) {
    return a >= 18 ? "совершеннолетний" : "несовершеннолетний";
}

function func1() {
    let a = parseInt(document.getElementById("func1_a").value);
    let b = parseInt(document.getElementById("func1_b").value);
    document.getElementById("func1_result").textContent = `Складываем: ${a} + ${b} = ${addition(a,b)}`;
}
function func2() {
    let a = parseInt(document.getElementById("func2_a").value);
    let b = parseInt(document.getElementById("func2_b").value);
    document.getElementById("func2_result").textContent = `Перемножаем: ${a} × ${b} = ${multiplication(a,b)}`;
}
function func3() {
    let a = parseInt(document.getElementById("func3_a").value);
    document.getElementById("func3_result").textContent = `Число ${a} — ${evenCheck(a) ? "чётное" : "нечётное"}`;
}
function func4() {
    let n = parseInt(document.getElementById("func4_n").value);
    document.getElementById("func4_result").textContent = `Факториал ${n} = ${calculateFact(n)}`;
}
function func5() {
    let a = parseInt(document.getElementById("func5_a").value);
    document.getElementById("func5_result").textContent = `Число ${a} ${multiple3Check(a) ? "кратно 3" : "не кратно 3"}`;
}
function func6() {
    let a = parseInt(document.getElementById("func6_a").value);
    document.getElementById("func6_result").textContent = `Переводим ${a}°C в °F = ${toFaringate(a)}`;
}
function func7() {
    let a = parseInt(document.getElementById("func7_a").value);
    let b = parseInt(document.getElementById("func7_b").value);
    document.getElementById("func7_result").textContent = `Возводим в степень: ${a} ^ ${b} = ${exponent(a,b)}`;
}
function func8() {
    let a = parseInt(document.getElementById("func8_a").value);
    let b = parseInt(document.getElementById("func8_b").value);
    document.getElementById("func8_result").textContent = `Максимум из ${a} и ${b} = ${max(a,b)}`;
}
function func9() {
    let a = parseInt(document.getElementById("func9_a").value);
    let b = parseInt(document.getElementById("func9_b").value);
    document.getElementById("func9_result").textContent = `Минимум из ${a} и ${b} = ${min(a,b)}`;
}
function func10() {
    let a = parseInt(document.getElementById("func10_a").value);
    document.getElementById("func10_result").textContent = `Возраст ${a}: ${age18(a)}`;
}

// Массивы
function readNumberArray(inputId) {
    let raw = document.getElementById(inputId).value;
    return raw.split(/[ ,;]+/).filter(s => s.length > 0).map(Number);
}
function arr1() {
    let arr = readNumberArray("arr1_values");
    let res = "";
    arr.forEach(el => res += el + "\n");
    document.getElementById("arr1_result").textContent = res.trim();
}
function arr2() {
    let arr = readNumberArray("arr2_values");
    let firstEven = arr.find(el => el % 2 == 0);
    document.getElementById("arr2_result").textContent = firstEven;
}
function arr3() {
    let arr = readNumberArray("arr3_values");
    let val = parseFloat(document.getElementById("arr3_push_val").value);
    arr.push(val);
    document.getElementById("arr3_result").textContent = arr.join(", ");
}
function arr4() {
    let arr = readNumberArray("arr4_values");
    let val = parseFloat(document.getElementById("arr4_unshift_val").value);
    arr.unshift(val);
    document.getElementById("arr4_result").textContent = arr.join(", ");
}
function arr5() {
    let arr = readNumberArray("arr5_values");
    let doubled = arr.map(el => el * 2);
    document.getElementById("arr5_result").textContent = doubled.join(", ");
}
function arr6() {
    let arr = readNumberArray("arr6_values");
    arr.pop();
    document.getElementById("arr6_result").textContent = arr.join(", ");
}
function arr7() {
    let arr = readNumberArray("arr7_values");
    arr.shift();
    document.getElementById("arr7_result").textContent = arr.join(", ");
}
function arr8() {
    let arr = readNumberArray("arr8_values1");
    let arr2 = readNumberArray("arr8_values2");
    let concatenated = arr.concat(arr2);
    document.getElementById("arr8_result").textContent = concatenated.join(", ");
}
function arr9() {
    let arr = readNumberArray("arr9_values");
    let start = parseInt(document.getElementById("arr9_start").value);
    arr.splice(start);
    document.getElementById("arr9_result").textContent = arr.join(", ");
}
function arr10() {
    let arr = readNumberArray("arr10_values");
    let start = parseInt(document.getElementById("arr10_start").value);
    let end = parseInt(document.getElementById("arr10_end").value);
    let sliced = arr.slice(start, end);
    document.getElementById("arr10_result").textContent = sliced.join(", ");
}
function arr11() {
    let arr = readNumberArray("arr11_values");
    let str = "";
    arr.forEach(el => str += el);
    document.getElementById("arr11_result").textContent = str;
}
function arr12() {
    let str = document.getElementById("arr12_str").value;
    let arr = str.split("");
    document.getElementById("arr12_result").textContent = arr.join(", ");
}
function arr13() {
    let arr = readNumberArray("arr13_values");
    let sum = 0;
    arr.forEach(el => sum += el);
    document.getElementById("arr13_result").textContent = sum;
}
function arr14() {
    let arr = readNumberArray("arr14_values");
    let result = arr.map(el => el + 10);
    document.getElementById("arr14_result").textContent = result.join(", ");
}
function arr15() {
    let arr = readNumberArray("arr15_values");
    let firstNegative = arr.find(el => el < 0);
    document.getElementById("arr15_result").textContent = firstNegative;
}

// Объекты
function obj1() {
    let name = document.getElementById("obj1_name").value;
    let age = parseInt(document.getElementById("obj1_age").value);
    let student1 = { name, age };
    let res = `Имя: ${student1.name}\nВозраст: ${student1.age}`;
    document.getElementById("obj1_result").textContent = res;
}
function obj2() {
    let name = document.getElementById("obj2_name").value;
    let age = parseInt(document.getElementById("obj2_age").value);
    let city = document.getElementById("obj2_city").value;
    let student1 = { name, age };
    student1.city = city;
    document.getElementById("obj2_result").textContent = student1.city;
}
function obj3() {
    let name = document.getElementById("obj3_name").value;
    let age = parseInt(document.getElementById("obj3_age").value);
    let student1 = { name, age };
    delete student1.age;
    let res = `Имя: ${student1.name}\nВозраст: ${student1.age}`;
    document.getElementById("obj3_result").textContent = res; // undefined
}
function obj4() {
    let name = document.getElementById("obj4_name").value;
    let age = parseInt(document.getElementById("obj4_age").value);
    let newName = document.getElementById("obj4_new_name").value;
    let student1 = { name, age };
    student1.name = newName;
    document.getElementById("obj4_result").textContent = student1.name;
}
function obj5() {
    let name = document.getElementById("obj5_name").value;
    let age = parseInt(document.getElementById("obj5_age").value);
    let propName = document.getElementById("obj5_prop").value;
    let student1 = { name, age };
    function checkProperty(obj, prop) {
        return obj.hasOwnProperty(prop);
    }
    document.getElementById("obj5_result").textContent = checkProperty(student1, propName) ? "есть такое свойство" : "нет такого свойства";
}
function obj6() {
    let name = document.getElementById("obj6_name").value;
    let age = parseInt(document.getElementById("obj6_age").value);
    let propName = document.getElementById("obj6_prop").value;
    let student1 = { name, age };
    function getProperty(obj, prop) {
        return obj[prop];
    }
    document.getElementById("obj6_result").textContent = getProperty(student1, propName);
}
function obj7() {
    let name1 = document.getElementById("obj7_name1").value;
    let age1 = parseInt(document.getElementById("obj7_age1").value);
    let name2 = document.getElementById("obj7_name2").value;
    let age2 = parseInt(document.getElementById("obj7_age2").value);
    let student1 = { name: name1, age: age1 };
    let student2 = { name: name2, age: age2 };
    function compareStudents(obj1, obj2) {
        return obj1.age > obj2.age ? `${obj1.name} старше` : `${obj2.name} старше`;
    }
    document.getElementById("obj7_result").textContent = compareStudents(student1, student2);
}
function obj8() {
    let name = document.getElementById("obj8_name").value;
    let age = parseInt(document.getElementById("obj8_age").value);
    let student1 = { name, age };
    let res = "";
    for (let prop in student1) {
        res += prop + "\n";
    }
    document.getElementById("obj8_result").textContent = res.trim();
}

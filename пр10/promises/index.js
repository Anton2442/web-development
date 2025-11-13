// 1
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success");
    }, 1000);
});

promise1.then(result => {
    console.log("Задание 1:");
    console.log(result);
});


// 2
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Error");
    }, 1000);
});

promise2.catch(error => {
    console.log("Задание 2:");
    console.log(error);
});


// 3
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Completed");
    }, 1000);
});

promise3
    .then(result => {
        console.log("Задание 3:");
        console.log(result);
    })
    .catch(error => {
        console.log("Задание 3:");
        console.log(error);
    })
    .finally(() => {
        console.log("Promise done");
    });


// 4
async function task4() {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Done");
        }, 2000);
    });
    
    const result = await promise;
    console.log("Задание 4:");
    console.log(result);
}

task4();


// 5
async function task5() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Error");
        }, 1000);
    });
    
    try {
        const result = await promise;
        console.log("Задание 5:");
        console.log(result);
    } catch (error) {
        console.log("Задание 5:");
        console.log(error);
    }
}

task5();


// 6
const p1 = new Promise(resolve => setTimeout(() => resolve("First"), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve("Second"), 2000));
const p3 = new Promise(resolve => setTimeout(() => resolve("Third"), 3000));

Promise.all([p1, p2, p3]).then(results => {
    console.log("Задание 6:");
    console.log(results);
});


// 7
const fast = new Promise(resolve => setTimeout(() => resolve("Fast"), 1000));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 3000));

Promise.race([fast, slow]).then(result => {
    console.log("Задание 7:");
    console.log(result);
});


// 8
setTimeout(() => {
    Promise.resolve(5)
        .then(x => {
            console.log("Задание 8:");
            console.log(x);
            return x * 2;
        })
        .then(x => {
            console.log(x);
            return x + 3;
        })
        .then(x => {
            console.log(x);
        });
}, 100);


// 9
Promise.resolve("Result").then(result => {
    console.log("Задание 9:");
    console.log(result);
});


// 10
Promise.reject("Error").catch(error => {
    console.log("Задание 10:");
    console.log(error);
});

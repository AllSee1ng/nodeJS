"use strict";

const colors = require("colors/safe"); // Пробовал import colors from 'colors/safe.js' - не получилось, только через require

const [firstNumber, lastNumber] = process.argv.slice(2);

const getArrayLength = (firstNumber, lastNumber) => {
    if (!isNaN(firstNumber) || !isNaN(lastNumber)) {
        const arrayOfNumbers = [];
        const arrayLength = lastNumber - firstNumber;
        for (let i = 0; i <= arrayLength; i++) {
            arrayOfNumbers.push(firstNumber);
            firstNumber++;
        }

        getPrimeNumbers(arrayOfNumbers);
    } else if (firstNumber >= lastNumber) {
        console.log("Введен неправильный промежуток");
    } else {
        ("Введены не числа");
    }
};

const getPrimeNumbers = (array) => {
    const primeNumbers = [];
    let primeNum = true;
    array.forEach((element) => {
        for (let i = 2; i < element; i++) {
            if (element % i === 0) {
                primeNum = false;
                break;
            } else {
                primeNum = true;
            }
        }
        if (primeNum && element > 1) {
            primeNumbers.push(element);
        }
    });
    colorForNumber(primeNumbers);
};

const colorForNumber = (array) => {
    if (array.length === 0) {
        console.log(colors.red("нет простых чисел"));
    } else {
        console.log(
            colors.cyan(
                `Простые числа в промежутке от ${firstNumber} до ${lastNumber} `
            )
        );
        for (let i = 0; i < array.length; i += 3) {
            console.log(colors.green(array[i]));
            if (array[i + 1] !== undefined) {
                console.log(colors.yellow(array[i + 1]));
            }
            if (array[i + 2] !== undefined) {
                console.log(colors.red(array[i + 2]));
            }
        }
    }
};

getArrayLength(+firstNumber, +lastNumber);

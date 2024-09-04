import { snowLines } from './snowLines.js';

let theFinalNumber = 0;

const combinedNumbers = (arrayOfNumbers) => {
  const arraytoNumber = (arrayNum) => Number(`${arrayNum[0]}${arrayNum[1]}`);

  if (arrayOfNumbers?.length !== 2) {
    const onlyTwoNumbers = [
      arrayOfNumbers[0],
      arrayOfNumbers[arrayOfNumbers.length - 1],
    ];

    return arraytoNumber(onlyTwoNumbers);
  } else {
    return arraytoNumber(arrayOfNumbers);
  }
};

const filteringNumbers = (line) =>
  line
    .split('')
    .filter((eachChar) => !isNaN(eachChar))
    .map((turningToNum) => Number(turningToNum));

const extractedNumbers = snowLines.map(filteringNumbers)?.map(combinedNumbers);

console.log({ extractedNumbers });

theFinalNumber = extractedNumbers?.reduce(
  (partialSum, num) => partialSum + Number(num)
);

document.getElementById(
  'showing-final-number'
).innerHTML = ` This is the Final Number: ${theFinalNumber}`;

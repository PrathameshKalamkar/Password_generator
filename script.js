const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!&^@#$*)+[_}*($#"/?|%#';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set circle color gray
setIndicator("#ccc");
// set PasswordLenght
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}
// set indicator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = "0px 0px 12px 1px ${color}";
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateRandomLowercase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateRandomUppercase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
  const randomNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randomNum);
}

function calcStength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbols.checked) hasSys = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (e) {
    copyMsg.innerText = "failed";
  }
  // to m,ake copy wala span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array) {
  //fisher yates Method
  for (let i = array.length - 1; i > 0; i--) {
    // randon j using random function
    const j = Math.floor(Math.random() * (i + 1));
    // swaping
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckbox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  //special condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copybtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

generateBtn.addEventListener("click", () => {
  //none of the checkbox are selected
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  console.log("starting the journy");
  // leyts start the journey to find the new password

  // remove old password

  password = "";

  // lets put the stuff mentioned by checboxex

  // if(uppercaseCheck.checked){
  //   password += generateRandomUppercase();
  // }

  // if(lowercaseCheck.checked){
  //   password += generateRandomLowercase();
  // }

  // if(numbersCheck.checked){
  //   password += generateRandomNumber();
  // }

  // if(symbolsCheck.checked){
  //   password += generateSymbol();
  // }

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateRandomUppercase);
  }

  if (lowercaseCheck.checked) {
    funcArr.push(generateRandomLowercase);
  }

  if (numbersCheck.checked) {
    funcArr.push(generateRandomNumber);
  }

  if (symbolsCheck.checked) {
    funcArr.push(generateSymbol);
  }

  //compulsory Addition

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  console.log("compulsary Addition Done");
  //remaining Addition

  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("randIndex" + randIndex);
    password += funcArr[randIndex]();
  }
  console.log("Reamining Addition Done");
  //shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("shuffle password");
  //show in UI
  passwordDisplay.value = password;
  console.log("UI addition is done");
  calcStength();
});

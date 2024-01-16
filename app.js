const calciNumbers = document.querySelectorAll(".calciNumber");
const display = document.getElementById("display");
const backButton = document.getElementById("backButton");
const equals = document.querySelector(".equals");
const deleteBtn = document.querySelector(".delete");

let displayString = " ";

calciNumbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();
    displayString += e.target.dataset.val;
    display.value = displayString;
  });
});

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  displayString = "";
  display.value = null;
});

backButton.addEventListener("click", (e) => {
  e.preventDefault();
  displayString = displayString.slice(0, displayString.length - 1);
  display.value = displayString.length == 0 ? null : displayString;
});


function factorial(num) {
  if (num == 0 || num == 1) return 1;
  else return num * factorial(num - 1);
}

const regEx = /.*\((.*?)\)!/;

equals.addEventListener("click", (e) => {
  e.preventDefault();
  if (displayString.length) {
    evalString = displayString
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/√/g, "Math.sqrt")
      .replace(/x/g, "*")
      .replace(/\^/g, "**")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E");

    let matching = regEx.exec(evalString);
    while (matching) {
      const subexpression = matching[1];
      const subexpressionResult = eval(subexpression);
      const factResult = factorial(subexpressionResult);
      evalString = evalString.replace(`(${subexpression})!`, factResult);
      matching = regEx.exec(evalString);
    }

    console.log(evalString);
    display.value = eval(evalString);
    displayString = "";
  }
});


let num1 = 0;
let num2 = 0;
let operator = "";
let result;
let num1saved = false;
let hasResult = false;

addNumberInputDOMButtonEventListener();
addClearInputDOMButtonEventListener();
addDeleteInputDOMButtonEventListener();
addOperatorInputDOMButtonEventListener();
addEqualInputDOMButtonEventListener();

function inputNumber(num) {
  const display = document.querySelector("header");
  if (num1saved) {
    display.textContent = "0";
    num1saved = false;
  }
  if (num === ",") {
    disableComma();
  }
  if (num === "," && display.textContent === "0") {
    display.textContent = "0,";
  } else {
    if (display.textContent === "0" || hasResult) {
      display.textContent = num;
      hasResult = false;
    } else if (display.textContent === "-0") {
      if (num == ",") {
        display.textContent = "-0,";
      } else {
        display.textContent = "-" + num;
      }
    } else if (display.textContent.length < 9) {
      display.textContent = display.textContent + num;
    }
  }

  if (num != ",") {
    const disabledButtons = document.querySelectorAll("button.inactive");
    disabledButtons.forEach((button) => {
      button.classList.remove("inactive");
      button.removeAttribute("disabled");
    });
  }
}

function disableComma() {
  const comma = document.getElementById("comma");
  comma.classList.add("inactive");
  comma.setAttribute("disabled", "");
}

function enableComma() {
  const comma = document.getElementById("comma");
  comma.classList.remove("inactive");
  comma.removeAttribute("disabled");
}

function inputOp(op) {
  const display = document.querySelector("header");
  if (op.textContent == "-") {
    handleMinusButton(op);
  } else {
    desactivateOp();
    removeHighlight();
    activateOp(op);
    operator = op.textContent;
    num1 = parseFloat(display.textContent.replace(",", "."));
    num1saved = true;
    enableComma();
  }
}

function handleMinusButton(op) {
  const display = document.querySelector("header");
  if (display.textContent == "0" || display.textContent == "-0") {
    changeSign();
    if (op.classList.contains("active")) {
      op.classList.remove("active");
    } else {
      op.classList.add("active");
    }
  } else if (operator == "") {
    desactivateOp();
    operator = op.textContent;
    num1 = parseFloat(display.textContent.replace(",", "."));
    num1saved = true;
    enableComma();
  } else if (num1saved && display.textContent != String(num1)) {
    changeSign();
    if (op.classList.contains("active-plus")) {
      removeHighlight();
    } else {
      highlightNegative();
    }
  }
}

function removeHighlight() {
  const op = document.getElementById("op-");
  op.classList.remove("active-plus");
}

function highlightNegative() {
  const op = document.getElementById("op-");
  op.classList.add("active-plus");
}

function changeSign() {
  const display = document.querySelector("header");
  if (display.textContent[0] === "-") {
    display.textContent = display.textContent.slice(
      1,
      display.textContent.length
    );
  } else {
    display.textContent = "-" + display.textContent;
  }
}

function activateOp(op) {
  op.classList.add("active");
}

function desactivateOp() {
  if (operator && operator.length != 0) {
    const op = document.getElementById("op" + operator);
    if (operator != "-") {
      op.classList.remove("active");
    }
  }
}

function onClearInput() {
  const display = document.querySelector("header");
  const opButtons = document.querySelectorAll(".op");
  opButtons.forEach((opButton) => {
    opButton.classList.remove("active");
    opButton.classList.remove("active-plus");
  });
  num1 = 0;
  num2 = 0;
  operator = "";
  display.textContent = "0";
  enableComma();
  num1saved = false;
  result = 0;
  const disabledButtons = document.querySelectorAll("button[name=disable]");
  disabledButtons.forEach((button) => {
    button.classList.add("inactive");
    button.setAttribute("disabled", "");
  });
}

function onDeleteInput() {
  const display = document.querySelector("header");
  if (display.textContent != "0") {
    if (display.textContent[display.textContent.length - 1] == ",") {
      enableComma();
    }
    display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 1
    );
    if (display.textContent.length === 0) {
      display.textContent = "0";
      enableComma();
    }
  }
}

function onEqualInput() {
  const display = document.querySelector("header");
  num2 = parseFloat(display.textContent.replace(",", "."));
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "/":
      if (num2 == 0) {
        result = "ERROR";
      } else {
        result = num1 / num2;
      }
      break;
    default:
      result = display.textContent;
      break;
  }
  let formattedResult = String(result);

  if (formattedResult.length > 9) {
    if (result > 999999999) {
      formattedResult = String(result.toExponential(2));
    } else {
      formattedResult = formattedResult.slice(0, 8);
    }
  }

  if (num1saved) {
    display.textContent = num1;
    num1saved = false;
  } else {
    display.textContent = formattedResult.replace(".", ",");
  }
  const opButtons = document.querySelectorAll(".op");
  opButtons.forEach((opButton) => {
    opButton.classList.remove("active");
    opButton.classList.remove("active-plus");
  });
  hasResult = true;
  operator = "";
}

function addNumberInputDOMButtonEventListener() {
  const buttons = document.querySelectorAll("button.num");
  console.log("input number");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedNum = event.target.textContent;
      inputNumber(clickedNum);
    });
  });
}

function addClearInputDOMButtonEventListener() {
  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", (event) => {
    onClearInput();
  });
}

function addDeleteInputDOMButtonEventListener() {
  const delButton = document.getElementById("delButton");
  delButton.addEventListener("click", (event) => {
    onDeleteInput();
  });
}

function addOperatorInputDOMButtonEventListener() {
  const operators = document.querySelectorAll("button.op");
  operators.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedOp = event.target;
      inputOp(clickedOp);
    });
  });
}

function addEqualInputDOMButtonEventListener() {
  const equalButton = document.getElementById("equalButton");
  equalButton.addEventListener("click", (event) => {
    onEqualInput();
  });
}

const body = document.body
const buttons = body.querySelector(".buttons")
const screen = body.querySelector(".screen")
let screenValue = ""
let firstValue = 0
let secondValue = ""
let operator = ""

screen.textContent = "0"

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b
const modulo = (a, b) => a % b

const operate = (operator, a, b) => {
  if (operator === "+") return add(a, b)
  if (operator === "-") return subtract(a, b)
  if (operator === "*") return multiply(a, b)
  if (operator === "/") return divide(a, b)
  if (operator === "%") return modulo(a, b)
}

const numberHandler = (value) => {
  if (screenValue == 0 && value == 0) return //no unnecessary long 0 inputs
  if (firstValue) {
    //if first exists, set second
    secondValue += value
    screenValue = secondValue
  } else {
    // set screenValue to typing
    screenValue += value
  }
  screen.textContent = screenValue
  console.log({ firstValue })
  console.log({ secondValue })
  console.log({ operator })
}

const operatorHandler = (value) => {
  if (value === "CE") {
    console.log("hello")
    screenValue = ""
    firstValue = 0
    secondValue = ""
    operator = ""
    screen.textContent = "0"
  } else if (value === "=") {
    if (operator) {
      //equals is not an operator silly
      firstValue = operate(operator, +firstValue, +secondValue)
      screenValue = firstValue // screen now equals firstValue
      screen.textContent = screenValue
      operator = "" // reset operator to nothing
      secondValue = "" // second value to nothing
    } else {
      //if there is no operator
      screenValue = firstValue
      screen.textContent = screenValue
      operator = "" // set new operator
      secondValue = ""
    }
  } else if (value === ".") {
  } else if (secondValue) {
    //previously set operator, not current one
    firstValue = operate(operator, +firstValue, +secondValue)
    screenValue = firstValue
    screen.textContent = screenValue
    operator = value // set new operator
    secondValue = "" //set second value to zero
  } else {
    firstValue = screenValue //Set first value to the value onscreen
    operator = value //Set the operator to value
  }
  console.log({ firstValue })
  console.log({ secondValue })
  console.log({ operator })
}

//(!firstValue)

buttons.addEventListener("click", (e) => {
  let target = e.target.closest(".btn")
  if (!target) return

  let value = target.getAttribute("data-value")
  if (!value) return

  if (Number(value) || Number(value) === 0) {
    numberHandler(value)
  } else {
    operatorHandler(value)
  }
})

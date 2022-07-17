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
    secondValue += value
    screenValue = secondValue
  } else {
    screenValue += value
  }
  screen.textContent = screenValue
}

const operatorHandler = (value) => {
  if (value === "CE") {
    screenValue = ""
    firstValue = 0
    secondValue = ""
    operator = ""
    screen.textContent = "0"
  } else if (value === "=") {
    if (operator) {
      firstValue = operate(operator, +firstValue, +secondValue)
      screenValue = firstValue
      operator = ""
      secondValue = ""
    } else if (secondValue) {
      screenValue = secondValue
      firstValue = secondValue
      operator = ""
      secondValue = ""
    } else {
      firstValue = screenValue
      operator = ""
      secondValue = ""
    }
  } else if (value === ".") {
    if (!screenValue.includes(".")) {
      screenValue += "."
      if (secondValue) {
        secondValue += "."
      }
    }
  } else if (secondValue) {
    if (operator) {
      firstValue = operate(operator, +firstValue, +secondValue)
      screenValue = firstValue
      operator = value
      secondValue = ""
    } else {
      firstValue = screenValue
      secondValue = ""
      operator = value
    }
  } else {
    firstValue = screenValue
    operator = value
  }
  screen.textContent = screenValue

}

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

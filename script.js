const myBalance = document.getElementById("balance");
const myIncome = document.getElementById("money-income");
const myExpenses = document.getElementById("money-expense");
const historyList = document.getElementById("list");
const addNewText = document.getElementById("name-of-new");
const addNewAmount = document.getElementById("amount");
const formButton = document.getElementById("transaction-btn");
const form = document.getElementById("form");
const deletbtn = document.getElementsByClassName("delete-btn");

function randomId() {
  return Math.floor(Math.random() * 10000);
}

function addListItem(obj) {
  //get the sign of the transaction
  const sign = obj.amount < 0 ? "-" : "+";

  //I will include the sign in the template string for new <li>
  const domElement = document.createElement("li");
  //uses a template string to create a new list element
  domElement.innerHTML = `${obj.text}<span>${sign}${Math.abs(obj.amount)}
  </span><button class="delete-btn" onclick="removeListItem(${
    obj.id
  })">X</button>`;

  if (sign == "-") {
    domElement.classList.add("minus");
  } else {
    domElement.classList.add("plus");
  }

  //set the id as an attribute of <li>
  domElement.setAttribute("id", `${obj.id}`);
  //now I will append this <li> to the history List

  historyList.appendChild(domElement);
  addNewText.value = "";
  addNewAmount.value = "";
}

//want to update balance, income and expenses
function updateValues(arr) {
  let mappedAmounts = arr.map(function (obj) {
    return obj.amount;
  });

  //First I created an array containing all the amount values
  let incomeTotatl = "0";
  let incomeArr = mappedAmounts.filter(function (element) {
    if (element > 0) {
      return element;
    }
  });
  for (let i = 0; i < incomeArr.length; i++) {
    incomeTotatl = incomeTotatl - -incomeArr[i];
  }

  let expenseTotatl = 0;
  let expenseArr = mappedAmounts.filter(function (element) {
    if (element < 0) {
      return element;
    }
  });

  for (let i = 0; i < expenseArr.length; i++) {
    expenseTotatl = expenseTotatl - expenseArr[i];
  }
  let balance = incomeTotatl - expenseTotatl;
  myIncome.innerText = `$+${incomeTotatl}`;
  myExpenses.innerText = `$-${expenseTotatl}`;
  myBalance.innerHTML = `$ ${balance}`;
}
// A function to create new user inputs and list them in DOM
let transactions = [];

function addTransaction() {
  if (addNewText.value.trim() == "" || addNewAmount.value.trim() == "") {
    alert("Please add text and amount");
  } else {
    const transaction = {
      id: randomId(),
      text: addNewText.value,
      amount: addNewAmount.value,
    };
    transactions.push(transaction);
    console.log(transaction);
    console.log(transactions);
    addListItem(transaction);
    updateValues(transactions);
  }
}

//add the event listener to the form on a submit event
form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTransaction();
});
function init() {
  //historyList.innerHTML = "";
  //transactions.forEach(addListItem);
  updateValues(transactions);
}

//Initialisations

let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
let checkAmountBtn = document.getElementById("check-amount");
let totalAmountBtn = document.getElementById("total-amount-button");
let productTitle = document.getElementById("product-title");
let errorMsg = document.getElementById("budget-error");
let productTitleError = document.getElementById("product-title-error");
let productCostError = document.getElementById("product-cost-error");
let amount = document.getElementById("amount");
let expenditureVal = document.getElementById("expenditure-value");
let balanceValue = document.getElementById("balance-amount");
let list = document.getElementById("list");

let tempAmount = 0;

//Function to set Budget
totalAmountBtn.addEventListener("click", () => {
  tempAmount = totalAmount.value;

  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMsg.classList.remove("hide");
  } else {
    errorMsg.classList.add("hide");
  }
  //set budget
  amount.innerHTML = tempAmount;
  //set balance
  balanceValue.innerText = tempAmount - expenditureVal.innerText;
  //clear input box
  totalAmount.value = "";
});

//Function to Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from("edit").forEach((element) => {
    element.disabled = bool;
  });
};

//Function to Modify List Elemnets

const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureVal.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;

  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureVal.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

// Function to Create Expense List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `
 <p class="product">${expenseName}</p>
 <p class="amount">${expenseValue}</p>
 `;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "24px";

  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "24px";

  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Function to Calculate Expenses and Balance

checkAmountBtn.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  else{
    
  }
  //Enable Buttons
  disableButtons(false);
  //Expense

  let expenditure = parseInt(userAmount.value);

  //Total expense = existing + new
  let sum = parseInt(expenditureVal.innerText) + expenditure;
  expenditureVal.innerText = sum;

  //Total Balance = (budget - expensse)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //create list
  listCreator(productTitle.value, userAmount.value);

  //Empty Inputs
  productTitle.value = "";
  userAmount.value = "";
});

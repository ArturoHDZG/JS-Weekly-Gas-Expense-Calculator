'use strict';

//* Selectors & Variables
const form = document.querySelector('#agregar-gasto');
const gasList = document.querySelector('#gastos ul');

//* Events
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', askBudget);
  form.addEventListener('submit', addExpense);
}

//* Classes
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = Number(budget);
    this.expenses = [];
  }

  addExpense(expense) {
    this.expenses = [...this.expenses, expense];
    this.budgetLeft -= expense.amount;
  }
};

class UI {
  insertBudget(amount) {
    const { budget, budgetLeft } = amount;

    document.querySelector('#total').textContent = budget;
    document.querySelector('#restante').textContent = budgetLeft;
  }

  insertAlert(message, alert) {
    const messageDIV = document.createElement('DIV');
    messageDIV.classList.add('text-center', 'alert');

    if (alert === 'error') {
      messageDIV.classList.add('alert-danger');
    } else {
      messageDIV.classList.add('alert-success');
    }

    messageDIV.textContent = message;
    document.querySelector('.primario').insertBefore(messageDIV, form);

    setTimeout(() => {
      messageDIV.remove();
    }, 3000);
  };
};

//* Instances
const ui = new UI();
let budget;

//* Functions
function askBudget() {
  const askUser = prompt('¿Cuál es tu presupuesto?');

  if (
    isNaN(askUser) || askUser === '' ||
    askUser === null || askUser <= 0
  ) {
    askBudget();
  }

  budget = new Budget(askUser);
  ui.insertBudget(budget);
}

function addExpense(e) {
  e.preventDefault();

  const description = document.querySelector('#gasto').value;
  const amount = Number(document.querySelector('#cantidad').value);

  if (description === '' || amount == '') {
    ui.insertAlert('Ambos campos son obligatorios', 'error');
    return;
  } else if (isNaN(amount) || amount <= 0) {
    ui.insertAlert('La cantidad debe ser un número mayor a 0', 'error');
    return;
  }

  // Add new expense
  const expense = { description, amount, id: Date.now() };
  budget.addExpense(expense);
  ui.insertAlert('Gasto agregado', 'success');
  form.reset();

  ui.insertExpense(expense);
  ui.insertBudget(budget);

  document.querySelector('#gasto').value = '';
  document.querySelector('#cantidad').value = '';
};

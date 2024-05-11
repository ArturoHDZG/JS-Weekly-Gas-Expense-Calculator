'use strict';

//* Selectors & Variables
const form = document.querySelector('#agregar-gasto');
const gasList = document.querySelector('#gastos ul');

//* Events
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', askBudget);
}

//* Classes
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = Number(budget);
    this.expenses = [];
  }
};

class UI {
  //
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
}

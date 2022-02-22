import { TYPE, LABEL, TODO_LIST, BUTTON } from '../data/todo_selectors';

let todo_list = 0;
let todo_items = 0;
let entered_item;

Cypress.Commands.add('enterToDoItem', (toDoItem) => {
    cy.get(TYPE.TODO_FIELD).type(`${toDoItem}{enter}`);
    todo_list += 1;
    todo_items += 1;
    entered_item = toDoItem;
});

Cypress.Commands.add('assertToDoList', () => {
    cy.get(TODO_LIST.LIST).should('have.length', todo_list);
});

Cypress.Commands.add('assertItemsLeft', () => {
    if (todo_items !== 1 ){
        cy.get(LABEL.COUNT).should('have.text', todo_items + ' items left');
    }else{
        cy.get(LABEL.COUNT).should('have.text', todo_items + ' item left');
    }
});

Cypress.Commands.add('clearToDoList', () => {
    // toggle all items from list will be executed before the clear completed button is clicked
    cy.get(BUTTON.TOGGLE_ALL).click().then(() => {
        cy.get(BUTTON.CLEAR_COMPLETED).click();
    })
    cy.get(TODO_LIST.LIST).should('have.length', 0);
    todo_list = 0;
    todo_items = 0;
    cy.assertToDoList();
    cy.assertItemsLeft();
});

Cypress.Commands.add('toggleItem', (elementNumber) => {
    if (elementNumber > 0 && elementNumber <= todo_list){
        cy.get(BUTTON.TOGGLE).eq(elementNumber - 1).click();
        todo_items -= 1
    }else{
        throw new Error("Invalid item number is entered.");
    }
});

Cypress.Commands.add('assertToggledItem', (elementNumber) => {
    if (elementNumber > 0 && elementNumber <= todo_list){
        cy.get(TODO_LIST.LIST).eq(elementNumber - 1).should("have.attr", "class", "completed");
    }else{
        throw new Error("Invalid item number is entered.");
    }
});
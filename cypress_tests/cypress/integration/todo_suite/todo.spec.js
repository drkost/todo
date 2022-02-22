/// <reference types="cypress" />
import { resolution_1920, resolution_1080, toDoItem1, toDoItem2 } from '../../data/todo_constants';
import { TODO_LIST } from '../../data/todo_selectors';

describe('To do tests', () => {
  
  beforeEach(() => {
    cy.openToDoList(resolution_1920, resolution_1080);
  })
  afterEach(() => {
    cy.clearToDoList();
  })

  it('Test 1 - Enter two items in to do list', () => {
    //enter items
    cy.enterToDoItem(toDoItem1);
    cy.enterToDoItem(toDoItem2);
    //asert items text
    cy.get(TODO_LIST.LIST).eq(0).should('have.text', toDoItem1)
    cy.get(TODO_LIST.LIST).eq(1).should('have.text', toDoItem2)
    //assert numer of to do items in the list
    cy.assertToDoList();
    cy.assertItemsLeft();

   })

  it('Test 2 - toggle button', () => {
    //enter same two items without assertions
    cy.enterToDoItem(toDoItem1);
    cy.enterToDoItem(toDoItem2);

    //toggle 1st item in list
    cy.toggleItem(1);
    //assert first item in list is toggled 
    cy.assertToggledItem(1);

    cy.assertItemsLeft();
  })
})

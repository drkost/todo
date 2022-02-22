import { toDoURL, toDoPlaceholderText } from '../data/todo_constants';
import { TYPE } from '../data/todo_selectors';

Cypress.Commands.add('openToDoList', (resolutionX, resolutionY) => { 
    cy.reload();
    cy.visit(toDoURL);
    cy.request(toDoURL)
    .should((response) => {
        // assert response status is 200 & the To Do list placeholder text is loaded 
        expect(response.status).to.eq(200)         
        cy.get(TYPE.TODO_FIELD).then(($el) => {
            if ($el.has("have.attr", "placeholder", toDoPlaceholderText)){           
                
            cy.viewport(resolutionX, resolutionY);
            }
        })
    })
}); 
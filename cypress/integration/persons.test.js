describe('persons', () => {
    it('login and dashboard', () => {
        cy.visit('http://localhost:3000/');
        cy.get('#email').type('testuser@test.ch');
        cy.get('#password').type('testuser');
        cy.get('button[type=submit]').contains('Sign In').click();
        cy.get('[data-testid="burger-menu"').click();
        cy.get('[data-testid="Persons"').click();
        cy.contains('Manage Persons');
    });
    it('create new person', () => {
        cy.get('button[type=button]').contains('New').click();
        cy.contains('Add a new person');
        cy.contains('Basic Info');
        cy.contains('Address');
        cy.contains('Communications');
    });
});

describe('properties', () => {
    it('login and dashboard', () => {
        cy.visit('http://localhost:3000/');
        cy.get('#email').type('testuser@test.ch');
        cy.get('#password').type('testuser');
        cy.get('button[type=submit]').contains('Sign In').click();
        cy.get('[data-testid="burger-menu"').click();
        cy.get('[data-testid="Properties"').click();
        cy.contains('Manage Properties');
    });
    it('create new property', () => {
        cy.get('button[type=button]').contains('New').click();
        cy.contains('Create Property');
        cy.contains('Basic Info');
        cy.contains('Address');
        cy.get('button[type=button]').contains('Cancel').click();
        cy.contains('Manage Properties');
    });
});

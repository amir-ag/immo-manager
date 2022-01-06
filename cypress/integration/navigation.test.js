describe('navigation', () => {
    it('login and dashboard', () => {
        cy.visit('http://localhost:3000/');
        cy.get('#email').type('testuser@test.ch');
        cy.get('#password').type('testuser');
        cy.get('button[type=submit]').contains('Sign In').click();
        cy.contains('Dashboard');
        cy.url().should('include', '/app/dashboard');
    });
    it('navigate to persons', () => {
        cy.get('[data-testid="burger-menu"').click();
        cy.get('[data-testid="Persons"').click();
        cy.contains('Manage Persons');
    });
    it('navigate to properties', () => {
        cy.get('[data-testid="burger-menu"').click();
        cy.get('[data-testid="Properties"').click();
        cy.contains('Manage Properties');
    });
    it('navigate to rent schedule', () => {
        cy.get('[data-testid="burger-menu"').click();
        cy.get('[data-testid="Rent Schedule"').click();
        cy.contains('Rent Schedule');
    });
    it('navigate to logout and logout', () => {
        cy.get('[data-testid="burger-menu"').click();
        cy.get('button').contains('Logout').click();
        cy.contains('Sign in');
    });
});

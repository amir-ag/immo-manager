describe('rent schedule', () => {
    it('login and dashboard', () => {
        cy.visit('http://localhost:3000/');
        cy.get('#email').type('testuser@test.ch');
        cy.get('#password').type('testuser');
        cy.get('button[type=submit]').contains('Sign In').click();
        cy.get('[data-testid="burger-menu"').click();
        cy.get('[data-testid="Rent Schedule"').click();
        cy.contains('Rent Schedule');
    });
    it('rent schedule', () => {
        cy.contains("You currently don't have any properties. Start by creating one!");
        cy.get('button span.MuiButton-label').contains('Create').click();
        cy.contains('Create Property');
    });
});

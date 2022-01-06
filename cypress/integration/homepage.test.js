describe('homepage', () => {
    it('visit homepage', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Forgot password').click();
        cy.url().should('include', '/reset');
        cy.contains('Back').click();
        cy.contains("Don't have an account? Sign up").click();
        cy.contains('Already have an account? Sign in').click();
        cy.get('button[type=submit]').contains('Sign In');
    });
});

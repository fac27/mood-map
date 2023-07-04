describe('Navigation', ()=>{
 it('should navigate to the life-in-colour page', ()=>{
    cy.visit('/life-in-colour')
    cy.get('Link[href*="life-in-colour"]').click()
    cy.url().should('include', '/life-in-colour')
    cy.get('h1').contains('Life in Colour')
 })
})
/// <reference types = "cypress"/>  

it('Test 1', () => {
  cy.visit('http://localhost:8080/routemanagement')
  cy.get('h1').contains('Routes Management Pannel')
  cy.get('button').should('contain', 'Add ')
  //cy.get('#dateAdd').should('have.attr', 'placeholder')
})


it('Test pedD', () => {
  cy.visit('http://localhost:8080/routemanagement')
  cy.get('#fromcityAdd').type('saudi')
  cy.get('#tocityAdd').type('Arabia')
  cy.get('#costAdd').type('3')
  cy.get('#timeAdd').type('06:00:00')
  cy.get('#dateAdd').type('2022-03-24')
  cy.get('.add').click()


})
/*
 it('Test 2', () => {
  cy.visit('http://localhost:8080/routemanagement')
  //to be add by you
  cy.get('#fromcityAdd').type('Rome')
  cy.get('#tocityAdd').type('Florence')
  cy.get('#costAdd').type(24)
  cy.get('#timeAdd').type('06:00:00')
  cy.get('#dateAdd').type('2022-03-24')
  cy.get('.add').click()
}) */

 it("Test 3 - API - Add route request", function() {
  cy.request('POST', 'http://localhost:3000/api/routes', {
      //to be add by you
          "fromcity": "Parnu",
          "tocity": "Tartu",
          "cost": 12,
          "departuretime": "12:00:00",
          "departuredate": "2022-03-24"
      })
      .then((res) => {
          cy.log(res.body)
          let post = res.body.rows['0'].id
          expect(post).to.not.be.null;
          cy.log('a route is added')
      });
}) 
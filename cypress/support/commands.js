// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const faker = require('faker');

// Variables para almacenar el estado inicial del carrito y el número inicial de productos en el carrito
let initialCartState;
let initialItemCount;

// -- Custom Command to Get Initial Cart Count --
//Este comando obtiene el valor inicial del contador del carrito de compras. Verifica si el contador está presente en la página y devuelve su valor numérico. Si el contador no está presente o está vacío, devuelve 0.
Cypress.Commands.add('getInitialCartCount', () => {
  return cy.get('.counter.qty').then(($counter) => {
    if (!$counter.hasClass('empty')) {
      return cy.get('.counter-number').invoke('text').then((text) => {
        const cleanedText = text.trim(); // Eliminar espacios en blanco
        cy.log('Texto obtenido del contador: ' + cleanedText);
        const count = parseFloat(cleanedText);
        cy.log('Valor inicial del contador del carrito: ' + count);
        return !isNaN(count) ? count : 0; // Devuelve el número o 0 si no es un número
      });
    }
    cy.log('Contador del carrito vacío, devolviendo 0');
    return 0; // Devuelve 0 si el contador está vacío
  });
});

// -- Custom Command to Check Cart Counter --
//Este comando verifica que el contador del carrito de compras se haya actualizado al valor esperado después de realizar una acción, como añadir un producto al carrito.
Cypress.Commands.add('checkCartCounter', (expectedCount) => {
  cy.get('.counter-number').invoke('text').then((text) => {
    const cleanedText = text.trim(); // Eliminar espacios en blanco
    cy.log('Texto obtenido del contador para verificación: ' + cleanedText);
    const count = parseFloat(cleanedText);
    if (!isNaN(count)) {
      cy.log('Valor actual del contador del carrito: ' + count);
      expect(count).to.equal(expectedCount);
    } else {
      throw new Error("Contador del carrito no es un número válido. Valor obtenido: " + cleanedText);
    }
  });
});

// -- Custom Command to Fill Registration Form with Random Data --
Cypress.Commands.add('fillRegisterFormWithRandomData', () => {
  const nombreAleatorio = faker.name.firstName();
  const apellidoAleatorio = faker.name.lastName();
  const emailAleatorio = faker.internet.email();

  cy.get('#firstname').type(nombreAleatorio);
  cy.get('#lastname').type(apellidoAleatorio);
  cy.get('#second_lastname').type(apellidoAleatorio);
  cy.get('#email_address').type(emailAleatorio);
  // Add more fields here if necessary
});

// Verificar el cambio de estado del carrito
Cypress.Commands.add('verifyCartStateChange', () => {
  cy.get('.counter-number').should(($newCartState) => {
    // Verificar si el estado del carrito cambió correctamente
    expect($newCartState.text().trim()).not.to.equal(initialCartState);
  });
});

// Verificar el aumento de la cantidad de artículos
Cypress.Commands.add('verifyItemCountIncrease', () => {
  cy.get('.counter-number').then(($counter) => {
    const counterText = $counter.text().trim();
    // Verifica si counterText es un número válido
    const newItemCount = isNaN(counterText) ? 0 : parseInt(counterText);
    expect(newItemCount).to.equal(initialItemCount + 1);
  });
});

// Verificar el aumento de la cantidad de artículos
Cypress.Commands.add('Login', () => {
  
  // Hacer clic en el botón "Ingresar"
  cy.get('#header-custom > div > div.col-md-3.col-sm-4.col-xs-7.mobile-link > ul > li.link.authorization-link > a').click({ force: true })
  // Llenar formulario de "Clientes registrados"
  cy.get('#email').type('pruebas_0-1@yopmail.com')
  cy.get('#pass').type('Pruebas123*')
  //Hacer clic en botón "Iniciar sesión"
  cy.get('#send2').click()
});


/// <reference types='Cypress' />

describe('Test cases for Add To Cart flow', () => {
  let dataUser;
  let initialCartState;
  let initialItemCount;
  // Genera un valor aleatorio entre 1 y 5
  const incremento = Math.floor(Math.random() * 5) + 1;

  before(() => {
    cy.fixture('DataMongeCR.json').then((data) => {
      dataUser = data;
    });
  });

  beforeEach(() => {
    cy.visit('https://mcstage.tiendamonge.com/default/')

    // Captura el estado inicial del carrito
    cy.get('.counter-number').invoke('text').then((text) => {
      initialCartState = text.trim();
    });

    // Captura el número inicial de productos en el carrito
    cy.get('.counter-number').invoke('text').then((text) => {
      initialItemCount = parseInt(text.trim()) || 0;
    });
  })

  context('Add to cart flow', () => {
    //Test case #2: Verificar que permita añadir un Producto al Carrito desde la Página de Detalle de Producto (PDP) - Guest
    it('ADDP-002: Verify that you can add a Product to the Cart from the Product Detail Page (PDP) - Guest', () => {

      //Dar clic en el Menú
      cy.get('#ui-id-3').click()
      cy.wait(1000)

      //Dar clic en la categoría
      cy.contains('span', 'Electrodomésticos').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(2) > .col-md-4').click()
      cy.wait(2000)

      // Hacer click en el pop up de envio a domicilio
      cy.get(':nth-child(2) > .label > .control > .select-icon').click()

      // Seleccionar Provincia, Canton y Distrito
      cy.get('#location_state_select').select(dataUser.provincia[0])
      cy.get('#location_district_select').select(dataUser.canton[0])
      cy.get('#location_zone_select').select(dataUser.distrito[0])

      // Guardar la direccion de envio
      cy.get('button.action-save-location').click()

      //Dar clic en "Agregar al carrito"
      cy.get('#product-addtocart-button').click()
      cy.wait(5000)

      // Espera a que el estado del carrito cambie correctamente
      cy.get('.counter-number').should(($newCartState) => {
        // Verifica si el estado del carrito cambió correctamente
        expect($newCartState.text().trim()).not.to.equal(initialCartState);
      });

      // Verifica si el número de productos en el carrito aumentó
      cy.get('.counter-number').invoke('text').then((text) => {
        const newItemCount = parseInt(text.trim()) || 0;
        expect(newItemCount).to.equal(initialItemCount + 1);
      });

      //Verificar mensaje exitoso
      cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]').should('exist')
    });

    //Test case #3: Verificar que no permita añadir un Producto Sin Stock al Carrito - Guest
    it('ADDP-003: Verify that it does not allow adding an Out of Stock Product to the Cart - Guest', () => {


      //Dar clic en el Menú
      cy.get('#ui-id-3').click()

      //Dar clic en la categoría
      cy.contains('span', 'Deportes').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(3) > .col-md-4').click()

      // Hacer click en el pop up de envio a domicilio
      cy.get(':nth-child(2) > .label > .control > .select-icon').click()
      cy.wait(1000)

      // Seleccionar Provincia, Canton y Distrito
      cy.get('#location_state_select').select(dataUser.provincia[0])
      cy.get('#location_district_select').select(dataUser.canton[0])
      cy.get('#location_zone_select').select(dataUser.distrito[0])

      // Guardar la direccion de envio
      cy.get('button.action-save-location').click()

      //Verificar mensaje fallido
      cy.get('div[data-ui-id="checkout-cart-validationmessages-message-error"]').should('exist')

    });

    //Test case #4: Verificar que permita añadir Múltiples Unidades de un Producto al Carrito - Guest   
    it('ADDP-004: Verify that multiple units of a product can be added to the cart - Guest', () => {

      //Dar clic en el Menú
      cy.get('#ui-id-3').click()
      cy.wait(1000)

      //Dar clic en la categoría
      cy.contains('span', 'Electrodomésticos').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(2) > .col-md-4').click()
      cy.wait(2000)

      // Hacer click en el pop up de envio a domicilio
      cy.get(':nth-child(2) > .label > .control > .select-icon').click()

      // Seleccionar Provincia, Canton y Distrito
      cy.get('#location_state_select').select(dataUser.provincia[0])
      cy.get('#location_district_select').select(dataUser.canton[0])
      cy.get('#location_zone_select').select(dataUser.distrito[0])

      // Guardar la direccion de envio
      cy.get('button.action-save-location').click()

      // Aumentar la cantidad 
      cy.get('#qty').clear()
      cy.get('#qty').type(incremento)

      //Dar clic en "Agregar al carrito"
      cy.get('#product-addtocart-button').click()
      cy.wait(5000)

      // Espera a que el estado del carrito cambie correctamente
      cy.get('.counter-number').should(($newCartState) => {
        // Verifica si el estado del carrito cambió correctamente
        expect($newCartState.text().trim()).not.to.equal(initialCartState);
      });

      // Verifica si el número de productos en el carrito aumentó
      cy.get('.counter-number').invoke('text').then((text) => {
        const newItemCount = parseInt(text.trim()) || 0;
        expect(newItemCount).to.equal(initialItemCount + incremento);
      });

      //Verificar mensaje exitoso
      cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]').should('exist')

    })

    //Test case #7: Verificar que permita añadir un Producto al Carrito desde la Página de Detalle de Producto (PDP) - Login
    it.only('ADDP-007: Verify that you can add a Product to the Cart from the Product Detail Page (PDP) - Login', () => {

      cy.Login()

      //Dar clic en el Menú
      cy.get('#ui-id-3').click()
      cy.wait(1000)

      //Dar clic en la categoría
      cy.contains('span', 'Electrodomésticos').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(2) > .col-md-4').click()
      cy.wait(2000)

      // Hacer click en el pop up de envio a domicilio
      cy.get(':nth-child(2) > .label > .control > .select-icon').click()

      // Seleccionar Provincia, Canton y Distrito
      cy.get('#location_state_select').select(dataUser.provincia[0])
      cy.get('#location_district_select').select(dataUser.canton[0])
      cy.get('#location_zone_select').select(dataUser.distrito[0])

      // Guardar la direccion de envio
      cy.get('button.action-save-location').click()

      //Dar clic en "Agregar al carrito"
      cy.get('#product-addtocart-button').click()
      cy.wait(5000)

      // Espera a que el estado del carrito cambie correctamente
      cy.get('.counter-number').should(($newCartState) => {
        // Verifica si el estado del carrito cambió correctamente
        expect($newCartState.text().trim()).not.to.equal(initialCartState);
      });

      // Verifica si el número de productos en el carrito aumentó
      cy.get('.counter-number').invoke('text').then((text) => {
        const newItemCount = parseInt(text.trim()) || 0;
        expect(newItemCount).to.equal(initialItemCount + 1);
      });

      //Verificar mensaje exitoso
      cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]').should('exist')
    });

    //Test case #8: Verificar que no permita añadir un Producto Sin Stock al Carrito - Login
    it('ADDP-008: Verify that it does not allow adding an Out of Stock Product to the Cart - Login', () => {

      cy.Login()

      //Dar clic en el Menú
      cy.get('#ui-id-3').click()

      //Dar clic en la categoría
      cy.contains('span', 'Deportes').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(3) > .col-md-4').click()

      // Hacer click en el pop up de envio a domicilio
      cy.get(':nth-child(2) > .label > .control > .select-icon').click()
      cy.wait(1000)

      // Seleccionar Provincia, Canton y Distrito
      cy.get('#location_state_select').select(dataUser.provincia[0])
      cy.get('#location_district_select').select(dataUser.canton[0])
      cy.get('#location_zone_select').select(dataUser.distrito[0])

      // Guardar la direccion de envio
      cy.get('button.action-save-location').click()

      //Verificar mensaje fallido
      cy.get('div[data-ui-id="checkout-cart-validationmessages-message-error"]').should('exist')

    });

    //Test case #9: Verificar que permita añadir Múltiples Unidades de un Producto al Carrito - Login   
    it('ADDP-009: Verify that multiple units of a product can be added to the cart - Login', () => {

      cy.Login()

      //Dar clic en el Menú
      cy.get('#ui-id-3').click()
      cy.wait(1000)

      //Dar clic en la categoría
      cy.contains('span', 'Electrodomésticos').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(2) > .col-md-4').click()
      cy.wait(2000)

      // Hacer click en el pop up de envio a domicilio
      cy.get(':nth-child(2) > .label > .control > .select-icon').click()

      // Seleccionar Provincia, Canton y Distrito
      cy.get('#location_state_select').select(dataUser.provincia[0])
      cy.get('#location_district_select').select(dataUser.canton[0])
      cy.get('#location_zone_select').select(dataUser.distrito[0])

      // Guardar la direccion de envio
      cy.get('button.action-save-location').click()

      // Aumentar la cantidad 
      cy.get('#qty').clear()
      cy.get('#qty').type(incremento)

      //Dar clic en "Agregar al carrito"
      cy.get('#product-addtocart-button').click()
      cy.wait(5000)

      // Espera a que el estado del carrito cambie correctamente
      cy.get('.counter-number').should(($newCartState) => {
        // Verifica si el estado del carrito cambió correctamente
        expect($newCartState.text().trim()).not.to.equal(initialCartState);
      });

      // Verifica si el número de productos en el carrito aumentó
      cy.get('.counter-number').invoke('text').then((text) => {
        const newItemCount = parseInt(text.trim()) || 0;
        expect(newItemCount).to.equal(initialItemCount + incremento);
      });

      //Verificar mensaje exitoso
      cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]').should('exist')

    })

  })
})
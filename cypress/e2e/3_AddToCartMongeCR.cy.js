/// <reference types='Cypress' />

describe('Test cases for Add To Cart flow', () => {
  let dataUser;

  before(() => {
    cy.fixture('DataMongeCR.json').then((data) => {
      dataUser = data;
    });
  });

  beforeEach(() => {
      cy.visit('https://mcstage.tiendamonge.com/default/')
      })

  context('Add to cart flow', () => {
  //Test case #2: Verificar que permita añadir un Producto al Carrito desde la Página de Detalle de Producto (PDP) - Guest
    it('ADDP-002: Verify that you can add a Product to the Cart from the Product Detail Page (PDP) - Guest', () => {

      // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
      cy.getInitialCartCount().then((initialCount) => {

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

        //Verificar mensaje exitoso
      cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]').should('exist')

        // Esperar a que el modal del carrito sea visible
        cy.get('#ui-id-1').should('be.visible')

        // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado
        cy.checkCartCounter(initialCount + 1)
      });
    });

      //Test case #3: Verificar que no permita añadir un Producto Sin Stock al Carrito - Guest
      it('ADDP-003: Verify that it does not allow adding an Out of Stock Product to the Cart - Guest', () => {

  
          //Dar clic en el Menú
          cy.get('#ui-id-3').click()
  
          //Dar clic en la categoría
          cy.contains('span', 'Electrodomésticos').click()
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

      // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
      cy.getInitialCartCount().then((initialCount) => {
        let totalProductsAdded = 1 // Comienza con 1 producto añadido

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
        cy.get('#qty').type(3)

        //Dar clic en "Agregar al carrito"
        cy.get('#product-addtocart-button').click()

        //Verificar mensaje exitoso
      cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]').should('exist')

        // Esperar a que el modal del carrito sea visible
        cy.get('#ui-id-1').should('be.visible')

        // Verificar que el contador del carrito se ha actualizado al total esperado
        cy.checkCartCounter(initialCount + 3)
      })
    })

      //Test case #7: Verificar que permita añadir un Producto al Carrito desde la Página de Detalle de Producto (PDP) - Login
      it('ADDP-007: Verify that you can add a Product to the Cart from the Product Detail Page (PDP) - Login', () => {

        // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
        cy.getInitialCartCount().then((initialCount) => {
  
          // Hacer clic en el botón "Ingresar"
        cy.get('#header-custom > div > div.col-md-3.col-sm-4.col-xs-7.mobile-link > ul > li.link.authorization-link > a').click({ force: true })
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[0])
        //Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        
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
  
          //Verificar mensaje exitoso
        cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]').should('exist')
  
          // Esperar a que el modal del carrito sea visible
          cy.get('#ui-id-1').should('be.visible')
  
          // Utilizar el comando personalizado para verificar que el contador del carrito se ha actualizado
          cy.checkCartCounter(initialCount + 1)
        });
      });
  
        //Test case #8: Verificar que no permita añadir un Producto Sin Stock al Carrito - Login
        it('ADDP-008: Verify that it does not allow adding an Out of Stock Product to the Cart - Login', () => {
  
    
            // Hacer clic en el botón "Ingresar"
        cy.get('#header-custom > div > div.col-md-3.col-sm-4.col-xs-7.mobile-link > ul > li.link.authorization-link > a').click({ force: true })
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[0])
        //Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        //Dar clic en el Menú
            cy.get('#ui-id-3').click()
    
            //Dar clic en la categoría
            cy.contains('span', 'Electrodomésticos').click()
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
  
        // Obtener el valor inicial del contador del carrito a través de comando getInitialCartCount (Revisar archivo commands.js)
        cy.getInitialCartCount().then((initialCount) => {
          let totalProductsAdded = 1 // Comienza con 1 producto añadido
  
          // Hacer clic en el botón "Ingresar"
        cy.get('#header-custom > div > div.col-md-3.col-sm-4.col-xs-7.mobile-link > ul > li.link.authorization-link > a').click({ force: true })
        // Llenar formulario de "Clientes registrados"
        cy.get('#email').type(dataUser.email[0])
        cy.get('#pass').type(dataUser.password[0])
        //Hacer clic en botón "Iniciar sesión"
        cy.get('#send2').click()
        
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
          cy.get('#qty').type(5)
  
          //Dar clic en "Agregar al carrito"
          cy.get('#product-addtocart-button').click()
  
          //Verificar mensaje exitoso
        cy.get('div[data-ui-id="checkout-cart-validationmessages-message-success"]').should('exist')
  
          // Esperar a que el modal del carrito sea visible
          cy.get('#ui-id-1').should('be.visible')
  
          // Verificar que el contador del carrito se ha actualizado al total esperado
          cy.checkCartCounter(initialCount + 5)
        })
      })
    
  })
})
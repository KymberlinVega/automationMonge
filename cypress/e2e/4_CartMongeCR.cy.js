/// <reference types='Cypress' />

describe('Test cases for Cart flow', () => {
  let dataUser;
  let firstProduct;
  let secondProduct;
  let initialTotalCart;
  let finalTotalCart;
  // Genera un valor aleatorio entre 1 y 5
  const incremento = Math.floor(Math.random() * 5) + 2;

  before(() => {
    cy.fixture('DataMongeCR.json').then((data) => {
      dataUser = data;
    });
  });

  beforeEach(() => {
    cy.visit('https://mcstage.tiendamonge.com/default/')
  })

  context('Cart flow', () => {
    //Test case #1: Verificar que se pueda eliminar un producto del CART y se realice la actualización del SUMMARY
    it.only('CART-001: Verify that a product can be removed from the Cart and the summary update is performed', () => {

      //Producto 1
      //Dar clic en el Menú
      cy.get('#ui-id-3').click()
      cy.wait(1000)

      //Dar clic en la categoría
      cy.contains('span', 'Electrodomésticos').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(2) > .col-md-4').click()
      cy.wait(2000)

      // Guardar el valor de precio
      cy.get('#product-price-68961 > .price').invoke('text').then((text) => {
        firstProduct = text.trim()
      })
      cy.wait(1000)

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

      //Producto 2
      //Dar clic en el Menú
      cy.get('#ui-id-3').click()
      cy.wait(1000)

      //Dar clic en la categoría
      cy.contains('span', 'Audio').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(2) > .col-md-4').click()
      cy.wait(2000)

      // Guardar el valor de precio
      cy.get('#product-price-80775 > .price').invoke('text').then((text) => {
        secondProduct = text.trim()
      });
      cy.wait(1000)

      // Hacer click en el pop up de retiro en tienda
      cy.get(':nth-child(1) > .label > .control > .select-icon').click()

      // Seleccionar Provincia
      cy.get('.select-store-form > .content > .form > .fieldset > .field-select-state > .control > .select').select(dataUser.provincia[1])
      cy.wait(2000)

      //Seleccionar tienda Disenos
      cy.get(':nth-child(1) > .label > .select-icon').click()

      // Guardar Tienda
      cy.get('._show > .modal-inner-wrap > .modal-footer > .primary').click()

      //Dar clic en "Agregar al carrito"
      cy.get('#product-addtocart-button').click()

      // Esperar a que el modal del carrito sea visible
      cy.get('#ui-id-1').should('be.visible')

      // Hacer click en Ver carrito de compra
      cy.get(':nth-child(7) > .secondary > .action > span').click()
      cy.wait(2000)

      //Hacer click en el detalle del metodo de envio
      cy.get('.delivery-method-content').click()
      cy.wait(1000)

      // Guardar el valor de precio total
      cy.get('.incl > .amount > strong > .price').invoke('text').then((text) => {
        initialTotalCart = text.trim()
      });
      cy.wait(1000)

      //Hacer click en Remover articulo
      cy.get(':nth-child(2) > .item-info > .col > .product-item-details > .actions-buttons > .action-delete > span').click()
      cy.wait(2000)

      //Hacer click en el detalle del metodo de envio
      cy.get('.delivery-method-content').click()
      cy.wait(1000)

      // Espera a que el estado del carrito cambie correctamente
      cy.get('.incl > .amount > strong > .price').should(($newCartState) => {
        // Verifica si el estado del carrito cambió correctamente
        expect($newCartState.text().trim()).not.to.equal(initialTotalCart);
      });
      cy.wait(2000)

      // Verificar el valor del carrito final
      cy.get('.incl > .amount > strong > .price').invoke('text').then((text) => {
        finalTotalCart = text.trim()
        expect(finalTotalCart).to.equal(secondProduct);
    });


    });
    //Test case #2: Verificar que se puedan eliminar todos los productos del CART y se realice la actualización del SUMMARY
    it('CART-002: Verify that all products can be removed from the cart and the summary update is performed', () => {

      //Dar clic en el Menú
      cy.get('#ui-id-3').click()
      cy.wait(1000)

      //Dar clic en la categoría
      cy.contains('span', 'Audio').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(2) > .col-md-4').click()
      cy.wait(2000)

      // Hacer click en el pop up de retiro en tienda
      cy.get(':nth-child(1) > .label > .control > .select-icon').click()

      // Seleccionar Provincia
      cy.get('.select-store-form > .content > .form > .fieldset > .field-select-state > .control > .select').select(dataUser.provincia[1])
      cy.wait(2000)

      //Seleccionar tienda Disenos
      cy.get(':nth-child(1) > .label > .select-icon').click()

      // Guardar Tienda
      cy.get('._show > .modal-inner-wrap > .modal-footer > .primary').click()

      //Dar clic en "Agregar al carrito"
      cy.get('#product-addtocart-button').click()

      // Esperar a que el modal del carrito sea visible
      cy.get('#ui-id-1').should('be.visible')

      // Hacer click en Ver carrito de compra
      cy.get(':nth-child(7) > .secondary > .action > span').click()
      cy.wait(2000)

      //Hacer click en el detalle del metodo de envio
      cy.get('.delivery-method-content').click()
      cy.wait(1000)

      //Hacer click en Remover articulo
      cy.get(':nth-child(2) > .item-info > .col > .product-item-details > .actions-buttons > .action-delete > span').click()
      cy.wait(2000)

      //veririfar carrito vacio
      cy.get('.cart-empty > :nth-child(1)').should('be.visible')

    });

    //Test case #4: Verificar que se puede reducir la cantidad a comprar de un producto y se realice la actualización del SUMMARY
    it('CART-004: Verify that the quantity to be purchased of a product can be reduced and the summary is updated', () => {

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

      // Esperar a que el modal del carrito sea visible
      cy.get('#ui-id-1').should('be.visible')

      // Hacer click en Ver carrito de compra
      cy.get(':nth-child(7) > .secondary > .action > span').click()
      cy.wait(2000)

      //Hacer click en el detalle del metodo de envio
      cy.get('.delivery-method-content').click()
      cy.wait(1000)

      //Hacer click en Editar
      cy.get('.actions-buttons > .action-edit > span').click()

      // Hacer click en el pop up de retiro en tienda
      cy.get(':nth-child(1) > .label > .control > .select-icon').click()

      // Seleccionar Provincia
      cy.get('.select-store-form > .content > .form > .fieldset > .field-select-state > .control > .select').select(dataUser.provincia[1])
      cy.wait(2000)

      //Seleccionar tienda Disenos
      cy.get(':nth-child(1) > .label > .select-icon').click()

      // Guardar Tienda
      cy.get('._show > .modal-inner-wrap > .modal-footer > .primary').click()

      // Disminuir la cantidad 
      cy.get('.minus > button').click()

      // Actualizar carrito
      cy.get('#product-updatecart-button').click()

      // Validaci[on del mensaje
      cy.get('.message-success > div').should('be.visible')

    });

    //Test case #5: Verificar que se puede aumentar la cantidad a comprar de un producto y se realice la actualización del SUMMARY
    it('CART-005: Verify that the quantity to be purchased of a product can be increased and the summary is updated', () => {

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

      // Esperar a que el modal del carrito sea visible
      cy.get('#ui-id-1').should('be.visible')

      // Hacer click en Ver carrito de compra
      cy.get(':nth-child(7) > .secondary > .action > span').click()
      cy.wait(2000)

      //Hacer click en el detalle del metodo de envio
      cy.get('.delivery-method-content').click()
      cy.wait(1000)

      //Hacer click en Editar
      cy.get('.actions-buttons > .action-edit > span').click()

      // Hacer click en el pop up de retiro en tienda
      cy.get(':nth-child(1) > .label > .control > .select-icon').click()

      // Seleccionar Provincia
      cy.get('.select-store-form > .content > .form > .fieldset > .field-select-state > .control > .select').select(dataUser.provincia[1])
      cy.wait(2000)

      //Seleccionar tienda Disenos
      cy.get(':nth-child(1) > .label > .select-icon').click()

      // Guardar Tienda
      cy.get('._show > .modal-inner-wrap > .modal-footer > .primary').click()

      // aumentar la cantidad 
      cy.get('.plus > button').click()

      // Actualizar carrito
      cy.get('#product-updatecart-button').click()

      // Validaci[on del mensaje
      cy.get('.message-success > div').should('be.visible')

    });

    //Test case #11: Verificar que se pueda acceder a las product page de los productos existentes en el CART
    it('CART-011: Verify that the product page of the existing products in the cart can be accessed', () => {

      //Dar clic en el Menú
      cy.get('#ui-id-3').click()
      cy.wait(1000)

      //Dar clic en la categoría
      cy.contains('span', 'Audio').click()
      cy.wait(1000)

      // Hacer clic en un producto en la cuadrícula de productos (PLP)
      cy.get(':nth-child(2) > .col-md-4').click()
      cy.wait(2000)

      // Hacer click en el pop up de retiro en tienda
      cy.get(':nth-child(1) > .label > .control > .select-icon').click()

      // Seleccionar Provincia
      cy.get('.select-store-form > .content > .form > .fieldset > .field-select-state > .control > .select').select(dataUser.provincia[1])
      cy.wait(2000)

      //Seleccionar tienda Disenos
      cy.get(':nth-child(1) > .label > .select-icon').click()

      // Guardar Tienda
      cy.get('._show > .modal-inner-wrap > .modal-footer > .primary').click()

      //Dar clic en "Agregar al carrito"
      cy.get('#product-addtocart-button').click()

      // Esperar a que el modal del carrito sea visible
      cy.get('#ui-id-1').should('be.visible')

      // Hacer click en Ver carrito de compra
      cy.get(':nth-child(7) > .secondary > .action > span').click()
      cy.wait(2000)

      //Hacer click en el detalle del metodo de envio
      cy.get('.delivery-method-content').click()
      cy.wait(1000)

      //Hacer click en Editar
      cy.get('.actions-buttons > .action-edit > span').click()

    });
  });
})

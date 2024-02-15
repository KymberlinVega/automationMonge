/// <reference types='Cypress' />

describe('Test cases for Cart flow', () => {
  let dataUser;

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
    it('CART-001: Verify that a product can be removed from the Cart and the summary update is performed', () => {

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

        // Guardar ek valor de precio
        let txtPrice1 
        cy.get('#product-price-81513 > .price').then(($objPriceProd1)=>{
          txtPrice1 = $objPriceProd1.text()
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

        // Guardar ek valor de precio
        let txtPrice2 
        cy.get('#product-price-80775 > .price').then(($objPriceProd2)=>{
          txtPrice2 = $objPriceProd2.text()
        })
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

        // Guardar ek valor de precio
        let txtPriceTotal1 
        cy.get('.incl > .amount > strong > .price').then(($objPriceTotal1)=>{
          txtPriceTotal1 = $objPriceTotal1.text()
        })
        cy.wait(1000)

        //Hacer click en Remover articulo
        cy.get(':nth-child(2) > .item-info > .col > .product-item-details > .actions-buttons > .action-delete > span').click()
        cy.wait(2000)

        //Hacer click en el detalle del metodo de envio
        cy.get('.delivery-method-content').click()
        cy.wait(1000)

        // Guardar el valor de precio total 2
        //cy.get('.incl > .amount > strong > .price').invoke('text').should("eq", txtPriceTotal1 - txtPrice1)
        //cy.wait(1000)


      });
    });
    
  })
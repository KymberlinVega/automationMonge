/// <reference types='Cypress' />

describe('Test cases for Login flow', () => {
    let dataUser; // Variable para almacenar los datos cargados desde el JSON

    before(() => {
        // Cargar los datos desde el archivo JSON
        cy.fixture('DataMongeCR.json').then((data) => {
            dataUser = data;
        });
    });

    beforeEach(() => {
        cy.visit('https://mcstage.tiendamonge.com/default/')
    })

    context('Login flow', () => {
        // Test case #1: Verificar que un usuario registrado pueda iniciar sesión
        it('LOG-001: Verify that an unregistered user can create an account', () => {
            // Hacer clic en el botón "Ingresar"
            cy.get('#header-custom > div > div.col-md-3.col-sm-4.col-xs-7.mobile-link > ul > li.link.authorization-link > a').click({ force: true })
            // Llenar formulario de "Clientes registrados"
            cy.get('#email').type(dataUser.email[0])
            cy.get('#pass').type(dataUser.password[0])
            //Hacer clic en botón "Iniciar sesión"
            cy.get('#send2').click()
        })
        // Test case #2: Verificar que no permita iniciar sesión cuando las credenciales son invalidas
        it('LOG-002: Verify that an unregistered user can create an account', () => {
            // Hacer clic en el botón "Ingresar"
            cy.get('#header-custom > div > div.col-md-3.col-sm-4.col-xs-7.mobile-link > ul > li.link.authorization-link > a').click({ force: true })
            // Llenar formulario de "Clientes registrados"
            cy.get('#email').type(dataUser.email[0])
            cy.get('#pass').type(dataUser.password[1])
            //Hacer clic en botón "Iniciar sesión"
            cy.get('#send2').click()
            //Verificar que aparezca mensaje de error
            cy.get('.message-error').should('exist')
        })
        // Test case #3: Verificar que no permita iniciar sesión con un email no registrado
        it('LOG-003: Verify that it does not allow logging in with an unregistered email address', () => {
            // Hacer clic en el botón "Ingresar"
            cy.get('#header-custom > div > div.col-md-3.col-sm-4.col-xs-7.mobile-link > ul > li.link.authorization-link > a').click({ force: true })
            // Llenar formulario de "Clientes registrados"
            cy.get('#email').type('noexiste@yopmail.com')
            cy.get('#pass').type(dataUser.password[0])
            //Hacer clic en botón "Iniciar sesión"
            cy.get('#send2').click()
            //Verificar que aparezca mensaje de error
            cy.get('.message-error').should('exist')
        })
    })
})

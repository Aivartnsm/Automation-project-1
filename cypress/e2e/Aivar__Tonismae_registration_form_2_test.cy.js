beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('Test checks that passwords should match', ()=>{
        //passwords do not match
        cy.get('#username').type('Aivartnsm')
        cy.get('#email').type('aivartnsm@gmail.com')
        cy.get('input[name="name"]').type('Aivar') 
        cy.get('#lastName').type('Tonismae') 
        cy.get('input[data-testid="phoneNumberTestId"]')
        .click() // Click on the input field
        .clear() // Clear any existing value
        .type('12312313'); // Enter the desired phone number
        cy.get('input[name="password"]').type('Aivar1234')
        cy.get('[name="confirm"]').type('Aivar12')
        
        cy.get('h2').contains('Password').click()
       
        cy.get('.submit_button').should('be.disabled')        

        cy.get('#password_error_message').should('be.visible')

        cy.get('#success_message').should('not.be.visible')       
        //passwords match from here on
        cy.get('input[name="password"]').click().clear().type('Aivar1234')
        cy.get('[name="confirm"]').click().clear().type('Aivar1234')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')        
        
        cy.get('.submit_button').click()

        cy.get('#password_error_message').should('not.be.visible')

        cy.get('#success_message').should('be.visible')

    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('Aivartnsm')
        cy.get('#email').type('aivartnsm@gmail.com')
        cy.get('input[name="name"]').type('Aivar') 
        cy.get('#lastName').type('Tonismae') 
        cy.get('input[data-testid="phoneNumberTestId"]')
        .click() // Click on the input field
        .clear() // Clear any existing value
        .type('12312313'); // Enter the desired phone number
        cy.get('input[name="password"]').type('Aivar1234')
        cy.get('[name="confirm"]').type('Aivar1234')
        
        cy.get('h2').contains('Password').click()
        cy.get('#javascriptFavLanguage').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('#vehicle2').check()
        cy.get('#animal').select('snake')
        cy.get('.submit_button').click()

        cy.get('#password_error_message').should('not.be.visible')

        cy.get('#success_message').should('be.visible')
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type('Aivartnsm')
        cy.get('#email').type('aivartnsm@gmail.com')
        cy.get('input[name="name"]').type('Aivar') 
        cy.get('#lastName').type('Tonismae') 
        cy.get('input[data-testid="phoneNumberTestId"]')
        .click() // Click on the input field
        .clear() // Clear any existing value
        .type('12312313'); // Enter the desired phone number
        cy.get('input[name="password"]').type('Aivar1234')
        cy.get('[name="confirm"]').type('Aivar1234')
        
        cy.get('h2').contains('Password').click()
       
        cy.get('.submit_button').should('be.enabled')        
        
        cy.get('.submit_button').click()

        cy.get('#password_error_message').should('not.be.visible')

        cy.get('#success_message').should('be.visible')
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system shows successful message
    })

    it('Input valid data to the page', () => {
        cy.get('#username').type('Aivart123')
        //Here was e-mail input - apparently not mandatory
        //Here was first name input 
        cy.get('#lastName').type('Tonismae') 
        cy.get('input[data-testid="phoneNumberTestId"]')
        .click() // Click on the input field
        .clear() // Clear any existing value
        .type('12312313'); // Enter the desired phone number
        cy.get('input[name="password"]').type('Aivar1234')
        cy.get('[name="confirm"]').type('Aivar1234')
        
        cy.get('h2').contains('Password').click()
       
        cy.get('.submit_button').should('be.disabled')          

        cy.get('#input_error_message').should('not.be.visible')

        cy.get('#success_message').should('not.be.visible')
        
    })

    // You can add more similar tests for checking other mandatory field's absence

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that CHub logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check that CY logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_log')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 88)
    })
    // Create similar test for checking second picture

    it('Check navigation part1', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    // Check that URL to Cerebrum Hub page is correct and clickable

    it('should navigate to the correct URL when the second link is clicked', () => {        
        // Find the second link in the navigation bar
        cy.get('nav a:nth-child(2)')
          .should('have.attr', 'href', 'https://cerebrumhub.com/') // Verify the correct href attribute
          .click(); // Click on the second link
    
        // Assert that the new page is loaded or perform any additional verifications
        cy.url().should('eq', 'https://cerebrumhub.com/');
     // Go back to previous page
     cy.go('back')
     cy.log('Back again in registration form 2')

      })


    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one
    it('Check that checkboxes list is correct', () => {     
              
            // Find the checkboxes and verify their properties
        cy.get('input[type="checkbox"]').should('have.length', 3);
        cy.get('input[type="checkbox"]').eq(0).should('have.value', 'Bike').and('not.be.checked');
        cy.get('input[type="checkbox"]').eq(1).should('have.value', 'Car').and('not.be.checked');
        cy.get('input[type="checkbox"]').eq(2).should('have.value', 'Boat').and('not.be.checked');
            
        cy.get('input[type="checkbox"]')
        .eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]')
        .eq(1).check().should('be.checked').eq(0).should('be.checked')
             

        //Bonus - wanted to test something...
        // All checkboxes can be checked at the same time
        /*
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
       
       // All checkboxes can be unchecked
       cy.get('input[type="checkbox"]').eq(0).uncheck().should('not.be.checked')
       cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked')
       cy.get('input[type="checkbox"]').eq(2).uncheck().should('not.be.checked')
   */
    })


    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one

    it('Animal dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
            
        //Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        // Advanced level how to check the content of the Animal dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'spider', 'mouse'])
        })
    })

})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}
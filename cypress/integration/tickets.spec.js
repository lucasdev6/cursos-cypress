
describe("Tickets", ()=> {
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

    it ("fills all the text input fields", () => {
        const firstName = "Lucas";
        const lastName = "Silva";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("lucas@test.com");
        cy.get("#requests").type("algum dado");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    })
    it ("campo select", () => {
        cy.get("#ticket-quantity").select("2");
    })
    it ("Selecionar o vip", () => {
        cy.get("#vip").check();
    })
    it ("selecionando friend e publication", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
    })
    it ("Verificando Cabeçalho", ()=>{
        cy.get("header h1").should("contain","TICKETBOX")
    })
    it ("Valiando campo de email", () => {
        cy.get("#email").type("lucas-gmail.com");
        cy.get("#email.invalid").should("exist");
        cy.get("#email").clear().type("lucas@gmail.com");
        cy.get("email.invalid").should("not.exist");
    })

    it ("Preenchendo todos os capos e resetando", () => {
        const firstName = "Lucas";
        const lastName = "Silva";
        const fullName = `${firstName} ${lastName}`

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("lucas@test.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("algum dado");
        cy.get(".agreement p").should("contain", `I, ${fullName}, wish to buy 2 VIP tickets.`);
        cy.get("#agree").click();
        cy.get("#signature").type(`${fullName}`);
        cy.get("button[type='submit']").as("submitButton").should("not.be.disabled");
        cy.get("button[type='reset']").click();
        cy.get("@submitButton").should("be.disabled");
        
    })

    it.only ("Preenhendo campos obrigatorios e usando o support commands", () => {
        const pessoa={ 
            firstName: "Lucas",
            lastName: "Silva",
            email: "lucas@gmail.com"
        };

        cy.preenchendoCamposObrigatorios(pessoa);
        cy.get("button[type='submit']").should("not.be.disabled");
        cy.get("#agree").uncheck();
        cy.get("button[type='submit']").should("be.disabled");
    })


});
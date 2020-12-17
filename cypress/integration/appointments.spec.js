describe("interviews", () => {
  it("Should reset database", () => {
    cy.request("GET", "http://localhost:8001/api/debug/reset")
  })
  
  it("should book an interview", () => {
    cy.visit("/")
    cy.contains("li", "Monday")
    cy.get("[alt=Add")
    .first()
    .click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get(".interviewers__item")
    .first()
    .click();
    cy.get(".button--confirm")
    .click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  }),
  it("Sould edit an appointment", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type ("Bob McDonald");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Bob McDonald");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  }),
  it("Should delete an appointment", () => {
    cy.get("[alt=Delete]")
    .first()
    .click({ force: true });
    cy.get('.appointment__card > .appointment__actions > :nth-child(2)')
    .click();
    cy.contains(".appointment__card--show", "Bob McDonald")
    .should("not.exist");
  })
})
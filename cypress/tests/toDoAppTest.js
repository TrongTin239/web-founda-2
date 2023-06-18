describe("unit test to do app", () => {
  it("test add task with blank task name", () => {
    cy.visit("/");

    cy.get("button[type='submit']").click();
    cy.get("p.errorMsg").should(
      "have.text",
      "This field not allowed to be empty"
    );
  });
  it("test add task successful and have notice ", () => {
    cy.visit("/");
    cy.get(".MuiInputBase-root")
      .find("input[name='taskName']")

      .type("test unit testing");

    cy.get("button[type='submit']").click();

    // create function to find toast msg
    Cypress.Commands.add("checkToastMessage", (toastId, message) => {
      cy.get(`[id=${toastId}]`).should("contain", message);
      // ...
    });
    // check success message is exist
    cy.checkToastMessage("successMsg", "Add task successfully!");
  });
  it("delete task", () => {
    cy.visit("/");

    cy.get(".MuiButtonBase-root[aria-label='Delete']").click({
      multiple: true,
      force: true,
    });
    cy.get("#Agree").click();
    Cypress.Commands.add("checkToastMessage", (toastId, message) => {
      cy.get(`[id=${toastId}]`).should("contain", message);
      // ...
    });
    cy.checkToastMessage("deleteMsg", "Delete successfully!");
  });
  it("Edit task", () => {
    cy.visit("/");
    cy.get(".MuiButtonBase-root[aria-label='Edit']").click({
      multiple: true,
      force: true,
    });
    cy.get("#mui-component-select-taskStatus")
      .parent()
      .click()
      .get('ul > li[data-value="Ready"]')
      .click();

    cy.get("#updateTask").click();
  });

  it("test search task", () => {
    cy.visit("/");
    cy.get(".MuiInputBase-root").find("input[name='searchTask']").type("High");
    cy.get("table").find("td").filter(':contains("High")');
  });
});

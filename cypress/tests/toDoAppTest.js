describe("Test E2E task manager", () => {
  describe("Add task success and fail", () => {
    it("test add task with blank task name", () => {
      cy.visit("/");

      cy.get("button[type='submit']").click();
      // eslint-disable-next-line cypress/no-assigning-return-values
      cy.get("p.errorMsg").then(($el) => {
        expect($el.text()).to.be.eq("This field not allowed to be empty");
      });
    });
    it("test add task successful and have notify ", () => {
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
      // Check task added to table
      cy.get("table")
        .find("td")
        .should("contain", "test unit testing")
        .and("contain", "Ready")
        .and("contain", "Normal");
    });
    it("Add task with 'Low' prority level ", () => {
      cy.visit("/");
      cy.get(".MuiInputBase-root")
        .find("input[name='taskName']")

        .type("Low prority");
      cy.get("#task-prority__Form").parent().click();
      cy.get('ul > li[data-value="Low"]').click();
      cy.get("button[type='submit']").click();

      Cypress.Commands.add("checkToastMessage", (toastId, message) => {
        cy.get(`[id=${toastId}]`).should("contain", message);
        // ...
      });
      // check success message is exist
      cy.checkToastMessage("successMsg", "Add task successfully!");
      cy.get("table")
        .find("td")
        .should("contain", "Low prority")
        .and("contain", "Ready")
        .and("contain", "Low");
    });
  });
  describe("Delete task", () => {
    it("Agree delete task", () => {
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
    it("Disagree delete", () => {});
  });
  describe("Edit task", () => {
    it("Edit Task name", () => {
      cy.visit("/");
      cy.get(".MuiButtonBase-root[aria-label='Edit']").click({
        multiple: true,
        force: true,
      });
      cy.get("#input-field__Modal").clear();
      cy.get("#input-field__Modal").type("New Task Name test");
      cy.get("#updateTask").click();
      cy.get("table")
        .find("td")
        .filter(":contains('New Task Name test')")
        .then(($el) => {
          expect($el.text()).to.be.eq("New Task Name test");
        });
    });
    it("Edit task status to 'Done'", () => {
      cy.visit("/");
      cy.get(".MuiButtonBase-root[aria-label='Edit']").click({
        multiple: true,
        force: true,
      });
      cy.get("#mui-component-select-taskStatus").parent().click();
      cy.get('ul > li[data-value="Done"]').click();

      cy.get("#updateTask").click();
      Cypress.Commands.add("checkToastMessage", (toastId, message) => {
        cy.get(`[id=${toastId}]`).should("contain", message);
        // ...
      });
      cy.checkToastMessage("updateTask", "Update successfully!");
      cy.get("table")
        .find("td")
        .filter(":contains('Done')")
        .then(($el) => {
          expect($el.text()).to.be.eq("Done");
        });
    });
    it("Edit task prority to 'Low'", () => {
      cy.visit("/");
      cy.get(".MuiButtonBase-root[aria-label='Edit']").click({
        multiple: true,
        force: true,
      });
      cy.get("#task-prority__Modal").parent().click();
      cy.get('ul > li[data-value="Low"]').click();

      cy.get("#updateTask").click();
      Cypress.Commands.add("checkToastMessage", (toastId, message) => {
        cy.get(`[id=${toastId}]`).should("contain", message);
      });
      cy.checkToastMessage("updateTask", "Update successfully!");
      cy.get("table")
        .find("td")
        .filter(':contains("Low")')
        .then(($el) => {
          expect($el.text()).to.be.eq("Low");
        });
    });
    it("Edit all value input", () => {
      cy.visit("/");
      cy.get(".MuiButtonBase-root[aria-label='Edit']").click({
        multiple: true,
        force: true,
      });
      cy.get("#input-field__Modal").clear();
      cy.get("#input-field__Modal").type("Edit all value input");
      cy.get("#mui-component-select-taskStatus").parent().click();
      cy.get('ul > li[data-value="Ready"]').click();
      cy.get("#task-prority__Modal").parent().click();
      cy.get('ul > li[data-value="High"]').click();
      cy.get("#updateTask").click();
      Cypress.Commands.add("checkToastMessage", (toastId, message) => {
        cy.get(`[id=${toastId}]`).should("contain", message);
      });
      cy.checkToastMessage("updateTask", "Update successfully!");
      cy.get("table")
        .find("td")
        .should("contain", "Edit all value input")
        .and("contain", "Ready")
        .and("contain", "High");
    });
  });
  describe("Search task", () => {
    it("Search by task name", () => {
      cy.visit("/");
      cy.get(".MuiInputBase-root")
        .find("input[name='searchTask']")
        .type("front");
      cy.get("table")
        .find("td")
        .filter(':contains("Front")')
        .then(($el) => {
          expect($el.text()).to.be.eq("Learn Front-end");
        });
    });
    it("Search by task status", () => {
      cy.visit("/");
      cy.get(".MuiInputBase-root").find("input[name='searchTask']").type("rea");
      cy.get("table")
        .find("td")
        .filter(':contains("Ready")')
        .then(($el) => {
          expect($el.text()).to.be.eq("Ready");
        });
    });
    it("Search by task prority", () => {
      cy.visit("/");
      cy.get(".MuiInputBase-root").find("input[name='searchTask']").type("hi");
      cy.get("table")
        .find("td")
        .filter(':contains("High")')
        .then(($el) => {
          expect($el.text()).to.be.eq("High");
        });
    });
    it("Clear value input search", () => {
      cy.visit("/");
      cy.get(".MuiInputBase-root")
        .find("input[name='searchTask']")
        .type("Normal");
      cy.get("table").find("td").filter(':contains("Normal")');
      cy.focused().clear();
      cy.get("table")
        .find("td")
        .filter(':contains("High")')
        .then(($el) => {
          expect($el.text()).to.be.eq("High");
        });
    });
  });
  describe("Filter task", () => {
    it("test filter task status", () => {
      cy.visit("");
      cy.get("#task-status").click();
      cy.get('ul > li[data-value="Ready"]').click();
      cy.get("table").find("td").filter(':contains("Ready")');
      cy.get("table")
        .find("td")
        .filter(':contains("Done")')
        .should("not.exist");
    });
    it("test filter task prority", () => {
      cy.visit("");
      cy.get("#task-prority").click();
      cy.get('ul > li[data-value="Normal"]').click();
      cy.get("table")
        .find("td")
        .filter(':contains("Normal")')
        .then(($el) => {
          expect($el.text()).to.be.eq("Normal");
        });
      cy.get("table")
        .find("td")
        .filter(':contains("High")')
        .should("not.exist");
    });
    it("test clear filter ", () => {
      cy.visit("");
      cy.get("#task-prority").click();
      cy.get('ul > li[data-value="Normal"]').click();
      cy.get("table")
        .find("td")
        .filter(":contains('Normal')")
        .then(($el) => {
          expect($el.text()).to.be.eq("Normal");
        });
      cy.get("#clear-filter").click();
      cy.get("table").find("td").filter(":contains('High')");
    });
  });
});

import Home from "./Home";

describe("Home", () => {
    it("mounts", () => {
        cy.mount(<Home />);
    });
});

// cypress/e2e/bookApiTests.cy.js

describe('Books API Tests', () => {
  
  it('Positive Test Case: Create a book with valid data', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 1,
        title: "Valid Book Title",
        description: "This is a valid description.",
        pageCount: 100,
        excerpt: "This is an excerpt.",
        publishDate: "2025-03-12T18:51:53.998Z"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq("Valid Book Title");
    });
  });

  it('Negative Test Case: Create a book with missing title', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 2,
        description: "This is a description.",
        pageCount: 150,
        excerpt: "This is an excerpt.",
        publishDate: "2025-03-12T18:51:53.998Z"
      },
      failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 for bad request
    });
  });

  it('Negative Test Case: Create a book with invalid pageCount type', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 3,
        title: "Invalid Page Count",
        description: "This is a description.",
        pageCount: "One Hundred", // Invalid type
        excerpt: "This is an excerpt.",
        publishDate: "2025-03-12T18:51:53.998Z"
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 for bad request
    });
  });

  it('Negative Test Case: Create a book with invalid publishDate format', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 4,
        title: "Invalid Publish Date",
        description: "This is a description.",
        pageCount: 200,
        excerpt: "This is an excerpt.",
        publishDate: "Invalid Date" // Invalid format
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 for bad request
    });
  });

});
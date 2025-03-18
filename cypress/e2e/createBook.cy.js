// cypress/e2e/createBook.cy.js

describe('Create Book API Tests', () => {
  it('should create a book successfully', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 0,
        title: "string",
        description: "string",
        pageCount: 0,
        excerpt: "string",
        publishDate: "2025-03-12T18:51:53.998Z"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq("string");
      expect(response.body.description).to.eq("string");
    });
  });

  it('should fail to create a book with invalid data', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: "invalid_id", // Invalid data type
        title: null, // Invalid value
        description: null, // Invalid value
        pageCount: -1, // Invalid value
        excerpt: null, // Invalid value
        publishDate: "invalid_date" // Invalid format
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200); // Expect a failure
    });
  });

  // Additional positive test case
  it('should create a book with valid data', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        id: 1,
        title: "New Book Title",
        description: "New Book Description",
        pageCount: 100,
        excerpt: "This is an excerpt.",
        publishDate: "2025-03-12T18:51:53.998Z"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("New Book Title");
    });
  });

  // Additional negative test case
  it('should fail to create a book with missing required fields', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: {
        // Missing all required fields
      }
    }).then((response) => {
      expect(response.status).to.not.eq(200); // Expect a failure
    });
  });
});
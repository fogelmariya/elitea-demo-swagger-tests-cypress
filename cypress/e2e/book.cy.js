// cypress/e2e/book.cy.js

describe('Book API Tests', () => {
  const baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1/Books';

  it('should create a book successfully', () => {
    const bookData = {
      id: 0,
      title: "string",
      description: "string",
      pageCount: 0,
      excerpt: "string",
      publishDate: "2025-03-12T18:51:53.998Z"
    };

    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: bookData
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq(bookData.title);
    });
  });

  it('should fail to create a book with missing title', () => {
    const bookData = {
      id: 0,
      description: "string",
      pageCount: 0,
      excerpt: "string",
      publishDate: "2025-03-12T18:51:53.998Z"
    };

    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: bookData,
      failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status
    }).then((response) => {
      expect(response.status).to.not.eq(200);
    });
  });

  it('should fail to create a book with invalid pageCount', () => {
    const bookData = {
      id: 0,
      title: "string",
      description: "string",
      pageCount: "invalid", // Invalid data type
      excerpt: "string",
      publishDate: "2025-03-12T18:51:53.998Z"
    };

    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: bookData,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.not.eq(200);
    });
  });

  it('should create a book with different valid data', () => {
    const bookData = {
      id: 1,
      title: "New Book Title",
      description: "New Book Description",
      pageCount: 100,
      excerpt: "New Book Excerpt",
      publishDate: "2025-05-12T18:51:53.998Z"
    };

    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: bookData
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq(bookData.title);
    });
  });
});
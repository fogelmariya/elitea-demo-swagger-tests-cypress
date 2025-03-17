describe('Books API Tests', () => {
  const validBook = {
    id: 0,
    title: "string",
    description: "string",
    pageCount: 0,
    excerpt: "string",
    publishDate: "2025-03-12T18:51:53.998Z"
  };

  it('should create a book with valid data', () => {
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: validBook
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq(validBook.title);
      expect(response.body.description).to.eq(validBook.description);
    });
  });

  it('should fail to create a book without a title', () => {
    const bookWithoutTitle = { ...validBook, title: undefined };
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: bookWithoutTitle,
      failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status
    }).then((response) => {
      expect(response.status).to.eq(400); // Assuming 400 for bad request
    });
  });

  it('should fail to create a book with invalid pageCount', () => {
    const bookWithInvalidPageCount = { ...validBook, pageCount: "invalid" };
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: bookWithInvalidPageCount,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail to create a book with future publishDate', () => {
    const bookWithFutureDate = { ...validBook, publishDate: "2025-12-12T18:51:53.998Z" };
    cy.request({
      method: 'POST',
      url: "https://fakerestapi.azurewebsites.net/api/v1/Books",
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: bookWithFutureDate,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
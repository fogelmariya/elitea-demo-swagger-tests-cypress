// cypress/integration/bookApiTests.js

class BookApiTests {
  constructor() {
    this.baseUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books";
  }

  createBook() {
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
      url: this.baseUrl,
      headers: {
        'Content-Type': 'application/json; v=1.0'
      },
      body: bookData
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq(bookData.title);
      expect(response.body.description).to.eq(bookData.description);
    });
  }

  runTests() {
    describe('Book API Tests', () => {
      it('should create a book successfully', () => {
        this.createBook();
      });

      it('should return 400 for invalid book data', () => {
        const invalidBookData = {
          title: "", // Invalid title
          description: "string",
          pageCount: 0,
          excerpt: "string",
          publishDate: "2025-03-12T18:51:53.998Z"
        };

        cy.request({
          method: 'POST',
          url: this.baseUrl,
          headers: {
            'Content-Type': 'application/json; v=1.0'
          },
          body: invalidBookData,
          failOnStatusCode: false // Prevent Cypress from failing the test on 4xx or 5xx responses
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });

      it('should return 400 for missing required fields', () => {
        const missingFieldsData = {
          // Missing all fields
        };

        cy.request({
          method: 'POST',
          url: this.baseUrl,
          headers: {
            'Content-Type': 'application/json; v=1.0'
          },
          body: missingFieldsData,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400);
        });
      });
    });
  }
}

// Instantiate the class and run tests
const bookApiTests = new BookApiTests();
bookApiTests.runTests();
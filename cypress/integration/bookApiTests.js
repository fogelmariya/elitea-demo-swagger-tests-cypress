// cypress/integration/bookApiTests.js

class BookApiTests {
    constructor() {
        this.baseUrl = 'https://fakerestapi.azurewebsites.net/api/v1/Books';
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
            expect(response.body.pageCount).to.eq(bookData.pageCount);
            expect(response.body.excerpt).to.eq(bookData.excerpt);
            expect(response.body.publishDate).to.eq(bookData.publishDate);
        });
    }
}

// Test Suite
describe('Book API Tests', () => {
    const bookApiTests = new BookApiTests();

    it('should create a new book', () => {
        bookApiTests.createBook();
    });

    // Additional test cases can be added here
    it('should fail to create a book with invalid data', () => {
        const invalidBookData = {
            id: -1, // Invalid ID
            title: "", // Invalid title
            description: "string",
            pageCount: -1, // Invalid page count
            excerpt: "string",
            publishDate: "invalid-date" // Invalid date format
        };

        cy.request({
            method: 'POST',
            url: bookApiTests.baseUrl,
            headers: {
                'Content-Type': 'application/json; v=1.0'
            },
            body: invalidBookData,
            failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
        }).then((response) => {
            expect(response.status).to.not.eq(200);
        });
    });
});
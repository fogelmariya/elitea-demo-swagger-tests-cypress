describe('template spec', () => {
  it('passes', () => {
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
  })
})
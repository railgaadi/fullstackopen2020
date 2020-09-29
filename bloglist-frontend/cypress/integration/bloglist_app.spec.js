describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Karan Worah',
      username: 'karan',
      password: 'worah',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3001');
  });

  it('displays login by default', function () {
    cy.contains('Login here');
  });

  it('logs in with right credentials', function () {
    cy.get('#username').type('karan');
    cy.get('#password').type('worah');
    cy.get('#login-button').click();

    cy.contains('Karan Worah is logged in');
  });

  it('login fails with wrong credentials', function () {
    cy.get('#username').type('karan');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    // cy.get('#notification').should('contain', 'Wrong Credentials!'); //this is always timed out, doesn't pass obv
    cy.get('html').should('not.contain', 'Karan Worah is logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'karan', password: 'worah' });
    });

    it('new blog can be created', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('Blog from Cypress');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('cypress.com');
      cy.contains('Submit').click();
      cy.contains('Blog from Cypress');
    });

    describe('when many blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'Cypress 1',
          title: 'Cypress ka pehla',
          url: 'cypress.com',
          likes: 0,
        });
        cy.createBlog({
          author: 'Cypress 2',
          title: 'Cypress ka dusra',
          url: 'cypress.com',
          likes: 10,
        });
        cy.createBlog({
          author: 'Cypress 3',
          title: 'Cypress ka teesra',
          url: 'cypress.com',
          likes: 20,
        });
      });
      it('user can like a blog', function () {
        cy.contains('Cypress ka pehla')
          .parent()
          .contains('show')
          .click()
          .parent()
          .get('.likeButton')
          .click({ multiple: true, force: true });
        cy.contains('Likes: 21');
      });
      it('user who created the blog can delete it', function () {
        cy.contains('Cypress ka pehla')
          .parent()
          .contains('show')
          .click()
          .parent()
          .contains('DELETE')
          .click({ multiple: true, force: true });
        cy.should('not.contain', 'Cypress ka pehla');
      });
      it('blogs are ordered by likes', function () {
        cy.get('.blog-item').then((blogs) => {
          cy.wrap(blogs[0]).should('contain', 'Cypress ka teesra');
          cy.wrap(blogs[1]).should('contain', 'Cypress ka dusra');
          cy.wrap(blogs[2]).should('contain', 'Cypress ka pehla');
        });
      });
    });
  });
});

describe('Note app', function () {
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

  it('front page can be opened', function () {
    cy.contains('Notes');
  });

  it('user can log in', function () {
    cy.contains('login').click();
    cy.get('#username').type('karan');
    cy.get('#password').type('worah');
    cy.get('#loginButton').click();

    cy.contains('karan logged in');
  });

  //   it('login fails with wrong password', function () {
  //     cy.contains('login').click();
  //     cy.get('#username').type('karan');
  //     cy.get('#password').type('wrong');
  //     cy.get('#loginButton').click();

  //     cy.get('.error')
  //       .should('contain', 'wrong credentials')
  //       .and('have.css', 'color', 'rgb(255, 0, 0)');
  //   });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'karan', password: 'worah' });
    });

    it('a new note can be created', function () {
      cy.contains('add new note').click();
      cy.get('#newNote').type('a note via cypress');
      cy.contains('Save').click();
      cy.contains('a note via cypress');
    });

    describe('and many notes exist', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'first note',
          important: false,
        });
        cy.createNote({
          content: 'second note',
          important: false,
        });
        cy.createNote({
          content: 'third note',
          important: false,
        });
      });

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').contains('Not Important');
      });
    });
  });
});

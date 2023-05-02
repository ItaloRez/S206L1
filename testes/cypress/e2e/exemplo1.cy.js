/// <reference types="cypress" />

describe("Criando cenário de teste para o site globalsqa", () => {
  it.skip("Caso de teste: Registrando um usuário de teste", () => {
    criarUsuario();

    cy.get(".ng-binding").should("contain.text", "Registration successful");
  });

  it.skip("Caso de teste: Registrando um usuário com falha (faltando senha)", () => {
    cy.visit(
      "https://globalsqa.com/angularJs-protractor/registration-login-example/#/register"
    );

    cy.get("#firstName").type("inatel");
    cy.get("#Text1").type("inatel");
    cy.get("#username").type("inatel");
    cy.get("#password").type("inatel");
    cy.get("#password").clear();

    cy.get(".has-error > .help-block").should(
      "contain.text",
      "Password is required"
    );
    cy.get(".btn-primary").should("be.disabled");
  });

  it("Caso de teste: Realizando login com sucesso", () => {
    let { user, senha } = criarUsuario();

    cy.get("#username").type(user);
    cy.get("#password").type(senha);

    cy.get(".btn-primary").click();

    cy.get("h1.ng-binding").should("contain.text", user);
  });
});

function criarUsuario() {
  let horas = new Date().getHours().toString();
  let minutos = new Date().getMinutes().toString();
  let segundos = new Date().getSeconds().toString();
  let user = horas + minutos + segundos + "Id";
  let senha = horas + minutos + segundos + "Senha";

  cy.visit(
    "https://globalsqa.com/angularJs-protractor/registration-login-example/#/register"
  );

  cy.get("#firstName").type(user);
  cy.get("#Text1").type(user);
  cy.get("#username").type(user);
  cy.get("#password").type(senha);
  cy.get(".btn-primary").click();

  cy.get(".ng-binding").should("contain.text", "Registration successful");

  return { user, senha };
}

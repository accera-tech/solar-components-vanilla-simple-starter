class LoginController {
  set actualYear(value) {
    this.yearText.innerText = value;
  }


  // Mounting View
  // --------------------------------------------------

  constructor() {
    // Services
    this.i18n = new I18nService();

    // ViewChild
    this.yearText = document.getElementById('yearText');
    this.loginForm = document.getElementById('loginForm');
    this.forgotPasswordButton = document.getElementById('forgotPasswordButton');
    this.userInput = document.getElementById('userInput');
    this.passwordInput = document.getElementById('passwordInput');

    this.b2cUserInput = document.querySelector('#api #username');
    this.b2cPasswordInput = document.querySelector('#api #password');
    this.b2cSubmitButton = document.querySelector('#api #submit');
    this.b2cForm = document.querySelector('#api form');

    // Wait for component's bootstrap to init.
    window.addEventListener('stencil_appload', (ev) => {
      if (!this.isInitialized) this.init();
    }, { once: true });
  }


  // Event Bounding
  // --------------------------------------------------

  async init() {
    await this.i18n.setup();

    this.actualYear = new Date().getFullYear();
    this.loginForm.addEventListener('formSubmit', this.handleSubmit.bind(this));
    this.forgotPasswordButton.addEventListener('click', this.handleForgotPasswordClick.bind(this));

    this.isInitialized = true;
  }


  // Reactivity Handlers
  // --------------------------------------------------

  handleSubmit() {
    this.b2cUserInput.value = this.userInput.value;
    this.b2cPasswordInput.value = this.passwordInput.value;
    // this.b2cSubmitButton.click();
    // OR
    this.b2cForm.submit();
  }

  handleForgotPasswordClick() {
    // do something!
  }
}

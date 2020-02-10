class LoginController {
  set actualYear(value) {
    this.yearText.innerText = value;
  }


  // Mounting View
  // --------------------------------------------------

  constructor() {

    // ViewChild
    this.yearText = document.getElementById('yearText');
    this.loginForm = document.getElementById('loginForm');
    this.forgotPasswordButton = document.getElementById('forgotPasswordButton');

    // Wait for component's bootstrap to init.
    window.addEventListener('stencil_appload', (ev) => {
      if (!this.isInitialized) this.init();
    }, { once: true });
  }


  // Event Bounding
  // --------------------------------------------------

  init() {
    this.actualYear = new Date().getFullYear();
    this.loginForm.addEventListener('formSubmit', this.handleSubmit.bind(this));
    this.forgotPasswordButton.addEventListener('click', this.handleForgotPasswordClick.bind(this));

    this.isInitialized = true;
  }


  // Reactivity Handlers
  // --------------------------------------------------

  handleSubmit() {
    this.loginForm.submit();
  }

  handleForgotPasswordClick() {
    // do something!
  }
}

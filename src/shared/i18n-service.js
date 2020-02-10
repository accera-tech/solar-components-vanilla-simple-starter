class I18nService {

  constructor() {
    this.actualCultureCode = window.navigator.language;
  }

  getJSON(url) {
    return fetch(url)
      .then(res => res.json())
  }

  async setup() {
    return new Promise(res => res());
  }

  localize() {

  }

  localizeAll() {
    document.querySelectorAll("[data-i18n]").forEach(e => {
      try {
        e.innerText = this.localize(e.attributes['data-i18n'].value);
      } catch {
        console.log(`Could not translate #${e.id}!`);
      }
    });
  }
}

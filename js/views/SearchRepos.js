import { Nodes } from './Nodes.js';

export default class SearchRepos extends Nodes {
  constructor() {
    super();
    this.hidden = false;
    this.page = 0;
    this.perPage = 20;
    this._renderRepo = this._renderRepo.bind(this);
  }

  Display(show = true) {
    this.reposContent.classList.remove("dispNone");
    if (!show) this.Hide();
  }

  Show() {
    this.container.appendChild(this.reposContent);
    this.hidden = false;
  }

  Hide() {
    if (!this.hidden) {
      this.container.removeChild(this.reposContent);
      this.hidden = true;
    }
  }

  getInput = () => this.searchReposInput.value;

  clearInput() {
    this.searchReposInput.value = '';
  }

  clearResults(hideButtons = false) {
    this.repos.innerHTML = '';
    if(hideButtons)
      this.reposNavigation.forEach(el => el.classList.add("dispNone"));
  }

  renderResults({ result, total, perPage, page }) {
    if (result.length < 1) return;
    result.forEach(this._renderRepo);
    this._showButtons(page, total, perPage);
  }

  _showButtons(page, numResults, resPerPage) {
    this.reposNavigation.forEach(el => el.classList.remove("dispNone"));
    const pages = Math.ceil(numResults / resPerPage);
    [...this.reposNext, ...this.reposPrev].forEach(el => {
      el.classList.remove("disabled");
    });
    page = page * 1;
    if (page === 1 && pages > 1) {
      // Only button to go to next page
      this.reposPrev.forEach(el => {
        el.classList.add("disabled");
      });
    } // else if (page < pages) {}
    else if (page === pages && pages > 1) {
      // Only button to go to prev page
      this.reposNext.forEach(el => {
        el.classList.add("disabled");
      });
    }
  }

  _renderRepo(repo) {
    const markup = `
      <li>
        <a href="${repo.owner.html_url}" target="_blank">${repo.owner.login} </a>/
        <a href="${repo.html_url}" target="_blank"> ${repo.name}</a>
      </li>`;
    this.repos.insertAdjacentHTML('beforeend', markup);
  }

}
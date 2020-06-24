import { Nodes } from './Nodes.js';

export default class SearchUsers extends Nodes {
  constructor() {
    super();
    this.hidden = false;
    this.page = 0;
    this.perPage = 20;
    this._renderUser = this._renderUser.bind(this);
  }

  Display(show = true) {
    this.usersContent.classList.remove("dispNone");
    if (!show) this.Hide();
  }

  Show() {
    this.container.appendChild(this.usersContent);
    this.hidden = false;
  }

  Hide() {
    if (!this.hidden) {
      this.container.removeChild(this.usersContent);
      this.hidden = true;
    }
  }

  getInput = () => this.searchInput.value;

  clearInput() {
    this.searchInput.value = '';
  }

  clearResults(hideButtons = false) {
    this.users.innerHTML = '';
    if (hideButtons)
      this.usersNavigation.forEach(el => el.classList.add("dispNone"));
  }

  renderResults({ result, total, perPage, page }) {
    if (result.length < 1) return;
    this.page = page;
    result.forEach(this._renderUser);
    this._showButtons(page, total, perPage);
  }

  _showButtons(page, numResults, resPerPage) {
    this.usersNavigation.forEach(el => el.classList.remove("dispNone"));
    const pages = Math.ceil(numResults / resPerPage);
    [...this.usersNext, ...this.usersPrev].forEach(el => {
      el.classList.remove("disabled");
    });
    page = page * 1;
    if (page === 1 && pages > 1) {
      // Only button to go to next page
      this.usersPrev.forEach(el => {
        el.classList.add("disabled");
      });
    } // else if (page < pages) {}
    else if (page === pages && pages > 1) {
      // Only button to go to prev page
      this.usersNext.forEach(el => {
        el.classList.add("disabled");
      });
    }
  }

  _loadImage(src, id) {
    const img = new Image();
    img.onload = () => {
      const img = document.getElementById(id);
      img.classList.add("lazy");
      img.src = src;
    }
    img.src = src;
  }

  _renderUser(user, i) {
    const id = `_${i}_${this.page}`;
    const shortName = this._limitName(user.login);
    const markup = `
      <li>
        <a href="${user.html_url}" target="_blank">
          <figure title="${user.login}">
            <img id="${id}" alt="...">
            <figcaption>${shortName}</figcaption>
          </figure>
        </a>
      </li>`;
    this.users.insertAdjacentHTML('beforeend', markup);
    this._loadImage(user.avatar_url, id);
  }

  _limitName(name, limit = 18) {
    const newTitle = [];
    if (name.length > limit) {
      const nameArr = name.split(' ');
      if (nameArr.length === 1) return `${name.slice(0, limit - 3)}...`;
      else {
        nameArr.reduce((acc, cur) => {
          if (acc + cur.length <= limit) {
            newTitle.push(cur);
          }
          return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
      }
    }
    return name;
  }

}
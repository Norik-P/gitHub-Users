import { Nodes } from './Nodes.js';

export default class SearchUsers extends Nodes {
  constructor() {
    super();
    this.hidden = false;
    this.page = 0;
    this.perPage = 20;
    this._renderUser = this._renderUser.bind(this);
    this.user = document.createElement("div");
    this.user.classList.add("user");
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

  showUserInfo({ login, result, total, repos, figure }) {
    const newFigure = figure.cloneNode(!0);
    // this.Hide();
    this.usersContent.innerHTML = "";
    this.user.appendChild(newFigure);
    newFigure.classList.add("lazy");
    this.usersContent.appendChild(this.user);
    this._renderSearchNav();
    this._userInfo(result);
  }

  hideUserInfo() {

  }

  _renderSearchNav() {
    const markup = `
    <div class="search_nav">
      <nav class="navigation left">
        <a href="">Back to Users</a>
      </nav>
    </div>`;
    this.users.insertAdjacentHTML('afterbegin', markup);
  }

  _userInfo({ login, name, location, html_url, company, blog, public_repos, email }) {
    const UI = `<ul class="userInfo">
    <li data-name="${name}">Name: ${name ? name : "---"}</li>
    <li data-name="${email}">E-mail: ${email ? email : "---"}</li>
    <li data-name="${location}">Location: ${location ? location : "---"}</li>
    <li data-name="${html_url}">Profile: ${html_url ? '<a href="' + html_url + '" target="_blank">' + html_url + '</a>' : "---"}</li>
    <li data-name="${company}">Company: ${company ? company : "---"}</li>
    <li data-name="${blog}">Blog: ${html_url ? '<a href="' + blog + '" target="_blank">' + blog + '</a>' : "---"}</li>
    <li data-name="${public_repos}">Repositories: ${public_repos ? public_repos : "---"}</li>
    </ul>`;
    this.user.insertAdjacentHTML('beforeend', UI);
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
      const figure = document.getElementById(id);
      figure.prepend(img);
      figure.classList.add("lazy");
    }
    img.src = src;
  }

  _renderUser(user, i) {
    // const id = `_${i}_${this.page}`;
    const id = user.id;
    const shortName = this._limitName(user.login);
    const markup = `
      <li data-name="${user.login}">
        <!--<a href="" data-href="${user.html_url}" target="_blank"> 
        </a>-->
          <figure id="${id}" title="${user.login}" data-url="${user.html_url}">
            <figcaption>${shortName}</figcaption>
          </figure>
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
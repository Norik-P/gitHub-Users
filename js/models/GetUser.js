export default class GetUser {
  constructor() {
    this.perPage = 20;
    this.page = 1;
    this.login = null;
    this.result = null;
    this.total = null;
    this.repos = null;
    this.figure = null;
  }

  url = () => `https://api.github.com/users/${this.login}`;

  urlRepos() {
    return `${this.url()}/repos?per_page=${this.perPage}&page=${this.page}`;
  }

  async User(name, figure=null) {
    this.login = name;
    this.figure = figure;
    try {
      const response = await fetch(this.url());
      if (response.ok) {
        const res = await response.json();
        this.result = res;
        this.total = res.public_repos;
        await this._Repos();
      } else
        throw new Error("can't get the data");
    } catch (e) {
      console.log(e.name, e.message);
    }
  }

  async _Repos() {
    // this.page = page < 1 ? 1 : page;
    try {
      const response = await fetch(this.urlRepos());
      if (response.ok) {
        const res = await response.json();
        this.repos = res;
      } else
        throw new Error("can't get the data");
    } catch (e) {
      console.log(e.name, e.message);
    }
  }

  async next() {
    if (this.page * this.perPage < this.total) {
      this.page = this.page * 1 + 1;
      await this._Repos();
    }
  }
  
  async prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      await this._Repos();
    }
  }

}
export class Nodes {
  constructor() {
    this.searchNavUsers = document.querySelector('#users .search_nav');
    this.searchNavRepos = document.querySelector('#repos .search_nav');

    this.MIusers = document.querySelector('#menu_users a');
    this.MIrepos = document.querySelector('#menu_repos a');
    this.container = document.querySelector('#container');
    this.usersContent = document.querySelector('#users');
    this.reposContent = document.querySelector('#repos');
    this.usersSearchForm = document.querySelector('#users .search');
    this.reopsSearchForm = document.querySelector('#repos .search');
    this.searchInput = document.querySelector('#users .search_field');
    this.searchReposInput = document.querySelector('#repos .search_field');
    this.users = document.querySelector('.users');
    this.repos = document.querySelector('.repos');

    this.usersNavigation = document.querySelectorAll('#users .navigation');
    this.reposNavigation = document.querySelectorAll('#repos .navigation');

    this.usersNext = document.querySelectorAll('#users .navigation .next');
    this.usersPrev = document.querySelectorAll('#users .navigation .prev');

    this.reposNext = document.querySelectorAll('#repos .navigation .next');
    this.reposPrev = document.querySelectorAll('#repos .navigation .prev');
  }
};
import Search from './models/Search.js';
import SearchUsers from './views/SearchUsers.js';
import SearchRepos from './views/SearchRepos.js';
import { Nodes } from './views/Nodes.js';
import { Loader } from './views/Loader.js';
import GetUser from './models/GetUser.js';


const searchUsers = new SearchUsers();
const searchRepos = new SearchRepos();
const nodes = new Nodes();
const loader = new Loader();
const getUser = new GetUser();

const state = {
  users: {
    search: new Search("users")
  },
  repos: {
    search: new Search("repositories")
  }
};

if (!history.state) {
  searchUsers.Display();
  searchRepos.Display(false);
} else {
  let { subject } = history.state;
  if (subject === "users") {
    searchUsers.Display();
    searchRepos.Display(false);
  }
  if (subject === "repositories") {
    searchUsers.Display(false);
    searchRepos.Display();
  }

}

// Store the initial content so we can revisit it later
// const { subject, query, page } = state.users.search;
// history.replaceState({ subject, query, page }, document.title, document.location.href);

readHash();

function readHash() {
  if (history.state) {
    // let [subject, query, page] = location.hash.slice(2).split("/");
    let { subject, query, page } = JSON.parse(JSON.stringify(history.state));
    page = page || 1;
    subject = subject === "repositories" ? "repos" : subject;
    state[subject].search.page = page;
    changeActiveClass(nodes[`MI${subject}`]);
    if (subject === "users") {
      searchUsers.Show();
      searchRepos.Hide();
      controlUserSearch(query);
    } else if (subject === "repos") {
      searchUsers.Hide();
      searchRepos.Show();
      controlReposSearch(query);
    }
  } else {
    // console.log("history.state", history.state);
    changeActiveClass(nodes.MIusers);
    searchUsers.clearResults(true);
    searchRepos.clearResults(true);
  }
}

async function controlUserSearch(query = null) {
  const _query = query || searchUsers.getInput();
  if (_query) {
    searchUsers.clearInput();
    loader.render(nodes.searchNavUsers);
    try {
      await state.users.search.getResults(_query);
      loader.clear();
      searchUsers.clearResults();
      searchUsers.renderResults(state.users.search);
      if (!query) addHistory(state.users);
    } catch (e) {
      console.log(e.name, e.message);
      alert('Something wrong with the search...');
      loader.clear();
    }
  } else
    searchUsers.clearResults(true);
}

async function controlReposSearch(query = null) {
  const _query = query || searchRepos.getInput();
  if (_query) {
    searchRepos.clearInput();
    loader.render(nodes.searchNavRepos);
    try {
      await state.repos.search.getResults(_query);
      loader.clear();
      searchRepos.clearResults();
      searchRepos.renderResults(state.repos.search);
      if (!query) addHistory(state.repos);
    } catch (e) {
      console.log(e.name, e.message);
      alert('Something wrong with the search...');
      loader.clear();
    }
  } else
    searchRepos.clearResults(true);
}

function addHistory(data) {
  const { subject, query, page } = data.search;
  const arr = [];
  // console.log("page", page);
  for (const el of [subject, query, page]) {
    if (el) arr.push(el);
    else break;
  }
  const title = `<h1>${arr.join(' ')}</h1>`;
  const url = `#/${arr.join('/')}`;
  // const url = `/${arr.join('/')}`;
  history.pushState({ subject, query, page }, title, url);
}


window.addEventListener('popstate', e => {
  readHash(e.state);
});


nodes.users.addEventListener('click', async e => {
  e.preventDefault();
  // // console.log("target", e.target);
  // const user = e.target.closest('li');
  // const figure = user.children[0];
  // console.log("user", user);
  // await getUser.User(user.dataset.name, figure);
  // // draw user's page
  // searchUsers.showUserInfo(getUser);
  // const { repos: result, total, perPage, page } = getUser;
  // searchRepos.renderResults({ result, total, perPage, page });
});


nodes.usersSearchForm.addEventListener('submit', e => {
  state.users.search.page = 1;
  e.preventDefault();
  controlUserSearch();
});

nodes.reopsSearchForm.addEventListener('submit', e => {
  state.repos.search.page = 1;
  e.preventDefault();
  controlReposSearch();
});


nodes.usersNext.forEach(next => {
  next.addEventListener('click', async e => {
    e.preventDefault();

    searchUsers.clearInput();
    loader.render(nodes.searchNavUsers);
    try {
      await state.users.search.next();
      loader.clear();
      searchUsers.clearResults();
      searchUsers.renderResults(state.users.search);
      addHistory(state.users);
    } catch (e) {
      console.log(e.name, e.message);
      alert('Something wrong with the search...');
      loader.clear();
    }
  });
});

nodes.usersPrev.forEach(prev => {
  prev.addEventListener('click', async e => {
    e.preventDefault();
    searchUsers.clearInput();
    loader.render(nodes.searchNavUsers);
    try {
      await state.users.search.prev();
      loader.clear();
      searchUsers.clearResults();
      searchUsers.renderResults(state.users.search);
      addHistory(state.users);
    } catch (e) {
      console.log(e);
      alert('Something wrong with the search...');
      loader.clear();
    }
  });
});


nodes.reposNext.forEach(next => {
  next.addEventListener('click', async e => {
    e.preventDefault();

    searchRepos.clearInput();
    loader.render(nodes.searchNavRepos);
    try {
      await state.repos.search.next();
      loader.clear();
      searchRepos.clearResults();
      searchRepos.renderResults(state.repos.search);
      addHistory(state.repos);
    } catch (e) {
      console.log(e.name, e.message);
      alert('Something wrong with the search...');
      loader.clear();
    }
  });
});

nodes.reposPrev.forEach(prev => {
  prev.addEventListener('click', async e => {
    e.preventDefault();
    searchRepos.clearInput();
    loader.render(nodes.searchNavRepos);
    try {
      await state.repos.search.prev();
      loader.clear();
      searchRepos.clearResults();
      searchRepos.renderResults(state.repos.search);
      addHistory(state.repos);
    } catch (e) {
      console.log(e.name, e.message);
      alert('Something wrong with the search...');
      loader.clear();
    }
  });
});


nodes.MIusers.addEventListener('click', e => {
  // console.log("users");
  changeActiveClass(e.target);
  e.preventDefault();
  searchRepos.Hide();
  searchUsers.Show();
  addHistory(state.users);
});

nodes.MIrepos.addEventListener('click', e => {
  // console.log("repos");
  changeActiveClass(e.target);
  e.preventDefault();
  searchUsers.Hide();
  searchRepos.Show();
  addHistory(state.repos);
});


function changeActiveClass(node) {
  document.querySelector("#menu .active")?.classList.remove("active");
  node.classList.add("active");
}

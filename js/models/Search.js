export default class Search {
  constructor(subject = "users", page = 1) {
    this.perPage = 20;
    this.page = page < 1 ? 1 : page;
    this.subject = subject === "users" ? "users" : "repositories";
  }

  url() {
    const query = `q=${this.query}&per_page=${this.perPage}&page=${this.page}`;
    return `https://api.github.com/search/${this.subject}?${query}`;
  }

  async getResults(query) {
    this.query = query;
    try {
      const response = await fetch(this.url());
      if (response.ok) {
        const res = await response.json();
        this.result = res.items;
        this.total = res.total_count;
      } else
        throw new Error("can't get the data");
    } catch (e) {
      console.log(e.name, e.message);
    }
  }

  async next() {
    if (this.page * this.perPage < this.total) {
      this.page = this.page * 1 + 1;
      try {
        const response = await fetch(this.url());
        if (response.ok) {
          const res = await response.json();
          this.result = res.items;
        } else
          throw new Error("can't get the data");
      } catch (e) {
        console.log(e.name, e.message);
      }
    }
  }

  async prev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      try {
        const response = await fetch(this.url());
        if (response.ok) {
          const res = await response.json();
          this.result = res.items;
        } else
          throw new Error("can't get the data");
      } catch (e) {
        console.log(e.name, e.message);
      }
    }
  }

}
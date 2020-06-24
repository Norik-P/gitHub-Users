export class Loader {
  constructor() {
    this.html = document.createElement("div");
    this.html.classList.add("ldsRipple");
    this.html.insertAdjacentHTML('beforeend', "<div></div><div></div>");
    this.parent = null;
  }
  render(parent) {
    this.parent = parent;
    this.parent.appendChild(this.html);
  }
  clear() {
    this.parent.removeChild(this.html);
  }
}
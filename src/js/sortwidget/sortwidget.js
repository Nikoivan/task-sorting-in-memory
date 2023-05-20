export default class SortWidget {
  constructor(object) {
    this.object = object;
    this.orders = [
      (a, b) => a.id - b.id,
      (a, b) => b.id - a.id,
      (a, b) => a.title.length - b.title.length,
      (a, b) => b.title.length - a.title.length,
      (a, b) => a.year - b.year,
      (a, b) => b.year - a.year,
      (a, b) => a.imdb - b.imdb,
      (a, b) => b.imdb - a.imdb,
    ];
    this.body = document.querySelector("body");
    this.callbackIndex = 0;
    this.intervalId = null;
  }

  startSorting() {
    this.sortObject();
    this.intervalId = setInterval(
      () =>
        this.sortObject(this.orders[this.callbackIndex % this.orders.length]),
      2000
    );
  }

  sortObject(callback) {
    if (callback) {
      this.object.sort(callback);
    }

    const oldDiv = document.querySelector("div");
    if (oldDiv) {
      oldDiv.remove();
    }

    const div = document.createElement("div");
    const tr = document.createElement("tr");
    const id = document.createElement("td");
    id.textContent = `id`;
    tr.appendChild(id);

    const title = document.createElement("td");
    title.textContent = `title`;
    tr.appendChild(title);

    const year = document.createElement("td");
    year.textContent = `year`;
    tr.appendChild(year);

    const imdb = document.createElement("td");
    imdb.textContent = `imdb`;
    tr.appendChild(imdb);
    div.appendChild(tr);
    this.object.forEach((el) => {
      const tr = document.createElement("tr");

      tr.dataset.id = el.id;
      tr.dataset.title = el.title;
      tr.dataset.year = el.year;
      tr.dataset.imdb = el.imdb;

      const id = document.createElement("td");
      id.textContent = `#${el.id}`;
      tr.appendChild(id);

      const title = document.createElement("td");
      title.textContent = el.title;
      tr.appendChild(title);

      const year = document.createElement("td");
      year.textContent = `(${el.year})`;
      tr.appendChild(year);

      const imdb = document.createElement("td");
      imdb.textContent = `imbd: ${el.imdb}`;
      tr.appendChild(imdb);

      div.appendChild(tr);
    });
    this.body.appendChild(div);
    this.callbackIndex += 1;
  }
}

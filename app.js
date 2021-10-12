async function loadItems() {
  // fetch items from the JSON file
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function createHTMLString(item) {
  // Create innerHTML from given item
  return `
    <li class="item">
      <img src="${item.img}" alt="${item.type}" class="item__thumbnail">
      <span class="item__description">${item.size}</span>
    </li>
  `;
}

function displayItems(items) {
  // Update the list with given items
  const container = document.querySelector(".itemlist");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function onButtonClick(event, items) {
  const value = event.target.dataset.value;
  displayItems(
    items.filter((item) => item.color === value || item.type === value)
  );
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const bar = document.querySelector(".bar"); // event delegation
  logo.addEventListener("click", () => displayItems(items));
  bar.addEventListener("click", (event) => onButtonClick(event, items));
}

// Main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);

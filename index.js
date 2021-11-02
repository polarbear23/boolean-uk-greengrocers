/*
This is how an item object should look like
{
  id: "001-beetroot", // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}
*/
const changeCartQuantity = new Event('changeCartQuantity');
const store = {
  items: [
    {
      id: "001-beetroot", // <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35,
      category: "veg"
    },
    {
      id: "002-carrot", // <- the item id matches the icon name in the assets/icons folder
      name: "carrot",
      price: 0.50,
      category: "veg"
    },
    {
      id: "003-apple", // <- the item id matches the icon name in the assets/icons folder
      name: "apple",
      price: 0.40,
      category: "fruit"
    },
    {
      id: "004-apricot", // <- the item id matches the icon name in the assets/icons folder
      name: "apricot",
      price: 0.35,
      category: "fruit"
    },
    {
      id: "005-avocado", // <- the item id matches the icon name in the assets/icons folder
      name: "avocado",
      price: 0.25,
      category: "fruit"
    },
    {
      id: "006-bananas", // <- the item id matches the icon name in the assets/icons folder
      name: "bananas",
      price: 0.60,
      category: "fruit"
    },
    {
      id: "007-bell-pepper", // <- the item id matches the icon name in the assets/icons folder
      name: "bell pepper",
      price: 0.40,
      category: "veg"
    },
    {
      id: "008-berry", // <- the item id matches the icon name in the assets/icons folder
      name: "berry",
      price: 0.10,
      category: "fruit"
    },
    {
      id: "009-blueberry", // <- the item id matches the icon name in the assets/icons folder
      name: "blueberry",
      price: 0.15,
      category: "fruit"
    },
    {
      id: "010-eggplant", // <- the item id matches the icon name in the assets/icons folder
      name: "eggplant",
      price: 0.80,
      category: "veg"

    },
  ]
};

const cart = {
  items: []
};
/* bloody jason maybe later
function fillDB(items){
  for(let i = 0; i < items.length; i++){
    fetch("http://localhost:3000/items", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(items[i])
    });
  }
}
*/
function renderStoreItem(item) {
  const listEl = document.querySelector(".store--item-list");
  const listItemEl = document.createElement("li");
  const itemIconDiv = document.createElement("div");
  const itemIconImage = document.createElement("img");
  const addToCartButton = document.createElement("button");
  itemIconDiv.setAttribute("class", "store--item-icon");
  itemIconImage.src = `assets/icons/${item.id}.svg`;
  addToCartButton.innerText = "Add to cart";
  addToCartButton.addEventListener("click", (e) => {
    addToCart(item);
  });
  itemIconDiv.appendChild(itemIconImage);
  listItemEl.append(itemIconDiv, addToCartButton);
  listEl.appendChild(listItemEl);
}

function addToCart(item) {
  const cartItems = cart.items;
  let changeQuantity = false;
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === item.name) {
      cartItems[i].quantity += 1;
      changeQuantity = true;
      document.dispatchEvent(changeCartQuantity);
    }
  }
  if (changeQuantity === false) {
    item.quantity = 1;
    cart.items.push(item);
    renderCartItem(item);
  }
  updateTotalOfCart();
}

function renderCartItem(item) {
  const listEl = document.querySelector(".cart--item-list");
  const listItemEl = document.createElement("li");
  const itemIconImage = document.createElement("img");
  const itemNameEl = document.createElement("p");
  const itemQuantity = document.createElement("span");
  const addQuantity = document.createElement("button");
  const removeQuantity = document.createElement("button");
  itemIconImage.src = `assets/icons/${item.id}.svg`;
  itemIconImage.setAttribute("class", "cart--item-icon");
  itemNameEl.innerText = item.name;
  itemQuantity.setAttribute("class", "quantity-text center");
  itemQuantity.innerText = item.quantity;
  addQuantity.setAttribute("class", "quantity-btn add-btn center");
  addQuantity.innerText = "+";
  removeQuantity.setAttribute("class", "quantity-btn remove-btn center");
  removeQuantity.innerText = "-";
  quantityEventHandler(addQuantity, removeQuantity, item, itemQuantity);
  listItemEl.append(itemIconImage, itemNameEl, removeQuantity, itemQuantity, addQuantity);
  listEl.appendChild(listItemEl);
}

function quantityEventHandler(addQ, removeQ, item, itemQEl) {
  document.addEventListener("changeCartQuantity", (e) => {
    itemQEl.innerText = item.quantity;
    updateTotalOfCart();
  });

  addQ.addEventListener("click", (e) => {
    item.quantity += 1;
    itemQEl.innerText = item.quantity;
    updateTotalOfCart();
  });

  removeQ.addEventListener("click", (e) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      itemQEl.innerText = item.quantity;
    }
    else if (item.quantity <= 1) {
      const index = cart.items.map((itemObject) => itemObject.name).indexOf(item.name);
      e.target.closest("li").remove();
      cart.items.splice(index, 1);
    }
    updateTotalOfCart();
  });
}

function updateTotalOfCart() {
  const cartItems = cart.items.map(item => item = item.price * item.quantity);
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = cartItems.reduce((accumulator, price) => accumulator + price, 0.00);

  }
  const totalText = document.querySelector(".total-number");
  totalText.innerText = `£${total.toFixed(2)}`;
}

function createFilters() {
  const headerOfStore = document.querySelector("header");
  const h1El = headerOfStore.querySelector("h1");
  const filterSelectEl = document.createElement("select");
  const allOption = document.createElement("option");
  const fruitOption = document.createElement("option");
  const vegOption = document.createElement("option");
  allOption.value = "all";
  allOption.innerText = "All";
  fruitOption.value = "fruit";
  vegOption.value = "veg";
  fruitOption.innerText = "Fruit";
  vegOption.innerText = "Veg";
  filterEventHandler(filterSelectEl);
  filterSelectEl.append(allOption, fruitOption, vegOption);
  headerOfStore.insertBefore(filterSelectEl, h1El);
}

function createSorts() {
  const headerOfStore = document.querySelector("header");
  const h1El = headerOfStore.querySelector("h1");
  const sortSelectEl = document.createElement("select");
  const alphabetOption = document.createElement("option");
  const priceOption = document.createElement("option");
  const noSortOption = document.createElement("option");
  alphabetOption.value = "sortbyalphabet";
  alphabetOption.innerText = "Sort by: A-Z";
  priceOption.value = "sortbyprice";
  priceOption.innerText = "Sort by: Price ascending";
  noSortOption.value = "nosort";
  noSortOption.innerText = "Sort by: None";

  sortSelectEl.addEventListener("change", () => {
    removeAllStoreItemElements();
    const store2 = { //we are creating a new one because we dont want to mutate the original array or layout
      items: [...store.items]
    }
    if (sortSelectEl.value === "nosort") {
      createStore(store.items);
    }
    if (sortSelectEl.value === "sortbyalphabet") {
      //sort array
      store2.items.sort((element1, element2) => {
        const textOfElement1 = element1.name.toUpperCase();
        const textOfElement2 = element2.name.toUpperCase();
        return textOfElement1.localeCompare(textOfElement2);
      });
      //display elements back in new order
      createStore(store2.items);
    }
    if (sortSelectEl.value === "sortbyprice") {
      //sort array
      store2.items.sort((element1, element2) => {
        const priceOfElement1 = element1.price.toFixed(2);
        const priceOfElement2 = element2.price.toFixed(2);
        return priceOfElement1 < priceOfElement2 ? -1 : 1;
      });
      //display elements back in new order
      createStore(store2.items);
    }
  });
  sortSelectEl.append(noSortOption, alphabetOption, priceOption);
  headerOfStore.insertBefore(sortSelectEl, h1El);
}

function filterEventHandler(filterSelectEl) {
  filterSelectEl.addEventListener("change", () => {
    removeAllStoreItemElements();
    if (filterSelectEl.value === "all") {
      createStore(store.items);
    }
    if (filterSelectEl.value === "fruit") {
      const fruitStore = store.items.filter(foodItem => foodItem.category === "fruit");
      createStore(fruitStore);
    }
    if (filterSelectEl.value === "veg") {
      const vegStore = store.items.filter(foodItem => foodItem.category === "veg");
      createStore(vegStore);
    }
  });
}

function removeAllStoreItemElements() {
  const storeEl = document.querySelector("ul");
  const storeItems = storeEl.querySelectorAll("li");
  for (let i = 0; i < storeItems.length; i++) {
    storeItems[i].remove();
  }
}

function createStore(items) {
  for (let i = 0; i < items.length; i++) {
    renderStoreItem(items[i]);
  }
}

function createCart() {
  for (let i = 0; i < cart.items.length; i++) {
    renderCartItem(cart.items[i]);
  }
}

createFilters();
createSorts();
createStore(store.items);
createCart();
//fillDB(store.items); Jason
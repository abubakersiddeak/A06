//  mobile menu troggule button
const menuModal = document.getElementById("menuModal");
let num = 1;
function handleManuClick() {
  num++;
  if (num % 2 === 0) {
    menuModal.classList.remove("hidden");
    menuModal.classList.add("flex");
  } else {
    menuModal.classList.remove("flex");
    menuModal.classList.add("hidden");
  }
}

const cardContinar = document.getElementById("cardContinar");
const catagoryContiner = document.getElementById("catagoryContiner");
const spinner = document.getElementById("spinner");
// Show spinner
function showSpinner() {
  spinner.classList.remove("hidden");
}

// Hide spinner
function hideSpinner() {
  spinner.classList.add("hidden");
}

// display trees
function displayTrees(trees) {
  cardContinar.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg flex flex-col gap-2 p-4 max-h-[550px]";
    card.innerHTML = `
      <img src="${tree.image}" alt="${tree.name}" 
           class="w-full xl:h-[200px] lg:h-[150px] md:h-[120px] h-[150px] rounded-lg">
      <button id="tree-name" class="text-xl font-bold cursor-pointer text-start">${tree.name}</button>
      <p class="text-[12px]">${tree.description}</p>
      <div class="flex justify-between items-center">
        <span class="bg-green-300/30 px-2 py-1 rounded-3xl text-[14px] text-green-700 font-bold">
          ${tree.category}
        </span>
        <p class="font-bold">$ ${tree.price}</p>
      </div>
    `;

    // cart button
    const btn = document.createElement("button");
    btn.className =
      "cursor-pointer bg-green-800 text-white font-bold rounded-3xl py-3 hover:scale-105 duration-750";
    btn.innerText = "Add to Cart";

    btn.addEventListener("click", () => handleAddtoCartClick(tree));
    // Event listener for tree name button
    const nameBtn = card.querySelector("#tree-name");
    nameBtn.addEventListener("click", () => {
      openModal(tree);
    });

    card.appendChild(btn);
    cardContinar.appendChild(card);
  });
}

// Default alltrees
async function loadAllTrees() {
  showSpinner();
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  displayTrees(data.plants);
  hideSpinner();
}

// load category
async function getAllCategorie() {
  showSpinner();
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();
  const categoriData = data.categories;
  hideSpinner();

  // make all trees button
  const allBtn = document.createElement("button");
  allBtn.className =
    "text-start py-2 text-black px-4 rounded-lg cursor-pointer hover:scale-95 duration-750";
  allBtn.innerText = "All Trees";

  allBtn.addEventListener("click", () => {
    loadAllTrees();
    setActiveButton(allBtn);
  });
  catagoryContiner.appendChild(allBtn);

  // category buttons
  categoriData.forEach((c) => {
    const button = document.createElement("button");
    button.className =
      "text-start py-2 text-black px-4 hover:bg-green-300 rounded-lg cursor-pointer hover:scale-95 duration-750";
    button.innerText = c.category_name;

    // fetch data
    button.addEventListener("click", async () => {
      showSpinner();
      const res = await fetch(
        `https://openapi.programming-hero.com/api/category/${c.id}`
      );
      const data = await res.json();
      displayTrees(data.plants);
      hideSpinner();
      setActiveButton(button);
    });

    catagoryContiner.appendChild(button);
  });

  // default active all trees
  setActiveButton(allBtn);
}

// helper function
function setActiveButton(activeBtn) {
  const buttons = catagoryContiner.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.classList.remove("bg-green-700", "text-white");
  });
  activeBtn.classList.add("bg-green-700", "text-white");
}

loadAllTrees();
getAllCategorie();

// cart desplay
const cartDisplay = document.getElementById("cartDisplay");
const totalDisplay = document.getElementById("totalDisplay");

let cart = [];

function handleAddtoCartClick(tree) {
  console.log("Added to cart:", tree);
  alert(`${tree.name} has been added to the cart`);

  let existingItem = cart.find((item) => item.name === tree.name);

  if (existingItem) {
    existingItem.quantity += 1;

    // ui ubdate
    const quantityEl = document.getElementById(`qty-${existingItem.name}`);
    quantityEl.textContent = `x${existingItem.quantity}`;
  } else {
    tree.quantity = 1;
    cart.push(tree);

    const cartitems = document.createElement("div");
    cartitems.className = "bg-cyan-50 rounded-lg p-2 flex justify-between";

    cartitems.innerHTML = `
      <div>
        <p class="font-bold">${tree.name}</p>
        <div class="text-gray-500">${tree.price} TK <span id="qty-${tree.name}"> x 1</span></div>
      </div>
      <button class="remove-btn cursor-pointer hover:scale-75 hover:rotate-90 duration-750">
        <img src="assets/icons8-cross-30.png" alt="remove">
      </button>
    `;

    // remove button
    const removeBtn = cartitems.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      alert(`${tree.name} has been remove from the cart`);
      cart = cart.filter((item) => item.name !== tree.name);
      cartitems.remove();
      updateTotal();
    });

    cartDisplay.appendChild(cartitems);
  }

  updateTotal();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalDisplay.innerHTML = `
    <p>Total:</p>
    <p>${total} TK</p>
  `;
}

// open modal
function openModal(tree) {
  console.log(tree.id);
  const modal = document.getElementById("my_modal_5");
  modal.innerHTML = ` <div class="modal-box w-11/12 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6">
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-3">${tree.name}</h3>

            <!-- Image -->
            <img src="${tree.image}" alt="tree image" class="h-40 sm:h-48 md:h-60 w-full object-cover rounded mb-3">

            <!-- Info -->
            <p class="text-sm sm:text-base md:text-lg font-medium">Category: <span class="text-gray-600">${tree.category}</span></p>
            <p class="text-sm sm:text-base md:text-lg font-medium">Price: <span class="text-gray-600">${tree.price} TK</span> </p>
            <p class="text-sm sm:text-base md:text-lg font-medium">Description: <span class="text-gray-600">${tree.description}</span></p>

            <!-- Modal action -->
            <div class="modal-action mt-4">
                <form method="dialog">
                    <button class="btn w-full sm:w-auto">Close</button>
                </form>
            </div>
        </div>`;
  my_modal_5.showModal();
}

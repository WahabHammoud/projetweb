let iconcart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".Listproduct");
let listCartHTML = document.querySelector(".listcart");
let iconcartspan = document.querySelector(".icon-cart span");

let listProducts = [];
let carts = [];
iconcart.addEventListener("click", () => {
  body.classList.toggle("showcart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showcart");
});
const addDatatoHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
      <img src="${product.image}" />
      <h2>${product.name}</h2>
      <div class="price">${product.price}</div>
      <button class="add-cart">add to cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};
listProductHTML.addEventListener("click", (e) => {
  let positionClick = e.target;
  if (positionClick.classList.contains("add-cart")) {
    let product_id = positionClick.parentElement.dataset.id;
    addtocart(product_id);
  }
});

const addtocart = (product_id) => {
  let posotionThisProduct = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [{ product_id: product_id, quantity: 1 }];
  } else if (posotionThisProduct < 0) {
    carts.push({ product_id: product_id, quantity: 1 });
  } else {
    carts[posotionThisProduct].quantity =
      carts[posotionThisProduct].quantity + 1;
  }
  addCartToHTML();
};

const addCartToHTML = () => {
  let totalQuantity = 0;
  if (carts.length > 0) {
    
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id) ;
      let info = listProducts[positionProduct];
      newCart.innerHTML = `
      <div class="image">
            <img src="${info.image}" alt="" />
          </div>
          <div class="name">${info.name}</div>
          <div class="totalpri">${info.price * cart.quantity}</div>
          <div class="quantity">
            <span class="minus"><</span>
            <span>${cart.quantity}</span>
            <span class="plus">></span>
          </div>
      `;
      listCartHTML.appendChild(newCart);
    });
  }
  iconcartspan.innerText = totalQuantity;
};
listCartHTML.addEventListener('click', (e) => {
  let positionClick = e.target;
  if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
  let product_id = positionClick.parentElement.parentElement.dataset.id;
let type = 'minus';
if (positionClick.classList.contains('plus')){
  type = 'plus';
}
changeQuantity(product_id, type);
  }  })
const changeQuantity = (product_id, type) => {
  let posotionItemInCart = carts.findIndex((value) => value.product_id == product_id);
  if (posotionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[posotionItemInCart].quantity =
          carts[posotionItemInCart].quantity + 1;
        break;
        default:
          let valuechange = carts[posotionItemInCart].quantity - 1;
          if (valuechange > 0){
            carts[posotionItemInCart].quantity = valuechange;
    }
    else {
      carts.splice(posotionItemInCart, 1);
    }
    break;
    }
    addCartToHTML();
}}

const initApp = () => {
  fetch("./server/products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDatatoHTML();
    });
};
initApp();

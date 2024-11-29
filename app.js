const div = document.querySelector(".container");
let products = []; 

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    products = res.products; 
    console.log(products);

    products.forEach((item) => {
      div.innerHTML += `
        <div class="card">
          <img src="${item.thumbnail}" alt="thumbnail">
          <h1>${item.title}</h1>
          <p>${item.description.slice(0, 20)}...</p>
          <p>Price: $${item.price}</p>
          <button onclick="showMore(${item.id})">See more</button>
          <button onclick="addToCart(${item.id})">Add to cart</button>
        </div>
      `;
    });
  })
  .catch((err) => {
    console.log(err);
  });

const showMore = (id) => {
  console.log(id);
  localStorage.setItem("id", id); 
  window.location = "showmore.html"; 
};

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

console.log("cartItems===>", cartItems);

function addToCart(id) {
  const product = products.find((item) => item.id === id); 
  const checkIndex = cartItems.findIndex((item) => item.id === id); 

  if (checkIndex === -1) {
    product.quantity = 1;
    cartItems.push(product);
  } else {
    cartItems[checkIndex].quantity++;
  }

  console.log(cartItems); 

  Swal.fire({
    title: "Good job!",
    text: "Item added to cart successfully!",
    icon: "success",
  });

  localStorage.setItem("cart", JSON.stringify(cartItems));
}
function checkout() {
  if (cartItems.length === 0) {
    Swal.fire({
      title: "No items in cart!",
      text: "Please add items to your cart before checking out.",
      icon: "warning",
    });
    return;
  }

  console.log("checkout chal raha hai");

  const convertArrIntoStr = JSON.stringify(cartItems);
  localStorage.setItem("cart", convertArrIntoStr);
  window.location = "./addcart.html";
}

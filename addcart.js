const data = localStorage.getItem("cart");
const convert = JSON.parse(data);
console.log(convert);

let output = document.querySelector("#render");

function renderCart() {
  output.innerHTML = '';

  convert.map((item, index) => {
    output.innerHTML += `
      <div class="card">
        <img src="${item.thumbnail}" alt="thumbnail">
        <h1>${item.title}</h1>
        <p>Price: $${item.price}</p>
        <h4 id="price-${index}">Price $${item.price * item.quantity}</h4>
        <div class="quantity">
          <button onclick="minus(${index}, ${item.price})">-</button>
          <p id="qun-num-${index}">${item.quantity}</p>
          <button onclick="plus(${index}, ${item.price})">+</button>
        </div>
        <button class="buy-now" onclick="buynow()">Buy Now</button>
        <button class="buy-now" onclick="delBtn(${index})">Delete</button>
      </div>`;
  });

  updateTotalAmount();
}

function plus(index, price) {
  let quantityElem = document.querySelector(`#qun-num-${index}`);
  let priceElem = document.querySelector(`#price-${index}`);
  quantityElem.innerHTML = parseInt(quantityElem.innerHTML) + 1;
  priceElem.innerHTML = `Price $${price * quantityElem.innerHTML}`;
  convert[index].quantity = parseInt(quantityElem.innerHTML);
  localStorage.setItem('cart', JSON.stringify(convert));
  updateTotalAmount();
}

function minus(index, price) {
  let quantityElem = document.querySelector(`#qun-num-${index}`);
  let priceElem = document.querySelector(`#price-${index}`);

  if (quantityElem.innerHTML > 1) {
    quantityElem.innerHTML = parseInt(quantityElem.innerHTML) - 1;
    priceElem.innerHTML = `Price $${price * quantityElem.innerHTML}`;
    convert[index].quantity = parseInt(quantityElem.innerHTML);
    localStorage.setItem('cart', JSON.stringify(convert));

    updateTotalAmount();
  }
}

function updateTotalAmount() {
  let totalAmount = 0;

  convert.forEach(item => {
    totalAmount += item.price * item.quantity;
  });

  document.getElementById("totalAmount").innerHTML = `Total: $${totalAmount}`;
}
function buynow() {
  // console.log(index)
  Swal.fire({
    title: "Good job!",
    text: "gate kholo rastay mai hai!",
    icon: "success",
  });
  return
}
function delBtn(index) {
  convert.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(convert));
  renderCart();
}
renderCart();
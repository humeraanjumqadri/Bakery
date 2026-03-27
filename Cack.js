const form = document.getElementById('contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const formMessage = document.getElementById('formMessage');
const orderBtn = document.getElementById('orderBtn');
const cart = document.getElementById('cartCount');
const menu = document.getElementById('menu');
const addBtn = document.getElementsByClassName('addBtn');
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const clearCartBtn = document.getElementById('clearCart');
const cartList = document.getElementById('cartList');
const totalPrice = document.getElementById('totalPrice');
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
cart.textContent = cartItems.length;
renderCart();
updateCartCount();

orderBtn.addEventListener('click', ()=> {
    menu.scrollIntoView({ behavior: "smooth" });
});

for(let i=0; i<addBtn.length; i++){
    addBtn[i].addEventListener('click', function(){
        let productName = this.parentElement.querySelector("h3").textContent;
        let priceText = this.parentElement.querySelector(".price").textContent;
        let price = parseFloat(priceText.replace('$', ''));

        let existingItem = cartItems.find(item=> item.name === productName);
        if(existingItem){
        existingItem.quantity += 1;
        }else{
        cartItems.push({
        name: productName,
        price: price,
        quantity: 1
    });
}
        cart.textContent = cartItems.length;    
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
        updateCartCount();
    });
   
}

clearCartBtn.addEventListener('click', ()=>{
        const confirmClear = confirm("Are you sure you want to clear the cart?");
        if(!confirmClear)return;
    cartItems = [];

    cart.textContent = cartItems.length;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
      renderCart();
      updateCartCount();
});
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    formMessage.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";
    if(name.value.trim() === '') {
        nameError.textContent = "Please enter your name"
        nameError.style.color = "red"
        isValid = false;
    }
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email";
        emailError.style.color = "red";
        isValid = false;
    }
const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone.value.trim())) {
        phoneError.textContent = "Please enter a valid 10-digit phone number";
        phoneError.style.color = "red";
        isValid = false;
    }
    if(subject.value === '') {
        subjectError.textContent = "Please select a subject"
        subjectError.style.color = "red";
        isValid = false;
    }
    if (message.value.trim().length < 10) {
        messageError.textContent = "Message must be at least 10 characters";
        messageError.style.color = "red";
        isValid = false;
    }
    if(isValid){
        formMessage.textContent = "Thank you for contacting us! We will get back to you soon."
        formMessage.style.color = "green"
        form.reset();
    }
});
name.addEventListener("input", function() {
    if(name.value.trim() !== '') {
        nameError.textContent = "";
    }
});
email.addEventListener("input", function() {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (emailPattern.test(email.value.trim())) {
        emailError.textContent = "";
    }
});
phone.addEventListener("input", function() {
       const phonePattern = /^[0-9]{10}$/;
    if(phonePattern.test(phone.value.trim())){
        phoneError.textContent = "";
    }
});
subject.addEventListener("change", function() {
    if(subject.value !== '') {
        subjectError.textContent = "";
    }
});
message.addEventListener("input", function() {
    if(message.value.trim() !== '' && message.value.trim().length >= 10) {
        messageError.textContent = "";
    }
}); 

function renderCart() {
   cartList.innerHTML = "";
   let total = 0;

  if(cartItems.length === 0){
    cartList.innerHTML = "<p>Your cart is empty</p>";
    totalPrice.textContent = "0.00";
    return;
}

   cartItems.forEach(function(item, index) {
      total += item.price * item.quantity;

      let li = document.createElement("li");
      li.textContent = item.name + " - $" + item.price + ' x ' + item.quantity;

      let removeBtn = document.createElement("button");
      removeBtn.textContent = 'Remove';
    
        removeBtn.addEventListener('click', function(){
        cartItems.splice(index,1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
        cart.textContent = cartItems.length;
        renderCart();
        updateCartCount();
   });
        cartList.appendChild(li);
        li.appendChild(removeBtn);
});
   totalPrice.textContent = total.toFixed(2);
}
function updateCartCount(){
    let totalCount = 0;
    cartItems.forEach(item=>{
         totalCount += item.quantity;
    });
    cart.textContent = totalCount;
}
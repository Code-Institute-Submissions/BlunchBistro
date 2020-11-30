if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('btn-link');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target ;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target ;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1 ; 
    }
    updateCartTotal() ;
}

function addToCartClicked(event) {
    var button = event.target ;
    var shopItem = button.parentElement.parentElement ;
    var title = shopItem.getElementsByClassName('item-name')[0].innerText ;
    var price = shopItem.getElementsByClassName('item-price')[0].innerText ;
    var price = price.replace("ADD TO CART", "") ;
    
    addItemToCart(title, price) ;
    updateCartTotal() ;
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div') ;
    cartRow.classList.add('cart-row') ;
    var cartItems = document.getElementsByClassName('cart-items')[0] ;
    var cartItemNames = cartItems.getElementsByClassName('item-name') ;
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Already in the basket, modify quantity !') ;
            return ;
        }
    }
    var cartRowContents = `<div class="cart-item cart-column">
                  <span class="item-title item-name">${title}</span>
                </div>
                <span class="item-price cart-column">${price}</span>
                <div class="cart-qty cart-column">
                  <input class="cart-quantity" type="number" value="1" />
                  <button class="btn btn-danger" type="button">remove</button>
                </div>`
    cartRow.innerHTML = cartRowContents ;
    cartItems.append(cartRow) ;
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem) ;
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged) ;
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] ;
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') ;
    var total = 0 ;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i] ;
        var priceElement = cartRow.getElementsByClassName('item-price')[0] ;
        var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0] ;
        var price = parseInt(priceElement.innerText) ;
        var quantity = quantityElement.value ;
        total = total + (price * quantity) ;
    }
    document.getElementsByClassName('total-price')[0].innerText = total + 'lei'  ;
}

        const citymap = {
  blunchDelivery: {
    center: { lat:44.44452889316098, 
                    lng: 26.11806508509446},
  },
  
};

function initMap() {
  
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat:44.44452889316098, 
                    lng: 26.11806508509446},
    mapTypeId: "terrain",
  });
 
  for (const city in citymap) {
    const cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: citymap[city].center,
      radius: 2000,
      
    });
  }
}

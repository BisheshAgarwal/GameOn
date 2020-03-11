/*var addToCartButtons=document.getElementsByClassName('more-info');
    for(var i=0; i<addToCartButtons.length; i++){
        var button=addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
*/
/*function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByTagName("h3")[0].innerText;
    console.log(title);
}*/

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

function ready(){
    var addToCartbuttons = document.querySelectorAll(".more-info");

    addToCartbuttons.forEach(function(cur){
        cur.addEventListener("click", function(){
            var container = cur.parentElement.parentElement;
            var title = container.getElementsByTagName("h3")[0].innerHTML;
            var price = container.querySelector(".discounted-price").innerHTML;
            var img = container.querySelector(".game-img").src;
            var html, newHtml;

            var cartItems= document.getElementsByClassName('cart-container')[0];
            var cartItemsNames= cartItems.getElementsByClassName('item-title');
            for(var i=0; i<cartItemsNames.length; i++)
            {
                if(cartItemsNames[i].innerText==title)
                {
                    alert('Item Already in cart');
                    return;
                }
            }

            html = '<div><div class="row item-row"><div class="col span-1-of-4"><img src="%img%" class="item-img"></div><div class="col span-1-of-4"><span class="item-title">%title%</span></div><div class="col span-1-of-4"><span class="item-price">%price%</span></div><div class="col span-1-of-4"><button type="button" class="btn-remove">Remove</button></div></div></div>';

            newHtml = html.replace("%img%", img);
            newHtml = newHtml.replace("%title%", title);
            newHtml = newHtml.replace("%price%", price);
            document.querySelector(".cart-container").insertAdjacentHTML("beforeend", newHtml);
            updateCartTotal();
        });
    });

    var ctrlDeleteItem = function(event){
        var buttonClicked = event.target;
        if(buttonClicked.innerHTML == "Remove")
            {
                buttonClicked.parentElement.parentElement.remove();
            }
        updateCartTotal();
    }

    document.querySelector(".cart-container").addEventListener("click", ctrlDeleteItem);
    
    function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-container')[0];
    var cartRows = cartItemContainer.getElementsByClassName('item-row');
    var total = 0;
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('item-price')[0];
        var removedComa = priceElement.innerHTML.replace(',', '');
        var price = parseFloat(removedComa.replace('₹', ''));
        total = total + price;
        }
        document.getElementsByClassName('total-price')[0].innerText = '₹'+ total.toLocaleString();
    }
    
    document.querySelector(".btn-checkout").addEventListener("click", function(){
        
        var cartItemContainer = document.getElementsByClassName('cart-container')[0];
        var cartRows = cartItemContainer.getElementsByClassName('item-row');
        var length = cartRows.length;
        
        if(length < 1)
            {
                alert("Please add some items into the cart to checkout");
            }
        else
            {
                alert("Thank you for the purchase");
                var cartItems = document.getElementsByClassName('cart-container')[0];
                while(cartItems.hasChildNodes())
                {
                    cartItems.removeChild(cartItems.firstChild);
                }
                updateCartTotal();
            }
    });
}




    




















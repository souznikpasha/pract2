var cart = {}; // корзина
let goodsnumber = null;
var shoptitle = "./json/goods.json";
$('document').ready(function(){
    loadgoods();
    showMiniCart();
    checkCart();
    
    
})
function gettitle(num){
    if(num == 0){
        shoptitle = "./json/goods.json";
    }
    if(num == 1){
        shoptitle = "./json/goods1.json";
    }
    if(num == 2){
        shoptitle = "./json/goods2.json";
    }
    if(num == 3){
        shoptitle = "./json/goods3.json";
    }
}

function loadgoods(num){
    //Загружаю товары на страницу
    console.log(num);
    gettitle(num);
    console.log(shoptitle);
    $.getJSON(shoptitle, function (data){
            //console.log(data);
            var out = ' ';
            out+='<main class="content">';
            for (var key in data) {
                out+='    <div class="product">';
                out+='        <div class="product-container">';
                out+='            <div class="top">'+data[key]['name']+'</div>';
                out+='            <div class="middle"><img src="'+data[key].image+'" class="gallery"></div>';
                out+='            <div class="bottom">';
                out+='                <input type="button" data-art="'+key+'" value='+data[key]['cost']+' class="add-to-cart">';
                out+='                <input type="button" data-art="'+key+'" value="Удалить"  class="but-right">';
                out+='            </div>';
                out+='        </div>';
                out+='    </div>';
            }
            out+='</main>';
                       /*
            for (var key in data) {
                out+='<p>'+data[key]['name']+'</p>';
                out+='<p>'+data[key]['cost']+'</p>';
                out+='<img src="'+data[key].image+'">';
            }*/
            $('#goods').html(out);
            $('input.add-to-cart').on('click', addToCart);
            $('input.but-right').on('click', deletetocart);
        })
}

function addToCart() {
    //добавить товар в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
    cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
    showMiniCart();
}

function deletetocart(){
        //убрать товар из корзины(блоки)
        var articul = $(this).attr('data-art');
        if (cart[articul]!=undefined) {
            cart[articul]--;
        }
        if(cart[articul]==0) {
            delete cart[articul];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart);
        showMiniCart();
}

function checkCart(){
    //проверка наличие корзины в localstorage
    if (localStorage.getItem('cart')!=null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}



function showMiniCart(){
    //содержимое корзины
    $.getJSON("./json/goodscart.json", function (data){
        var out =' ';
        out +='<header class="header">';
        out +='<img src="./images/logo.png" class="logo">';
        out +='<p class="title">ShlyapKa</p>';
            out +='<shop class="shop">';
                
                out +='<div id="main">';
                    
                    out +='   <div id="menu-wrap">'
                    out +='        <ul class="menu">'
                        out +='<li><a href=""><img src="./images/card.png" class="card" alt=""></a>';
                            out +='<ul>';
                            for (var key in cart){
                                out +='<li>';
                                    out +='<div id="main">';
                                    out +='<div><img src="'+data[key].image+'" class="photosale"></div>';
                                    //out +='<div><p>Шапка 3000р</p></div>';
                                    out +='<div>'+data[key]['name']+' '+data[key]['cost']+' '+cart[key]+'шт</div>';
                                    //out +='<div>'+cart[key]['articul']+' '+data[key]['cost']+'</div>';
                                    out +='<input type="image" class="delete-all-cart" data-art="'+key+'" src="./images/Krest.png">';
                                    //out +='<input type="button" data-art="'+key+'"   class="delete-all-cart"><img src="./images/Krest.png"></button>';
                                    //out +='<button data-art="'+key+'" class="delete-all-cart><a><img src="./images/Krest.png"></a></button>';
                                    out +='</div>';
                                out +='</li>';
                                //out += i + ' - ' +cart[i]+'<br>';
                            }
                            out +='</ul>';
                        out +='</li>';
                    out +='</div>';
                var sum = 0;
                var count = 0;
                for (var key in cart){
                    sum += data[key]['cost']*cart[key];
                    count += 1*cart[key];
                }
                console.log(sum);
                out +='<div class="textcard"><p>'+count+' шт&nbsp</p></div>';
                out +='<div class="textcard"><p>'+sum+' руб</p></div>';
                out +='</div>';
            out +='</shop>';
        out +='</header>';
        $('#mini-cart').html(out);
        $('input.delete-all-cart').on('click', deleteallcart);
    });
}

function deleteallcart(){
    //убрать товар из корзины(корзина)
    console.log('delete');
    var articul = $(this).attr('data-art');
    delete cart[articul];
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
    showMiniCart();
}
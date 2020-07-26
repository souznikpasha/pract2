var cart = {}; // корзина
$('document').ready(function(){
    loadgoods();
})

function loadgoods(){
    //Загружаю товары на страницу
    $.getJSON("goods.json", function (data){
            //console.log(data);
            var out = ' ';
            out+='<main class="gray-300">';
            for (var key in data) {
                out+='    <div class="product">';
                out+='        <div class="product-container">';
                out+='            <div class="top">'+data[key]['name']+'</div>';
                out+='            <div class="middle"><img src="'+data[key].image+'" class="gallery"></div>';
                out+='            <div class="bottom">';
                out+='                <input type="button" data-art="'+key+'" value='+data[key]['cost']+' class="add-to-cart">';
                out+='                <input type="submit" value="Удалить"  class="but-right">';
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
    console.log(cart);
}
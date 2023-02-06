function addToCart(proId){
    $.ajax({
      url:'/add-to-cart/'+proId,
      method:'get',
      success:(response)=>{
        if(response.status){
            let count=$('#cart-count').html()
            count=parseInt(count)+1
            $("#cart-count").html(count)
        }
      }
    })
  }
  function removeCartProduct(productId,cartId){
    $.ajax({
      url:'remove-product',
      data:{
        productId:productId,
        cartId:cartId,
      },
      method:'post',
      success:(response)=>{
        if(response){
          if(confirm("are you sure to remove this product?")){
            location.reload()
          }
        }
      }
    })
  }

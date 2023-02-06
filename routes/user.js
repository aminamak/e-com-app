var express = require('express');
var router = express.Router();
const productHelpers=require('../helpers/product-helpers');
const userHelpers=require('../helpers/user-helpers')
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/',async function(req, res, next)
 {
  let user=req.session.user
  console.log(user);
  let cartCount=null
  if(req.session.user){
   cartCount=await userHelpers.getCartCount(req.session.user._id)
  }
   productHelpers.getAllProducts().then((products)=>{
    
    res.render('user/view-products',{user:true,products,user,cartCount})
  })
  
});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{

  res.render('user/login',{"loginErr":req.session.loginErr})
  req.session.loginErr=false
  }
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
  })
})
router.post('/login',(req,res)=>{
userHelpers.doLogin(req.body).then((response)=>{
  if(response.status){
    req.session.loggedIn=true
    req.session.user=response.user
    res.redirect('/')
  }else{
    req.session.loginErr="invalid id or password"
    res.redirect('/login')
  }
})
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',verifyLogin,async(req,res)=>{
 let products=await userHelpers.getCartProducts(req.session.user._id)
 console.log(products);
  res.render('user/cart',{products,user:req.session.user})
})
router.get('/add-to-cart/:id',(req,res)=>{
  console.log("api call");
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
  })

})
router.post('/change-product-quantity',(req,res,next)=>{
  console.log(req.body);
  userHelpers.ChangeProductQuantity(req.body).then((response)=>{
    res.json(response)
  })
})
  router.post('/remove-product',(req,res)=>{
    console.log("called");
      userHelpers.removeCartProduct(req.body).then((response)=>{
        res.json(response)
      })
    })
  
router.get('/place-order',(req,res)=>{
  console.log("api call");
  res.render('user/place-order')
})
module.exports = router;

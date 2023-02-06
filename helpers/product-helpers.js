var db=require('../config/connection')
var collection=require('../config/collections');
var objectId=require('mongodb').ObjectID
module.exports={

    addProduct:(product,callback)=>{
        console.log(product);
      db.get().collection('product').insertOne(product).then((data)=>{
        console.log(data);
        callback(data.insertedId)
      }) 
    },
    getAllProducts:()=>{
      return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
          resolve(products)
        
      })
    },
    deleteProduct:(proId)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
          //console.log(response);
          resolve(response)
        })
      })
    },
    getProductDetailes:(proId)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
          resolve(product)
        })
      })
    },
    updateProduct:(proId,proDetailes)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION)
        .updateOne({_id:objectId(proId)},{
          $set:{
            name:proDetailes.name,
            description:proDetailes.description,
            price:proDetailes.price,
            category:proDetailes.category
          }
        }).then((response)=>{
          resolve()
        })
      })
    }
}
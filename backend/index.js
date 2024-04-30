const port = 4000;
const express = require('express');
const app = express();
const mogoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use(cors());

// Database connection
mogoose.connect("mongodb+srv://aman44008:2609As@cluster0.xiybx1j.mongodb.net/The_gifting_Tree")

// Api creation

app.get("/",(req, res)=>{
    res.send("Express app is running");
})

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// creating upload endpoint for images

app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req, res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct', async(req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creating api for deleting products

app.post('/removeproduct', async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creating api for getting all products
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


// Schema for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now(),
    }
})

//Creating Endpoint for registring the user
app.post('/signup',async(req, res)=>{
    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false, errors:"Existing user found with same email id"})
    }

    let cart = {};
    for(let i = 0; i < 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user: {
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({success:true, token})

})

//creating endpoint for user login
app.post('/login',async(req, res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user : {
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors:'Wrong Password'});
        }
    }
    else{
        res.json({success:false, errors:"Wrong Email id"})
    }
})

// Creating endpoint for new collecction
app.get('/newcollection', async(req, res)=>{
    let products = await Product.find();
    let newcollection = products.slice(1).slice(-8);
    console.log('Newcollection fetched');
    res.send(newcollection);
})

//creating end-point for popular
app.get('/popular', async(req, res)=>{
    let products = await Product.find({category:"Gift"});
    let popular = products.slice(0,4);
    console.log("Popular Product fetched")
    res.send(popular);
})

//creating end-point for related products
app.get('/relatedproducts', async(req, res)=>{
    let products = await Product.find({category:"Gift"});
    let popular = products.slice(0,4);
    console.log("Popular Product fetched")
    res.send(popular);
})

// creating middelware to fetch user
const fetchuser = async(req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch(error){
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
} 

//creating endpoint for adding products cartdata
app.post('/addtocart',fetchuser,async(req, res)=>{
    console.log("Added", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
    res.send("Added")
})

//creating endpoint to remove products
app.post('/removefromcart',fetchuser, async(req, res)=>{
    console.log("removed", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0){
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
    res.send("Removed")
})

// creating endpoint to get cartdata
app.post('/getcart', fetchuser, async(req, res)=>{
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (err)=>{
    if(!err){
        console.log("server running on port "+port);
    }
    else{
        console.log("Error: "+err);
    }
})




const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
}

const mongoConnection = mongoose.connect(MONGODB_URI)
.then(()=> console.log('MongoDB connected successfully'))
.catch((err)=> console.log(`Connection error: ${err} `))

const Schema = mongoose.Schema;

const schema = {
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        default:"No comments"
    },
    createdAt:{
        type:Date,
        default: new Date().toISOString()
    }
}

const feedbackSchema = new Schema(schema)

// model creates a collection
const FeedbackModel = mongoose.model('Feedback', feedbackSchema);


app.use(express.static('public')) // check at deployment (without path.join(__dirname, 'public'))
app.use(express.json());


app.get('/feedbacks',async (req,res)=>{

    try{

        const feedbacks = await FeedbackModel.find({});
        console.log(feedbacks);
        res.json(feedbacks)
    }catch(err){
        console.log(err);
        res.json({success:false, message: err.message});
    }
})
app.post('/feedback-submit',(req,res)=>{
    const {name,rating,comment} = req.body;
    const newFeedback = new FeedbackModel({
        name:name,
        rating:rating,
        comment:comment
    })

    newFeedback.save()
    .then((result)=> {
        res.json({success:true,message:"User feedback submitted"});
        console.log("Save: ", result);
    })
    .catch((err)=>{
        console.log('Error :',err);
        res.json({success:false, message: err.message})
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port: http://localhost:${PORT}`);

})
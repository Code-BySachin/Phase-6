const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;


const mongoConnection = mongoose.connect('mongodb://localhost:27017/student-feedback-manager')
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
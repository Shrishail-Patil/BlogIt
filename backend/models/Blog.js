const mongoose = require('mongoose')
const { Schema } = mongoose
const moment = require('moment');

// const formattedDate = moment(Date.now()).format('DD/MM/YYYY');
// const formattedTime = moment().format('HH:mm:ss');

const BlogSchema = new Schema({
    userID:{
        type:String,
        required : true
    },
    title:{
        type: String,
        require:true
    },
    blog:{
        type: String,
        require:true
    },
    image:{
        type: String
    },
    date:{
        type: Date,
        require: true,
        default: Date.now()
        // default: moment(Date.now()).format('DD/MM/YYYY') 
//         
    }

})

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog
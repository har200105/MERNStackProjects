const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const questionSchema = mongoose.Schema({

    question:{
        type:String,
        required:true
    },

    options:{
        type:Array,
        required:true
    },

    correctAnswer:{
        type:String,
        required:true
    },

    marks:{
        type:Number,
        required:true
    },

    questionBy:{
        type: ObjectId,
        ref: "User"
    },

    QuestionAllowedTo: [{
        type: ObjectId,
        ref: "User"
    }],

    questionOfExam:{
        type: ObjectId,
        ref: "Exam"
    }

},{timestamps:true});


const Question = mongoose.model("Question",questionSchema);
module.exports = Question;
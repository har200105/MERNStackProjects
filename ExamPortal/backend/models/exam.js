const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const examSchema = mongoose.Schema({

    examQuestions: [{
        type: ObjectId,
        ref: "Questions"
    }],

    examByTeacher: {
        type: ObjectId,
        ref: "User"
    },

    examAllowedTo: [{
        type: ObjectId,
        ref: "User"
    }],

    examStartingDate: {
        type: Date,
        required: true
    },

    examDuration: {
        type: Date,
        required: true
    },

    totalMarks: {
        type: Number,
        required: true
    },

    marksObtainedByStudents: [{
        student: {
            type: ObjectId,
            ref: "User"
        },
        marks: {
            type: Number,
            required: true
        }

    }]

}, { timestamps: true });

const ExamSchema = mongoose.model("Exam", examSchema);
module.exports = ExamSchema;
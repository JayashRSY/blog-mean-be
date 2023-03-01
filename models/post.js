const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: "string",
        required: true
    },
    content: {
        type: "string",
        required: true
    },
    imagePath: {
        type: "string",
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)

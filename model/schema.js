import mongoose from 'mongoose';

// Definition of the 'User' collection Schema
const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true      // Email must be unique, so no two accounts can be linked to same email
    },
    password : {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: {
            values: [
                'user',
                'admin'
            ],
        }
    }
})

// Definition of the 'Post' collection Schema
const postSchema = new mongoose.Schema({
    author : {
        type : String,
        required : true
    },
    title : {
        type: String,
        required: true,
        unique: true      // title must be unique for each post
    },
    description : {
        type: String,
        required: true
    },
    likes : {
        type : Number
    },
    createdOn : {
        type: String
    },
    lastUpdatedOn : {
        type: String
    }
})

// If collection exists, return the existing one, else create new collection
const User = mongoose.models?.User || mongoose.model('User', userSchema);
const Post = mongoose.models?.Post || mongoose.model('Post', postSchema);

module.exports = {User, Post};
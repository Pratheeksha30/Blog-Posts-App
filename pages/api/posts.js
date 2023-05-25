import connect from '../../lib/mongodb';
import { Post } from '../../model/schema';

connect();

export default async function postHandler(req,res){

    if(req.method == 'GET'){
        let user = req.query.user;
        user  = new String(user);
        const posts = await Post.find({author : user});
        return res.send({posts : posts});
    }

    else if(req.method == 'POST'){
        try {
            const post = await Post.create(req.body);
            console.log(post)
            if(post){
                return res.send({message: "Successful"});
            }
            else{
                return res.send({message:'Could not create Blog'});
            }
        } catch (error){
            res.send({message: 'Not able to create a new blog.'});
        }
    }

    else if(req.method == 'PUT'){
        try {
            const blog = {
                title : req.body.title,
                description : req.body.description,
                lastUpdatedOn : req.body.lastUpdatedOn
            } 
            const post = await Post.updateOne({author : req.body.author, title : req.body.oldTitle}, {$set : blog});
            if(post){
                return res.send({message: "Successful"});
            }
            else{
                return res.send({message:'Could not update Blog'});
            }
        } catch (error){
            res.send({message: 'Not able to edit the blog.'});
        }
    }

    else if(req.method == 'DELETE'){
        try {
            const post = await Post.deleteOne({author : req.body.author, title : req.body.oldTitle});
            console.log(post);
            if(post){
                return res.send({message: "Successful"});
            }
            else{
                return res.send({message:'Could not delete Blog'});
            }
        } catch (error){
            res.send({message: 'Not able to delete the blog.'});
        }
    }
}
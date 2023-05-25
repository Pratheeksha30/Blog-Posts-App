import connect from '../../lib/mongodb';
import {User} from '../../model/schema';

connect();

export default async function handler(req,res){
    try {
        const user = await User.create(req.body);
        console.log(user)
        if(user){
            return res.send({message: "Successful"});
        }
        else{
            return res.send({message:'User not registered.'});
        }
    } catch (error){
        res.send({message: 'Not able to create a new user.'});
    }
}
import connect from '../../lib/mongodb';
import {User} from '../../model/schema';

connect();

export default async function handler(req,res){
    try {
        let {email, password} = req.body;
        const user = await User.findOne({email : email});
        if(!user){
            return res.send({message:'User not registered.'});
        }
        if(user.password == password){
            return res.send({message: "Successful"});
        }
        else{
            res.send({message: 'Wrong Password'});
        }
        
    } catch (error){
        res.send({message: 'Not able fetch user data'});
    }
}
import mongoose from 'mongoose';

const connection = {};

// // Mongo DB URI is specified in the .env file
// const mongodb_url = process.env.MONGODB_URL;

// if (!mongodb_url) {
//   console.log(
//     'MONGODB_URL environment variable not defined.'
//   );
// }

async function connect(){
    // If Connection exists, then return the existing connection, else create a new connection to DB
    if(connection.isConnected){
        console.log('Already Connected to DB.');
        return;
    }
    else{
      const db = await mongoose.connect(mongodb_url);
      connection.isConnected = db.connections[0].readyState;   
    }
    console.log('Connected to DB.');
}

export default connect;
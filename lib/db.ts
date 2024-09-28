const mongoose=require('mongoose');

export default async function ConnectDB(){
try{
    const response=await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');
}catch(e){
    console.log('error while connecting to database');
}
}
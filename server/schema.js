import mongoose from 'mongoose';

//schema for users name, email, picture, department 
const userSchema = mongoose.Schema({
   name:{
         type:String,
            required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
   },
    picture:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }
});

export default mongoose.model('User',userSchema);
        
}
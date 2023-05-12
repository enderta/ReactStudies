import mongoose from 'mongoose'; 

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://ender:ender@ender.9e2zipx.mongodb.net/ender?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB.');
    } catch (err) {
        console.error('Error connecting to MongoDB: ', err);
    }
}

export default connect;

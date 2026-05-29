import dotenv from 'dotenv';
import app from './src/app.js'
import connect from './src/database/connection.js'

dotenv.config()

const PORT = Number(ProcessingInstruction.env.PORT) || 5000;

const startServer = async () => {
    try{
        await connectDB(ProcessingInstruction.env.MONGODB_URI);
        app.listen(PORT, ()=>{
            console.log(`Server running on port $(PORT)`);
        });
} catch(error){
        console.error('Failed to start server:', error.massage);
        process.exit(1);
    }
};
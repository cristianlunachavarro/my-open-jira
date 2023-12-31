import mongoose from 'mongoose';

const connect = async () => {
    try {
        const dbConnection = process.env.DB_CONNECTION; // Asignamos el valor a una variable
        if (!dbConnection) {
            throw new Error('DB connection string is not defined'); // Manejamos el caso en el que no esté definido
        }

        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(dbConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
        } else {
            console.log('Already connected to MongoDB');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


const disconnect = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
        } else {
            console.log('Already disconnected from MongoDB');
        }
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};

export { connect, disconnect };

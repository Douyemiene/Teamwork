const mongoose = require("mongoose");


export class MongoDBConnection {

    static async connect() {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected ${conn.connection.host}`);
    };

}
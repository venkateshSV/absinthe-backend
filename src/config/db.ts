// import mongoose, { ConnectOptions } from "mongoose";

// // mongoose.set('strictQuery', false);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       process.env.MONGO_URI as string,
//       {
//         //mongodb://localhost:27017/wordle_db
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       } as ConnectOptions
//     );
//     console.log("Database is connected");
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

// export default connectDB;

const { Pool } = require("pg");

const connectDB = async () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
  pool.connect((err: any) => {
    if (err) {
      throw new Error("Email connecting DB");
    }
    console.log("Postgres Connected Successfully!");
  });
};

export default connectDB;

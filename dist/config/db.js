"use strict";
// import mongoose, { ConnectOptions } from "mongoose";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
    });
    pool.connect((err) => {
        if (err) {
            throw new Error("Email connecting DB");
        }
        console.log("Postgres Connected Successfully!");
    });
});
exports.default = connectDB;
//# sourceMappingURL=db.js.map
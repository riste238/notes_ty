"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
// import userModel from "./model/Model";
// console.log(User);
const port = validateEnv_1.default.PORT;
mongoose_1.default.connect(validateEnv_1.default.MONGO_URL)
    .then(() => {
    console.log("Mongoose is connected!");
    app_1.default.listen(port, () => {
        console.log('Listening to port 5000');
    });
})
    .catch(console.error);
// 1.09

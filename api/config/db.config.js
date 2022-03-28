require("dotenv").config();

export const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.7fylx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&ssl=true`;

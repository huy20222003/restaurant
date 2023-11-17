import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

async function connectDB() {
  try {
    connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.uztxur5.mongodb.net/restaurant?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true
      }
    );
    console.log('Connect sucessfully');
  } catch (error) {
    console.log('Connect failure' + error);
  }
}

export default connectDB;

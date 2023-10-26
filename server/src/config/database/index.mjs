import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

async function connectDB() {
  try {
    connect(
      `mongodb://127.0.0.1/restaurant`,
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

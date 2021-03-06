import mongoose, { ConnectOptions } from 'mongoose';
import config from '../../../config';

const opts: ConnectOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true };

const conn = mongoose.createConnection();

export const connect = async (connString) => {
    await conn.openUri(connString, opts);
};

export default conn;

import { connect as _connect } from 'mongoose';

const connectDb = async () => {
  try {
    const connect = await _connect('mongodb://127.0.0.1/dev_web');
    console.log(
      'Connexion établie : ',
      connect.connection.host,
      connect.connection.name,
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;

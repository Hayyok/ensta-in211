import { model, Schema } from 'mongoose';

const userSchema = Schema({
  email: {
    type: String,
    required: [true],
    unique: true,
  },
  name: {
    type: String,
    required: [true],
  },
  password: {
    type: String,
    required: [true],
  },
});

module.exports = model('User', userSchema);

import { model, Schema } from 'mongoose';

const movieSchema = Schema({
  title: {
    type: String,
    required: [true],
  },
  releaseDate: {
    type: String,
  },
});

export default model('Movie', movieSchema);

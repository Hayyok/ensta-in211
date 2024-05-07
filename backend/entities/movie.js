import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movies',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    title: {
      type: String,
    },
    releaseDate: { type: String },
  },
});

export default Movie;

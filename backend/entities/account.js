import typeorm from 'typeorm';

const Account = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    name: {
      type: String,
      unique: true,
    },
    password: { type: String },
  },
});

export default Account;

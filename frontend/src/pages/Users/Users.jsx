import './Users.css';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import UsersTable from '../../components/UsersTable/UsersTable';

function Users() {
  return (
    <div className="Users-container">
      <header className="App-header">
        <h1>This page displays the users</h1>
        <AddUserForm />
        <UsersTable />
      </header>
    </div>
  );
}

export default Users;

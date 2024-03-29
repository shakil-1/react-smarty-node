import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users/')
      .then(res => res.json())
      .then(data => setUsers(data));

  }, []);

  const formSub = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    const user = { name, email };

    //post data to server

    fetch('http://localhost:5000/user/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log('Success:', data);
      })
  }

  return (
    <div className="App">
      <h1>My Own data{users.length}</h1>

      <form onSubmit={formSub}>
        <input type="text" name="name" placeholder='enter your name' required id="" />
        <input type="text" name="email" placeholder='enter your email' required id="" />
        <button>Add User</button>
      </form>


      <ul>
        {
          users.map(user => <li key={user.id}> {user.id} <strong> {user.name}</strong> {user.email} {user.phone} </li>)
        }
      </ul>
    </div>
  );
}

export default App;

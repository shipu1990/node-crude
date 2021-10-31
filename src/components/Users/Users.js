import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data=>setUsers(data))
    },[])

    const handleDelete = id =>{
        const proceed = window.confirm('Are You Sure You want to delete')
        if(proceed){
      const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method:'DELETE'
        })
        .then(res =>res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                alert('Deleted Successfully');
                const remainUsers = users.filter(user => user._id !== id)
                setUsers(remainUsers);
            }
        })
        }
    }
    return (
        <div>
            <h2>This is Users available {users.length}</h2>
            <ul>
                {
                    users.map(user => <li key={user._id}>
                        <h1>{user.name}</h1>
                        <h1>{user.email}</h1>
                        <Link to={`/users/update/${user._id}`}><button>Update</button></Link>
                        <button onClick={()=>handleDelete(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;
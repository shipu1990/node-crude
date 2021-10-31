import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState({})
    useEffect(()=>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setUser(data))
    }, [])

    const handleUserUpdate = e =>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('Update Successfully');
                setUser({})
            }
            console.log(data);
        })
        e.preventDefault()
    }
    const handleNameChange = e =>{
        const updateValue = e.target.value;
        const updatedUser = {name: updateValue, email:user.email}; // Bangla System to change the value
        setUser(updatedUser);
    }
    const handleEmailChange = e =>{
        const updateEmail = e.target.value;
        const updatedUser = {...user} // ANother system to change the input value
        updatedUser.email = updateEmail;
        setUser(updatedUser);
    }
    return (
        <div>
            <h2>This is Update User {user.name}</h2>
            <h2>This is Update User {user.email}</h2>
            <form onSubmit={handleUserUpdate}>
            <input type="text" onChange={handleNameChange} value={user.name || ''} />
            <input type="email" onChange={handleEmailChange}  value={user.email || ''}  />
            <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default UpdateUser;
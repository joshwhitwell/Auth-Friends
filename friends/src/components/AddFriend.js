import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialValues = {
    name: '',
    age: '',
    email: '',
}

export default function AddFriend({ setFriends }) {
    const [values, setValues] = useState(initialValues)

    const handleChanges = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .post('http://localhost:5000/api/friends', { ...values, id: Math.random() })
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        setValues(initialValues)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={handleChanges}
                />
                <label>Age</label>
                <input
                    type='text'
                    name='age'
                    value={values.age}
                    onChange={handleChanges}
                />
                <label>Email</label>
                <input
                    
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChanges}
                />
                <button>Add</button>
            </form>
        </div>
    )
}

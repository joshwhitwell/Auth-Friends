import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initialValues = {
    username: '',
    password: ''
}

export default function Login(props) {
    const [credentials , setCredentials] = useState(initialValues)
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory()
 
    const handleChanges = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('http://localhost:5000/api/login', credentials)
            .then(res => {
                window.localStorage.setItem('token', res.data.payload)
                setIsLoading(false)
                history.push('/friends')
                props.setIsLoggedIn(true)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
        setCredentials(initialValues)
    }

    return (
        <div>
            {isLoading ? 
            <p>Loading</p> : 
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    value={credentials.username}
                    onChange={handleChanges}
                />
                <input
                    type='password'
                    name='password'
                    value={credentials.password}
                    onChange={handleChanges}
                />
                <button>Log in</button>
            </form>
            }
        </div>
    )
}
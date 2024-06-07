import {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';

function Login() {

    const firebase = useFirebase()
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log('Sign in the user..')
       const result = await firebase.signinUser(email, password)
       console.log('Signing Successful')
        
    }

    useEffect(() => {
        if(firebase.isLoggedIn){
            navigate('/')
        }
    }, [firebase, navigate])
   

  return (
    <div className='container'>
     <Form className='container py-5' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <h1 className='m-5'>Or</h1>
    <Button variant="danger" onClick={firebase.signinWithGoogle}>Sign In with Google</Button>

    </div>
   

  )
}

export default Login
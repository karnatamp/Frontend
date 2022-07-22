import React, {useState, ChangeEvent, FormEvent, useContext} from 'react'
import { useNavigate, Link } from "react-router-dom"

import { login } from '../Services/auth'
import { loginParams } from '../Types/auth'
import {AuthcContext} from '../contexts/Authc'

const LoginPage = () => {
  let navigate = useNavigate()
  const context = useContext(AuthcContext);
  const [form, setForm] = useState<loginParams>({
      email: '',
      password: ''
  })
  const [msg, setMsg] = useState('')

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value}: {name: string, value: string} = event.target 
    setForm({...form, [name]: value})
  }

  const onSubmitHandler = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const res = await login(form)

    if (res.status) {
      context.updateAuth(true)
      navigate('/')
    } else {
      setMsg(res.msg)
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler}>
      <h1>Login to service</h1>

        {msg != '' && <div>{msg}</div> }

        <div className="form-row">
            <label>Email</label>
            <input 
                type="email"
                name="email"
                value={form.email}
                onChange={onChangeHandler}
            />
        </div>

        <div className="form-row">
            <label>Password</label>
            <input 
                type="password"
                name="password"
                value={form.password}
                onChange={onChangeHandler}
            />
        </div>

        <div className="form-row">
            <button type='submit'>Send</button>
        </div>

        <div className="form-row">
            <Link to="/register">Don't have any account ?</Link>
        </div>
    </form>
  )
}

export default LoginPage
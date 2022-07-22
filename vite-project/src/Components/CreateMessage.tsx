import React, {useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { newMessageParams } from '../Types/message'
import { createMessage } from '../Services/message'

const CreateMessage = () => {
    let navigate = useNavigate()
    const [form, setForm] = useState<newMessageParams>({
        name: ''
    })

    const onSubmitHandler = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const res = await createMessage(form)
        setForm({...form, ['name']: ''})
        navigate('/messages', { replace: true })
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value}: {name: string, value: string} = event.target 
        setForm({...form, [name]: value})
      }

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="form-row">
                <label>Name</label>
                <input 
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChangeHandler}
                />
            </div>

            <div className="form-row">
                <button type='submit'>Send</button>
            </div>
        </form>
    )
}

export default CreateMessage
import React, { useState } from "react"

import { login } from "../../app/slice/User"
import { useAppDispatch } from "../../app/store"
import { useNavigate } from "react-router-dom"

const LoginHooks = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [logins,setLogins] = useState({
        email : '',
        password : ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value,name} = event.target
        setLogins({
            ...logins,
            [name] : value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            console.log("login",logins)
            const datas = await dispatch(login(logins))
            console.log(datas)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }









  return {handleChange,handleSubmit,logins}
}

export default LoginHooks

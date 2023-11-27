import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/store"
import { addList } from "../../app/slice/ListSlice"


const OnChange = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const IDProduct = Number(id)
    console.log("id", id)
    const navigate = useNavigate()
    const [lists, setLists] = useState({
        id: 0,
        name: '',
        option: '',
        aktifitasId: IDProduct
    })
    
    const [aktifitas, setAktifitas] = useState({
        id: 0,
        list: '',
        date_at: '',
        date_update: ''
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLists({
            ...lists, [name]: value
        });
        setAktifitas({
            ...aktifitas, [name]: value
        });
    
    }



    const handleOption = (value: string | null) => {
        setLists({
            ...lists,
            option: value || '', // Ensure that value is not null, use an empty string if it is
        });
    };


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(lists)
    try {
        const datas = await dispatch(addList(lists))
        console.log(datas)
        navigate(`/${id}`)
    } catch (error) {
        console.log(error)
    }
}

    return {
        handleChange, 
        handleOption, 
        lists,
        handleSubmit
    }
}

export default OnChange

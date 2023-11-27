import { Box, Button, Container, Flex, Input, Title } from "@mantine/core"
import { IoMdClose } from "react-icons/io";
import classesh from "./../../HeaderSimple.module.css"
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/store";
import { addAktifitas } from "../../app/slice/AktifitasSLice";



const AddAktivitas = () => {
    const dispatch = useAppDispatch()
    const user = JSON.parse(localStorage.getItem("user")!)
    const navigate = useNavigate()
    const [lists, setLists] = useState({
        id: 0,
        name: '',
        userId: user.id,
        list: [],
    })
    console.log("list", lists)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLists({
            ...lists, [name]: value
        })
    }

   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(lists)
        try {

            const datas = await dispatch(addAktifitas(lists))
            console.log(datas)
            navigate('/')
            //    dispatch(getList())
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Container size={"xs"} mt={20} >
                <form onSubmit={handleSubmit}>
                    <Flex className={classesh.aktifitas} mt={20}>
                        <Title order={3}>Tambah List Jadwal</Title>
                        <Button bg={'transparent'}><Link to={'/'}> <IoMdClose style={{ color: 'gray', fontSize: '20px' }} /></Link></Button>
                    </Flex>

                    <Container size={"xs"} mt={20}>
                        <Input.Wrapper label="Judul"  >
                            <Input placeholder="Tambahkan judul" name="name" type="text" onChange={handleChange} />
                        </Input.Wrapper>

                        <Box mt={20}>
                            <Button right={0} mt={-20} radius="xl" type="submit">Simpan</Button>
                        </Box>
                    </Container>
                </form>

            </Container>
        </>
    )
}

export default AddAktivitas

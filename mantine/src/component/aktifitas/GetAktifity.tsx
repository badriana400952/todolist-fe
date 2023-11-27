import { Box, Container, Flex, Title, Card, Text, Button, Skeleton, Image } from "@mantine/core"
import classesh from "./../../HeaderSimple.module.css"
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useEffect } from "react";
import { deleteAktifitas, getAktifitas } from "../../app/slice/AktifitasSLice";
import nodata from "../../assets/nodata.png"
const GetAktifity = () => {
    const dispatch = useAppDispatch()
    const { loading, aktifitas, error } = useAppSelector((state) => state.aktifitas)

    useEffect(() => {
        dispatch(getAktifitas())
    }, [dispatch])


    const ubahTangal = (tanggal: string) => {
        const date = new Date(tanggal)
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }

    const handleDelete = async (id: number) => {
        await dispatch(deleteAktifitas(id))
        await dispatch(getAktifitas())
    }

    return (
        <>
            <Container size={"lg"} mt={20} >
                <Flex className={classesh.aktifitas}>
                    <Title order={2} style={{ color: 'gray' }} >Actifitas</Title>
                    <Box>
                        <Link to={'/addaktifitas'}>
                            <Button variant="filled" radius="xl"><IoMdAdd />Button</Button>
                        </Link>
                    </Box>
                </Flex >
                <Flex justify={"space-evenly"} gap={3} wrap={"wrap"} >
                    {loading ? (
                        Array.from({ length: aktifitas.length }).map((_, index) => (
                            <Flex justify={"space-around"} gap={3} key={index}>
                                <Skeleton h={'234px'} w={'235px'} radius="sm" />
                            </Flex>

                        ))

                    ) : error ? (
                        <div>{error}</div>
                    ) : Array.isArray(aktifitas) && aktifitas.length > 0 ? (
                        aktifitas.map((item) => (
                            <Flex justify={"space-around"} gap={3} key={item.id}>
                                <Card
                                    display={"flex"}
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    mt={20}
                                    h={'234px'}
                                    w={'235px'}
                                >
                                    <Flex justify={"space-between"} gap={3} direction={"column"} h={'100%'}>
                                        <Link to={`/${item.id}`} style={{ textDecoration: 'none' }}>

                                            <Box>
                                                <Title className={classesh.font} order={5} size="18px" c="dimmed">
                                                    {item.name}
                                                </Title>
                                            </Box>
                                        </Link>

                                        <Flex align={"center"} justify={'space-evenly'} w={'100%'}>
                                            <Text size="sm" c="dimmed" className={classesh.font}>
                                                {item.created_at ? ubahTangal(item.created_at) : ''}
                                            </Text>
                                            <Button style={{ zIndex: 10 }} bg={'transparent'} onClick={() => handleDelete(item.id)}>
                                                <RiDeleteBin6Line style={{ color: 'gray' }} />
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Flex>
                        ))
                    ) : (
                        <Flex justify={"center"} mt={40}>
                            <Box>
                                <Image src={nodata} alt="No data" />
                            </Box>
                        </Flex>
                    )
                    }

                </Flex>
            </Container>
        </>
    )
}

export default GetAktifity

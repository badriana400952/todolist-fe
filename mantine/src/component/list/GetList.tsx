import {
    Box, Container, Flex, Title, Button, Card, Checkbox, Text, Skeleton, Image,
} from "@mantine/core"
import classesh from "./../../HeaderSimple.module.css"
import { IoMdAdd } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useEffect } from "react";
import { IList, aktifitasID, } from "../../app/slice/AktifitasSLice";
import { RiDeleteBin6Line } from "react-icons/ri";
import nodata from "../../assets/nodata.png"
import { IoIosArrowBack } from "react-icons/io";
import { deleteData } from "../../app/slice/ListSlice";
const GetList = () => {
    const dispatch = useAppDispatch();
    const { aktifitas, loading, error } = useAppSelector((state) => state.aktifitas);
    const { id } = useParams();
    const dataID = Number(id);

    useEffect(() => {
        dispatch(aktifitasID(dataID));
    }, [dispatch, dataID]);

    const handleDelete = async (id: number) => {
        try {
            const del = await dispatch(deleteData(id))
            console.log("delete", del)
            await dispatch(aktifitasID(dataID))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Container size={"lg"} mt={20}>
                <Flex className={classesh.aktifitas} >
                    <Title order={2}  ><Link to={'/'} style={{ textDecoration: 'none', color: 'gray' }}> <IoIosArrowBack style={{ paddingTop: "10px", paddingLeft: "10px" }} />  {aktifitas.name} </Link> </Title>
                    <Box>
                        <Link to={`/add/${id}`}>
                            <Button variant="filled" radius="xl"><IoMdAdd />Button</Button>
                        </Link>
                    </Box>
                </Flex> 
                {loading ? (
                    Array.from({ length: aktifitas.length }).map((_, index) => (
                        <Flex justify={"space-around"}  key={index}>
                            <Skeleton height={"80"} my={20} radius="sm" />
                        </Flex>
                    ))

                ) : error ? (
                    <div>{error}</div>
                ) :
                    Array.isArray(aktifitas.list) && aktifitas.list.length > 0 ? (
                        Array.isArray(aktifitas.list) && aktifitas.list.map((item: IList) => (
                            <Card shadow="sm" key={item.id} padding="lg" radius="md" withBorder mt={20}>
                                <Flex justify="space-between" align="center">
                                    <Flex justify={"start"} gap={30}>
                                        <Checkbox defaultChecked />
                                        <Text size="sm" c="dimmed">
                                            {item.name}
                                        </Text>
                                        <Button bg={'transparent'} ><GoPencil style={{ color: 'gray' }} /></Button>
                                    </Flex>
                                    <Button bg={'transparent'} onClick={() => handleDelete(item.id)}>
                                    <RiDeleteBin6Line style={{ color: 'gray' }} />
                                    </Button>
                                </Flex>
                            </Card>
                        ))
                    ) : (
                        <Flex justify={"center"} mt={40}>
                            <Box>
                                <Image src={nodata} alt="gada data" />
                            </Box>
                        </Flex>
                    )
                }
            </Container>
        </>
    )
}

export default GetList

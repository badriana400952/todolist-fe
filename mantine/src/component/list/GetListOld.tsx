// import { Box, Container, Flex, Title, Card, Text, Button, Checkbox } from "@mantine/core"
// import classesh from "./../../HeaderSimple.module.css"
// import { IoMdAdd } from "react-icons/io";
// import { Link } from "react-router-dom";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { GoPencil } from "react-icons/go";
// import { useAppDispatch, useAppSelector } from "../../app/store";
// import { useEffect } from "react";
// import { deleteData, getList } from "../../app/slice/ListSlice";
// const GetListOld = () => {
//     const { list } = useAppSelector((state) => state.list)
//     const dispatch = useAppDispatch()
//     console.log(list)

//     const hanDelete = async (id: number) => {
//         try {
//             await dispatch(deleteData(id))
//             dispatch(getList())
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
//         dispatch(getList())
//     }, [dispatch])
//     return (
//         <>
//             <Container size={"lg"} mt={20}>
//                 <Flex className={classesh.aktifitas}>
//                     <Title order={2}>Daftar Belanja Bulanan</Title>
//                     <Box>
//                         <Link to={'/add'}>
//                             <Button variant="filled" radius="xl"><IoMdAdd />Button</Button>
//                         </Link>
//                     </Box>
//                 </Flex>
//                 {
//                     Array.isArray(list) && list.map((item) => (
//                         <Card shadow="sm" key={item.id} padding="lg" radius="md" withBorder mt={20}>
//                             <Flex justify="space-between" align="center">
//                                 <Flex justify={"start"} gap={30}>
//                                     <Checkbox defaultChecked />
//                                     <Text size="sm" c="dimmed">
//                                         {item.list}
//                                     </Text>
//                                     <Button bg={'transparent'} ><GoPencil style={{ color: 'gray' }} /></Button>
//                                 </Flex>
//                                 <Button bg={'transparent'} onClick={() => hanDelete(item.id)}>
//                                     <RiDeleteBin6Line style={{ color: 'gray' }} />
//                                 </Button>
//                             </Flex>
//                         </Card>
//                     ))

//                 }
//             </Container>
//         </>
//     )
// }

// export default GetListOld

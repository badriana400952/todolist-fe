import { Button, Container, Flex, Input, Select, Title } from "@mantine/core"
import { IoMdClose } from "react-icons/io";
import classesh from "./../../HeaderSimple.module.css"
import { Link } from "react-router-dom";
import OnChange from "../customHooks/OnChange";
const item = [
    { value: 'veryhigh', label: 'Very High', },
    { value: 'heigh', label: 'High', },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'verylow', label: 'Very Low' },
];


const AddList = () => {

    const {
        handleChange,
        handleOption,
        handleSubmit } = OnChange()

    return (
        <>
            <Container size={"xs"} mt={20} >
                <form onSubmit={handleSubmit}>
                    <Flex className={classesh.aktifitas} mt={20}>
                        <Title order={3}>Tambah List Item</Title>
                        <Button bg={'transparent'}><Link to={'/get'}> <IoMdClose style={{ color: 'gray', fontSize: '20px' }} /></Link></Button>
                    </Flex>

                    <Container size={"xs"} mt={20}>
                        <Input.Wrapper label="NAMA LIST ITEM"  >
                            <Input placeholder="Tambahkan nama list item" name="name" type="text" onChange={handleChange} />
                        </Input.Wrapper>
                        <Select
                            mt={20}
                            checkIconPosition="right"
                            data={item}
                            pb={150}
                            defaultValue="React"
                            clearable
                            label="PRIORITY"
                            type="text"
                            placeholder="Pilih Priority"
                            onChange={handleOption}
                            name="option"
                        />
                        <Flex justify="flex-end">
                            <Button right={0} mt={-20} radius="xl" type="submit">Simpan</Button>
                        </Flex>
                    </Container>
                </form>

            </Container>
        </>
    )
}

export default AddList

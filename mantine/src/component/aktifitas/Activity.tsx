import { Box, Button, Flex, Title } from "@mantine/core"
import classesh from "./../../HeaderSimple.module.css"
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";


const Activity = () => {
    return (
        <>
            <Flex className={classesh.aktifitas}>
                <Title order={2}>Activity</Title>
                <Box>
                    <Link to={'/add'}>
                        <Button variant="filled" radius="xl"><IoMdAdd />Button</Button>
                    </Link>
                </Box>
            </Flex>
        </>
    )
}

export default Activity

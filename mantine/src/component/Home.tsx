import { Container } from "@mantine/core"
import GetAktifity from "./aktifitas/GetAktifity";

const Home = () => {
    const demoProps = {
        h: 100,
        mt: 'md',

    };
    return (
        <>
            <Container {...demoProps} fluid>
                <GetAktifity />
            </Container>
        </>
    )
}

export default Home

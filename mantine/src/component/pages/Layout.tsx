import cx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Container,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,

  IconTrash,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderTabs.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { logoute } from '../../app/slice/User';
// const user = {
//   name: 'Jane Spoonfighter',
//   email: 'janspoon@fighter.dev',
//   image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
// };



export default function Layout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const user = localStorage.getItem("user")
  const token = localStorage.getItem("token")
  const dataUser = JSON.parse(user!) 
  const handleLogoute = () => {
    dispatch(logoute())
  }
  useEffect(() => {
    if(token === null && token === token){
      return navigate("/login") 
    }

  }, [token,navigate])

  return (
    <>
      <Box className={classes.header} bg={'blue'} >
        <Container className={classes.mainSection}  fluid>
          <Group justify="space-between">
            {/* <MantineLogo size={28} /> */}
            <Text color='white'  fw={700} size='30px'>To do list</Text>
            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group gap={7}>
                    <Text fw={500} size="sm" lh={1} mr={3} color='white'>
                      {dataUser ? dataUser.name : ""}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12), color: 'white' }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                  onClick={handleLogoute}
                >
                  Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                >
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        <Container size="md">
          {/* tabs tadinya */}
        </Container>
      </Box>
        <Outlet />
    </>
  );
}
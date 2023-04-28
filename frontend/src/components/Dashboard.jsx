import { ActionIcon, Box, Button, Center, Flex, Footer, Header, Modal, PasswordInput, Table, Text, TextInput, Image } from "@mantine/core"
import { IconEdit, IconLogout, IconSquareRoundedMinus } from '@tabler/icons-react'
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useDisclosure } from '@mantine/hooks'
import userHooks from '../hooks/userHooks'

const Dashboard = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [userData,setUserData] = useState({})
    const usernameForAction = useRef([])
    const passwordForAction = useRef([])
    const [opened, { open, close }] = useDisclosure(false);
    const [modalUsername,setModalUsername] = useState('')
    const modalPassword = useRef('')

    const handleOnClickDelete = async index => {
        userHooks.deleteUser(
            location.state.token,
            {username:usernameForAction.current[index].innerHTML}
        )
        .then(window.location.reload())
    }

    const handleOnClickModal = async index => {
        open()
        setModalUsername(usernameForAction.current[index].innerHTML)
    }
    
    const handleOnClickUpdate = async () => {
        userHooks.updateUser(
            location.state.token,
            { username: modalUsername, password: modalPassword.current.value }
        )
        .then(window.location.reload())
    }

    useEffect(() => {
        document.title = 'Dashboard | MERN'

        if(!location.state?.isLoggedIn) navigate('/', { replace: true })

        userHooks.getUserData(location.state.token).then(data => setUserData(data))
    },[])

    return (
        <Flex
            direction={'column'}
            sx={{
                minHeight: window.innerHeight
            }}
        >
            <Header p={'xs'} withBorder={false} zIndex={-1}>
                <Flex direction={'row'} align={'center'} justify={'space-between'}>
                    <Flex direction={'row'} gap={'sm'}>
                        <Image width={40} src={'/mernStackIcon.png'} />
                        <Text fw={'bold'} fz={'xl'}>Dashboard</Text>
                    </Flex>
                    <Button variant="white" leftIcon={<IconLogout />} onClick={() => navigate('/', {
                        state: {
                            isLoggedIn: false
                        },
                        replace: true
                    })}>Logout</Button>
                </Flex>
            </Header>
            {
                location.state?.auth ?
                <Box className="expand" sx={{ flex: 1 }} my={'xl'}>
                {/* <Box my={Math.floor(window.innerHeight-window.innerHeight*.75)/2} className="expand"> */}
                    <Modal
                        opened={opened} 
                        onClose={close}
                        title={`${modalUsername} | Update`}
                        radius={24}
                        centered
                    >
                        <Flex
                            justify={'center'}
                            direction={'column'}
                            gap={'xl'}
                        >
                            <TextInput label={'Username'} value={modalUsername} disabled radius={24} />
                            <PasswordInput label={'Password'} ref={modalPassword} radius={24} />
                            <Button onClick={handleOnClickUpdate} radius={24}>Update</Button>
                        </Flex>
                    </Modal>

                    <Center>
                        <Flex justify={'center'} direction={'column'}>
                            <Table
                                verticalSpacing={'xl'}
                                horizontalSpacing={'xl'}
                                striped
                                sx={{
                                    borderRadius: '24px',
                                    boxShadow: '0 0 25px rgba(220,220,220,0.8)'
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Email</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    userData.users?.map((user,key) => <tr key={key}>
                                        <td ref={item => usernameForAction.current[key] = item}>{user.username}</td>
                                        <td ref={item => passwordForAction.current[key] = item}>{user.password}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <ActionIcon>
                                                <IconEdit onClick={() => handleOnClickModal(key)} color="black" />
                                            </ActionIcon>
                                        </td>
                                        <td>
                                            <ActionIcon onClick={() => handleOnClickDelete(key)}>
                                                <IconSquareRoundedMinus color="red" />
                                            </ActionIcon>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                            </Table>
                        </Flex>
                    </Center>
                </Box>
                : navigate('/')
            }
            <Footer p={'xl'} sx={{ marginTop: 'auto' }} withBorder={false} zIndex={-1}>
                <Flex direction={'row'} align={'center'} justify={'space-between'}>
                    <Text fw={'bold'} fz={'xl'}>MERN</Text>
                    <Text fz={'sm'}>@gochuicod</Text>
                </Flex>
            </Footer>
        </Flex>
    )
}

export default Dashboard
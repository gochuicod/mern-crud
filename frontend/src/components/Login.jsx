import { Anchor, Box, Button, Center, Flex, PasswordInput, Text, TextInput } from '@mantine/core'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import userHooks from "../hooks/userHooks"
import { useForm } from '@mantine/form'
import '../css/Custom.css'

const Login = () => {
    const [formData, setFormData] = useState({})
    const [buttonClicked, setButtonClicked] = useState(false)
    const [keyDown, setKeyDown] = useState(false)
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    })

    const handleButtonClick = () => setButtonClicked(true)
    const handleKeyDown = () => setKeyDown(true)

    useEffect(() => {
        document.title = 'Login | MERN'

        if(!location.state?.isLoggedIn) navigate('/', {
            state: {
                isLoggedIn: false
            },
            replace: true
        })

        const authenticateUser = async () => {
            await userHooks.authenticateUser(formData)
            .then(data => {
                data.authorized ? navigate('/dashboard', {
                    state: {
                        auth: data.authorized,
                        username: formData.username,
                        token: data.token,
                        isLoggedIn: true
                    },
                    replace: true
                }) : setTimeout(() => setButtonClicked(false), 3000)
            })
        }

        (buttonClicked || keyDown) && authenticateUser()
    },[formData,buttonClicked])

    return (
        <Box className="zoom-in">
            <Center mt={Math.floor(window.innerHeight-window.innerHeight*.50)/2}>
                <form onSubmit={form.onSubmit(values => setFormData(values))}>
                    <Flex
                        direction={'column'}
                        gap={'xl'}
                        sx={{
                            padding: '5vh',
                            borderRadius: '24px',
                            boxShadow: '0 0 25px rgba(220,220,220,0.8)'
                        }}
                    >
                        <Text
                            align={'center'}
                            fz={'xl'}
                            fw={'bold'}
                        >
                            Login
                        </Text>
                        <TextInput
                            label='Username'
                            placeholder="Enter your username"
                            radius={'lg'}
                            {...form.getInputProps('username')}
                        />
                        <PasswordInput
                            label='Password'
                            placeholder="Enter your password"
                            radius={'lg'}
                            {...form.getInputProps('password')}
                        />
                        <Button 
                            radius={'lg'}
                            onClick={handleButtonClick}
                            onKeyDown={handleKeyDown}
                            type="submit"
                            loading={buttonClicked || keyDown}
                        >
                            Login
                        </Button>
                        <Button 
                            radius={'lg'}
                            onClick={() => navigate('/registration')}
                            type="button"
                        >
                            Create an Account
                        </Button>
                        <Anchor
                            align={'center'}
                            fz={'xs'}
                        >
                            Forgot password?
                        </Anchor>
                    </Flex>
                </form>
            </Center>
        </Box>
    )
}

export default Login;
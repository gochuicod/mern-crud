import { Box, Center, Flex, TextInput, PasswordInput, Button, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import userHooks from "../hooks/userHooks"
import { useForm } from "@mantine/form"

const Registration = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [buttonClicked, setButtonClicked] = useState(false)
    const [keyDown, setKeyDown] = useState(false)

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            confirm: '',
            email:''
        }
    })

    const handleButtonClick = () => setButtonClicked(true)
    const handleKeyDown = () => setKeyDown(true)

    useEffect(() => {
        document.title = 'Registration | MERN';
        (formData.password && formData.confirm) && userHooks.createNewUser({
            username: formData.username,
            password: formData.password,
            email: formData.email,
        })
        .then(setTimeout(() => navigate('/'),3000))
    })

    return (
        <Box className="zoom-in">
            <Center mt={Math.floor(window.innerHeight-window.innerHeight*.60)/2}>
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
                            Account Registration
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
                        <PasswordInput
                            label='Confirm Password'
                            placeholder="Confirm your password"
                            radius={'lg'}
                            {...form.getInputProps('confirm')}
                        />
                        <TextInput
                            label='E-mail'
                            placeholder="Enter your e-mail"
                            radius={'lg'}
                            {...form.getInputProps('email')}
                        />
                        <Button
                            radius={'lg'}
                            onClick={handleButtonClick}
                            onKeyDown={handleKeyDown}
                            type="submit"
                            loading={buttonClicked || keyDown}
                        >
                            Register
                        </Button>
                        <Button 
                            radius={'lg'}
                            type="button"
                            onClick={() => navigate('/')}
                        >
                            Back to Login
                        </Button>
                    </Flex>
                </form>
            </Center>
        </Box>
    )
}

export default Registration
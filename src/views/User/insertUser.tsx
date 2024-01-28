import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Snackbars from '../../components/SnackBar'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useMedia } from '../../hooks/mediaQueryHook'

export default function InsertUser() {
    const isMobile = useMedia('(max-width: 850px)')
    const [email, setEmail] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [dn, setDn] = useState('')
    const [role, setRole] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState<string>('')
    const [check, setCheck] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value)
    }

    const insertUser = () => {
        if (check) {
            axios
                .post(`${import.meta.env.VITE_API_URI}/users`, {
                    email: email,
                    cpf: cpf,
                    name: name,
                    dn: dn,
                    role: role,
                    telephone: phone,
                    password: pass,
                })
                .then((res) => {
                    setMessage(res.data)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        window.location.reload()
                    }, 2000)
                })
        }
    }

    useEffect(() => {
        if (email && cpf && name && dn && role && phone && pass) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }, [email, cpf, name, dn, role, phone, pass])

    return (
        <>
            <Grid
                item
                display={'flex'}
                gap="20px"
                flexDirection={isMobile ? 'column' : 'row'}
                paddingTop={'20px'}
                style={{ width: '100%' }}
            >
                <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value)
                    }}
                />
                <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    label="CPF"
                    value={cpf}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCpf(event.target.value)
                    }}
                />
                <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    label="Nome"
                    variant="outlined"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value)
                    }}
                />
                <TextField
                    required
                    fullWidth
                    id="outlined-basic"
                    label="Data de nascimento"
                    variant="outlined"
                    value={dn}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDn(event.target.value)
                    }}
                />
            </Grid>

            <Grid
                item
                display={'flex'}
                flexDirection={isMobile ? 'column' : 'row'}
                gap={'20px'}
                style={{ width: '100%' }}
            >
                <Box sx={{ minWidth: '200px', width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Permissão</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Permissão"
                            onChange={handleChange}
                        >
                            <MenuItem value={1} key={2}>
                                Administrador
                            </MenuItem>
                            <MenuItem value={2} key={1}>
                                Funcionario
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    required
                    fullWidth
                    id="outlined-basic"
                    label="Telefone"
                    variant="outlined"
                    value={phone}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPhone(event.target.value)
                    }}
                />
                <FormControl fullWidth sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPass(event.target.value)
                        }}
                        label="Password"
                    />
                </FormControl>
            </Grid>

            <Snackbars
                message={message}
                type={message !== 'Usuário criado com sucesso!' ? 'error' : 'success'}
                open={open}
            />
            <Button
                variant="contained"
                sx={{
                    width: isMobile ? '100%' : '200px',
                    backgroundColor: '#2b98c4',
                    color: '#FFFF',
                }}
                disabled={check ? false : true}
                onClick={insertUser}
            >
                Adicionar usuário
            </Button>
        </>
    )
}

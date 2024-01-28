import * as React from 'react'
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import { User } from '../../model/User'
import { formatarData } from '../../utils/formatterData'
import Snackbars from '../../components/SnackBar'
import { useMedia } from '../../hooks/mediaQueryHook'

export default function DeleteUser() {
    const isMobile = useMedia('(max-width: 850px)')
    const [listUser, setListUser] = React.useState<User[]>()
    const [search, setSearch] = React.useState<number | string>('')
    const [user, setUser] = React.useState<User>()
    const [newNameUser, setNewNameUser] = React.useState<string | undefined>()
    const [newEmailUser, setNewEmailUser] = React.useState<string | undefined>()
    const [newCPFLUser, setNewCPFUser] = React.useState<string | undefined>()
    const [newDNUser, setNewDNUser] = React.useState<string | undefined>()
    const [newRoleUser, setNewRoleUser] = React.useState<string | undefined>()
    const [newPhoneUser, setNewPhoneUser] = React.useState<string | undefined>()
    const [newCreatedAtUser, setNewCreatedAtUser] = React.useState<string | undefined>()
    const [message, setMessage] = React.useState<string>('')
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        setUser(undefined)
    }, [search])

    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URI}/users/`).then((res) => {
            setListUser(res.data)
        })
    }, [open])

    const searchUser = () => {
        axios
            .get(`${import.meta.env.VITE_API_URI}/users/${search}`)
            .then((res) => setDataUser(res.data[0]))
            .catch((err) => console.log(err))
    }

    const deleteUser = () => {
        axios
            .delete(`${import.meta.env.VITE_API_URI}/users/${search}`)
            .then((res) => {
                setMessage(res.data)
                setOpen(true)
                setTimeout(() => {
                    setUser(undefined)
                    setOpen(false)
                    searchUser()
                }, 2000)
            })
            .catch((err) => console.log(err))
    }

    const setDataUser = (user: User) => {
        setUser(user)
        setNewNameUser(user.name)
        setNewEmailUser(user.email)
        setNewCPFUser(user.cpf)
        setNewDNUser(user.dn)
        setNewRoleUser(user.role === 1 ? 'Administrador' : 'Funcionario')
        setNewPhoneUser(user.telephone)
        setNewCreatedAtUser(formatarData(user.createdAt))
    }

    const handleChange = (event: SelectChangeEvent) => {
        setSearch(event.target.value)
    }

    return (
        <Grid
            container={true}
            display={'flex'}
            direction={'column'}
            alignItems={'start'}
            justifyContent={'start'}
            xs={12}
            lg={12}
            xl={12}
            gap={2}
        >
            <Grid
                item
                display={'flex'}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'start'}
                xs={12}
                lg={12}
                xl={3}
                gap={1}
                style={{ width: isMobile ? '100%' : '300px' }}
            >
                <Box
                    sx={{
                        minWidth: '200px',
                        width: isMobile ? '100%' : '300px',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '10px',
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Selecione o usuario</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newNameUser}
                            label="Selecione o produto"
                            onChange={handleChange}
                        >
                            {listUser?.map((user: User) => (
                                <MenuItem value={user.cpf}>{`${user.name} - ${user.cpf}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{
                            height: '55px',
                            backgroundColor: '#5e6464',
                            color: '#FFFF',
                        }}
                        onClick={searchUser}
                    >
                        <SearchIcon />
                    </Button>
                </Box>
            </Grid>
            {user && (
                <Grid
                    item
                    display={'flex'}
                    direction={'column'}
                    alignItems={'start'}
                    justifyContent={'center'}
                    xs={12}
                    lg={12}
                    xl={12}
                    gap={2}
                    pt={5}
                    width={'100%'}
                >
                    <Grid
                        item
                        display={'flex'}
                        direction={isMobile ? 'column' : 'row'}
                        alignItems={'center'}
                        justifyContent={'start'}
                        gap={2}
                        width={'100%'}
                    >
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Nome do usuario"
                            variant="outlined"
                            value={newNameUser}
                        />
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Email do usuario"
                            variant="outlined"
                            value={newEmailUser}
                        />
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="CPF"
                            variant="outlined"
                            value={newCPFLUser}
                        />
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Data de nascimento"
                            variant="outlined"
                            value={newDNUser}
                        />
                    </Grid>
                    <Grid
                        item
                        display={'flex'}
                        direction={isMobile ? 'column' : 'row'}
                        alignItems={'center'}
                        justifyContent={'start'}
                        xs={12}
                        lg={12}
                        xl={12}
                        gap={2}
                        width={'100%'}
                    >
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Telefone"
                            variant="outlined"
                            value={newPhoneUser}
                        />
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Data de criação"
                            variant="outlined"
                            value={newCreatedAtUser}
                        />
                        <TextField
                            fullWidth
                            disabled
                            id="outlined-basic"
                            label="Permissão"
                            variant="outlined"
                            value={newRoleUser}
                        />
                    </Grid>
                    <Snackbars
                        message={message}
                        type={message !== 'Usuário deletado com sucesso!' ? 'error' : 'success'}
                        open={open}
                    />
                    <Grid item display={'flex'} justifyContent={isMobile ? 'center' : 'end'} width={'100%'}>
                        <Button
                            variant="contained"
                            onClick={deleteUser}
                            sx={{
                                width: isMobile ? '100%' : '200px',
                                backgroundColor: '#5e6464',
                                color: '#FFFF',
                            }}
                        >
                            Deletar usuario
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}

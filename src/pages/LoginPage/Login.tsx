/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo.png'
import LogoMobile from '../../assets/LogoWhite.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import imgBackground from '../../assets/Product.png'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorIcon from '@mui/icons-material/Error'
import './style.css'
import { useMedia } from '../../hooks/mediaQueryHook'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/localStorageHook'
import Loading from '../../components/Loading'

export const Login: React.FC = () => {
    const navigate = useNavigate()
    const isMobile = useMedia('(max-width: 1050px)')
    const [finish, setFinish] = useState(true)
    const [success, setSuccess] = useState<string>('')
    const [, setToken] = useLocalStorage('token', '')
    const [, setUser] = useLocalStorage('user', '')
    const [, setRole] = useLocalStorage('role', '')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        setRole('')
        setUser('')
        setToken('')
    }, [])

    const LoginFunction = (event: any) => {
        event.preventDefault()
        setFinish(false)
        axios
            .post(`${import.meta.env.VITE_API_URI}/login`, {
                email: username,
                password: password,
            })
            .then((response: any) => {
                if (response.status === 200) {
                    setUser(response.data.cpf)
                    setToken(response.data.token)
                    setRole(response.data.role)
                    setSuccess('Login efetuado com sucesso')
                    if (response.data.role === 1) {
                        navigate('/Inventory')
                    } else {
                        navigate('/Sold')
                    }
                } else {
                    setSuccess('Usuário ou senha incorretos')
                }
            })
            .catch(() => {
                setSuccess('Usuário ou senha incorretos')
            })
            .finally(() => {
                setFinish(true)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setSuccess('')
        }, 2000)
    }, [success])

    return (
        <>
            {!finish && <Loading />}
            <div className={isMobile ? 'containerLoginMobile' : 'containerLogin'}>
                <form className={isMobile ? 'formStyleMobile' : 'formStyle'}>
                    <img src={isMobile ? LogoMobile : Logo} style={{ marginBottom: '80px' }} />
                    <div className={isMobile ? 'usernameStyleMobile' : 'usernameStyle'}>
                        <input
                            required
                            className="inputStyle"
                            placeholder="Digite seu usuário"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="username">
                            <AccountCircleIcon sx={{ fontSize: '30px' }} />
                        </label>
                    </div>
                    <div className={isMobile ? 'passwordStyleMobile' : 'passwordStyle'}>
                        <input
                            required
                            className="inputStyle"
                            placeholder="Digite sua senha"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">
                            {showPassword ? (
                                <VisibilityIcon sx={{ fontSize: '30px', cursor: 'pointer' }} onClick={toggleShowPassword} />
                            ) : (
                                <VisibilityOffIcon sx={{ fontSize: '30px', cursor: 'pointer' }} onClick={toggleShowPassword} />
                            )}
                        </label>
                    </div>
                    <button onClick={LoginFunction} type="submit" className={isMobile ? 'buttonStyleMobile' : 'buttonStyle'}>
                        Entrar
                    </button>
                    {success !== '' && (
                        <span
                            className={success === 'Usuário ou senha incorretos' ? 'successRed' : 'successGreen'}
                            style={{ width: isMobile ? '300px' : '350px' }}
                        >
                            {success === 'Usuário ou senha incorretos' ? <ErrorIcon /> : <CheckCircleOutlineIcon />}
                            {success}
                        </span>
                    )}
                </form>
                {!isMobile && (
                    <div className="imgBackground">
                        <img src={imgBackground} className="img" />
                    </div>
                )}
            </div>
        </>
    )
}

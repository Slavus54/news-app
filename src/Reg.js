import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import {useRecoilState, useRecoilValue, atom} from 'recoil'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Reg = ({st, set}) => {
    let schema = gql`
        {
            getUsers {
                name
                email
                password
            }
        }
    `
    const {data} = useQuery(schema)
    const namen = atom({
        default: null,
        key: 'namen'
    })
    const emailen = atom({
        default: null,
        key: 'emailen'
    })
    const passen = atom({
        default: null,
        key: 'passen'
    })
    const [name, setName] = useRecoilState(namen)
    const valen = useRecoilValue(namen);
    const [email, setEmail] = useRecoilState(emailen)
    const [pass, setPass] = useRecoilState(passen)
    const onReg = async () => {
        localStorage.setItem('name', name)
        set(true)
        await axios.post('/api', {name: name, email: email, password: pass})
    }
    const onGetUsers = () => {
        console.log(data)
    }
    return (
        <div class="main-reg">
            <div class="reg"> 
            <TextField style={{width: '400px'}} onInput={(e) => setName(e.target.value)} value={name} type="text" placeholder="name" />
            <TextField style={{width: '400px'}} onInput={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="email" />
            <TextField style={{width: '400px'}} onInput={(e) => setPass(e.target.value)} value={pass} type="text" placeholder="password" />
            <Button onClick={onReg} style={{width: '400px'}} variant="contained" color="primary">SignUp</Button>
            <Button onClick={onGetUsers} variant="contained" color="primary">GetUsers</Button>
            </div>
        </div>
    )
}

export default Reg;
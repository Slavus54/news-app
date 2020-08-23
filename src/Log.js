import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useRecoilState, atom} from 'recoil'

const Log = () => {
    const emailen = atom({
        default: null,
        key: 'emailen'
    })
    const passen = atom({
        default: null,
        key: 'passen'
    })
    const [email, setEmail] = useRecoilState(emailen)
    const [pass, setPass] = useRecoilState(passen)

    const onLog = () => {
        console.log(email, pass)
    }
    return (
        <div class="log">
            <div class="form">
            <TextField style={{width: '400px'}} onInput={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="email" />
            <TextField style={{width: '400px'}} onInput={(e) => setPass(e.target.value)} value={pass} type="text" placeholder="password" />
            <Button onClick={onLog} style={{width: '400px'}} variant="contained" color="primary">SignIn</Button>
            </div>
        </div>
    )
}

export default Log;
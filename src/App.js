import React, {useState, useEffect, Suspense} from 'react'
import axios from 'axios'
import {Router, Link} from 'preact-router'
import News from './News'
import Break from './Break'
import Reg from './Reg'
import Log from './Log'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Main = () => {
    const [dost, setDost] = useState(false)
    return (
        <div>
            <AppBar position="static">
                <Toolbar className="nav">
                    <Link class="link" href="/">News</Link>
                    <Link class="link" href="/news">Breaking</Link>
                    <div class="sign">
                    {dost === true ? <Link class="link" href="/log">SignIn</Link> : null}
                    <Link class="link" href="/reg">SignUp</Link>
                    </div>
                </Toolbar>
            </AppBar>
            
            <Router>
		        <News path="/" />
		        <Break path="/news" />
                <Log path="/log" />
                <Reg st={dost} set={setDost} path="/reg" />
	        </Router>
        </div>
    )
}

export default Main;
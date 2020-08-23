import React, {useEffect, Suspense, lazy} from 'react'
const Find = lazy(() => import('./Find'));
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import {useRecoilState, atom} from 'recoil'
import {Input, Textarea, CircularProgress} from "@chakra-ui/core";

const News = () => {
    const valu = atom({
        default: null,
        key: 'valu'
    })
    const finden = atom({
        default: null,
        key: 'finden'
    })
    const date = atom({
        default: null,
        key: 'date'
    })
    const [value, setValue] = useRecoilState(valu)
    const [find, setFind] = useRecoilState(finden)
    const [data, setData] = useRecoilState(date)

    useEffect(async () => {
        const dat = await axios.get('http://newsapi.org/v2/everything?q=apple&from=2020-08-19&to=2020-08-19&sortBy=popularity&apiKey=cfd7bd83f05f499c948b8d40e3aedf01') 
        setValue(dat.data.articles)
    }, [])

    const onFind = async () => {
        let filtered = value.filter(el => el.title.indexOf(data) !== -1)
        setFind(filtered)
        const dat = await axios.get('/api') 
        console.log(filtered)
        return filtered
    }

    const sub = (text) => {
        return text.substr(0, 50) + '...'
    }

    const suber = (text) => {
        return text.substr(0, 80) + '...'
    }
    return (
        <>
        {value !== null && find === null ? 
        <div>
            <div class="find"> 
            <TextField value={data} onInput={(e) => setData(e.target.value)} style={{width: '200px'}} type="text" placeholder="find a news"/>
            <Button variant="contained" color="primary" onClick={onFind}>FIND</Button>
            </div>
            <Suspense fallback={<h2>Loading...</h2>}>
            <Find sub={sub} suber={suber} state={value} />
            </Suspense>
        </div>
        : null}
        {find !== null ? 
        <div>
            <div class="find"> 
            <TextField value={data} onInput={(e) => setData(e.target.value)} style={{width: '200px'}} type="text" placeholder="find a news"/>
            <Button variant="contained" color="primary" onClick={onFind}>FIND</Button>
            </div>
            <Suspense fallback={<h2>Loading...</h2>}>
            <Find sub={sub} suber={suber} state={find} />
            </Suspense>
        </div>
        : null}
        </>
    )
}

export default News;
import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import {useRecoilState, atom} from 'recoil'

const Break = () => {
    const valu = atom({
        default: null,
        key: 'valu'
    })
    const [value, setValue] = useRecoilState(valu)
    useEffect(async () => {
        const date = await axios.get('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cfd7bd83f05f499c948b8d40e3aedf01') 
        setValue(date.data.articles)
    }, [])
    console.log(value)
    const sub = (text) => {
        return text.substr(0, 68) + '...'
    }
    const suber = (text) => {
        return text.substr(0, 80) + '...'
    }
    return (
        <>
        {value !== null ? 
        <div class="break">
            <p>sss</p>
            <Rating defaultValue={3}></Rating>
            {value.map(el => <Card style={{width: '400px', height: '400px', marginTop: '5%', marginLeft: '5%'}} key={el.url}>
                <CardContent>
                
                <Typography variant="h4" >
                {sub(el.title)}<br />
                </Typography>
                <Typography variant="h5" >
                {el.description ? suber(el.description) : 'Ops'}<br />
                </Typography>
                {el.content}
                <Typography variant="h6">
                {el.author}<br/>
                </Typography>
                </CardContent> 
                
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
                </Card>)}
        </div>
        : null}
        </>
    )
}

export default Break;
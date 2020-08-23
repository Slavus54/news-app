import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Find = ({state, sub, suber}) => {
    return (
        <div>
            <div class="news">
            {state.map(el => <Card style={{width: '400px', height: '400px', marginTop: '5%', marginLeft: '5%'}} key={el.author}>
                <CardContent>
                <Typography variant="h4" >
                {sub(el.title)}<br />
                </Typography>
                <Typography variant="h5" >
                {suber(el.description)}<br />
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
        </div>
    )
}

export default Find;
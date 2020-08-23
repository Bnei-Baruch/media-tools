import React, { Component, Fragment } from 'react';
import {Segment, Button, Input} from 'semantic-ui-react'

export default class TrimmerControls extends Component {

    state = {
        jtime: "",
    };

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPressed);
    };


    setValue = (value) => {
        this.setState({jtime: value})
    };

    onKeyPressed = (e) => {
        const {jtime} = this.state;
        if(e.code === "Enter" && jtime) {
            let a = jtime.split(".");
            let seconds = (+a[0]) * 60 + (+a[1]);
            this.props.player.setCurrentTime(seconds);
            this.setState({jtime: ""})
        }
    };

    render() {
        const {jtime} = this.state;
        const player = this.props.player;

        return (
            <Fragment>
                <Segment raised textAlign='center'>
                    <Input className='tjump' size='tiny' type="number" placeholder='Time Jump' value={jtime} onChange={(e) => this.setValue(e.target.value)}/>
                </Segment>
                <Segment raised textAlign='center'>
                    Speed<br />
                    <Button.Group size='mini' className="speed_control">
                        <Button className="btn_speed" onClick={() => player.node.playbackRate -= .25} />
                        <Button.Or text='<' />
                        <Button onClick={() => player.node.playbackRate = 1} >1</Button>
                        <Button.Or text='>'/>
                        <Button className="btn_speed" onClick={() => player.node.playbackRate += .25} />
                    </Button.Group><br />
                </Segment>
                <Segment raised textAlign='center' className="time_control">
                    Time<br />
                    <Button.Group size='mini' >
                        <Button onClick={() => player.node.currentTime -= 300}>-</Button>
                        <Button.Or text='5m' />
                        <Button onClick={() => player.node.currentTime += 300}>+</Button>
                    </Button.Group><br />
                    <Button.Group size='mini'>
                        <Button onClick={() => player.node.currentTime -= 120}>-</Button>
                        <Button.Or text='2m' />
                        <Button onClick={() => player.node.currentTime += 120}>+</Button>
                    </Button.Group>
                    <Button.Group size='mini'>
                        <Button onClick={() => player.node.currentTime -= 60}>-</Button>
                        <Button.Or text='1m' />
                        <Button onClick={() => player.node.currentTime += 60}>+</Button>
                    </Button.Group>
                    <Button.Group size='mini'>
                        <Button onClick={() => player.node.currentTime -= 10}>-</Button>
                        <Button.Or text='10s' />
                        <Button onClick={() => player.node.currentTime += 10}>+</Button>
                    </Button.Group>
                    <Button.Group size='mini'>
                        <Button onClick={() => player.node.currentTime -= 1}>-</Button>
                        <Button.Or text='1s' />
                        <Button onClick={() => player.node.currentTime += 1}>+</Button>
                    </Button.Group>
                </Segment>
                <Segment raised textAlign='center' className="frame_control">
                    Frames<br />
                    <Button.Group size='mini' >
                        <Button onClick={() => player.node.currentTime -= 1/25.0}>-</Button>
                        <Button.Or text='1' />
                        <Button onClick={() => player.node.currentTime += 1/25.0}>+</Button>
                    </Button.Group><br />
                    <Button.Group size='mini'>
                        <Button onClick={() => player.node.currentTime -= 5/25.0}>-</Button>
                        <Button.Or text='5' />
                        <Button onClick={() => player.node.currentTime += 5/25.0}>+</Button>
                    </Button.Group>
                    <Button.Group size='mini'>
                        <Button onClick={() => player.node.currentTime -= 12/25.0}>-</Button>
                        <Button.Or text='12' />
                        <Button onClick={() => player.node.currentTime += 12/25.0}>+</Button>
                    </Button.Group>
                </Segment>
            </Fragment>
        );
    }
}
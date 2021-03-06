import React, { Component } from 'react';
import { Segment, Table, Button, Checkbox } from 'semantic-ui-react'
import MediaPlayer from "../components/Media/MediaPlayer";
import TrimmerControls from "./TrimmerControls";
import InoutControls from "./InoutControls";
import {mediaTools} from "../shared/tools";

export default class TrimmerModal extends Component {

    state = {
        convert: false,
        player: null,
        trim_meta: {...this.props.trim_meta},
        ioValid: false,
        loading: false,
    };

    getPlayer = (player) => {
        console.log(":: Trimmer - got player: ", player);
        this.setState({player: player});
    };

    getInouts = (inpoints, outpoints) => {
        this.setState({ioValid: true});
        for(let i=0; i<inpoints.length; i++) {
            if(inpoints[i] > outpoints[i]) {
                this.setState({ioValid: false});
            }
        }
        this.setState({trim_meta: {...this.state.trim_meta, inpoints, outpoints}});
    };

    postTrimMeta = () => {
        this.setIopState();
        let {trim_meta} = this.state;
        this.setState({ioValid: false, loading: true});
        setTimeout(() => { this.props.closeModal() }, 2000);
        mediaTools(`trimmer`, trim_meta,  (data) => {
            console.log(":: Trimmer Stated :: ",data);
            if(data.status !== "ok") {
                alert("Trimmer: Something goes wrong!");
            }
        });
    };

    getIopState = () => {
        let iop = JSON.parse(localStorage.getItem("iop"))
        if(iop && iop.inpoints.length > 0)
            this.InoutControls.restoreIop(iop)
    };

    setIopState = () => {
        const {inpoints, outpoints} = this.state.trim_meta;
        let iop = {inpoints, outpoints};
        console.log(":: setIopState", iop);
        localStorage.setItem("iop", JSON.stringify(iop))
    };

    toggleConvert = () => {
        let {trim_meta} = this.state;
        trim_meta.convert = !this.state.convert;
        this.setState({ convert: !this.state.convert, trim_meta });
    };

    render() {
        const {source} = this.props;
        const {player,trim_meta,convert,ioValid,loading} = this.state;

        return (
            <Table className='table_main'>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={5} className='table_media'>
                            <MediaPlayer
                                player={this.getPlayer}
                                source={source} type='video/mp4' />
                        </Table.Cell>
                        <Table.Cell width={1} className='table_ctls'>
                            <TrimmerControls
                                player={player} />
                        </Table.Cell>
                        <Table.Cell width={3} className='table_inouts'>
                            <Button.Group attached='top' size='mini'>
                                <Button onClick={this.setIopState}>Save</Button>
                                <Button onClick={this.getIopState}>Restore</Button>
                            </Button.Group>
                            <Segment attached raised textAlign='center' className='inout_content'>
                                <InoutControls onRef={ref => (this.InoutControls = ref)}
                                    onSetPoints={this.getInouts}
                                    player={player}
                                    inpoints={trim_meta.inpoints}
                                    outpoints={trim_meta.outpoints} />
                            </Segment>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Segment color='blue' textAlign='center' raised >
                                <b>{trim_meta.file_name}</b>
                            </Segment>
                        </Table.Cell>
                        <Table.Cell>
                            <Checkbox label='Convert' onClick={this.toggleConvert} checked={convert} />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Button size='big' color='red'
                                    disabled={!ioValid}
                                    loading={loading}
                                    onClick={this.postTrimMeta}>Trim
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}
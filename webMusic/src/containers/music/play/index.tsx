import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import QueueAnim from 'rc-queue-anim';
import './style.css'
@inject('musictStore')
@observer
export class MusicPlayComponent extends React.Component<any, any> {

    render() {
        console.log(this);
        if (this.props.musictStore.pattern == "play") {
            return <div className="music-play-main">播放界面</div>;
        }
        return null;
    }
}
import * as React from "react";
import { CreateCanvas } from "./ban";
// import './style.css'
export interface Props { className?: string; hash?: string }
export class Back extends React.Component<Props, any> {
    componentDidMount() {
        CreateCanvas(this.refs.canvas);
    }
    componentWillUnmount() {
    }
    render() {
        return <canvas className="background-canvas" ref="canvas"></canvas>;
    }
}

import * as React from 'react'

import { Store } from "./Store"
import Table from "./Table"
import Operation from "./Operation"
import EditModal from "./EditModal"

import './style.css'


export class RoleComponent extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Operation Store={Store} />
                <Table Store={Store} />
                <EditModal Store={Store}/>
            </div>
        );
    }
}

import React, { Component } from 'react'
import  {Button} from 'antd'
import './linkbutton.less'
export default class LinkButton extends Component {
    render() {
        return (
            <Button className="link-button" {...this.props}>

            </Button>
        )
    }
}

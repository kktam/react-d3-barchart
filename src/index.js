import React, {Component} from 'react'
import BarChart from './BarChart'

export default class extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <BarChart 
        onHover={this.props.onHover} 
        onClick={this.props.onClick}
        legend={this.props.legend} 
        data={this.props.data} 
        size={{width: this.props.size.width, height: this.props.size.height}} 
      />
    )
  }
}


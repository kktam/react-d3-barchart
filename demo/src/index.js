import React, {Component} from 'react'
import {render} from 'react-dom'

import GetChartData from './chartData';
import BarChart from '../../src/'
import { scaleLinear } from '../../node_modules/d3-scale'
import { range } from '../../node_modules/d3-array'

const chartDataArr = GetChartData(30, 50);

const colorScale = scaleLinear().domain([0,20,25,30]).range(["cyan", "green", "orange", "red"])

const legend = {
  colorScale: colorScale,
  label: ["Low", "Medium", "High", "Very High"]
}

class Demo extends Component {
  
  constructor(props){
    super(props)
    this.onResize = this.onResize.bind(this)
    this.onHover = this.onHover.bind(this)
    this.onClick = this.onClick.bind(this)    
    this.onBrush = this.onBrush.bind(this)
    this.state = { screenWidth: 1000, screenHeight: 500, hover: "none", click: "none", brushExtent: [0,40] }
  }

  onResize() {
    this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight - 120 })
  }

  onHover(d) {
    this.setState({ hover: d.id })
  }

  onClick(d) {
    this.setState({ click: d.id })
  }

  onBrush(d) {
    this.setState({ brushExtent: d })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
    this.onResize()
  }

  render() {

    return <div>
      <h1>react-d3-barchart Demo</h1>
      <BarChart 
        onHover={this.onHover}
        onClick={this.onClick} 
        legend={legend} 
        data={chartDataArr} 
        size={{ width: this.state.screenWidth * 0.9 , height: this.state.screenHeight * 0.9 }} 
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))

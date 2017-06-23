import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { scaleLinear } from 'd3-scale'
import { max, sum } from 'd3-array'
import { select } from 'd3-selection'
import { legendColor } from 'd3-svg-legend'
import { transition } from 'd3-transition'

class BarChart extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
    this.onHover = this.onHover.bind(this)      
    this.onClick = this.onClick.bind(this)    
    this.state = { hover: "none", click: "none", hasLegend: false }  
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

  onHover(d) {
    this.setState({ hover: d.id })
    if (this.props.onHover != null) {
      this.props.onHover(d);
    }
  }

  onClick(d) {
    this.setState({ click: d.id })
    if (this.props.onClick != null) {
      this.props.onClick(d);
    }
  }  

  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data, function (d) { return d.data; })
    const legendWidth = 100

    let barWidth = 10
    if (this.props.size != 'undefined') {
      barWidth = (this.props.size.width - legendWidth - 5) / this.props.data.length
    }

    if (this.props.legend != 'undefined' && this.props.legend != null) {
      const legend = legendColor()
        .scale(this.props.legend.colorScale)
        .labels(this.props.legend.label)

      select(node)
        .selectAll("g.legend")
        .data([0])
        .enter()
        .append("g")
          .attr("class", "legend")
          .call(legend)

      select(node)
        .select("g.legend")
          .attr("transform", "translate(" + (this.props.size.width - legendWidth) + ", 20)")

      this.setState({ asLegend : true })
    }

    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size.height])

    select(node)
      .selectAll("rect.bar")
      .data(this.props.data)
      .enter()
      .append("rect")
        .attr("class", "bar")
        .on("mouseover", this.onHover)
        .on("click", this.onClick)

    select(node)
      .selectAll("rect.bar")
      .data(this.props.data)
      .exit()
        .remove()

    select(node)
      .selectAll("rect.bar")
      .data(this.props.data)
        .attr("x", (d,i) => i * barWidth)
        .attr("y", d => this.props.size.height - yScale(d.data))
        .attr("height", d => yScale(d.data))
        .attr("width", barWidth)
        .style("fill", (d,i) => this.state.hover === d.id ? "#FCBC34" : (this.state.hasLegend) ? 'black' : this.props.legend.colorScale(d.colorMeasure) )
        .style("stroke", "black")
        .style("stroke-opacity", 0.25)

  }

  render() {
    return (
      <svg 
        ref={node => this.node = node} 
        width={this.props.size.width} 
        height={this.props.size.height}>
      </svg>
    )
  }
}

BarChart.propTypes = {
  onHover: PropTypes.func,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired      
  }),
  legend: PropTypes.shape({
    colorScale: PropTypes.func,
    label: PropTypes.arrayOf(PropTypes.string)
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.number.isRequired,
    colorMeasure: PropTypes.number.isRequired,
    created_at: PropTypes.instanceOf(Date)
  }))
};

export default BarChart
import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import { select } from 'd3-selection'

import BarChart from 'src/'

describe('Barchart', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('bar chart width test', () => {
    const data = [{id: "1", data:1, colorMeasure: 1}, {id: "2", data:2, colorMeasure: 2}];

    render(<BarChart 
            data={data} 
            size={{ width: 500 , height: 500 }} 
            />, 
      node, () => {
        expect(getSvg(node).select("svg").attr('width')).toBe('500')
        expect(getSvg(node).select("rect").attr('width')).toBe('197.5')
    })
  })


  it('bar chart height test', () => {
    const data = [{id: "1", data:1, colorMeasure: 1}, {id: "2", data:2, colorMeasure: 2}];

    render(<BarChart 
            data={data} 
            size={{ width: 500 , height: 500 }} 
            />, 
      node, () => {
        expect(getSvg(node).select("svg").attr('height')).toBe('500')
        let height = getSvg(node).select("rect").attr('height')
        let heightInPixel = parseInt(height)
        expect(heightInPixel).toBeLessThan(500)
        expect(heightInPixel).toBeGreaterThanOrEqualTo(0)    
    })
  })  

  function getSvg(node) {
    return select(node);
  }  
})

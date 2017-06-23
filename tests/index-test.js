import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import { select, selectAll } from 'd3-selection'

import BarChart from 'src/'

describe('Barchart', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node);
  })

  it('bar chart width test', () => {
    const data = [{id: "1", data:1, colorMeasure: 1}, {id: "2", data:2, colorMeasure: 2}];

    render(<BarChart 
            data={data} 
            size={{ width: 500 , height: 500 }} 
            />, 
      node, () => {
        expect(getSvg(node).select("svg").attr('width')).toBe('500');
        expect(getSvg(node).select("rect").attr('width')).toBe('197.5');
    })
  })


  it('bar chart height test', () => {
    const data = [{id: "1", data:1, colorMeasure: 1}, {id: "2", data:2, colorMeasure: 2}];

    render(<BarChart 
            data={data} 
            size={{ width: 500 , height: 500 }} 
            />, 
      node, () => {
        expect(getSvg(node).select("svg").attr('height')).toBe('500');
        let height = getSvg(node).select("rect").attr('height');
        let heightInPixel = parseInt(height);
        expect(heightInPixel).toBeLessThan(500);
        expect(heightInPixel).toBeGreaterThanOrEqualTo(0); 
    })
  })  

  it('should draw the correct number of bars', () => {
    const data = [{id: "1", data:3, colorMeasure: 3}
        , {id: "2", data:7, colorMeasure: 7}
        , {id: "3", data:9, colorMeasure: 9}];

    render(<BarChart 
            data={data} 
            size={{ width: 500 , height: 500 }} 
            />, 
      node, () => {
        expect(getBars(node).data().length).toBe(3);    
    })
  }) 

  it('should draw the correct bar height', () => {
    const data = [{id: "1", data:3, colorMeasure: 3}
        , {id: "2", data:7, colorMeasure: 7}
        , {id: "3", data:9, colorMeasure: 9}];

    const height = 500;

    render(<BarChart 
            data={data} 
            size={{ width: 500 , height: height }} 
            />, 
      node, () => {
        let fistBarHeightInPixels = round((height / 9 * data[0].data), 3);
        let firstBarActualHeight = round(getBarHeight(node, 0), 3);
        expect(firstBarActualHeight).toBe(fistBarHeightInPixels); 

        let secondBarHeightInPixels = round((height / 9 * data[1].data), 3);
        let secondBarActualHeight = round(getBarHeight(node, 1), 3);
        expect(secondBarActualHeight).toBe(secondBarHeightInPixels);  

        let thirdBarHeightInPixels = round((height / 9 * data[2].data), 3);
        let thirdBarActualHeight = round(getBarHeight(node, 2), 3);
        expect(thirdBarActualHeight).toBe(thirdBarHeightInPixels);                   
    })
  })     

  function getSvg(node) {
    return select(node);
  }  

  function getBars(node) {
    let a = getSvg(node).selectAll("rect.bar");
    //console.log(a);
    return a;
  }

  function getBar(node, idx) {
    let a = getSvg(node).selectAll("rect.bar")._groups[0][idx];
    //console.log(a);  
    //console.log(typeof(a));    
    return a;
  }

  function getBarHeight(node, idx) {
    let a = getSvg(node).selectAll("rect.bar")._groups[0][idx];
    //console.log(a);
    //console.log(a["height"]);
    //console.log(a["height"].baseVal.value);    
    //console.log(typeof(a["height"].baseVal.value));    
    return a["height"].baseVal.value;
  }     

  function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
})

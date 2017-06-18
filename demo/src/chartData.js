import React from 'react'
import { PropTypes } from 'prop-types'

export default ( maxValue, numOfItems ) => {
  let arr = [];  
  if (numOfItems <= 0) {
    return arr;
  }

  for(let i = 1; i <= numOfItems + 1; i++) {
    const dataValue = maxValue * (Math.random());
    const data = {
      id: "" + i + "",
      data: dataValue,
      colorMeasure: dataValue,
      created_at: new Date()
    };
    arr.push(data);
  }
  return arr;
}

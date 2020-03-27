import React from 'react';

import './card.css';

const card = (props) => {
    let total;
    if(props.stat === 'Recovered') {
      total = <p style={{color:'#45CE30'}}><b>{props.value}</b></p> ;
    }
    else if(props.stat === 'Deaths') {
        total = <p style={{color:'#D63031'}}><b>{props.value}</b></p> ;
    }
    else{
        total = <p><b>{props.value}</b></p>;
    }
    return (
        <div className='card'>
          <h3>{props.stat}</h3>
          {total}
        </div>
    )
}

export default card;
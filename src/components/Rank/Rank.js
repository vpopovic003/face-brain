import React from 'react';

const Rank = ( {name, entries }) => {
  return (
    <div className="rank">
      <div className='blue f3'>
        {`${name}, your number of entries is ...`}
      </div>
      <div className='blue f1'>
        {entries}
      </div>
    </div>
  )
}

export default Rank
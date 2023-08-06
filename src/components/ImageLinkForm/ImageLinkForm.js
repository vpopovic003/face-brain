import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className='gray f3'>
        {'This Magic Brain will detect faces in you pictures. Give it a try.'}
      </p>
      <p className=' gray f3'>
        {'Paste an HTML link. For example: https://static.standard.co.uk/2023/07/12/12/AFP_33NQ8UY.jpg'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input 
            className='f4 pa2 w-70 center' 
            type='text' 
            onChange={onInputChange}
          />
          <button 
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;
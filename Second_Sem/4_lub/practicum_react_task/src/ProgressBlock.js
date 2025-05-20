import { useState } from 'react';

const ProgressBlock = () => {

  const [inputText, setInputText] = useState('50');

  const handleInputChange = (newText) => {
    setInputText(newText); 
    
    if (newText === '') {
      setInputText('0');
      return;
    }
    
    const numValue = parseInt(newText, 10);
    
    if (!isNaN(numValue)) {
      if (numValue >= 0 && numValue <= 100) {
        setInputText(numValue); 
      }
    }
  };

  return (
    <div className = 'cont' >
      <input className='input'
        type="number"
        value={inputText}
        onChange={(event) => handleInputChange(event.target.value)}
        min="0"
        max="100"
      />
      <div className='block'>
        <div className='color'
          style={{
            width: inputText + '%',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBlock;
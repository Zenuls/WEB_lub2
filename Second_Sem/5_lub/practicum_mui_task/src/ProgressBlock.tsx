import { useState } from 'react';

const ProgressBlock = () => {

  const [inputText, setInputText] = useState<string>('50');

  const handleInputChange = (newText:string) => {
    setInputText(newText); 
    
    if (newText === '') {
      setInputText('0');
      return;
    }
    
    let numValue = parseInt(newText, 10);
    
    if (!isNaN(numValue)) {
      let clampedValue:number = Math.min(100, Math.max(0, numValue));
      setInputText(String(clampedValue)); 
    } else {
    setInputText('0');
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
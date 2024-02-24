import { useState, useEffect } from 'react';

const Typewriter = ({ texts, delay, infinite }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let timeout;
  
    if (currentIndex <= texts[textIndex].length) {
      const calculatedDelay = delay || (2* texts[textIndex].length); // Calculate delay based on text length
  
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + texts[textIndex][currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, calculatedDelay);
  
    } else if (infinite) {
      setCurrentIndex(0);
      setCurrentText('');
  
      if (textIndex < texts.length - 1) {
        setTextIndex(prevIndex => prevIndex + 1);
      } else {
        setTextIndex(0);
      }
    }
  
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, texts, textIndex]);

  return <span>{currentText}</span>;
};

export default Typewriter;
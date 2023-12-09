import React, { useState, useEffect, useRef } from 'react';
import "../styles/cursor-style.css"

interface TypingEffectProps {
  text: string[];
  endRemoveCursor?: boolean;
  onCharTypedEnd?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, endRemoveCursor, onCharTypedEnd }) => {
  const [typedText, setTypedText] = useState<string[]>([]);
  const codeRefs = Array.from({ length: text.length }, () => useRef<HTMLElement>(null));

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      console.log(`currentIndex: ${currentIndex}, text.length: ${text.length}`);
      if (currentIndex < text.length) {
        console.log(typedText);
        const currentText = text[currentIndex];
        const currentTypedText = typedText[currentIndex] || '';
        console.log(currentText);
        console.log(currentTypedText)
        // clearInterval(intervalId);
        console.log(currentText.length, currentTypedText.length);
        if (currentTypedText.length < currentText.length) {
          const char = currentText.charAt(currentTypedText.length);
          console.log(`previous: ${typedText}`);
          setTypedText((prev) => [
            ...prev.slice(0, currentIndex),
            currentTypedText + char,
          ]);
        } else {
          if (currentIndex < text.length - 1) {
            codeRefs[currentIndex].current?.classList.remove('cursor');
          }
          currentIndex++;
        }
      } else {
        if (endRemoveCursor) {
        }
        if (onCharTypedEnd) {
          onCharTypedEnd();
        }
        clearInterval(intervalId);
      }
    }, 100); // Adjust the speed of typing

    return () => clearInterval(intervalId);
  }, [text, endRemoveCursor, onCharTypedEnd, typedText]);

  return (
    <>
      {typedText
        .filter((typed) => { return typed != undefined })
        .map((typed, index) => (
          <pre data-prefix={`${index + 1}`} className='w-full inline-flex whitespace-pre-wrap break-all'>
            <code ref={codeRefs[index]} className='cursor'>
              {typed}
            </code>
          </pre>
        ))}
    </>
  );
};

export default TypingEffect;

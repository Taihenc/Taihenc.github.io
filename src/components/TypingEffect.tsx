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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (currentIndex < text.length) {
        const currentText = text[currentIndex];
        const currentTypedText = typedText[currentIndex] || '';

        if (currentTypedText.length < currentText.length) {
          const char = currentText.charAt(currentTypedText.length);
          setTypedText((prev) => [
            ...prev.slice(0, currentIndex),
            currentTypedText + ((currentText === " ") ? '' : char),
            ...prev.slice(currentIndex + 1),
          ]);
        } else {
          if (currentIndex < text.length - 1) {
            codeRefs[currentIndex].current?.classList.remove('cursor');
          }
          setCurrentIndex((prev) => prev + 1);
        }
      } else {
        if (endRemoveCursor) {
          // Handle endRemoveCursor
        }
        if (onCharTypedEnd) {
          onCharTypedEnd();
        }
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [typedText, currentIndex]);

  return (
    <>
      {typedText
        .filter((typed) => typed !== undefined)
        .map((typed, index) => (
          <pre key={index} data-prefix={`${index + 1}`} className='w-full inline-flex whitespace-pre-wrap break-all'>
            <code ref={codeRefs[index]} className='cursor'>
              {typed}
            </code>
          </pre>
        ))}
    </>
  );
};

export default TypingEffect;


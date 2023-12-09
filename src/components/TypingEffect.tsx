import React, { useState, useEffect, useRef } from 'react';
import "../styles/cursor-style.css"

interface TypingEffectProps {
  text: string[];
  endRemoveCursor?: boolean;
  isTerminal?: boolean;
  onCharTypedEnd?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, endRemoveCursor, isTerminal, onCharTypedEnd }) => {
  const [typedText, setTypedText] = useState<string[]>([]);
  const codeRefs = Array.from({ length: text.length }, () => useRef<HTMLElement>(null));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (currentIndex < text.length) {
        codeRefs[currentIndex - 1]?.current?.classList.remove('cursor', 'terminal');
        const currentText = text[currentIndex];
        const currentTypedText = typedText[currentIndex] || '';

        if (currentTypedText.length < currentText.length) {
          const char = currentText.charAt(currentTypedText.length);
          if (currentText === " ") {
            setCurrentIndex((prev) => prev + 1);
          }
          setTypedText((prev) => [
            ...prev.slice(0, currentIndex),
            currentTypedText + ((currentText === " ") ? '' : char),
            ...prev.slice(currentIndex + 1),
          ]);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      } else {
        if (endRemoveCursor) {
          codeRefs[currentIndex - 1]?.current?.classList.remove('cursor', 'terminal');
        }
        if (onCharTypedEnd) {
          onCharTypedEnd();
        }
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [typedText, currentIndex]);

  return (
    <>
      {typedText
        .filter((typed) => typed !== undefined)
        .map((typed, index) => (
          <pre key={index} data-prefix={(isTerminal) ? `$` : `${index + 1}`} className='w-full inline-flex whitespace-pre-wrap break-all'>
            <code ref={codeRefs[index]} className={isTerminal ? 'terminal' : 'cursor'}>
              {typed}
            </code>
          </pre>
        ))}
    </>
  );
};

export default TypingEffect;


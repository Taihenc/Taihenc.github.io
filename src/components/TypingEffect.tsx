import React, { useState, useEffect, useRef } from 'react';
import "../styles/cursor-style.css"
import { KeyboardEvent } from './Keyboard';

interface TypingEffectProps {
  text: string[];
  endRemoveCursor?: boolean;
  isTerminal?: boolean;
  onCharTypedEnd?: () => void;
  onCharTyped?: (char: string) => void;
  isPlainText?: boolean;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, endRemoveCursor, isTerminal, onCharTypedEnd, onCharTyped, isPlainText }) => {
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
          if (onCharTyped) {
            onCharTyped(char);
          }
        } else {
          if (onCharTyped) {
            onCharTyped('Enter');
          }
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
    }, 30);

    return () => clearInterval(intervalId);
  }, [typedText, currentIndex]);

  if (isPlainText) {
    return (
      <>
        {typedText}
      </>
    );
  }
  return (
    <>
      {typedText
        .filter((typed) => typed !== undefined)
        .map((typed, index) => (
          <pre key={index} data-prefix={(isTerminal) ? `$` : `${index + 1}`} className='w-full relative inline-flex whitespace-pre-wrap break-all'>
            <code ref={codeRefs[index]} className={isTerminal ? 'terminal text-green-200' : 'cursor'}>
              {typed}
            </code>
          </pre>
        ))}
    </>
  );
};

export default TypingEffect;


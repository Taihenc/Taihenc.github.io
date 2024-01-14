import React, { useState, useEffect, useRef } from 'react';
import "../styles/cursor-style.css"

interface TypingEffectProps {
  text: string[];
  endRemoveCursor?: boolean;
  isTerminal?: boolean;
  onCharTypedEnd?: () => void;
  onCharTyped?: (char: string) => void;
  isPlainText?: boolean;
  isPlainTextWithCursor?: boolean;
  textHighlight?: WordWithClassName[];
  deleteAndReType?: boolean;
  speed?: number;
}

type WordWithClassName = {
  word: string,
  className: string,
};

const TypingEffect: React.FC<TypingEffectProps> = ({ text, endRemoveCursor, isTerminal, onCharTypedEnd, onCharTyped, isPlainText, isPlainTextWithCursor, textHighlight, deleteAndReType, speed }) => {
  const [typedText, setTypedText] = useState<string[]>([]);
  const codeRefs = Array.from({ length: text.length }, () => useRef<HTMLElement>(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTypedIndex, setCurrentTypedIndex] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(async () => {
      if (currentTypedIndex < text.length) {
        if (!deleteAndReType) codeRefs[currentIndex - 1]?.current?.classList.remove('cursor', 'terminal');
        const currentText = text[currentIndex];
        const currentTypedText = typedText[currentTypedIndex] || '';

        if (currentTypedText.length < currentText.length) {
          const char = currentText.charAt(currentTypedText.length);
          setTypedText((prev) => [
            ...prev.slice(0, currentTypedIndex),
            currentTypedText + char,
            ...prev.slice(currentTypedIndex + 1),
          ]);
          if (onCharTyped) {
            onCharTyped(char);
          }
        } else {
          if (textHighlight) {
            textHighlight.forEach((wordWithColor) => {
              const word = wordWithColor.word;
              const className = wordWithColor.className;
              const regex = new RegExp(word, 'g');
              const codeRef = codeRefs[currentIndex]?.current;
              if (codeRef) {
                codeRef.innerHTML = codeRef.innerHTML.replace(regex, `<span class="${className}">${word}</span>`);
              }
            });
          }
          if (onCharTyped) {
            onCharTyped('Enter');
          }
          setCurrentIndex((prev) => prev + 1);
          if (deleteAndReType) {
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
            setTypedText([]);
            if (currentIndex === text.length - 1) {
              setCurrentIndex(0);
            }
          } else {
            setCurrentTypedIndex((prev) => prev + 1);
          }
        }
      } else {
        if (endRemoveCursor) {
          codeRefs[currentIndex - 1]?.current?.classList.remove('cursor', 'terminal');
        }
        if (onCharTypedEnd) {
          onCharTypedEnd();
        }
      }
    }, speed ? speed : 30);

    return () => clearInterval(intervalId);
  }, [typedText, !deleteAndReType && currentIndex]);

  if (isPlainText) {
    return (
      <>
        {typedText}
      </>
    );
  }
  if (isPlainTextWithCursor) {
    return (
      <>
        <span className='cursor bg-[#223b93] p-2 rounded-xl'>{typedText}</span>
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


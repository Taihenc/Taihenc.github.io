import * as THREE from "three";
import React, { useRef, JSX as ReactJSX } from "react";


export interface KeyboardController {
  keyboardRef: React.MutableRefObject<{ [key: string]: React.RefObject<THREE.Mesh> }>,
  press(key: string): void;
}

type GroupProps = JSX.IntrinsicElements["group"];

export interface ModelProps extends GroupProps {
  position: [number, number, number];
  scale: [number, number, number];
  controller: KeyboardController;
}

const keyMap: { [key: string]: string } = {
  'a': 'KeyA',
  'b': 'KeyB',
  'c': 'KeyC',
  'd': 'KeyD',
  'e': 'KeyE',
  'f': 'KeyF',
  'g': 'KeyG',
  'h': 'KeyH',
  'i': 'KeyI',
  'j': 'KeyJ',
  'k': 'KeyK',
  'l': 'KeyL',
  'm': 'KeyM',
  'n': 'KeyN',
  'o': 'KeyO',
  'p': 'KeyP',
  'q': 'KeyQ',
  'r': 'KeyR',
  's': 'KeyS',
  't': 'KeyT',
  'u': 'KeyU',
  'v': 'KeyV',
  'w': 'KeyW',
  'x': 'KeyX',
  'y': 'KeyY',
  'z': 'KeyZ',
  '0': 'Digit0',
  '1': 'Digit1',
  '2': 'Digit2',
  '3': 'Digit3',
  '4': 'Digit4',
  '5': 'Digit5',
  '6': 'Digit6',
  '7': 'Digit7',
  '8': 'Digit8',
  '9': 'Digit9',
  ' ': 'Space',
  '.': 'Period',
  ',': 'Comma',
  '/': 'Slash',
  '\\': 'Backslash',
  '-': 'Minus',
  '=': 'Equal',
  '[': 'BracketLeft',
  ']': 'BracketRight',
  ';': 'Semicolon',
  '\'': 'Quote',
  '`': 'Backquote',
  'Enter': 'Enter',
  'Backspace': 'Backspace',
  'Tab': 'Tab',
  'Shift': 'ShiftLeft',
  'Control': 'ControlLeft',
  'Alt': 'AltLeft',
  'CapsLock': 'CapsLock',
  'Escape': 'Escape',
};

export const createKeyboardController = (): KeyboardController => {
  const keyboardRef = useRef<{ [key: string]: React.RefObject<THREE.Mesh> }>({
    'KeyA': useRef<THREE.Mesh>(null),
    'KeyB': useRef<THREE.Mesh>(null),
    'KeyC': useRef<THREE.Mesh>(null),
    'KeyD': useRef<THREE.Mesh>(null),
    'KeyE': useRef<THREE.Mesh>(null),
    'KeyF': useRef<THREE.Mesh>(null),
    'KeyG': useRef<THREE.Mesh>(null),
    'KeyH': useRef<THREE.Mesh>(null),
    'KeyI': useRef<THREE.Mesh>(null),
    'KeyJ': useRef<THREE.Mesh>(null),
    'KeyK': useRef<THREE.Mesh>(null),
    'KeyL': useRef<THREE.Mesh>(null),
    'KeyM': useRef<THREE.Mesh>(null),
    'KeyN': useRef<THREE.Mesh>(null),
    'KeyO': useRef<THREE.Mesh>(null),
    'KeyP': useRef<THREE.Mesh>(null),
    'KeyQ': useRef<THREE.Mesh>(null),
    'KeyR': useRef<THREE.Mesh>(null),
    'KeyS': useRef<THREE.Mesh>(null),
    'KeyT': useRef<THREE.Mesh>(null),
    'KeyU': useRef<THREE.Mesh>(null),
    'KeyV': useRef<THREE.Mesh>(null),
    'KeyW': useRef<THREE.Mesh>(null),
    'KeyX': useRef<THREE.Mesh>(null),
    'KeyY': useRef<THREE.Mesh>(null),
    'KeyZ': useRef<THREE.Mesh>(null),
    'Digit0': useRef<THREE.Mesh>(null),
    'Digit1': useRef<THREE.Mesh>(null),
    'Digit2': useRef<THREE.Mesh>(null),
    'Digit3': useRef<THREE.Mesh>(null),
    'Digit4': useRef<THREE.Mesh>(null),
    'Digit5': useRef<THREE.Mesh>(null),
    'Digit6': useRef<THREE.Mesh>(null),
    'Digit7': useRef<THREE.Mesh>(null),
    'Digit8': useRef<THREE.Mesh>(null),
    'Digit9': useRef<THREE.Mesh>(null),
    'Space': useRef<THREE.Mesh>(null),
    'Enter': useRef<THREE.Mesh>(null),
    'Backspace': useRef<THREE.Mesh>(null),
    'Tab': useRef<THREE.Mesh>(null),
    'ShiftLeft': useRef<THREE.Mesh>(null),
    'ControlLeft': useRef<THREE.Mesh>(null),
    'AltLeft': useRef<THREE.Mesh>(null),
    'CapsLock': useRef<THREE.Mesh>(null),
    'Escape': useRef<THREE.Mesh>(null),
    'Period': useRef<THREE.Mesh>(null),
    'Comma': useRef<THREE.Mesh>(null),
    'Slash': useRef<THREE.Mesh>(null),
    'Backslash': useRef<THREE.Mesh>(null),
    'Minus': useRef<THREE.Mesh>(null),
    'Equal': useRef<THREE.Mesh>(null),
    'BracketLeft': useRef<THREE.Mesh>(null),
    'BracketRight': useRef<THREE.Mesh>(null),
    'Semicolon': useRef<THREE.Mesh>(null),
    'Quote': useRef<THREE.Mesh>(null),
    'Backquote': useRef<THREE.Mesh>(null),
  });

  const press = (key: string): void => {
    // console.log(key);
    // const mesh = keyboardRef.current.ESC.current;
    if (key != 'Enter' && key != ' ') { key = key.toLowerCase(); }
    if (keyboardRef.current[keyMap[key]] == undefined) {
      console.log(key);
    }
    const mesh = keyboardRef.current[keyMap[key]].current;

    if (mesh) {
      let initialPosition = mesh.position.y;
      let targetPosition = initialPosition - 0.005;
      const defaultMaterial = mesh.material;

      // Use three.js animation system
      const animationDuration = 10; // in milliseconds
      let startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / animationDuration);

        // Ease out the animation for a smoother effect
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // Interpolate the position
        mesh.position.y = initialPosition + easedProgress * (targetPosition - initialPosition);

        mesh.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete, reverse the animation

          // Swap initial and target positions for the return animation
          const temp = initialPosition;
          initialPosition = targetPosition;
          targetPosition = temp;

          startTime = time; // Reset the start time for the return animation

          requestAnimationFrame(returnAnimation);
        }
      };

      const returnAnimation = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / animationDuration);

        // Ease out the return animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // Interpolate the position for the return animation
        mesh.position.y = initialPosition + easedProgress * (targetPosition - initialPosition);

        mesh.material = defaultMaterial;
        if (progress < 1) {
          requestAnimationFrame(returnAnimation);
        } else {
          // Return animation complete, you can perform any cleanup here

          // Optionally, you can reset the material to the default after the key is released
          // mesh.material = defaultMaterial;
        }
      };

      // Start the initial animation
      requestAnimationFrame(animate);
    }
  };


  return {
    keyboardRef,
    press,
  };
};

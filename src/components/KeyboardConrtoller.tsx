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

export const createKeyboardController = (): KeyboardController => {
  const keyboardRef = useRef<{ [key: string]: React.RefObject<THREE.Mesh> }>({
    ESC: useRef<THREE.Mesh>(null),
  });

  const press = (key: string): void => {
    const mesh = keyboardRef.current.ESC.current;

    if (mesh) {
      // Move the mesh down
      mesh.position.y -= 0.005;

      // Set a timeout to move the mesh back up after 500 milliseconds (adjust as needed)
      setTimeout(() => {
        mesh.position.y += 0.005;

        // Optionally, you can reset the material to the default after the key is released
        // mesh.material = defaultMaterial;
      }, 500);

      // Optionally, change the material to indicate a pressed state
      // mesh.material = pressedMaterial;
    }
  };

  return {
    keyboardRef,
    press,
  };
};

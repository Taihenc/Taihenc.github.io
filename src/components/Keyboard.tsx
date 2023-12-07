import '../scss/keyboard.scss';
import React, { useEffect, useState } from 'react';

export default function Keyboard() {
    const [keyboardStyle, setKeyboardStyle] = useState<React.CSSProperties>({
        perspective: '10000px',
        transform: 'rotateX(50deg) rotateY(0deg) rotateZ(-45deg)',
    });

    const updateKeyboardStyle = (x: number, y: number) => {
        let r_x = 50 + (x * 10);
        let r_y = 0;
        let r_z = -45 + (y * 10);

        setKeyboardStyle({
            perspective: '10000px',
            transform: `rotateX(${r_x}deg) rotateY(${r_y}deg) rotateZ(${r_z}deg)`,
        });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            let x = e.pageX / window.innerWidth;
            let y = e.pageY / window.innerHeight;
            updateKeyboardStyle(x, y);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className='main keyboard-flex z-40' id='m'>
                <div className='keyboard keyboard-flex' id='k' style={keyboardStyle}>
                    {/* <div className="screen keyboard-flex" id="s"></div> */}
                    <div className='keyboard__front face'></div>
                    <div className='keyboard__back face'></div>
                    <div className='keyboard__right face'></div>
                    <div className='keyboard__left face'></div>
                    <div className='keyboard__top face'>
                        <div className='keys'>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-o3'></div>
                                <div className='key__back face face--key-o1'></div>
                                <div className='key__right face face--key-o1'></div>
                                <div className='key__left face face--key-o2'></div>
                                <div className='key__top face face--key-o1'></div>
                                <div className='key__bottom face face--key-o2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key key--w2 keyboard-flex'>
                                <div className='key__front key__front--w2 face face--key-b3'></div>
                                <div className='key__back key__back--w2 face face--key-b1'></div>
                                <div className='key__right key__right--w2 face face--key-b1'></div>
                                <div className='key__left key__left--w2 face face--key-b2'></div>
                                <div className='key__top key__top--w2 face face--key-b1'></div>
                                <div className='key__bottom key__bottom--w2 face face--key-b2'></div>
                            </div>
                        </div>
                        <div className='keys'>
                            <div className='key key--w2 keyboard-flex'>
                                <div className='key__front key__front--w2 face face--key-b3'></div>
                                <div className='key__back key__back--w2 face face--key-b1'></div>
                                <div className='key__right key__right--w2 face face--key-b1'></div>
                                <div className='key__left key__left--w2 face face--key-b2'></div>
                                <div className='key__top key__top--w2 face face--key-b1'></div>
                                <div className='key__bottom key__bottom--w2 face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                        </div>
                        <div className='keys'>
                            <div className='key key--w3 keyboard-flex'>
                                <div className='key__front key__front--w3 face face--key-b3'></div>
                                <div className='key__back key__back--w3 face face--key-b1'></div>
                                <div className='key__right key__right--w3 face face--key-b1'></div>
                                <div className='key__left key__left--w3 face face--key-b2'></div>
                                <div className='key__top key__top--w3 face face--key-b1'></div>
                                <div className='key__bottom key__bottom--w3 face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key key--w2 keyboard-flex'>
                                <div className='key__front key__front--w2 face face--key-b3'></div>
                                <div className='key__back key__back--w2 face face--key-b1'></div>
                                <div className='key__right key__right--w2 face face--key-b1'></div>
                                <div className='key__left key__left--w2 face face--key-b2'></div>
                                <div className='key__top key__top--w2 face face--key-b1'></div>
                                <div className='key__bottom key__bottom--w2 face face--key-b2'></div>
                            </div>
                        </div>
                        <div className='keys'>
                            <div className='key key--w2 keyboard-flex'>
                                <div className='key__front key__front--w2 face face--key-b3'></div>
                                <div className='key__back key__back--w2 face face--key-b1'></div>
                                <div className='key__right key__right--w2 face face--key-b1'></div>
                                <div className='key__left key__left--w2 face face--key-b2'></div>
                                <div className='key__top key__top--w2 face face--key-b1'></div>
                                <div className='key__bottom key__bottom--w2 face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face'></div>
                                <div className='key__back face'></div>
                                <div className='key__right face'></div>
                                <div className='key__left face'></div>
                                <div className='key__top face'></div>
                                <div className='key__bottom face'></div>
                            </div>
                            <div className='key key--w3 keyboard-flex'>
                                <div className='key__front key__front--w3 face face--key-b3'></div>
                                <div className='key__back key__back--w3 face face--key-b1'></div>
                                <div className='key__right key__right--w3 face face--key-b1'></div>
                                <div className='key__left key__left--w3 face face--key-b2'></div>
                                <div className='key__top key__top--w3 face face--key-b1'></div>
                                <div className='key__bottom key__bottom--w3 face face--key-b2'></div>
                            </div>
                        </div>
                        <div className='keys'>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className='key key--w6 keyboard-flex'>
                                <div className='key__front key__front--w6 face'></div>
                                <div className='key__back key__back--w6 face'></div>
                                <div className='key__right key__right--w6 face'></div>
                                <div className='key__left key__left--w6 face'></div>
                                <div className='key__top key__top--w6 face'></div>
                                <div className='key__bottom key__bottom--w6 face'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className='key keyboard-flex'>
                                <div className='key__front face face--key-b3'></div>
                                <div className='key__back face face--key-b1'></div>
                                <div className='key__right face face--key-b1'></div>
                                <div className='key__left face face--key-b2'></div>
                                <div className='key__top face face--key-b1'></div>
                                <div className='key__bottom face face--key-b2'></div>
                            </div>
                            <div className="face key__top w-full h-96 bg-white z-10" id='light'></div>
                        </div>
                    </div>
                    <div className='keyboard__bottom face'></div>
                </div>
            </div>
        </>
    );
}

function KeyboardEvent(keyboardStyle) {
    /*
Designed by: Miguel E.
Original image: https://dribbble.com/shots/6276517-Hello
*/

    const m = document.querySelector("#m")!;
    const k = document.querySelector("#k")!;
    const s = document.querySelector("#s")!;

    const kd = document.querySelectorAll(".key")
    let con = 0;

    let base = (e) => {
        let x = e.pageX / window.innerWidth;
        let y = e.pageY / window.innerHeight;
        k.style = keyboardStyle(x, y);
    }

    let addKey = (e) => {
        let kc = e.keyCode;

        if ((kc >= 65 && kc <= 90) || kc == 32) {
            if (kc == 81) { kd[15].classList.add("key--down"); }
            else if (kc == 87) { kd[16].classList.add("key--down"); }
            else if (kc == 69) { kd[17].classList.add("key--down"); }
            else if (kc == 82) { kd[18].classList.add("key--down"); }
            else if (kc == 84) { kd[19].classList.add("key--down"); }
            else if (kc == 89) { kd[20].classList.add("key--down"); }
            else if (kc == 85) { kd[21].classList.add("key--down"); }
            else if (kc == 73) { kd[22].classList.add("key--down"); }
            else if (kc == 79) { kd[23].classList.add("key--down"); }
            else if (kc == 80) { kd[24].classList.add("key--down"); }
            else if (kc == 65) { kd[29].classList.add("key--down"); }
            else if (kc == 83) { kd[30].classList.add("key--down"); }
            else if (kc == 68) { kd[31].classList.add("key--down"); }
            else if (kc == 70) { kd[32].classList.add("key--down"); }
            else if (kc == 71) { kd[33].classList.add("key--down"); }
            else if (kc == 72) { kd[34].classList.add("key--down"); }
            else if (kc == 74) { kd[35].classList.add("key--down"); }
            else if (kc == 75) { kd[36].classList.add("key--down"); }
            else if (kc == 76) { kd[37].classList.add("key--down"); }
            else if (kc == 192) { kd[38].classList.add("key--down"); }
            else if (kc == 90) { kd[41].classList.add("key--down"); }
            else if (kc == 88) { kd[42].classList.add("key--down"); }
            else if (kc == 67) { kd[43].classList.add("key--down"); }
            else if (kc == 86) { kd[44].classList.add("key--down"); }
            else if (kc == 66) { kd[45].classList.add("key--down"); }
            else if (kc == 78) { kd[46].classList.add("key--down"); }
            else if (kc == 77) { kd[47].classList.add("key--down"); }
            else if (kc == 13) { kd[39].classList.add("key--down"); }
            else if (kc == 32) {
                kd[56].classList.add("key--down");
                s.innerHTML += "&nbsp;";
            }
            s.innerHTML += String.fromCharCode(kc);
            con++;
            if (con > 10) { s.innerHTML = ""; con = 0; }
        }
        if (kc == 8) {
            s.innerHTML = "";
            kd[27].classList.add("key--down");
            con = 0;
        }

    }
    let removeKey = (e) => {
        let kc = event.keyCode;
        if (kc == 81) { kd[15].classList.remove("key--down"); }
        else if (kc == 87) { kd[16].classList.remove("key--down"); }
        else if (kc == 69) { kd[17].classList.remove("key--down"); }
        else if (kc == 82) { kd[18].classList.remove("key--down"); }
        else if (kc == 84) { kd[19].classList.remove("key--down"); }
        else if (kc == 89) { kd[20].classList.remove("key--down"); }
        else if (kc == 85) { kd[21].classList.remove("key--down"); }
        else if (kc == 73) { kd[22].classList.remove("key--down"); }
        else if (kc == 79) { kd[23].classList.remove("key--down"); }
        else if (kc == 80) { kd[24].classList.remove("key--down"); }
        else if (kc == 65) { kd[29].classList.remove("key--down"); }
        else if (kc == 83) { kd[30].classList.remove("key--down"); }
        else if (kc == 68) { kd[31].classList.remove("key--down"); }
        else if (kc == 70) { kd[32].classList.remove("key--down"); }
        else if (kc == 71) { kd[33].classList.remove("key--down"); }
        else if (kc == 72) { kd[34].classList.remove("key--down"); }
        else if (kc == 74) { kd[35].classList.remove("key--down"); }
        else if (kc == 75) { kd[36].classList.remove("key--down"); }
        else if (kc == 76) { kd[37].classList.remove("key--down"); }
        else if (kc == 192) { kd[38].classList.remove("key--down"); }
        else if (kc == 90) { kd[41].classList.remove("key--down"); }
        else if (kc == 88) { kd[42].classList.remove("key--down"); }
        else if (kc == 67) { kd[43].classList.remove("key--down"); }
        else if (kc == 86) { kd[44].classList.remove("key--down"); }
        else if (kc == 66) { kd[45].classList.remove("key--down"); }
        else if (kc == 78) { kd[46].classList.remove("key--down"); }
        else if (kc == 77) { kd[47].classList.remove("key--down"); }
        else if (kc == 32) { kd[56].classList.remove("key--down"); }
        else if (kc == 13) { kd[39].classList.remove("key--down"); }
        else if (kc == 8) { kd[27].classList.remove("key--down"); }
    }

    m.addEventListener("mousemove", base);
    window.addEventListener("keydown", addKey);
    window.addEventListener("keyup", removeKey);

}
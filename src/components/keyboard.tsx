import '../scss/keyboard.scss'

function Keyboard() {
    const keyboardStyle: React.CSSProperties = {
        perspective: '10000px',
        // transformStyle: 'preserve-3d',
        transform: 'rotateX(40deg) rotateY(0deg) rotateZ(-30deg)',
        // transform: 'rotateX(50deg) rotateY(0deg) rotateZ(0deg)',
    }

    return (
        <>
            <div className="main flex" id="m">
                <div className="keyboard flex" id="k" style={keyboardStyle}>
                    <div className="screen flex" id="s">
                        <a
                            className="ml-10 h-12 w-36 bg-[#000000] mt-7 rounded-xl flex flex-row pr-1 transition-colors hover:bg-[#85e7ff] "
                            href="https://github.com/Taihenc"
                        >
                            <div className="h-7 w-7 bg-[url('/github-mark-white.png')] bg-cover bg-center my-auto ml-4"></div>
                            <div className="my-auto font-inter font-bold text-white ml-3 text-xl">
                                github
                            </div>
                        </a>
                    </div>
                    <div className="keyboard__front face"></div>
                    <div className="keyboard__back face"></div>
                    <div className="keyboard__right face"></div>
                    <div className="keyboard__left face"></div>
                    <div className="keyboard__top face">
                        <div className="keys">
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key key--w2 flex">
                                <div className="key__front key__front--w2 face face--key-b3"></div>
                                <div className="key__back key__back--w2 face face--key-b1"></div>
                                <div className="key__right key__right--w2 face face--key-b1"></div>
                                <div className="key__left key__left--w2 face face--key-b2"></div>
                                <div className="key__top key__top--w2 face face--key-b1"></div>
                                <div className="key__bottom key__bottom--w2 face face--key-b2"></div>
                            </div>
                        </div>
                        <div className="keys">
                            <div className="key key--w2 flex">
                                <div className="key__front key__front--w2 face face--key-b3"></div>
                                <div className="key__back key__back--w2 face face--key-b1"></div>
                                <div className="key__right key__right--w2 face face--key-b1"></div>
                                <div className="key__left key__left--w2 face face--key-b2"></div>
                                <div className="key__top key__top--w2 face face--key-b1"></div>
                                <div className="key__bottom key__bottom--w2 face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                        </div>
                        <div className="keys">
                            <div className="key key--w3 flex">
                                <div className="key__front key__front--w3 face face--key-b3"></div>
                                <div className="key__back key__back--w3 face face--key-b1"></div>
                                <div className="key__right key__right--w3 face face--key-b1"></div>
                                <div className="key__left key__left--w3 face face--key-b2"></div>
                                <div className="key__top key__top--w3 face face--key-b1"></div>
                                <div className="key__bottom key__bottom--w3 face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key key--w2 flex">
                                <div className="key__front key__front--w2 face face--key-o3"></div>
                                <div className="key__back key__back--w2 face face--key-o1"></div>
                                <div className="key__right key__right--w2 face face--key-o1"></div>
                                <div className="key__left key__left--w2 face face--key-o2"></div>
                                <div className="key__top key__top--w2 face face--key-o1"></div>
                                <div className="key__bottom key__bottom--w2 face face--key-o2"></div>
                            </div>
                        </div>
                        <div className="keys">
                            <div className="key key--w2 flex">
                                <div className="key__front key__front--w2 face face--key-b3"></div>
                                <div className="key__back key__back--w2 face face--key-b1"></div>
                                <div className="key__right key__right--w2 face face--key-b1"></div>
                                <div className="key__left key__left--w2 face face--key-b2"></div>
                                <div className="key__top key__top--w2 face face--key-b1"></div>
                                <div className="key__bottom key__bottom--w2 face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face"></div>
                                <div className="key__back face"></div>
                                <div className="key__right face"></div>
                                <div className="key__left face"></div>
                                <div className="key__top face"></div>
                                <div className="key__bottom face"></div>
                            </div>
                            <div className="key key--w3 flex">
                                <div className="key__front key__front--w3 face face--key-b3"></div>
                                <div className="key__back key__back--w3 face face--key-b1"></div>
                                <div className="key__right key__right--w3 face face--key-b1"></div>
                                <div className="key__left key__left--w3 face face--key-b2"></div>
                                <div className="key__top key__top--w3 face face--key-b1"></div>
                                <div className="key__bottom key__bottom--w3 face face--key-b2"></div>
                            </div>
                        </div>
                        <div className="keys">
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-o3"></div>
                                <div className="key__back face face--key-o1"></div>
                                <div className="key__right face face--key-o1"></div>
                                <div className="key__left face face--key-o2"></div>
                                <div className="key__top face face--key-o1"></div>
                                <div className="key__bottom face face--key-o2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                            <div className="key key--w6 flex">
                                <div className="key__front key__front--w6 face"></div>
                                <div className="key__back key__back--w6 face"></div>
                                <div className="key__right key__right--w6 face"></div>
                                <div className="key__left key__left--w6 face"></div>
                                <div className="key__top key__top--w6 face"></div>
                                <div className="key__bottom key__bottom--w6 face"> </div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                            <div className="key flex">
                                <div className="key__front face face--key-b3"></div>
                                <div className="key__back face face--key-b1"></div>
                                <div className="key__right face face--key-b1"></div>
                                <div className="key__left face face--key-b2"></div>
                                <div className="key__top face face--key-b1"></div>
                                <div className="key__bottom face face--key-b2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="keyboard__bottom face"></div>
                </div>
            </div>
        </>
    )
}

export default Keyboard
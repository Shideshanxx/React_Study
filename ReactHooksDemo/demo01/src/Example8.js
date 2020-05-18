import React, { useRef, useState, useEffect } from 'react';

function Example8() {
    const inputEl = useRef(null)
    const onButtonClick = () => {
        // 作用一：获取Dom元素（其实就是将元素的ref属性赋值给inputEl）
        // inputEl.current.value就是input的值
        inputEl.current.value = "hello.shideshan"
        console.log(inputEl)
    }
    const [text, setText] = useState('shideshan')
    const textRef = useRef()
    useEffect(()=>{
        // 作用二：保存普通变量（用textRef保存text的值）
        textRef.current = text
        console.log('textRef.current:',textRef.current)
    })

    return (
        <>
            {/*保存input的ref到inputEl，所以当改变inputEl时，input的值就会改变 */}
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>在input上展示文字</button>
            <br />
            <br />
            <input value={text} onChange={(e)=>{setText(e.target.value)}} />
        </>
    )
}

export default Example8
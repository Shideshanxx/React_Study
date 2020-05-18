/**
 * useState多状态声明
 */

import React, { useState } from 'react';
let showSex = true

function Example2() {
    // useState(18)穿的参数就是age的初始值，setAge是用来改变age的
    const [age, setAge] = useState(18)
    // 下面写法报错了，useState()不能用在if语句中
    // if (showSex) {
    //     const [sex, setSex] = useState('男')
    //     showSex = false
    // }
    const [sex, setSex] = useState('男')
    const [work, setWork] = useState('前端程序员')
    return (
        <div>
            <p>ShiDeshan今年：{age}岁</p>
            <p>性别：{sex}</p>
            <p>工作：{work}</p>
        </div>
    )
}

export default Example2
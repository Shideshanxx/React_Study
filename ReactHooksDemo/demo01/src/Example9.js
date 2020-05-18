import React, { useState, useEffect, useCallback } from 'react';

// 自定义获取窗口大小函数
function useWinSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })
    // useMemo是缓存状态，useCallback是缓存方法
    // 第二个参数传 [],表示只执行一次，就缓存起来，后面不再执行这个方法
    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    },[])
    useEffect(()=>{
        window.addEventListener('resize',onResize)
        return ()=>{
            window.removeEventListener('resize',onResize)
        }
    },[])

    return size
}

function Example9() {
    const size = useWinSize()

    return (
        <div>
            页面的size是：{size.width}X{size.height}
        </div>
    )
}

export default Example9
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

/**
 * 懒加载组件和外部库
 */

// 异步加载自定义组件
// 问：除了使用dynamic，可以使用react中的lazy和Suspence吗？
const LazyLoad = dynamic(import('../components/lazyLoad'))

function Time() {
    const [nowTime, setTime] = useState(Date.now())

    const changeTime = useCallback(async () => {
        // 异步加载外部库，优化页面打开速度
        const moment = await import('moment')
        setTime(moment.default(Date.now()).format())
    }, [])

    return (
        <div>
            <div>显示时间为： {nowTime}</div>
            <LazyLoad/>
            <button onClick={changeTime}>改变时间格式</button>
        </div>
    )
}

export default Time;
/**
 * useReducer
 */

// 用js实现reducer，主要需要理解的就是这种形式和两个参数的作用，一个参数是状态，一个参数是如何控制状态。
// function countReducer(state,action) {
//     switch(action.type) {
//         case 'add':
//             return state + 1
//         case 'sub':
//             return state - 1
//         default:
//             return state
//     }
// }

import React, { useReducer } from 'react';

function ReducerDemo() {
    // useReducer一般传两个值，一个是类似于上面的reducer函数，一个是初始值
    const [count, dispatch] = useReducer((state,action)=>{
        switch(action) {
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            default:
                return state
        }
    },0)

    return (
        <div>
            <h2>现在的分数是{count}</h2>
            <button onClick={()=>{dispatch('add')}}>Increment</button>
            <button onClick={()=>{dispatch('sub')}}>Decrement</button>
        </div>
    )
}

export default ReducerDemo
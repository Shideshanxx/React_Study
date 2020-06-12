import { useState, useCallback } from "react";

/**
 * style JSX
 */

function Shideshan() {
    const [color,setColor] = useState('blue')

    const changeColor = useCallback(() => {
        setColor(color === 'blue'?'red':'blue')
    }, [color])

    return (
        <>
            <div>shideshanBlog</div>
            <button onClick={changeColor}>改变颜色</button>
            <style jsx>
                {`
                    div{color:${color};}
                `}
            </style>
        </>
    )
}

export default Shideshan;
import React, {
    memo,
    useState,
    useMemo,
    useRef,
    useEffect
} from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';

import useWinSize from '../common/useWinSize';

import './Slider.css';

const Slider = memo(function Slider(props) {
    const {
        title,
        currentStartHours,
        currentEndHours,
        onStartChanged,
        onEndChanged,
    } = props;

    const winSize = useWinSize();

    // 用useRef获取Dom节点
    const startHandle = useRef()
    const endHandle = useRef()

    // 用useRef存储上一次滑动的位置
    const lastStartX = useRef()
    const lastEndX = useRef()

    const range = useRef();
    const rangeWidth = useRef();

    // 因为本组件使用了memo，所以本组件不会重新渲染，这里缓存上一次的currentStartHours和currentEndHours值，通过比较两次的值来对相应的一些值做出改变
    const prevCurrentStartHours = useRef(currentStartHours);
    const prevCurrentEndHours = useRef(currentEndHours);

    // 将开始时间和结束时间转换成百分比，并做二级缓存
    const [start, setStart] = useState(() => currentStartHours / 24 * 100);
    const [end, setEnd] = useState(() => currentEndHours / 24 * 100);

    if (prevCurrentStartHours.current !== currentStartHours) {
        setStart(currentStartHours / 24 * 100);
        prevCurrentStartHours.current = currentStartHours
    }
    if (prevCurrentEndHours.current !== currentEndHours) {
        setEnd(currentEndHours / 24 * 100);
        prevCurrentEndHours.current = currentEndHours
    }

    // 对边界进行处理
    const startPercent = useMemo(() => {
        if (start > 100) {
            return 100
        }
        if (start < 0) {
            return 0
        }
        return start;
    }, [start])
    const endPercent = useMemo(() => {
        if (end > 100) {
            return 100
        }
        if (end < 0) {
            return 0
        }
        return end;
    }, [end])

    // 百分比转成24小时，以将该值显示在滑球上方
    const startHours = useMemo(() => {
        return Math.round(startPercent * 24 / 100)
    }, [startPercent]);
    const startText = useMemo(() => {
        return leftPad(startHours, 2, '0') + ':00'
    }, [startHours])
    const endHours = useMemo(() => {
        return Math.round(endPercent * 24 / 100)
    }, [endPercent]);
    const endText = useMemo(() => {
        return leftPad(endHours, 2, '0') + ':00'
    }, [endHours])

    function onStartTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastStartX.current = touch.pageX;
    }

    function onEndTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastEndX.current = touch.pageX;
    }

    function onStartTouchMove(e) {
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastStartX.current;
        lastStartX.current = touch.pageX;

        setStart(start => start + (distance / rangeWidth.current) * 100)
    }

    function onEndTouchMove(e) {
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastEndX.current;
        lastEndX.current = touch.pageX;

        setEnd(end => end + (distance / rangeWidth.current) * 100);
    }

    // 第二个参数传入自定义Hook返回的winSize，当页面宽度或高度发生变化，重新设置slider的宽度
    useEffect(() => {
        rangeWidth.current = parseFloat(
            window.getComputedStyle(range.current).width
        )
    }, [winSize])

    // 因为渲染可能导致DOM节点重构，所以每次都需要重新绑定事件，不用担心内存泄漏，因为定义了解绑事件
    useEffect(() => {
        // startHandle.current才是Dom节点
        startHandle.current.addEventListener(
            'touchstart',
            onStartTouchBegin,
            false
        );
        startHandle.current.addEventListener(
            'touchmove',
            onStartTouchMove,
            false
        );

        endHandle.current.addEventListener(
            'touchstart',
            onEndTouchBegin,
            false
        );
        endHandle.current.addEventListener(
            'touchmove',
            onEndTouchMove,
            false
        );
        return () => {
            startHandle.current.removeEventListener(
                'touchstart',
                onStartTouchBegin,
                false
            );
            startHandle.current.removeEventListener(
                'touchmove',
                onStartTouchMove,
                false
            );
    
            endHandle.current.removeEventListener(
                'touchstart',
                onEndTouchBegin,
                false
            );
            endHandle.current.removeEventListener(
                'touchmove',
                onEndTouchMove,
                false
            );
        }
    })

    // 当时间改变时，将时间回传
    useEffect(() => {
        onStartChanged(startHours)
    }, [startHours])
    useEffect(() => {
        onEndChanged(endHours)
    }, [endHours])

    return (
        <div className="option">
            <h3>{ title }</h3>
            <div className="range-slider">
                <div className="slider" ref={range}>
                    <div className="slider-range" style={{
                        left: startPercent + '%',
                        width: endPercent-startPercent + '%'
                    }}></div>
                    <i ref={startHandle} className="slider-handle" style={{
                        left: startPercent + '%'
                    }}>
                        <span>{ startText }</span>
                    </i>
                    <i ref={endHandle} className="slider-handle" style={{
                        left: endPercent + '%'
                    }}>
                        <span>{ endText }</span>
                    </i>
                </div>
            </div>
        </div>
    )
})

Slider.propTypes = {
    title: PropTypes.string.isRequired,
    currentStartHours: PropTypes.number.isRequired,
    currentEndHours: PropTypes.number.isRequired,
    onStartChanged: PropTypes.func.isRequired,
    onEndChanged: PropTypes.func.isRequired,
}

export default Slider;
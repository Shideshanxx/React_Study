import React, {
    useMemo
} from 'react';
import PropTypes from 'prop-types';
import { h0 } from '../common/fp';
import dayjs from 'dayjs';
import './DepartDate.css';

// DepartDate组件不建议使用memo包裹，因为组件内部的属性不全部依赖外部传入，比如 h0()
// 如果想把该组件改造成memo，可以将h0改为外部输入。
export default function DepartDate(props) {
    const {
        time,
        onClick,
    } = props;

    // 去掉时分秒
    const h0OfDepart = h0(time)
    const departtDate = new Date(h0OfDepart)

    const departDateString = useMemo(() => {
        return dayjs(time).format('YYYY-MM-DD')
    }, [h0OfDepart])

    const isToday = h0OfDepart === h0();

    const weekString = '周'
        + ['日', '一', '二', '三', '四', '无', '六'][departtDate.getDay()]
        + (isToday ? '(今天)' : '')

    return (
        <div className="depart-date" onClick={() => onClick}>
            <input type="hidden" name="date" value={departDateString} />
            { departDateString } <span className="depart-week">{weekString}</span>
        </div>
    )
}

DepartDate.propTypes = {
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}
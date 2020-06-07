import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { h0 } from '../common/fp';
import Header from './Header.jsx';

import './CitySelector.css';

function Day(props) {
    const {
        day,
        onSelect
    } = props;

    // 因为days里面对day进行了补齐操作，所以day可能为null
    if (!day) {
        return <td className="null"></td>
    }

    const classes = [];

    const now = h0();

    // 如果是过去的日期
    if (day < now) {
        classes.push('disabled');
    }
    // 如果是周六或者周日
    if ([6, 0].includes(new Date(day).getDay())) {
        classes.push('weekend');
    }

    const dateString = now === day ? '今天' : new Date(day).getDate();

    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>
            { dateString }
        </td>
    )
}

// day可能为null，所以不能用isRequired
Day.propTypes = {
    day: PropTypes.number,
    onSelect: PropTypes.func.isRequired
}

function Week(props) {
    const {
        days,
        onSelect
    } = props;

    return (
        <tr className="date-table-days">
            {
                days.map((day,idx) => {
                    return (
                        <Day
                            key={idx}
                            day={day}
                            onSelect={onSelect}
                        />
                    )
                })
            }
        </tr>
    )
}

Week.propTypes = {
    days: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}

function Month(props) {
    const {
        startingTimeInMonth,
        onSelect
    } = props;

    const startDay = new Date(startingTimeInMonth);
    const currentDay = new Date(startingTimeInMonth);

    // days用来储存当前月所有的天
    let days = [];

    while(currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1);
    }

    // 将days首位补齐值为null的day来对齐星期
    // getDay的值从周一到周日依次是：1234560
    // new Array(6) 会创建一个长度为6的空数组
    // fill是ES6的新功能，接受三个参数(value start end)，如果只传一个则表示把数组所有元素都用value填充替换掉
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days);

    const lastDay = new Date(days[days.length - 1]);
   
    days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null));

    // 将days分成week
    const weeks = [];

    for (let row = 0; row < days.length / 7; ++row) {
        // slice浅复制days，不会影响原数组
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week);
    }

    return (
        <table className="date-table">
            <thead>
                <tr>
                    {/* colSpan="7"表示合并7个单元格 */}
                    <td colSpan="7">
                        <h5>
                            {/* getMonth()获取的month是从0开始的，所以要加一 */}
                            {startDay.getFullYear()}年{startDay.getMonth() + 1}月
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="date-table-weeks">
                    <th>周一</th>
                    <th>周二</th>
                    <th>周三</th>
                    <th>周四</th>
                    <th>周无</th>
                    <th className="weekend">周六</th>
                    <th className="weekend">周日</th>
                </tr>
                {
                    weeks.map((week, index) => {
                        return (
                            <Week 
                                key={index}
                                days={week}
                                onSelect={onSelect}
                            />
                        )
                    })
                }
            </tbody>
        </table>
    )
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
}

function DateSelector(props) {
    const {
        show,
        onSelect,
        onBack
    } = props;

    const now = new Date();
    // 把时、分、秒、毫秒设置成0，日期设置成当前月的一号。
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);

    const monthSequence = [now.getTime()];

    // 一旦month的值大于12，年份会自动加一，不用去处理这种情况
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());
    // monthSequence 为接下去三个月的月首0时0分0秒的时间数组

    return (
        <div className={classnames('date-selector', {hidden: !show})}>
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {
                    monthSequence.map(month => {
                        return (
                            <Month
                                key={month}
                                onSelect={onSelect}
                                startingTimeInMonth={month}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

DateSelector.propTypes = {
    show: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
}

export default DateSelector;
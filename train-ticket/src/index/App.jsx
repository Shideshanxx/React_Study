import React, {
    useCallback,
    useMemo
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import './App.css';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HighSpeed from './HighSpeed.jsx';
import Journey from './Journey.jsx';
import Submit from './Submit.jsx';

import CitySelector from '../common/CitySelector.jsx';
import DateSelector from '../common/DateSelector.jsx';

import { h0 } from '../common/fp';

// 引入的是action createtor，执行之后返回的是对象形式的action，需要dispatch才能生效
import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed
} from './actions'

function App(props) {
    const {
        from,
        to,
        isCitySelectorVisible,
        isDateSelectorVisible,
        cityData,
        isLoadingCityData,
        highSpeed,
        dispatch,
        departDate
    } = props;

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    // const doExchangeFromTo = useCallback(() => {
    //     dispatch(exchangeFromTo())
    // }, [])

    // const doShowCitySelector = useCallback(p => {
    //     dispatch(showCitySelector(p))
    // }, [])

    // 使用bindActionCreators更优雅地将函数传给 Journey组件
    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector
        }, dispatch)
    }, [])

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity
        }, dispatch)
    }, [])

    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector
        }, dispatch)
    }, [])

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack: hideDateSelector,
            },
            dispatch
        );
    }, []);

    const highSpeedCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggle: toggleHighSpeed
            },
            dispatch
        )
    }, [])

    const onSelectDate = useCallback((day) => {
        if (!day) {
            return;
        }
        if (day < h0()) {
            return;
        }

        dispatch(setDepartDate(day));
        dispatch(hideDateSelector());
    }, [])

    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form action="./query.html" className="form">
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <DepartDate
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed
                    {...highSpeedCbs}
                    highSpeed={highSpeed}
                />
                <Submit />
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoadingCityData={isLoadingCityData}
                {...citySelectorCbs}
            />
            <DateSelector
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
                onSelect={onSelectDate}
            />
        </div>
    )
}

// 把Provider中的数据同步到App中
export default connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch }
    }
)(App);
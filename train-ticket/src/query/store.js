import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

import { h0 } from '../common/fp.js';
import { ORDER_DEPART } from './constant';

// from、to、departDate、highSpeed这四个参数需要从url中解析出来；searchParsed 表示from、to、departDate、highSpeed的值是否已被解析
const store = createStore(
    combineReducers(reducers),
    {
        from: null,
        to: null,
        departDate: h0(Date.now()),
        highSpeed: false,
        trainList: [],
        orderType: ORDER_DEPART,
        onlyTickets: false,
        ticketTypes: [],
        checkedTicketTypes: {},
        trainTypes: [],
        checkedTrainTypes: {},
        departStations: [],
        checkedDepartStations: {},
        arriveStations: [],
        checkedArriveStations: {},
        departTimeStart: 0,
        departTimeEnd: 24,
        arriveTimeStart: 0,
        arriveTimeEnd: 24,
        isFiltersVisible: false,
        searchParsed: false
    },
    applyMiddleware(thunk)
)

export default store;
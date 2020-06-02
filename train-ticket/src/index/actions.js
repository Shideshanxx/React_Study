// 用常量表示action type，使代码更具可维护性
export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE =
    'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY =
    'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE =
    'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';

export function setFrom(from) {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    };
}

export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to,
    };
}

export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}

export function setCityData(cityData) {
    return {
        type: ACTION_SET_CITY_DATA,
        payload: cityData,
    };
}

// 根据当前的值来取反，所以需要用到异步action
export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch({
            type: ACTION_SET_HIGH_SPEED,
            payload: !highSpeed
        })
    }
}

// 这里因为是把两个action type用到一起，所以也需要用异步action
export function showCitySelector(currentSelectingLeftCity) {
    return (dispatch) => {
        dispatch({
            type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true
        })

        dispatch({
            type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity
        })
    }
}

export function hideCitySelector() {
    return {
        type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false
    }
}

export function setSelectedCity(city) {
    // 我们需要获取到currentSelectingLeftCity当前的值，所以这里也需要用异步action
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState();
        // currentSelectingLeftCity的意思是  是否正在选择左边的城市
        if (currentSelectingLeftCity) {
            dispatch(setFrom(city))
        } else {
            dispatch(setTo(city))
        }

        dispatch(hideCitySelector())
    }
}

export function showDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true
    }
}

export function hideDateSelector() {
    return {
        type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false
    }
}

export function exchangeFromTo() {
    return (dispatch, getState) => {
        const { from, to } = getState();
        dispatch(setTo(from))
        dispatch(setFrom(to))
    }
}

export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate
    }
}

export function fetchCityData() {
    return (dispatch, getState) => {
        const { isLoadingCityData } = getState();

        if (isLoadingCityData) {
            return
        }
        
        const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}')

        if (Date.now() < cache.expires) {
            dispatch(setCityData(cache.data))
            return;
        }
        dispatch(setIsLoadingCityData(true))

        fetch('/rest/cities?_' + Date.now())
            .then(res=> res.json())
            .then(cityData => {
                dispatch(setCityData(cityData))
                localStorage.setItem(
                    'city_data_cache',
                    JSON.stringify({
                        expires: Date.now() + 60 * 1000,
                        data: cityData
                    })
                )
                dispatch(setIsLoadingCityData(false))
            })
            .catch(() => {
                dispatch(setIsLoadingCityData(false))
            })
    }
}
import React, { useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";
import URI from "urijs";
import dayjs from "dayjs";
import Header from "../common/Header";
import Detail from "../common/Detail.jsx";
import Account from "./Account";
import Choose from "./Choose";
import Passengers from "./Passengers";
import Ticket from "./Ticket";
import Menu from "./Menu";

import "./App.css";

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setSeatType,
  setDepartDate,
  setSearchParsed,
  fetchInitial,
  createAdult,
  createChild,
  removePassenger,
  onUpdatePassenger,
  showMemu,
  hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
} from "./actions";
import { bindActionCreators } from "redux";

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);

    const { trainNumber, dStation, aStation, type, date } = queries;

    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSeatType(type));
    dispatch(setDepartDate(dayjs(date).valueOf()));
    dispatch(setSearchParsed(true));
  }, []);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI("/rest/order")
      .setSearch("dStation", departStation)
      .setSearch("aStation", arriveStation)
      .setSearch("type", seatType)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .toString();

    // 这次不在组件中写fetch了，而是把fetch操作定义在一个新的creator中
    dispatch(fetchInitial(url));
  }, [searchParsed, departStation, arriveStation, seatType, departDate]);

  const passengersCbs = useMemo(() => {
    return bindActionCreators(
      {
        createAdult,
        createChild,
        removePassenger,
        onUpdatePassenger,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu,
      },
      dispatch
    );
  }, []);

  const MenuCbs = useMemo(() => {
    return bindActionCreators(
      {
        showMemu,
        hideMenu,
      },
      dispatch
    );
  }, []);

  const chooseCbs = useMemo(() => {
    return bindActionCreators(
      {
        onUpdatePassenger,
      },
      dispatch
    );
  }, []);

  if (!searchParsed) {
    return null;
  }

  return (
      <div className="app">
          <div className="header-wrapper">
              <Header title="订单填写" onBack={onBack} />
          </div>
          <div className="detail-wrapper">
              <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        >
                  <span style={{ display: "block" }} className="train-icon"></span>
              </Detail>
          </div>
          <Ticket price={price} type={seatType} />
          <Passengers passengers={passengers} {...passengersCbs} />
          {passengers.length > 0 && (
          <Choose passengers={passengers} {...chooseCbs} />
      )}
          <Account length={passengers.length} price={price} />
          <Menu show={isMenuVisible} {...menu} {...MenuCbs} />
      </div>
  );
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);

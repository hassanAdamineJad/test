import React, { useEffect, useContext } from "react";
//Store
import { store } from "../../store/store";
import {
  CHANGE_RESULT,
  GET_CITY,
  GET_CITY_FAIL,
  CURRENT_CITY_INDEX,
} from "../../store/constant";
// API
import axios from "axios";
import { BaseUrl } from "../../utils/config";
// CMP
import { List, Filters } from "../../components";
//UI
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
// Helper
import { calcDistanceByLatLng } from "../../utils/helper";

// Styles
const useStyles = makeStyles((theme) => ({
  filterBox: {
    flexGrow: 1,
  },
  content: {
    display: "flex",
  },
  sideBar: {},
  result: {
    width: "100%",
    maxHeight: "295px",
    padding: theme.spacing(2.4, 1),
  },
  paper: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();

  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  useEffect(() => {
    fetchCity("nl");
  }, []);

  const fetchCity = async (city, params = "m") => {
    try {
      const result = await axios(`${BaseUrl}/${city}?${params}`);
      const data = addDistanceToResult(result.data);

      dispatch({ type: GET_CITY, value: data });
      dispatch({
        type: CHANGE_RESULT,
        value: data,
      });
    } catch (e) {
      console.log("e");
      dispatch({ type: GET_CITY_FAIL, value: e });
    }
  };
  const addDistanceToResult = (cities) => {
    return cities.map((city) => ({
      ...city,
      distance: calcDistanceByLatLng(city?.lat, city?.lng),
    }));
  };

  const handleReviewCity = (index) => {
    dispatch({ type: CURRENT_CITY_INDEX, value: index });
  };

  return (
    <>
      <div className={classes.filterBox}>
        <Filters />
      </div>
      <div className={classes.content}>
        <div className={classes.sideBar}>
          <List
            data={state.resultSearch}
            currentCityIndex={state.currentCityIndex}
            onClick={handleReviewCity}
          />
        </div>
        <div className={classes.result}>
          <Paper component="div" elevation={3} className={classes.paper}>
            <Typography variant="h5" component="div">
              {state.resultSearch[state.currentCityIndex]?.city}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              Provence:
              <Typography variant="h6" color="textPrimary" component="span">
                {state.resultSearch[state.currentCityIndex]?.admin_name}
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              capital:
              <Typography variant="h6" color="textPrimary" component="span">
                {state.resultSearch[state.currentCityIndex]?.capital}
              </Typography>
            </Typography>{" "}
            <Typography variant="body2" color="textSecondary" component="div">
              population:
              <Typography variant="h6" color="textPrimary" component="span">
                {state.resultSearch[state.currentCityIndex]?.population}
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              Distance:
              <Typography variant="h6" color="textPrimary" component="span">
                {state.resultSearch[state.currentCityIndex]?.distance}
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              Lat:
              <Typography variant="h6" color="textPrimary" component="span">
                {state.resultSearch[state.currentCityIndex]?.lat}
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              Lng:
              <Typography variant="h6" color="textPrimary" component="span">
                {state.resultSearch[state.currentCityIndex]?.lng}
              </Typography>
            </Typography>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Home;

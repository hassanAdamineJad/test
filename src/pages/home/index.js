import React, { useEffect, useContext } from "react";
//Store
import { store } from "../../store/store";
import {
  CHANGE_RESULT,
  GET_CITIES,
  GET_CITIES_FAIL,
  GET_CITIES_SUCCESS,
  CURRENT_CITY_INDEX,
} from "../../store/constant";
// CMP
import { List, Filters } from "../../components";
//UI
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
// Helper
import { showEmptyString } from "../../utils/helper";

// Styles
const useStyles = makeStyles((theme) => ({
  filterBox: {
    flexGrow: 1,
    backgroundColor: "red",
  },
  content: {
    display: "flex",
  },
  sideBar: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  result: {
    width: "100%",
    maxHeight: "295px",
    padding: theme.spacing(2.4, 1),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  paper: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40vh",
  },
}));

const Home = () => {
  const classes = useStyles();

  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  useEffect(() => {
    fetchCity();
  }, []);

  const fetchCity = async () => {
    dispatch({ type: GET_CITIES });

    try {
      fetch("/db.json")
        .then((res) => res.json())
        .then((data) => {
          const cities = data?.nl;
          dispatch({ type: GET_CITIES_SUCCESS, value: cities });
          dispatch({
            type: CHANGE_RESULT,
            value: cities,
          });
        });
    } catch (e) {
      dispatch({ type: GET_CITIES_FAIL, value: e });
    }
  };

  const handleReviewCity = (index) => {
    dispatch({ type: CURRENT_CITY_INDEX, value: index });
  };
  const renderResult = () => (
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
          {showEmptyString(
            state.resultSearch[state.currentCityIndex]?.population
          )}
        </Typography>
      </Typography>
      {/* <Typography variant="body2" color="textSecondary" component="div">
        Distance:
        <Typography variant="h6" color="textPrimary" component="span">
          {`${state.resultSearch[state.currentCityIndex]?.distance} km`}
        </Typography>
      </Typography> */}
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
  );

  return state.loading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : (
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
          {state.resultSearch?.length > 0 && renderResult()}
        </div>
      </div>
    </>
  );
};

export default Home;

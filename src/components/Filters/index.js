import React, { useState, useContext, useEffect } from "react";
//Store
import { store } from "../../store/store";
import {
  CHANGE_KEYWORD_SEARCH,
  CHANGE_RESULT,
  CURRENT_CITY_INDEX,
  GET_CITY,
  GET_CURRENT_LOCATION,
  GET_CURRENT_LOCATION_FAIL,
} from "../../store/constant";
// UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  Typography,
  Switch,
  FormControlLabel,
  Alert,
} from "@material-ui/core";

// Helper
import {
  calcDistanceByLatLng,
  getGeoFindMe,
  searchArrayWithKeyAndKeyword,
  onlyUniqueArray,
} from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  cardAction: {
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      minHeight: "100px",
    },
  },
  arrow: {
    border: "solid #fff",
    borderWidth: "0 2px 2px 0",
    display: "inline-block",
    padding: theme.spacing(0.3),
    marginLeft: theme.spacing(1),
  },
  arrowUp: {
    transform: "rotate(-135deg)",
  },
  arrowDown: {
    transform: "rotate(45deg)",
  },
  title: {
    fontSize: 14,
  },
  alert: {
    padding: "10px",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    marginLeft: "15px",
  },
}));
export default function Filters() {
  const classes = useStyles();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [typeSortCity, setTypeSortCity] = useState(true);
  const [typeSortPopulation, setTypeSortPopulation] = useState(true);
  const [findNearCities, setFindNearCities] = useState(false);

  useEffect(() => {
    if (findNearCities) {
      getFindNearCities();
    } else {
      dispatch({
        type: CHANGE_RESULT,
        value: searchArrayWithKeyAndKeyword(state.cities, "city", state.keyword)
          .concat(
            searchArrayWithKeyAndKeyword(
              state.cities,
              "admin_name",
              state.keyword
            )
          )
          .filter(onlyUniqueArray),
      }); // reset Distance
    }
  }, [findNearCities]);

  const getFindNearCities = () => {
    const cities = addDistanceToResult(state.cities);
    const resultSearch = addDistanceToResult(state.resultSearch)
      .filter((city) => {
        return Number(city.distance) < 30;
      })
      .sort((a, b) => (Number(a["distance"]) > Number(b["distance"]) ? 1 : -1));
    dispatch({ type: GET_CITY, value: cities });
    dispatch({
      type: CHANGE_RESULT,
      value: resultSearch,
    });
  };
  const addDistanceToResult = (cities) => {
    return cities.map((city) => ({
      ...city,
      distance: calcDistanceByLatLng(
        city?.lat,
        city?.lng,
        state.currentLocation
      ),
    }));
  };

  const handleSort = (list, field, type) => {
    let newList;
    if (type === "asc") {
      newList = list.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    } else {
      newList = list.sort((a, b) => (a[field] < b[field] ? 1 : -1));
    }
    dispatch({ type: CURRENT_CITY_INDEX, value: 0 });
    dispatch({ type: CHANGE_RESULT, value: newList });
  };

  const handleReset = () => {
    setTypeSortCity(true);
    setTypeSortPopulation(true);
    setFindNearCities(false);
    dispatch({ type: CURRENT_CITY_INDEX, value: 0 });
    dispatch({ type: CHANGE_KEYWORD_SEARCH, value: "" });
    dispatch({ type: GET_CURRENT_LOCATION_FAIL, value: "" });
    dispatch({ type: CHANGE_RESULT, value: state.cities });
  };

  const handleFindCitiesNearMe = () => {
    setFindNearCities(!findNearCities);
    getGeoFindMe(handleSuccessGetLocation, handleErrorGetLocation);
  };
  const handleErrorGetLocation = (e) => {
    dispatch({ type: GET_CURRENT_LOCATION_FAIL, value: e });
    setFindNearCities(false);
  };
  const handleSuccessGetLocation = (object) => {
    dispatch({ type: GET_CURRENT_LOCATION, value: object });
  };

  return (
    <Card className={classes.root}>
      <CardActions className={classes.cardAction}>
        <Typography>Sort By:</Typography>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            handleSort(
              state.resultSearch,
              "city",
              typeSortCity ? "asc" : "desc"
            );
            setTypeSortCity(!typeSortCity);
            setTypeSortPopulation(true);
          }}
        >
          City Name{" "}
          <i
            className={`${classes.arrow} ${
              typeSortCity ? classes.arrowUp : classes.arrowDown
            }`}
          />
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            handleSort(
              state.resultSearch,
              "populations",
              typeSortPopulation ? "asc" : "desc"
            );
            setTypeSortPopulation(!typeSortPopulation);
            setTypeSortCity(true);
          }}
        >
          Population{" "}
          <i
            className={`${classes.arrow} ${
              typeSortPopulation ? classes.arrowUp : classes.arrowDown
            }`}
          />
        </Button>

        <FormControlLabel
          control={
            <Switch
              onChange={handleFindCitiesNearMe}
              checked={findNearCities}
            />
          }
          labelPlacement="start"
          label="Find Near Cities"
        />
        <Button size="small" variant="contained" onClick={handleReset}>
          Clear Filters
        </Button>
        {state.currentLocationError.length > 0 && (
          <div className={classes.alert}>{state.currentLocationError}</div>
        )}
      </CardActions>
    </Card>
  );
}

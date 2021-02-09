import React, { useState, useContext } from "react";
//Store
import { store } from "../../store/store";
import { CHANGE_RESULT, CURRENT_CITY_INDEX } from "../../store/constant";
// UI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardActions, Typography } from "@material-ui/core";

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
}));
export default function Filters() {
  const classes = useStyles();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [typeSortCity, setTypeSortCity] = useState(true);
  const [typeSortPopulation, setTypeSortPopulation] = useState(true);
  const [typeSortDistance, setTypeSortDistance] = useState(true);

  const handleSort = (list, field, type) => {
    let newList;
    if (type === "asc") {
      newList = list.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    } else {
      newList = list.sort((a, b) => (a[field] < b[field] ? 1 : -1));
    }
    dispatch({ type: CURRENT_CITY_INDEX, value: 0 });
    return dispatch({ type: CHANGE_RESULT, value: newList });
  };
  const handleCitiesNearMe = (list, field, type) => {
    let newList;
    if (type === "asc") {
      newList = list
        .filter((city) => {
          return Number(city.distance) < 30;
        })
        .sort((a, b) => (Number(a[field]) > Number(b[field]) ? 1 : -1));
    } else {
      newList = list
        .filter((city) => {
          return city.distance < 30;
        })
        .sort((a, b) => (Number(a[field]) < Number(b[field]) ? 1 : -1));
    }
    dispatch({ type: CURRENT_CITY_INDEX, value: 0 });
    return dispatch({ type: CHANGE_RESULT, value: newList });
  };
  const handleReset = () => {
    setTypeSortCity(true);
    setTypeSortPopulation(true);
    setTypeSortDistance(true);
    dispatch({ type: CURRENT_CITY_INDEX, value: 0 });
    return dispatch({ type: CHANGE_RESULT, value: state.city });
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
          }}
        >
          Population{" "}
          <i
            className={`${classes.arrow} ${
              typeSortPopulation ? classes.arrowUp : classes.arrowDown
            }`}
          />
        </Button>

        <Button
          size="small"
          active
          variant="contained"
          color="primary"
          onClick={() => {
            handleCitiesNearMe(
              state.resultSearch,
              "distance",
              typeSortDistance ? "asc" : "desc"
            );
            setTypeSortDistance(!typeSortDistance);
          }}
        >
          Near Me{" "}
          <i
            className={`${classes.arrow} ${
              typeSortDistance ? classes.arrowUp : classes.arrowDown
            }`}
          />
        </Button>

        <Button size="small" variant="contained" onClick={handleReset}>
          Clear Filters
        </Button>
      </CardActions>
    </Card>
  );
}

import React, { useState, useContext } from "react";
//Store
import { store } from "../../store/store";
import { CHANGE_RESULT, CURRENT_CITY_INDEX } from "../../store/constant";
// UI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardActions, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    margin: theme.spacing(1, 0, 1, 0),
  },
  arrow: {
    border: "solid black",
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
  const [typeSortCity, setTypeSortCity] = useState(false);
  const [typeSortPopulation, setTypeSortPopulation] = useState(false);

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

  return (
    <Card className={classes.root}>
      <CardActions>
        <Typography>Sort By:</Typography>
        <Button
          size="small"
          variant="contained"
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
          onClick={() => {
            handleSort(
              state.resultSearch,
              "population",
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
      </CardActions>
    </Card>
  );
}

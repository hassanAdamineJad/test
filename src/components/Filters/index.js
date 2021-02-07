import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardActions, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 15,
  },
  arrow: {
    border: "solid black",
    borderWidth: " 0 2px 2px 0",
    display: "inline-block",
    padding: "3px",
    marginLeft: "3px",
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
});
export default function Filters({ handleSort }) {
  const classes = useStyles();
  const [typeSortCity, setTypeSortCity] = useState(false);
  const [typeSortPopulation, setTypeSortPopulation] = useState(false);
  return (
    <Card className={classes.root}>
      <CardActions>
        <Typography>Filters:</Typography>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            handleSort("city", typeSortCity ? "asc" : "desc");
            setTypeSortCity(!typeSortCity);
          }}
        >
          Sort By City Name{" "}
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
            handleSort("population", typeSortPopulation ? "asc" : "desc");
            setTypeSortPopulation(!typeSortPopulation);
          }}
        >
          Sort By Population{" "}
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

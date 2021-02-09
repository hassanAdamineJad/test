import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import Lazyload from "react-lazyload";
// helper
import { showEmptyString } from "../../utils/helper";

const useStyles = makeStyles((theme) => ({
  root: {},
  transition: "all 0.8s",
  card: {
    marginBottom: theme.spacing(2),
    transition: "all 0.3s",
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
    transition: "all 0.5s",
  },
}));

export default function List({ data, onClick, currentCityIndex }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary" component="p">
        {data.length}
      </Typography>
      {data.map((item, index) => (
        <Lazyload placeholder="loading..." key={index}>
          <Card
            className={`${classes.card} ${
              index === currentCityIndex && classes.active
            }`}
            onClick={() => onClick(index)}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.city}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                  >
                    {item.admin_name}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Population: {showEmptyString(item.population)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Population Proper: {showEmptyString(item.population_proper)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Distance: {`${item.distance} km`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Lazyload>
      ))}
    </div>
  );
}

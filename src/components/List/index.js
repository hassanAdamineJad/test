import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: { marginBottom: theme.spacing(2) },
  active: {
    backgroundColor: theme.palette.secondary.main,
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
        <Card
          className={`${classes.card} ${
            index === currentCityIndex && classes.active
          }`}
          key={index}
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
                Population: {item.population}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Population Proper: {item.population_proper}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Distance: {item.distance}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

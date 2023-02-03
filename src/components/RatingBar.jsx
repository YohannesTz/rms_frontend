import React from "react";
import { Rating } from "flowbite-react";
import _ from "lodash";

export const RatingBar = (props) => {
  return (
    <Rating>
      {_.range(props.value).map((_n, i) => (
        <Rating.Star key={i} />
      ))}
    </Rating>
  );
};

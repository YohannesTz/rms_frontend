import React from "react";
import { Tooltip } from "flowbite-react";

export const HomeMarker = () => {
  return (
    <div>
      <Tooltip content="Tooltip content" placement="bottom">
        <Button>Tooltip bottom</Button>
      </Tooltip>
    </div>
  );
};

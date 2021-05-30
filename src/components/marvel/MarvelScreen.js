import React from "react";
import { HeroList } from "../heroes/HeroList";

export const MarvelScreen = () => {
  const publisherName = "Marvel Comics";
  return (
    <div>
      <h1>Marvel Comics</h1>
      <hr />
      <HeroList publisher={publisherName} />
    </div>
  );
};

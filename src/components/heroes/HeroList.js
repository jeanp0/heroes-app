import React from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
  const heroes = getHeroesByPublisher(publisher);
  return (
    <div className="row">
      {heroes.map((hero) => (
        <div key={hero.id} className="col-6">
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

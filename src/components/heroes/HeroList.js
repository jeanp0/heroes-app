import React, { useMemo } from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);
  return (
    <div className="row">
      {heroes.map((hero) => (
        <div key={hero.id} className="col-6 animate__animated animate__fadeIn">
          <HeroCard {...hero} />
        </div>
      ))}
    </div>
  );
};

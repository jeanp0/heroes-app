import React from "react";
import { Link } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";
import test from "../../helpers/test";

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  test();
  return (
    <div className="card text-dark bg-light mb-3" style={{ maxWidth: 540 }}>
      <div className="row g-0">
        <div className="col-md-4 m-auto">
          <img
            src={heroImages(`./${id}.jpg`).default}
            className="card-img"
            alt={superhero}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{superhero}</h5>
            <p className="card-text">{alter_ego}</p>
            {alter_ego !== characters && (
              <p className="card-text">{characters}</p>
            )}
            <p className="card-text">
              <small className="text-muted">{first_appearance}</small>
            </p>
            <div className="d-grid">
              <Link className="btn btn-dark btn-sm" to={`./hero/${id}`}>
                Más..
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

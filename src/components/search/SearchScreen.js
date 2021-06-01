import React, { useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { useQuery } from "../../hooks/useQuery";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../heroes/HeroCard";

export const SearchScreen = ({ history }) => {
  const query = useQuery();
  const q = query.get("q") || "";
  const [{ searchText }, handleInputChange] = useForm({ searchText: q });
  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form className="input-group" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find your hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {!q && (
            <div className="alert alert-info animate__animated animate__fadeIn">
              Search a hero
            </div>
          )}
          {q && !heroesFiltered.length && (
            <div className="alert alert-danger animate__animated animate__fadeIn">
              There is no a hero with {q}
            </div>
          )}
          {heroesFiltered.map((hero) => (
            <div key={hero.id} className="animate__animated animate__fadeIn">
              <HeroCard {...hero} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

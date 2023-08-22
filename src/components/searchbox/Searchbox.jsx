import React, { useState, useEffect, useRef, useContext } from "react";
import "./Searchbox.css";

//import the context
import { CityContext } from "../../context/CityContext";

export const Searchbox = () => {
  const { cities, selectedCity, cityLoading, setSelecteCity, GetCities } =
    useContext(CityContext);

  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState({ id: "253810", name: "Managua, NI" });
  const iconLoading = useRef(null);
  const iconSeach = useRef(null);

  //when the component load at first time
  //look for Jinotega as a value
  useEffect(() => {
    GetCities(search.name);
  }, [search]);

  useEffect(() => {
    if (cityLoading) {
      iconLoading.current.classList.remove("hidden");
      iconSeach.current.classList.add("hidden");
    }

    if (!cityLoading) {
      iconLoading.current.classList.add("hidden");
      iconSeach.current.classList.remove("hidden");
    }
  }, [cityLoading]);

  /**
   * handle the input change in order to find the value
   * @param {*} e
   */
  const handlerInputChange = (e) => {
    if (e.key == "Enter") {
      setSearch({ ...search, id: "", name: e.target.value });

      GetCities(search.name);

      //open the bar
      if (cities.length > 0) setOpened(true);
      else setOpened(false);
    }
  };

  /**
   * handle the menu collapse items,
   * after a selected item, the menu collpase will be closed
   * @param {*} e
   */
  const handlerSelected = (e) => {
    //get the item id
    let dataID = e.target.dataset.id;
    let _city = cities.filter((item) => { return item.Key === dataID});
    setSelecteCity(_city[0]);


    //inputRef.current.val = e.target.dataset.id;
    //console.log(inputRef.current.val)

    //close the navbar collapse
    setOpened(false);
  };

  return (
    <>
      <section className="search-section">
        <section className="search-container">
          <div /*onBlur={handlerBlur}*/>
            <label htmlFor="input-search">
              <i className="fa-solid fa-temperature-low"></i>
            </label>
            <input
              type="text"
              id="input-search"
              name="input-search"
              className="input-search"
              placeholder="Managua, Nicaragua"
              aria-expanded={opened}
              aria-controls="found-items-search"
              onChange={() => {}}
              onKeyDown={handlerInputChange}
              //value={search.name}
            />
          </div>
          <i
            className="fa fa-search hidden"
            aria-hidden="true"
            ref={iconSeach}
          ></i>
          <i
            className="fa fa-spinner hidden"
            aria-hidden="true"
            ref={iconLoading}
          ></i>
        </section>

        {opened && (
          <ul id="found-items-search" className="found-items-search">
            {!cityLoading &&
              cities.length > 0 &&
              cities.map((_city) => {
                return (
                  <li
                    data-id={_city.Key}
                    data-name={`${_city.LocalizedName}, ${_city.AdministrativeArea.ID}`}
                    key={_city.Key}
                    onClick={handlerSelected}
                  >
                    {_city.LocalizedName}, {_city.AdministrativeArea.ID} -{" "}
                    {_city.Country.LocalizedName}
                  </li>
                );
              })}
          </ul>
        )}
      </section>
    </>
  );
};

import React, { useRef, useState } from "react";
import "./Searchbox.css";

export const Searchbox = () => {
  const [opened, setOpened] = useState(false);
  const [inputValue, setInputValue] = useState("Jinotega, Nic");

  const handlerFocus = () => {
    setOpened(!opened);
  };

  const handlerBlur = () => {
    setTimeout(() => {
      setOpened(false);
    }, 1000);
  };

  /**
   * handle the input change in order to find the value
   * @param {*} e 
   */
  const handlerInputChange = (e) => {
    setInputValue(e.target.value);
  }

  /**
   * handle the menu collapse items,
   * after a selected item, the menu collpase will be closed
   * @param {*} e 
   */
  const handlerSelected = (e) => {
    //get the item id
    let dataID = e.target.dataset.id;
    setInputValue(dataID);
    
    //close the navbar collapse
    setOpened(false);
  };

  return (
    <>
      <section className="search-section">
        <section className="search-container">
          <div onBlur={handlerBlur}>
            <label htmlFor="input-search">
              <i className="fa-solid fa-temperature-low"></i>
            </label>
            <input
              type="text"
              id="input-search"
              name="input-search"
              className="input-search"
              placeholder="Jinotega, Nic"
              aria-expanded={opened}
              aria-controls="found-items-search"
              onFocus={handlerFocus}
              onChange={ handlerInputChange }
              value={inputValue}
            />
          </div>
          <i className="fa fa-search" aria-hidden="true"></i>
        </section>

        {opened && (
          <ul id="found-items-search" className="found-items-search">
            <li data-id="item1" onClick={handlerSelected}>
              item1
            </li>
            <li data-id="item2" onClick={handlerSelected}>
              item2
            </li>
            <li data-id="item3" onClick={handlerSelected}>
              item3
            </li>
            <li data-id="item4" onClick={handlerSelected}>
              item4
            </li>
            <li data-id="item5" onClick={handlerSelected}>
              item5
            </li>
            <li data-id="item6" onClick={handlerSelected}>
              item6
            </li>
          </ul>
        )}
      </section>
    </>
  );
};

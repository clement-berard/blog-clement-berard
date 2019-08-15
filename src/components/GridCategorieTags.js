import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { startsWith } from 'lodash';
import { Link } from 'gatsby';

const GridCategoriesTags = ({ title, allItems }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [items, setItems] = useState(allItems);

  const filterItems = (event) => {
    const searchTermValue = event.target.value;
    setSearchTerm(searchTermValue);

    let filteredItems = allItems;
    if (event.target.value) {
      // eslint-disable-next-line array-callback-return,consistent-return
      filteredItems = allItems.filter(({ fieldValue }) => {
        if (startsWith(fieldValue, searchTermValue)) {
          return fieldValue;
        }
      });
    }

    setItems(filteredItems);
  };

  return (
    <div className="grid-categories-tags-wrapper column is-10 is-offset-1">
      <h1 className="title is-size-2 is-bold-light">{title}</h1>
      <div className="grid-categories-tags-search">
        <input
          type="text"
          placeholder="Rechercher"
          value={searchTerm || ''}
          onChange={filterItems}
        />
      </div>
      <div className="grid-categories-tags">
        {items.map(({ fieldValue, totalCount, linkTo }) => (
          <Link to={linkTo}>{`${fieldValue} (${totalCount})`}</Link>
        ))}
      </div>
    </div>
  );
};

export default GridCategoriesTags;

GridCategoriesTags.propTypes = {
  allItems: PropTypes.array,
  title: PropTypes.string,
};

GridCategoriesTags.defaultProps = {
  allItems: [],
  title: '',
};

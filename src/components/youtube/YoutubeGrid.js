import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import styled from 'styled-components';
import YoutubeEmbed from './YoutubeEmbed';
import { get } from '../utils/styleHelper';

const Grid = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(${get('totalNumberOfColums')}, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  & > * {
    grid-column: span ${get('spanColumns')};
    @media (min-width: 768px) {
      &.offset {
        grid-column: ${get('offsetColumns')} / span ${get('spanColumns')};
      }
    }
  }
`;

const YoutubeGrid = ({ ids, columnnumber }) => {
  // eslint-disable-next-line react/prop-types
  const allIds = ids.split(',');
  const numberOfItems = allIds.length;
  const restOfDivision = numberOfItems % columnnumber;
  const offsetColumns = columnnumber - restOfDivision + 1;
  const totalNumberOfColums = (columms) => columms * 2;
  const spanColumns = (columms) => totalNumberOfColums(columms) / columms;
  return (
    <Grid
      columnNumber={columnnumber}
      offsetColumns={offsetColumns}
      totalNumberOfColums={totalNumberOfColums(columnnumber)}
      spanColumns={spanColumns(columnnumber)}
    >
      {allIds.map((ytId, key) => {
        const isOnLastLine = key + 1 === numberOfItems - restOfDivision + 1 ? 'offset' : '';
        return (
          <YoutubeEmbed
            id={ytId}
            className={`item ${isOnLastLine}`}
            key={uniqueId()}
          />
        );
      })}
    </Grid>
  );
};

export default YoutubeGrid;

YoutubeGrid.propTypes = {
  columnnumber: PropTypes.number,
  ids: PropTypes.string.isRequired,
};

YoutubeGrid.defaultProps = {
  columnnumber: 3,
};

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25% /* 16:9 */;
  //padding-top: 25em;
  height: 0;
`;

const IframeItem = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const YoutubeEmbed = ({ id, className }) => (
  <IframeWrapper className={className}>
    <IframeItem
      title={id}
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder="0"
    />
  </IframeWrapper>
);

export default YoutubeEmbed;

YoutubeEmbed.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
};

YoutubeEmbed.defaultProps = {
  className: '',
};

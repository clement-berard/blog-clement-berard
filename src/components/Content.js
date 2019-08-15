import React from 'react';
import PropTypes from 'prop-types';
import RehypeReact from 'rehype-react';
import componentsToAdd from './utils/astImportComponents';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: { ...componentsToAdd },
}).Compiler;

export const HTMLContent = ({ content, className }) => (
  <div className={className}>{renderAst(content)}</div>
);

const Content = ({ content, className }) => (
  <div className={className}>{renderAst(content)}</div>
);

Content.propTypes = {
  content: PropTypes.any,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;

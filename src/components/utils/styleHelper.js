import _ from 'lodash';

export const get = (key, defaultValue = null, apply = null) => (props) => {
  // if calling `get` by passing `apply` in second argument
  if (_.isFunction(defaultValue)) {
    return defaultValue(_.get(props, key));
  }

  const value = _.get(props, key, defaultValue);

  if (_.isFunction(apply)) {
    return apply(value);
  }

  return value;
};

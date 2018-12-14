export const translate = (intl, id, values) =>
  intl.formatMessage({ id: `pickupPointsSelector.${id}` }, values)

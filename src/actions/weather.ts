export const setDays = (store) => {
  const newDays = { ...store.state.days };
  store.setState({ weather: newDays });
};

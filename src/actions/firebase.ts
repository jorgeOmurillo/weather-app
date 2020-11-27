export const login = async (store: any, userData: any, loading: any = true) => {
  store.setState({ loading, userData });
};

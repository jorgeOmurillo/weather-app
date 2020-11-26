export const login = async (store: any, userData: any, loading: any) => {
  store.setState({ loading, userData });
};

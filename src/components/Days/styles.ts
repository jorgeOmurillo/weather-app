import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 0,
    marginTop: 0,
    alignItems: "flex-start",
    backgroundColor: "#f7b733",
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 200,
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#f7b733",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dayContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#f7b733",
  },
  dayText: {
    fontSize: 30,
    color: "#fff",
  },
  tempText: {
    fontSize: 20,
    color: "#fff",
  },
  title: {
    fontSize: 15,
    color: "#fff",
  },
});
export default styles;

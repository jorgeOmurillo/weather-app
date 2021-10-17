import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 60,
    alignItems: 'flex-start',
    backgroundColor: '#f7b733',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 200,
    justifyContent: 'space-evenly',
  },
  button: {
    paddingTop: 60,
    alignItems: 'flex-start',
    backgroundColor: '#f7b733',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  dayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f7b733',
  },
  dayText: {
    fontSize: 25,
    color: '#fff',
  },
  tempText: {
    fontSize: 20,
    color: '#fff',
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
});
export default styles;

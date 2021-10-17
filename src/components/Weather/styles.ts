import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 48,
    color: '#fff',
  },
  bodyContainer: {
    // alignItems: "center",
    justifyContent: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#aaaaaa',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
});

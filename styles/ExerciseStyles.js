import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C5FF', //lighter blue
    alignItems: 'center',
  },
  containertwo: {
    alignItems: 'center',
    marginTop: 10,
    borderTopRightRadius: 70,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 70,
    backgroundColor: 'white',
    width: '100%'
  },
  link: {
    color: '#788eec',
    marginRight: 30,
    fontWeight: 'bold'
  },
  linkcontainer: {
    marginRight: 100
  }
});

export { styles }

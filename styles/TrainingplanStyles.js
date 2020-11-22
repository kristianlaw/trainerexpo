import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C5FF'
  },
  containerone: {
    flex: 1,
  },
  containertwo: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
    marginTop: 20
  },
  header: {
    flex: 1,
    alignItems: 'center',
    marginTop: 0
  },
  button : {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  textinput: {
  marginTop: 10,
  width: 250,
  alignItems: 'center',
  borderWidth: 1,
},
listcontainer: {
    flexDirection: 'row',
  alignItems: 'center'
},
footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10
},
input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    width: 250,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 16
},
});

export { styles }

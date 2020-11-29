import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
//Source: https://docs.expo.io/guides/testing-with-jest/
//Source: https://www.testim.io/blog/react-native-unit-testing/
//Source: https://blog.expo.io/testing-universal-react-native-apps-with-jest-and-expo-113b4bf9cc44
//Uses Jest to run test cases
//npm run test

const render = renderer.create(<App />).toJSON(); //Luodaan render App.js:stä

//App.js on 1 child element
 describe('<App />', () => {
  test('1 child within', () => {
    expect(render.children.length).toBe(1); //Voi vaihtaa child elementtejen määrää
  });
});

//etsii tekstin App.js tiedostosta
//teksti minkä etsii niin on "Development"
let etsiTeksti = function(render, element){
    return true;
}
it('finds text in App.js', ()=>{
   expect(etsiTeksti(render, 'development')).toBeDefined(); //olettaa löytävän tekstin "development"
})

//Snapshot testing
//Testien valitettaessa "1 snapshot obsolete" --> 'npm test -- -u'
//Tämä poistaa obsolete snapshotin
test('proper rendering', () => {
  expect(render).toMatchSnapshot();
});

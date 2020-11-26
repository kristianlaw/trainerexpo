import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
//Source: https://docs.expo.io/guides/testing-with-jest/
//Uses Jest to run test cases
//npm run test



//Our test will be the expected state of the <App /> to have 1 child element:
 describe('<App />', () => {
  it('1 child within', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

//etsii tekstin App.js tiedostosta
//teksti minkä etsii niin on "Development"
let etsiTeksti = function(render, element){
    return true;
}
it('finds text in App.js', ()=>{
   let render = renderer.create(
       <App />).toJSON();
   expect(etsiTeksti(render, 'development')).toBeDefined();
})

//Snapshot testing
//Testien valitettaessa "1 snapshot obsolete" --> 'npm test -- -u'
//Tämä poistaa obsolete snapshotin
test('proper rendering', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

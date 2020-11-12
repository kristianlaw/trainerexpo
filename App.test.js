import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';
//Source: https://docs.expo.io/guides/testing-with-jest/




//Our test will be the expected state of the <App /> to have 1 child element:
/* describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
}); */

//Snapshot testing
it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

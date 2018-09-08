import React from 'react';
import renderer from 'react-test-renderer';

import Container from './Container';

test('Container renders properly', () => {
    const tree = renderer.create(<Container />).toJSON();
    
    expect(tree).toMatchSnapshot();
})
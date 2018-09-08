import React from 'react';
import renderer from 'react-test-renderer';

import FooterElement from './FooterElement';

test('FooterElement renders properly', () => {
    const tree = renderer.create(<FooterElement />).toJSON();
    
    expect(tree).toMatchSnapshot();
})
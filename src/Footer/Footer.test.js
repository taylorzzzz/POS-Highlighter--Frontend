import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './Footer';

test('Footer renders properly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    
    expect(tree).toMatchSnapshot();
})
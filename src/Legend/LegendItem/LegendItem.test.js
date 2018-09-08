import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import LegendItem from './LegendItem';

test('LegendItem renders properly', () => {
    const tree = renderer.create(<LegendItem />).toJSON();
    
    expect(tree).toMatchSnapshot();
})

test('LegendItem toggleSelection events properly', () => {

    const toggleSpy = jest.fn();

    const wrapper = shallow(<LegendItem toggleSelection={toggleSpy}/>);
    
    expect(toggleSpy).toHaveBeenCalledTimes(0); 

    const input = wrapper.find('input');
    
    input.simulate('change');

    expect(toggleSpy).toHaveBeenCalled();
})
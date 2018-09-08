import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import DayNight from './DayNight';

test('DayNight renders properly', () => {
    const tree = renderer.create(<DayNight />).toJSON();
    
    expect(tree).toMatchSnapshot();
})

test('DayNight toggleDayNight events properly', () => {

    const spyToggle = jest.fn();

    const wrapper = shallow(<DayNight toggleDayNight={spyToggle}/>);

    expect(spyToggle).toHaveBeenCalledTimes(0);

    const input = wrapper.find('input');
    input.simulate('change');

    expect(spyToggle).toHaveBeenCalled();
    
})

test('DayNight dayToggled prop gets passed to checked properly', () => {

    const initialVal = false;

    const wrapper = shallow(<DayNight dayToggled={initialVal}/>);

    const input = wrapper.find('input');

    expect(input.props().checked).toBe(initialVal);
    
})
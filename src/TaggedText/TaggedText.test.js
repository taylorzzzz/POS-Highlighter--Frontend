import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TaggedText from './TaggedText';

test('TaggedText renders properly', () => {
    const tree = renderer.create(<TaggedText />).toJSON();
    
    expect(tree).toMatchSnapshot();
})

test('TaggedText toggleUnderline events properly', () => {
    const toggleSpy = jest.fn();

    const wrapper = shallow(<TaggedText toggleUnderline={toggleSpy} />);
    
    expect(toggleSpy).toHaveBeenCalledTimes(0);

    wrapper.find('input').simulate('change');
    
    expect(toggleSpy).toHaveBeenCalled();
})

test('TaggedText underline prop correctly sets checked value to false', () => {
    
    const wrapper = shallow(<TaggedText underline={false}/>);
    
    const input = wrapper.find('input');

    expect(input.props().checked).toBeFalsy();
})

test('TaggedText underline prop correctly sets checked value to true', () => {
    
    const wrapper = shallow(<TaggedText underline={true}/>);
    
    const input = wrapper.find('input');

    expect(input.props().checked).toBeTruthy();
})


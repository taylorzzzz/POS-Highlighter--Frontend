import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Legend from './Legend';

test('Legend renders properly', () => {
    const tree = renderer.create(<Legend />).toJSON();
    
    expect(tree).toMatchSnapshot();
})

test('Legend selectAll events properly', () => {

    const selectSpy = jest.fn();

    const wrapper = shallow(<Legend selectAll={selectSpy}/>);

    expect(selectSpy).toHaveBeenCalledTimes(0);

    const btn = wrapper.find('.select-all-btn');
    btn.simulate('click');
    
    expect(selectSpy).toHaveBeenCalled();
})

test('Legend deselectAll events properly', () => {

    const deselectSpy = jest.fn();

    const wrapper = shallow(<Legend deselectAll={deselectSpy}/>);

    expect(deselectSpy).toHaveBeenCalledTimes(0);

    const btn = wrapper.find('.deselect-all-btn');
    btn.simulate('click');
    
    expect(deselectSpy).toHaveBeenCalled();
})

test('Legend select default events properly', () => {

    const selectDefaultSpy = jest.fn();

    const wrapper = shallow(<Legend selectDefaults={selectDefaultSpy}/>);

    expect(selectDefaultSpy).toHaveBeenCalledTimes(0);

    const btn = wrapper.find('.select-defaults-btn');
    btn.simulate('click');
    
    expect(selectDefaultSpy).toHaveBeenCalled();
})

test('Legend toggleEdit events properly', () => {

    const toggleSpy = jest.fn();
    
    const wrapper = shallow(
        <Legend toggleEdit={toggleSpy}/>);

    expect(toggleSpy).toHaveBeenCalledTimes(0);

    const btn = wrapper.find('.edit-button');
    btn.simulate('click');
    
    expect(toggleSpy).toHaveBeenCalled();

})
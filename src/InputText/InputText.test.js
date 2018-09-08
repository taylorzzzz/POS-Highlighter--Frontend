import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import InputText from './InputText';

test('InputText renders properly', () => {
    const tree = renderer.create(<InputText />).toJSON();
    
    expect(tree).toMatchSnapshot();
})

test('InputText handleTextChange events properly', () => {

    const textChangeSpy = jest.fn();

    const tree = shallow(<InputText handleTextChange={textChangeSpy}/>);

    const textarea = tree.find('textarea');

    expect(textChangeSpy).toHaveBeenCalledTimes(0);

    textarea.simulate('change');
    
    expect(textChangeSpy).toHaveBeenCalledTimes(1);
})

test('InputText submitText events properly', () => {

    const testText = "I am the test text.";

    const submitTextSpy = jest.fn();

    const tree = shallow(<InputText submitText={submitTextSpy} />);

    const button = tree.find('button');

    expect(submitTextSpy).toHaveBeenCalledTimes(0);

    button.simulate('click');
    
    expect(submitTextSpy).toHaveBeenCalledTimes(1);
})

test('InputText text prop passed to textarea properly', () => {

    const testText = "I am the test text.";

    const tree = shallow(<InputText text={testText}/>);

    const textarea = tree.find('textarea');

    expect(textarea.props().value).toBe(testText);
})
import React from 'react';
import { schallow } from 'enzyme'
import { Settings } from './Settings'

describe('Settings', () => {
    const scaleChangeStub = jest.fn();
    const props = {
        scaleChange: scaleChangeStub,
        scale: 1
    };

    beforeEach(() => {
        scaleChangeStub.mockClear();
    });

    it('should call scaleChange on change', () => {

        mount(<Settings {...props} />)

        expect(scaleChangeStub).toHaveBeenCalledTimes(1);
    })
})
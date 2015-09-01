import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {createComponent} from './utilities';
import expect from 'expect';
import Exercise4 from '../src/demo-exercise-4';

describe('demo-exercise-4 component test suite', function () {

  describe('loading', function() {
    it('component is loaded properly', function () {
      expect(Exercise4).toNotBe(undefined);
    });
  });

  describe('demo-exercise-4 renders properly', function () {
    let component;

    beforeEach(() => {
      component = createComponent(Exercise4);
    });

    afterEach(() => {
      component = null;
    });

    it('renders correctly', function() {
      expect(component).toExist();
    });
  });
});

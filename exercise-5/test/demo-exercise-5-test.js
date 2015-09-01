import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {createComponent} from './utilities';
import expect from 'expect';
import Exercise5 from '../src/demo-exercise-5';

describe('demo-exercise-5 component test suite', function () {

  describe('loading', function() {
    it('component is loaded properly', function () {
      expect(Exercise5).toNotBe(undefined);
    });
  });

  describe('demo-exercise-5 renders properly', function () {
    let component;

    beforeEach(() => {
      component = createComponent(Exercise5);
    });

    afterEach(() => {
      component = null;
    });

    it('renders correctly', function() {
      expect(component).toExist();
    });
  });
});

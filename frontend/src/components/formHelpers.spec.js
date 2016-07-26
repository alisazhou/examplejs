jest.unmock('./formHelpers.js');
import { validateAndFindUntouched } from './formHelpers.js';


describe('validateAndFindUntouched form helper', () => {

  describe('when all fields are true', () => {
    // TODO: beforeEach doesn't work???
    const spy = jasmine.createSpy('spy');
    let mockEvent = { preventDefault: spy};
    const fieldsStatus = { fieldAValidated: true, fieldBValidated: true };
    const untouched = validateAndFindUntouched(mockEvent, fieldsStatus);
    it('does not prevent default', () => {
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
    it('finds no untouched', () => {
      expect(untouched).toEqual([]);
    });
  });

  describe('when some field is false', () => {
    const spy = jasmine.createSpy('spy');
    let mockEvent = { preventDefault: spy};
    const fieldsStatus = { fieldAValidated: false, fieldBValidated: true };
    const untouched = validateAndFindUntouched(mockEvent, fieldsStatus);
    it('prevents default', () => {
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
    it('finds no untouched', () => {
      expect(untouched).toEqual([]);
    });
  });

  describe('when some field is undefined', () => {
    const spy = jasmine.createSpy('spy');
    let mockEvent = { preventDefault: spy};
    const fieldsStatus = { fieldAValidated: undefined, fieldBValidated: true };
    const untouched = validateAndFindUntouched(mockEvent, fieldsStatus);
    it('prevents default', () => {
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
    it('finds untouched', () => {
      expect(untouched).toEqual([ 'fieldA' ]);
    });
  });
});

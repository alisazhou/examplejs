jest.unmock('./formHelpers.js');
import { validateAndFindUntouched } from './formHelpers.js';


describe('validateAndFindUntouched form helper', () => {
  let spy, mockEvent;
  beforeEach(() => {
    spy = jasmine.createSpy('spy');
    mockEvent = { preventDefault: spy };
  });

  describe('when all fields are true', () => {
    let fieldsStatus, untouched;
    beforeEach(() => {
      fieldsStatus = { fieldAValidated: true, fieldBValidated: true };
      untouched = validateAndFindUntouched(mockEvent, fieldsStatus);
    });

    it('does not prevent default', () => {
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('finds no untouched', () => {
      expect(untouched).toEqual([]);
    });
  });


  describe('when some field is false', () => {
    let fieldsStatus, untouched;
    beforeEach(() => {
      fieldsStatus = { fieldAValidated: false, fieldBValidated: true };
      untouched = validateAndFindUntouched(mockEvent, fieldsStatus);
    });

    it('prevents default', () => {
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('finds no untouched', () => {
      expect(untouched).toEqual([]);
    });
  });


  describe('when some field is undefined', () => {
    let fieldsStatus, untouched;
    beforeEach(() => {
      fieldsStatus = { fieldAValidated: undefined, fieldBValidated: true };
      untouched = validateAndFindUntouched(mockEvent, fieldsStatus);
    });

    it('prevents default', () => {
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('finds untouched', () => {
      expect(untouched).toEqual([ 'fieldA' ]);
    });
  });
});

jest.unmock('./formHelpers.js');
import { onNextClick } from './formHelpers.js';


describe('onNextClick callback', () => {
  let mockEvent;

  beforeEach (() => {
    mockEvent = jasmine.createSpyObj('mockEvent', [ 'preventDefault' ]);
  });

  it('does not prevent default when all fields are true', () => {
    const fieldsStatus = { fieldA: true, fieldB: true };
    onNextClick(mockEvent, fieldsStatus, 2);
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('prevents default when some field is false', () => {
    const fieldsStatus = { fieldA: false, fieldB: true };
    onNextClick(mockEvent, fieldsStatus, 2);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('prevents default when some field is undefined', () => {
    const fieldsStatus = { fieldA: true, fieldB: true };
    onNextClick(mockEvent, fieldsStatus, 3);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});

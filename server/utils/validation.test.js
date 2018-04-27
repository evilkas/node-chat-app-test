const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const notString = 12345;
    const checkString = isRealString(notString);

    expect(checkString).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    const bunchOfSpaces = '       ';
    const checkString = isRealString(bunchOfSpaces);

    expect(checkString).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    const validString = 'Test String';
    const checkString = isRealString(validString);

    expect(checkString).toBeTruthy();
  });
});
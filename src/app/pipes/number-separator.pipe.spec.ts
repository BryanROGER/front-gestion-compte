import { NumberFormatterPipe } from './number-formatter.pipe';

describe('NumberSeparatorPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});

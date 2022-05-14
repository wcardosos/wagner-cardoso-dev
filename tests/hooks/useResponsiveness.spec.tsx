import { useBreakpointValue } from '@chakra-ui/react';
import { useResponsiveness } from '../../src/hooks/useResponsiveness';

jest.mock('@chakra-ui/react', () => ({
  useBreakpointValue: jest.fn(),
}));

describe('Hook: useResponsiveness', () => {
  it('Should throw error when the wide version is not valid', () => {
    expect(() => {
      useResponsiveness('wide');
    }).toThrow('Invalid responsiveness wide version');
  });

  it('Should return if the screen is a wide version', () => {
    const expectedBreakpoint = {
      base: false,
      lg: true,
    };

    const useBreakpointValueMock = useBreakpointValue as jest
      .MockedFunction<typeof useBreakpointValue>;

    useBreakpointValueMock.mockImplementation(() => 'test');

    const result = useResponsiveness('desktop');

    expect(useBreakpointValueMock).toHaveBeenCalledWith(expectedBreakpoint);
    expect(result).toBe('test');
  });

  it('Should return if the screen is a mobile version', () => {
    const expectedBreakpoint = {
      base: true,
      lg: false,
    };

    const useBreakpointValueMock = useBreakpointValue as jest
      .MockedFunction<typeof useBreakpointValue>;

    useBreakpointValueMock.mockImplementation(() => 'test');

    const result = useResponsiveness('mobile');

    expect(useBreakpointValueMock).toHaveBeenCalledWith(expectedBreakpoint);
    expect(result).toBe('test');
  });
});

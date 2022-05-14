import { useBreakpointValue } from '@chakra-ui/react';

const WIDE_VERSIONS = ['desktop', 'mobile'];

export const useResponsiveness = (wideVersion: string): boolean => {
  if (!WIDE_VERSIONS.includes(wideVersion)) {
    throw new Error('Invalid responsiveness wide version');
  }

  const breakpoints = {
    desktop: {
      base: false,
      lg: true,
    },
    mobile: {
      base: true,
      lg: false,
    },
  };

  return useBreakpointValue(breakpoints[wideVersion]);
};

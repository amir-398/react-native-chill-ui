/**
 * Comprehensive collection of Box components for common layout patterns.
 * Each variant is pre-configured with specific Tailwind classes for optimal developer experience.
 *
 * @example
 * ```tsx
 * import { Box, BoxRow, BoxCenter } from 'chill-ui';
 *
 * <Box>
 *   <BoxRow>
 *     <BoxCenter>Centered content</BoxCenter>
 *   </BoxRow>
 * </Box>
 * ```
 */
export {
  // Basic
  Box,

  // Row Variants
  BoxRow,
  BoxRowCenter,
  BoxRowBetween,
  BoxRowCenterBetween,

  // Column Variants
  BoxColumn,
  BoxColumnCenter,
  BoxColumnBetween,
  BoxColumnCenterBetween,

  // Center Variants
  BoxCenter,

  // Grow Variants
  BoxGrow,
  BoxRowGrow,
  BoxColumnGrow,

  // Positioning Variants
  BoxAbsolute,

  // Stack Variants
  BoxStack,
} from './Box';

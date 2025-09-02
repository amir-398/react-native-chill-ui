/**
 * Badge component displays small labels, tags, or status indicators.
 * Supports both text and icon content with customizable colors, sizes, and border radius variants.
 *
 * @example
 * ```tsx
 * <Badge size="md" rounded="md">
 *   New
 * </Badge>
 *
 * <Badge
 *   badgeColor="#3B82F6"
 *   textColor="#FFFFFF"
 *   size="lg"
 *   rounded="full"
 * >
 *   Custom
 * </Badge>
 *
 * <Badge
 *   iconProps={{ name: 'star', color: '#FFD700' }}
 *   size="lg"
 *   rounded="full"
 * />
 * ```
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/badge/README.md Documentation}
 */
import Chip from './Chip';

export default Chip;

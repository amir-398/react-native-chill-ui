import Flow from './Flow';
import Fold from './Fold';
import Grid from './Grid';
import Chase from './Chase';
import Pulse from './Pulse';
import Swing from './Swing';
import Bounce from './Bounce';
import Wander from './Wander';
import Spinner from './Spinner';
import CircleFade from './CircleFade';
import { LoadingIndicatorProps } from '../../types/loadingIndicator.types';

/**
 * LoadingIndicator component that renders different types of loading animations.
 * Supports 10 different animation types with customizable size, color, and behavior.
 *
 * @example
 * ```tsx
 * // Basic usage with default spinner
 * <LoadingIndicator />
 *
 * // Specific animation type
 * <LoadingIndicator name="bounce" size={24} color="#007AFF" />
 *
 * // With custom styling
 * <LoadingIndicator
 *   name="pulse"
 *   size={32}
 *   color="#FF6B6B"
 *   animating={true}
 *   hidesWhenStopped={false}
 * />
 *
 * // Different animation types
 * <LoadingIndicator name="chase" size="lg" />
 * <LoadingIndicator name="circleFade" size="md" />
 * <LoadingIndicator name="flow" size="sm" />
 * <LoadingIndicator name="fold" size="xs" />
 * <LoadingIndicator name="grid" size={40} />
 * <LoadingIndicator name="swing" size={28} />
 * <LoadingIndicator name="wander" size={36} />
 * ```
 *
 * @param name - Type of loading animation ('bounce' | 'chase' | 'circleFade' | 'flow' | 'fold' | 'grid' | 'pulse' | 'spinner' | 'swing' | 'wander')
 * @param size - Size of the loading indicator (number or size variant)
 * @param color - Color of the loading indicator
 * @param animating - Whether the animation is running
 * @param hidesWhenStopped - Whether to hide when animation stops
 * @param style - Custom styles for the container
 * @param accessible - Whether the component is accessible
 * @param accessibilityLabel - Accessibility label for screen readers
 * @returns Loading indicator component with specified animation type
 */
function LoadingIndicator(props: LoadingIndicatorProps) {
  const { name, ...rest } = props;

  switch (name) {
    case 'bounce':
      return <Bounce {...rest} />;
    case 'chase':
      return <Chase {...rest} />;
    case 'circleFade':
      return <CircleFade {...rest} />;
    case 'flow':
      return <Flow {...rest} />;
    case 'fold':
      return <Fold {...rest} />;
    case 'grid':
      return <Grid {...rest} />;
    case 'pulse':
      return <Pulse {...rest} />;
    case 'spinner':
      return <Spinner {...rest} />;
    case 'swing':
      return <Swing {...rest} />;
    case 'wander':
      return <Wander {...rest} />;
    default:
      return <Spinner {...rest} />;
  }
}

export default LoadingIndicator;

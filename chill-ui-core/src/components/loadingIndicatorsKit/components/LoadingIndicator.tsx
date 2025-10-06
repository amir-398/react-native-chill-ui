import { LoadingIndicatorProps } from '@types';

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
import { loadingIndicatorSizes } from '../styles/loadingIndicator.styles';

/**
 * LoadingIndicator component that renders different types of loading animations.
 * Supports 10 different animation types with customizable size, color, and behavior.
 * Provides a unified interface for all loading indicator variants.
 *
 * @example
 * ```tsx
 * <LoadingIndicator
 *   name="bounce"
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param name - Type of loading animation ('bounce' | 'chase' | 'circleFade' | 'flow' | 'fold' | 'grid' | 'pulse' | 'spinner' | 'swing' | 'wander')
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the loading indicator (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @param accessible - Whether the component is accessible
 * @param accessibilityLabel - Accessibility label for screen readers
 * @returns Loading indicator component with specified animation type
 */
function LoadingIndicator(props: LoadingIndicatorProps) {
  const { name, size = 'md', ...rest } = props;

  const commonProps = {
    size: loadingIndicatorSizes[size],
    ...rest,
  };

  switch (name) {
    case 'bounce':
      return <Bounce {...commonProps} />;
    case 'chase':
      return <Chase {...commonProps} />;
    case 'circleFade':
      return <CircleFade {...commonProps} />;
    case 'flow':
      return <Flow {...commonProps} />;
    case 'fold':
      return <Fold {...commonProps} />;
    case 'grid':
      return <Grid {...commonProps} />;
    case 'pulse':
      return <Pulse {...commonProps} />;
    case 'spinner':
      return <Spinner {...commonProps} />;
    case 'swing':
      return <Swing {...commonProps} />;
    case 'wander':
      return <Wander {...commonProps} />;
    default:
      return <Spinner {...commonProps} />;
  }
}

export default LoadingIndicator;

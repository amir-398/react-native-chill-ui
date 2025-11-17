import { LoadingIndicatorProps } from '@types';

import Flow from './Flow';
import Fold from './Fold';
import Grid from './Grid';
import Chase from './Chase';
import Pulse from './Pulse';
import Swing from './Swing';
import Bounce from './Bounce';
import Spinner from './Spinner';
import CircleFade from './CircleFade';
import { loadingIndicatorSizes } from '../utils/loadingInficatoSizes';

/**
 * The `<LoadingIndicator />` component renders different types of loading animations.
 * Supports 10 different animation types with customizable size, color, and behavior.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { LoadingIndicator } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
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
 * @param animating - Whether the animation is running (default: true)
 * @param color - Color of the loading indicator (default: '#000')
 * @param hidesWhenStopped - Whether to hide when animation stops (default: false)
 * @param name - Type of loading animation: 'bounce' | 'chase' | 'circleFade' | 'flow' | 'fold' | 'grid' | 'pulse' | 'spinner' | 'swing' | 'wander'
 * @param size - Size of the loading indicator: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
 * @param style - Custom style object for the container
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
    default:
      return <Spinner {...commonProps} />;
  }
}

export default LoadingIndicator;

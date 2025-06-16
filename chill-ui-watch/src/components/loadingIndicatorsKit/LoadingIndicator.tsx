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
import { LoadingIndicatorProps } from '../../types';

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

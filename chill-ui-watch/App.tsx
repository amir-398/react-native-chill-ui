import { String, Box } from './src/components';
import './global.css';

export default function App() {
  return (
    <Box className="flex flex-1 items-center justify-center">
      <String>Hello</String>
      <String>Hello</String>
      <String className="text-4xl">Hello</String>
      <String className="text-4xl" color="dark">
        Hello
      </String>
      <String className="text-4xl">Hello</String>
      <String size="2xl" color="dark">
        Hello
      </String>
    </Box>
  );
}

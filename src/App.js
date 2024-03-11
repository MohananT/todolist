import './App.css';
import TodoRoot from './components/todoRoot';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <TodoRoot />
      </div>
    </ChakraProvider>
  );
}

export default App;

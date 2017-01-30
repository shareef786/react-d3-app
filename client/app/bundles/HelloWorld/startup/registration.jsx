import ReactOnRails from 'react-on-rails';

import HelloWorld from '../components/HelloWorld';
import Book from '../components/Book';
//import {LineChart} from '../components/HelloChart';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Book
  //LineChart
});

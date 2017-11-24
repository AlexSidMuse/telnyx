import '../src/config';

var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-15');

enzyme.configure({ adapter: new Adapter() });

// require all modules follwing spec pattern
// pass `true` for recursive
let context = require.context("../src", true, /\.spec\.(js|jsx)$/);

context.keys().forEach(context);

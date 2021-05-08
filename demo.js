// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button();
var check = new MyToolkit.Checkbox();
var radio = new MyToolkit.RadioButton(3);

check.move(100,200)
btn.move(100,100);
btn.onclick(function(e){
	console.log(e);
});
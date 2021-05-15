// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button();
var check = new MyToolkit.Checkbox();
var radio = new MyToolkit.RadioButton(4);
var txt = new MyToolkit.Textbox();
var scroll = new MyToolkit.Scrollbar();
var prog = new MyToolkit.Progressbar();
var tog = new MyToolkit.Toggle();

// scroll.onclick(function(e){
// 	console.log(e);
// })

prog.move(100,25)


tog.move(100, 350)
scroll.move(300, 100)
txt.move(100, 50)
radio.move(100, 210)
check.move(100, 170)
btn.move(100,100);
btn.stateChanged(function(e){
	console.log(e)
})
btn.onclick(function(e){
	console.log(e);
});
// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button();
var check = new MyToolkit.Checkbox("Checkbox");
var radio = new MyToolkit.RadioButton(4);
var txt = new MyToolkit.Textbox();
var scroll = new MyToolkit.Scrollbar();
var prog = new MyToolkit.Progressbar();
var tog = new MyToolkit.Toggle();
//check.text("new custom checkbox text")
//radio.text('new custom radio text')

btn.move(50,25);
check.move(50, 85)
radio.move(50, 125)
txt.move(50, 275)
scroll.move(250, 10)
prog.move(50, 325)
tog.move(50, 360)

btn.stateChanged(function(e){
	console.log(e)
})
btn.onclick(function(e){
	console.log(e.type);
});

check.stateChanged(function(e){
	console.log(e)
})
check.onclick(function(e){
	console.log(e);
});

radio.stateChanged(function(e){
	console.log(e)
})
radio.onclick(function(e){
	console.log(e);
});

txt.stateChanged(function(e){
	console.log(e)
})
console.log(txt.text())

scroll.stateChanged(function(e){
	console.log(e)
})
//scroll.height(200)
//console.log(scroll.pos())
prog.stateChanged(function(e){
	console.log(e)
})
console.log(prog.get())
prog.set(25)
prog.width(240)
prog.animate()




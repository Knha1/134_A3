// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// All Toolkit Widgets
var btn = new MyToolkit.Button();
var check = new MyToolkit.Checkbox();
var radio = new MyToolkit.RadioButton(4);	//Pass number of buttons, n, as an argument when creating the RadioButton
var txt = new MyToolkit.Textbox();
var scroll = new MyToolkit.Scrollbar();
var prog = new MyToolkit.Progressbar();
var tog = new MyToolkit.Toggle();

//prearranged buttons. Can still be moved by passing (x, y) arguments
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
//Custom Label Property to set the text on the button.
//btn.text('Button Text')


check.stateChanged(function(e){
	console.log(e)
})
check.onclick(function(e){
	console.log(e);
});
//Custom label property to set the text that appears to the right of the check box.
// check.text("CheckBox Text")

radio.stateChanged(function(e){
	console.log(e)
})
radio.onclick(function(e){
	console.log(e);
});
//Custom label property to set the text that appears to the right of each button. (All labels will be automatically numbered)
radio.text('RadioButton Text')

txt.stateChanged(function(e){
	console.log(e)
})
//custom property to get the text entered by the user.
//console.log(txt.text())


scroll.stateChanged(function(e){
	console.log(e)
})
//custom property to set the height of the scroll bar.
// scroll.height(180)
//custom property to get the position of the scroll thumb.
// console.log(scroll.pos())

prog.stateChanged(function(e){
	console.log(e)
})
//custom property to set the width of the progress bar.
prog.width(240)
//custom property to set the increment value of the progress bar.
prog.set(25)
//custom property to get the increment value of the progress bar.
console.log(prog.get())
//custom method to increment the value of the progress bar. The method should support an arbitrary numerical value from 0-100.
prog.animate()

//Custom Widget (Toggle)
tog.stateChanged(function(e){
	console.log(e)
})
tog.onclick(function(e){
	console.log(e);
});
//custom property to set the text of the "on" toggle
// tog.on('light')
//custom property to set the text of the "off" toggle
// tog.off('dark')




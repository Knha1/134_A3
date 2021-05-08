// File name: mytoolkit.js

import {SVG} from './svg.min.js';
//import { SVG } from '@svgdotjs/svg.js'

var MyToolkit = (function() {
    var draw = SVG().addTo('body').size('100%','100%');
    var Button = function(){
        
        var group = draw.group()
        var outline = group.rect(103,53).fill("black").radius(5)
        var rect = group.rect(100,50).fill('#dbdbdb').radius(2).stroke({color: 'black', width:1, linecap: 'round'})
        var text = group.text("click me").move(23, 15.5)

        var clickEvent = null


        group.mouseover(function(){
            rect.fill({ color: '#f2f2f2'})
            outline.fill({ color: '#696969'})
        })
        group.mouseover(function(){
            rect.fill({ color: '#f2f2f2'})
            outline.fill({ color: '#696969'})
        })
        group.mouseout(function(){
            rect.fill({ color: '#dbdbdb'})
            outline.fill({ color: 'black'})
        })
        group.mouseup(function(){
            rect.fill({ color: '#dbdbdb'})
            outline.fill({ color: 'black'})
        })
        group.click(function(event){
            rect.fill({ color: '#dbdbdb'})
            rect.move(rect.x() + 2, rect.y()+ 2)
            rect.animate().move(rect.x()-2, rect.y()-2)
            if(clickEvent != null)
                clickEvent(event)
        })


        return {
            move: function(x, y) {
                group.move(x,y)
                rect.move(x, y);
                outline.move(x,y)
                text. move(x + 23, y + 15.5)
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    }

    var Checkbox = function(){
        //var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group()
        var rect = group.rect(28,28).fill("white").radius(5).stroke({color: 'black', width: 1})
        var text = group.text("Checkbox").move(32, 7.5)

        var line = group.line(14, 21, 22, 8).stroke({ color: 'white', width: 4, linecap: 'round' })
        var line2 = group.line(8, 14, 14, 21).stroke({ color: 'white', width: 4, linecap: 'round' })
        

        
        group.click(function(event){
            if (line.attr().stroke == 'white'){
                line.stroke({color: 'black'})
                line2.stroke({color: 'black'})
                }
            else if (line.attr().stroke == 'black'){
                line.stroke({color: 'white'})
                line2.stroke({color: 'white'})
                }
        })

        return {
            move: function(x, y) {
                group.move(x,y)
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    }

    var RadioButton = function(n){
        var group = draw.group()
        // var rect = group.circle(24).fill("white").stroke({color: 'black', width: 1})
        // var text = group.text("Radio Button " + String(n)).move(30, 6)
        // var fill = group.circle(18).fill("black").move(3,3)
        
        
        if (n > 2){
            for (let i = 0; i < n; i ++){
                console.log(i)
                group.circle(24).fill("white").stroke({color: 'black', width: 1}). move(1 , 25 * i + 1)
                group.circle(18).fill("black").move(4, 25 * i + 4)
                group.text("Radio Button " + String(i + 1)).move(30 , 25 * i + 4)
            }
        }
        else{
            for (let i = 0; i < 2; i ++){
                console.log(i)
                group.circle(24).fill("white").stroke({color: 'black', width: 1}). move(1 , 25 * i + 1)
                group.circle(18).fill("black").move(4, 25 * i + 4)
                group.text("Radio Button " + String(i + 1)).move(30 , 25 * i + 4)
            }
        }
        
        group.click(function(event){

        })

        return {
            move: function(x, y) {
                group.move(x,y)
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    }
return {Button, Checkbox, RadioButton}
}());

export{MyToolkit}
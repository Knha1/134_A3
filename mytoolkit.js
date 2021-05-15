// File name: mytoolkit.js

import {SVG} from './svg.min.js';
//import { SVG } from '@svgdotjs/svg.js'

var MyToolkit = (function() {
    var draw = SVG().addTo('body').size('100%','100%');
    var window = draw.group()
    window.rect(400,400).stroke('pink').fill('white')

    var Button = function(){
        
        var group = draw.group()
        var outline = group.rect(103,53).fill("black").radius(5)
        var rect = group.rect(100,50).fill('#dbdbdb').radius(2).stroke({color: 'black', width:1, linecap: 'round'})
        var text = group.text("click me").move(23, 15.5)
        var clickEvent = null
        var stateEvent = 'idle'

        group.mouseover(function(){
            rect.fill({ color: '#f2f2f2'})
            outline.fill({ color: '#696969'})
            stateEvent = "hover"
        })
        group.mouseout(function(){
            rect.fill({ color: '#dbdbdb'})
            outline.fill({ color: 'black'})
            stateEvent = "idle"
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
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    }

    var Checkbox = function(){
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

    var RadioButton = function(num){
        var group = draw.group()
        var n = 2
        if (num > 2){
            n = num
        }

        for (let i = 0; i < n; i ++){
            group.circle(24).fill("white").stroke({color: 'black', width: 1}). move(1 , 25 * i + 1)
            group.text("Radio Button " + String(i + 1)).move(30 , 25 * i + 4)
        }
        
        group.click(function(event){
            group.each(function(i, children){
                if (this.type == "circle"){
                    this.fill('white')
                }
            })
            for (let i = 0; i < n; i ++){
                if ((event.y <= (group.get(i*2).attr().cy + group.get(0).attr().r)) && (event.y >= (group.get(i*2).attr().cy - group.get(0).attr().r))){

                    group.get(i*2).fill('red')
                }
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

    var Textbox = function(){
        var group = draw.group()
        var rect = group.rect(240,30).fill("white").radius(5).stroke({color: 'gray', width: 1})
        var caret = group.line(0, 8, 0, 30).stroke({ color: 'white', width: 2, linecap: 'round' }).move(4,4)
        var text = group.text("").move(4,20)
        text.build(true)

        group.mouseover(function(){
            caret.stroke({color: 'pink', width: 2, linecap: 'round' })
        })
        group.mouseout(function(){
            caret.stroke({color: 'white', width: 2, linecap: 'round' })
        })

        SVG.on(document, 'keydown', function(e) {
            caret.move(rect.attr().x + text.length() + 16, rect.attr().y + 4)
            text.plain(e.key)
           
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

    var Scrollbar = function(){
        var group = draw.group()
        var rect = group.rect(30,240).fill("white").radius(5).stroke({color: 'black', width: 1})
        var up = group.rect(28,28).fill('pink').radius(3).stroke({color:'white', width: 1}).move(1,1)
        var down = group.rect(28,28).fill('pink').radius(3).stroke({color:'white', width: 1}).move(1, 211)
        var polygonUp = group.polygon('0,0, 24,0, 12, 12, 0,0').fill('#f06').move(3, 222)
       
        var polygonDown = group.polygon('0,12, 24,12, 12,0, 0,12').fill('#f06').move(3, 8)
        var bar = group.rect(28,38).fill('gray').radius(2).move(1,30)
        var clickEvent = null

        bar.mouseup(function(){
            if(clickEvent != null)
            clickEvent(event.type)
            bar.mousemove(null)
            bar.fill('gray')
        })
        bar.mouseout(function(){
            if(clickEvent != null)
            clickEvent(event.type)
            bar.mousemove(null)
            bar.fill('gray')
        })
        bar.mousedown(function(){
            bar.fill('pink')
            if(clickEvent != null)
            clickEvent(event.type)

            bar.mousemove(function(){
                if (event.y > (up.cy() + 30)  && event.y < (down.cy()) - 38){
                    bar.move((rect.x() + 1), event.y - 15)
                }
            })
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

    var Progressbar = function(){
        var group = draw.group()
        var rect = group.rect(244,20).fill('white').radius(2).stroke({color: 'black', width: 2, linecap: 'round'})
        var w = 0
        var bar = group.rect(0,16).move(2,2).radius(2).fill('green')
        var incr = 10

        function animate(){
            while (w < rect.attr().width - 4){
                bar.animate(2000, 1000, 'last').attr({ width: w})
                if (bar.attr().width >= (rect.attr().width - 4)){
                    w = rect.attr().width - 4
                    bar.attr({width: w})
                }
                else{
                    w += rect.attr().width * incr/100
                    if (w >= (rect.attr().width - 4)){
                        w = rect.attr().width - 4
                    }
                    bar.attr({width: w})
                }
            }
            if (w >= (rect.attr().width - 4)){
                bar.animate(2000, 1000, 'last').attr({ width: w})
            }
        }
        
        return {
            move: function(x, y) {
                group.move(x,y)
            },
            width: function(width){
                rect.attr({width: width})
                animate()
            },
            set: function(inc){
                incr = inc
                animate()
            },
            get: function(){
                console.log(incr)
                return incr
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            }
        }
    }

    var Toggle = function(){
        var group = draw.group()
        var rect = group.rect(70, 28).fill('white').radius(15).stroke({color: 'blue', width: 2, linecap: 'round'}).move(1,1)
        var circle = group.circle(24).fill('black').move(3,3)
        
        group.click(function(event){
            if (circle.attr().fill == 'black'){
                circle.animate().move(44 + rect.attr().x ,rect.attr().y + 2)
                circle.fill('white')
                rect.fill('blue')
            }
            else{
                circle.animate().move(rect.attr().x + 2, rect.attr().y + 2)
                circle.fill('black')
                rect.fill('white')
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

return {Button, Checkbox, RadioButton, Textbox, Scrollbar, Progressbar, Toggle}
}());

export{MyToolkit}
// File name: mytoolkit.js

import {SVG} from './svg.min.js';
//import { SVG } from '@svgdotjs/svg.js'

var MyToolkit = (function() {
    var Button = function(){
        var draw = SVG().addTo('body').size('50%','50%');
        var group = draw.group()
        var outline = group.rect(103,53).fill("black").radius(5)
        var rect = group.rect(100,50).fill('#dbdbdb').radius(2)
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
        var draw = SVG().addTo('body').size('100%','100%');
        var group = draw.group()
        var outline = group.rect(30,30).fill("#636363").radius(5)
        var rect = group.rect(28,28).fill("white").radius(5)
        rect.move(rect.x() + 1, rect.y() + 1)

        group.click(function(event){
            var check = draw.group()
            var line = group.draw.line(0,100,100,0).move(20, 20)
            line.stroke({color: 'black', width:10, linecap: 'round'})
        })
    }
return {Button, Checkbox}
}());

export{MyToolkit}
// File name: mytoolkit.js

import {SVG} from './svg.min.js';

var MyToolkit = (function() {
    var draw = SVG().addTo('body').size('100%','100%');

    /** This the function to create an object Button. */
    var Button = function(){
        var group = draw.group()
        var outline = group.rect(103,53).fill("black").radius(5)
        var rect = group.rect(100,50).fill('lightblue').radius(2).stroke({color: 'blue', width:1, linecap: 'round'})
        var text = group.text("click me").move(23, 15.5)
        var clickEvent = null
        var stateEvent = null
        var defaultState = 'idle'
        
        group.mouseover(function(){
            rect.fill({ color: '#c4f5f5'}).stroke({color: 'lightblue', width:1, linecap: 'round'})
            outline.fill({ color: 'lightblue'})
            defaultState = "hover"
            transition()
        })
        group.mouseout(function(){
            rect.fill({ color: 'lightblue'}).stroke({color: 'blue', width:1, linecap: 'round'})
            outline.fill({ color: 'blue'})
            defaultState = "idle"
            transition()
        })

        outline.mouseout(function(){
            defaultState = "idle"
            transition()
        })

        group.click(function(event){
            rect.fill({ color: 'lightblue'}).stroke({color: 'blue', width:1, linecap: 'round'})
            outline.fill('blue')
            rect.move(rect.x() + 2, rect.y()+ 2)
            rect.animate().move(rect.x()-2, rect.y()-2)
            if(clickEvent != null)
                clickEvent(event)
        })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)       
        }

        
        /** functions to call on object Button */
        return {
            /** 
             * Moves the object
             * @param {x} x - the x value
             * @param {y} y - the y value
             */
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
            },
            /** 
             * Custom Label Property to set the text on the button.
             * @param {txt} - the text label on the button
             */
            text: function(txt){
                text.text(txt)
            }
        }
    }

    /** This the function to create an object Checkbox. */
    var Checkbox = function(){
        var group = draw.group()
        var rect = group.rect(28,28).fill("white").radius(5).stroke({color: 'black', width: 1})
        var text = group.text("Checkbox").move(32, 7.5)
        var line = group.line(14, 21, 22, 8).stroke({ color: 'white', width: 4, linecap: 'round' })
        var line2 = group.line(8, 14, 14, 21).stroke({ color: 'white', width: 4, linecap: 'round' })
        var clickEvent = null
        var stateEvent = null
        var defaultState = "idle"

        group.mouseover(function(){
            defaultState = "hover"
            transition()
        })

        rect.mouseout(function(){
            defaultState = "idle"
            transition()
        })

        group.click(function(event){
            if (line.attr().stroke == 'white'){
                line.stroke({color: 'blue'})
                line2.stroke({color: 'blue'})
                if(clickEvent != null)
                clickEvent(event.type + " (checked)")
                }
            else if (line.attr().stroke == 'blue'){
                line.stroke({color: 'white'})
                line2.stroke({color: 'white'})
                if(clickEvent != null)
                clickEvent(event.type + " (unchecked)")
                }
        })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)       
        }

        /** functions to call on object Checkbox */
        return {
            /** 
             * Moves the object
             * @param {x} x - the x value
             * @param {y} y - the y value
             */
            move: function(x, y) {
                group.move(x,y)
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Custom label property to set the text that appears to the right of the check box.
             * @param {txt} - the text label to the right of the check box
             */
            text: function(txt){
                text.text(txt)
            }
                
            
        }
    }

    /** This the function to create an object RadioButton. */
    var RadioButton = function(num){
        var group = draw.group()
        var n = 2
        var clickEvent = null
        var stateEvent = null
        var defaultState = "idle"
        
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
                    group.get(i*2).fill('blue')
                    if(clickEvent != null)
                        clickEvent(event.type + " (" + (i + 1) +  " checked)")
                }
            }
        })
        group.each(function(i, children){
            if (this.type == "circle"){
                this.fill('white')
                this.mouseout(function(event){
                    defaultState = "idle"
                    transition()
                })
            }
        })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)  
        }

        /** functions to call on object Radiobutton */
        return {
            /** 
             * Moves the object
             * @param {x} x - the x value
             * @param {y} y - the y value
             */
            move: function(x, y) {
                group.move(x,y)
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * Custom label property to set the text that appears to the right of each button. (All labels will be automatically numbered)
             * @param {txt} - the text label to the right of the check box
             */
            text: function(txt){
                group.each(function(i, children){
                    if (this.type == "text"){
                        this.text(txt + (i+ 1)/2)
                    }
                })
            }
        }
    }

    /** This the function to create an object Textbox. */
    var Textbox = function(){
        var group = draw.group()
        var rect = group.rect(240,30).fill("white").radius(5).stroke({color: 'gray', width: 1})
        var caret = group.line(0, 8, 0, 30).stroke({ color: 'white', width: 2, linecap: 'round' }).move(4,4)
        var text = group.text("").move(rect.x() + 4,rect.cy() - 10)
        text.build(true)

        var stateEvent = null
        var defaultState = "idle"

        group.mouseover(function(){
            caret.stroke({color: 'lightblue', width: 2, linecap: 'round' })
            defaultState = "hover"
            transition()
        })
        group.mouseout(function(){
            caret.stroke({color: 'white', width: 2, linecap: 'round' })
            defaultState = "idle"
            transition()
        })

        SVG.on(document, 'keydown', function(e) {
            caret.move(rect.attr().x + text.length() + 16, rect.attr().y + 4)
            text.plain(e.key).move(rect.x() + 4,rect.cy() - 10)
            defaultState = e.type
            transition()
            defaultState = "text changed"
            transition()
            console.log("new text: " + text.text())
          })
          SVG.on(document, 'keyup', function(e) {
            defaultState = e.type
            transition()
            defaultState = 'idle'
            transition()
          })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)       
        }

        /** functions to call on object Textbox */
        return {
            /** 
             * Moves the object
             * @param {x} x - the x value
             * @param {y} y - the y value
             */
            move: function(x, y) {
                group.move(x,y)
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            /**
             * custom property to get the text entered by the user.
             * @return {text} - the text value entered by the user
             */
            text: function(){
                return text.text()
            }
        }
    }

    /** This the function to create an object Scrollbar. */
    var Scrollbar = function(){
        var group = draw.group()
        var rect = group.rect(30,240).fill("white").radius(5).stroke({color: 'black', width: 1})
        var up = group.rect(28,28).fill('lightblue').radius(3).stroke({color:'white', width: 1}).move(1,1)

        var down = group.rect(28,28).fill('lightblue').radius(3).stroke({color:'white', width: 1}).move(1, rect.height() - up.height() - 1)
        var polygonDown = group.polygon('0,0, 24,0, 12, 12, 0,0').fill('blue').move(3, 222)
       
        var polygonUp = group.polygon('0,12, 24,12, 12,0, 0,12').fill('blue').move(3, 8)
        var bar = group.rect(28,38).fill('lightblue').radius(2).move(1,30)
        
        var stateEvent = null
        var defaultState = 'idle'

        group.mouseover(function(){
            defaultState = "hover"
            transition()
        })

        bar.mouseup(function(){
            defaultState = 'idle'
            transition()
            bar.mousemove(null)
            bar.fill('lightblue')
            
        })
        bar.mouseout(function(){
            bar.mousemove(null)
            bar.fill('lightblue')
            defaultState = 'idle'
            transition()
        })
        bar.mousedown(function(){
            bar.fill('blue')
            defaultState = 'pressed'
            transition()
            bar.mousemove(function(){
                if (event.movementY == -1){
                    defaultState = 'moved up'
                }
                else if (event.movementY == 1){
                    defaultState = 'moved down'
                }
                    transition()
                if (event.y > (up.cy() + 30)  && event.y < (down.cy()) - 38){
                    bar.move((rect.x() + 1), event.y - 15)
                }
            })
        })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)       
        }

        /** functions to call on object Scrollbar */
        return {
            /** Moves the object
             * @param {x} x - the x value
             * @param {y} y - the y value
             */
            move: function(x, y) {
                group.move(x,y)
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * custom property to set the height of the scroll bar.
             * @param {height} - the height of the scroll bar 
             */
            height:function(h){
                rect.height(h)
                down.move(rect.x() + 1, (rect.y() + rect.height()) - up.height() - 1)
                polygonDown.move(rect.x() + 3, (rect.y() + rect.height() - 18))
            },
            /**
             * custom property to get the position of the scroll thumb.
             * @return {number} - the center y value of the scroll thumb
             */
             pos: function(){
                return bar.cy()
            },
        }
    }

    /** This the function to create an object Progressbar. */
    var Progressbar = function(){
        var group = draw.group()
        var rect = group.rect(244,20).fill('white').radius(2).stroke({color: 'black', width: 2, linecap: 'round'})
        var w = 0
        var bar = group.rect(0,16).move(2,2).radius(2).fill('blue')
        var incr = 10
        var stateEvent = null
        var defaultState = "idle"

        group.mouseover(function(){
            defaultState = "idle"
            transition()
        })

        function animate(){
            defaultState = 'load'
            transition()
            
            while (w < rect.attr().width - 4){
                bar.animate(2000, 10, 'last').attr({ width: w}).after(function(){console.log("Progress: " + bar.width()/rect.width()*100 + "%")})
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
                bar.animate(2000, 10, 'last').attr({ width: w}).after(function(){console.log("Progress: 100%")})
            }

        }

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)       
        }
        
        /** functions to call on object Progressbar */
        return {
            /** 
             * Moves the object
             * @param {x} x - the x value
             * @param {y} y - the y value
             */
            move: function(x, y) {
                group.move(x,y)
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             * custom property to set the width of the progress bar.
             * @param {width} - the width value of the progress bar 
             */
            width: function(width){
                rect.attr({width: width})
            },
            /**
             * custom property to set the increment value of the progress bar.
             * @param {inc}  - the increment value of the progress bar
             */
            set: function(inc){
                incr = inc
            },
            /**
             * custom property to get the increment value of the progress bar.
             * @returns {number} - the increment value of the progress bar
             */
            get: function(){
                return incr
            },
            /** custom method to increment the value of the progress bar. The method should support an arbitrary numerical value from 0-100.
             * @return {null} - Starts the process of animating the progress bar based on the given increment value
            */
            animate: function(){
                animate()
            }
        }
    }

    /** This the function to create an object Toggle. */
    var Toggle = function(){
        var group = draw.group()
        var rect = group.rect(70, 28).fill('white').radius(15).stroke({color: 'blue', width: 2, linecap: 'round'}).move(1,1)
        var on = group.text("ON").move(4, 6).fill('white')
        var off = group.text("OFF").move(34, 6).fill('blue')
        var circle = group.circle(24).fill('black').move(3,3)
        var clickEvent = null
        var stateEvent = null
        var defaultState = "idle"

        group.mouseover(function(){
            defaultState = "hover"
            transition()
        })

        rect.mouseout(function(){
            defaultState = "idle"
            transition()
        })
        
        group.click(function(event){
            if (circle.attr().fill == 'black'){
                circle.animate().move(44 + rect.attr().x ,rect.attr().y + 2)
                circle.fill('white')
                rect.fill('blue')
                if(clickEvent != null)
                clickEvent(event.type + " (ON)")
            }
            else{
                circle.animate().move(rect.attr().x + 2, rect.attr().y + 2)
                circle.fill('black')
                rect.fill('white')
                if(clickEvent != null)
                clickEvent(event.type + " (OFF)")
            }

        })

        function transition(){
            if(stateEvent != null)
                stateEvent(defaultState)       
        }

        /** functions to call on object Toggle */
        return {
            /** Moves the object
             * @param {x} x - the x value
             * @param {y} y - the y value
             */
            move: function(x, y) {
                group.move(x,y)
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            stateChanged: function(eventHandler){
                stateEvent = eventHandler
            },
            /**
             *custom property to set the text of the "on" toggle
             * @param {text} - the text value of the "on" toggle
             */
            on: function(txt){
                on.text(txt)
            },
            /**
             *custom property to set the text of the "off" toggle
             * @param {text} - the text value of the "off" toggle
             */
            off: function(txt){
                off.text(txt)
            }
        }
    }

return {Button, Checkbox, RadioButton, Textbox, Scrollbar, Progressbar, Toggle}
}());

export{MyToolkit}
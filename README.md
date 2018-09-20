# Canvas

### To Do

1. Drawing Fx
2. UI / Mobile Support
3. Un-dos(Re-do)


***

### Drawing Fx

1. Rectangle / Square
2. Ellipse / Circle
3. Straight line
4. Pencil / Brush
5. Fonts
6. Eraser / Clear
7. Fill color, Stroke color, Paint


***

### Re-Un-do

```
ctx.save();
```

```
ctx.restore();
```

Output: 

API [`toBlob()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)

[Firebase Storage](https://firebase.google.com/)

***

### UI



`canvas-common.js`

https://www.youidraw.com/apps/painter/



size option 

border / fill color option

display

***

### ~~Maybe~~ 	TODO

1. ~~DL / UL~~	done
2. ~~Background img~~ done
3.  filter
4. Different type of brush in this [article](http://perfectionkills.com/exploring-canvas-drawing-techniques/) (1 available now)
3. Mobile Support


*****

### 16/03/2018

##### Rectangle (solid & hollow)

mouse-down on canvas to start (top-left), drag to resize, mouse-up to draw, hold shift for square

##### Square (solid & hollow)

mouse-down on canvas to start (origin), drag to resize (radius), mouse-up to draw

##### Straight line

mouse-down on canvas to start (starting point), drag to resize (length), mouse-up to draw

##### Polygon (outdated)

mouse-down on canvas to start (starting point), drag to resize (length), mouse-up to draw first line

move mouse and then click to draw more lines

hold shift when click to auto complete

##### Pencil

mouse-down on canvas to start drawing, mouse-up to stop

##### Quadratic Curve

1st click on canvas to set starting point, 2nd click on canvas to set on point, mouse-down and drag to locate control point, mouse-up  to set control point and draw

##### Eraser

mouse-down on canvas to start erasing, mouse-up to stop

##### Clear

Reset the canvas

##### To do

~~polygon with color fill~~

~~dotted line on preview~~

~~dotted line for straight line, hollow rectangle/circle/polygon, quad.curve~~

~~ellipse~~

~~brush~~ becomes special pencil

~~fonts~~

~~color/paint~~

***

### 18/03/2018

##### Polygon - update

click on canvas to pin points, move to resize, preview with fill color

hold shift when click to auto complete

##### Dotted-line

added dotted line on preview for straight line, hollow rectangle, circle, quad.curve

##### Ellipse

added ellipse function, ~~need improvement~~  done

##### Fonts

implemented plugin from https://goldfirestudios.com/blog/108/CanvasInput-HTML5-Canvas-Text-Input

mouse-down and drag to create input field, hit enter when done

will allow options on font-size/family/color/align

##### Canvas-common

moved global var section to bottom, added more var

***

### 19/03/2018

##### Paint

implemented source code from https://jsfiddle.net/Fidel90/1e8e3z7e/

add color option at line 117, color obj {r:255, g:255, b:255, a:1}

~~bug: seems to crash sometime after sometime~~ crash when apply color = original color

status: fixed

##### Default function

set as pencil, to avoid `VM20 canvas-common.js:41 Uncaught TypeError: Cannot read property 'moveEventFunction' of undefined`

##### Redo Undo

~~implemented, but with bugs~~ done

##### Eraser

fixed `.lineJoin = "round"` not rendered

***

### 20/03/2018

##### Redo Undo

debugged

##### Load image as background

implemented

##### UI

outline ready, color-pad ready 90%, color value get, fail to pass to global var

##### Quad.curve

improved UX

##### Img Filter

now support grayscale and brightness

##### Custom Color on drawing

bug fixed

##### Color Pad

almost ready

***

### 21/03/2018

##### eye-dropper

added, will set color to `strokeColor` and `fillColor`

##### Pencil style

added new style

##### Paint bucket

Fixed crush bug

##### Out of bound behavior

action will resume after dragging out of then back into canvas(without releasing)

##### Zoom in / out

added feature

note: quality will lower after zooming out

***

### 22/03/2018

##### UI

update on web UI, merge files, 

fixes: update global var, click event offset, added dotted line toggle

##### Color pad

fixed stroke/fill toggle, added live color to button, fixed bugs

##### To-do

Save the resulting images to [Firebase Storage](https://firebase.google.com/) 

~~add btns for sp pencil's choice~~	done

~~quad curve~~	done

~~will allow options on font-size/family/color/align~~ done

##### Zoom and Pan

transform ok

offset solved

still one bug

##### Push to surge


# RED-web-dev-project-02
Instanews project using NYT api
##### [GitHub Pages](https://htichcock.github.io/RED-web-dev-project-02/)

![instanews screenshot](https://imgur.com/UtZzyKf.jpg)

## Technology Used

html5
scss
gulp
jquery and plugins

##Personal Learnings 

### html
On this project I gave using BEM naming a try, you'll also see this in my SCSS.

### scss
I found scss really useful, I used variables to store key colors and media break widths, and mixins to do the media breaks. I found that after using BEM class names, the nesting in SCSS was very simple and allowed me to overwrite any style I needed to easily because everything only had 1 class specificity.
I also used css transitions to animate a few aspects of the page.

### gulp
I love using gulp. My gulp setup will, lint and minify my js, compile and minify my scss, and reload the browser on any save to files being used by the browser. I utilized gulp-plumber and gulp-prettyerror to handle my errors and also set up a message to read out changes to files in my working branch.

### jquery and plugins
This was both the most challenging and fun part of the project. Some highlights of my learning were to create element objects but not insert them into the DOM so that the browser will cache them. I used this to preload the background images of the tiles to avoid the scroll from top loading that sometimes happens. Also I used the event touchstart to detect a touch screen so that hover effects would not take place(try my site on your phone!)



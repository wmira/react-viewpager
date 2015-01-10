react-viewpager
==============================
A very simple View Pager written in React

## Usage

```javascript
    var pager = ViewPager.render({ views : ["page1","page2","page3"], visible:"page1"},"viewpager-container");

    pager.el('page2').innerHTML = "PAGE 2"; //get the el
    pager.show('page2'); //show it
```

## Dev

1. Clone it
2. npm install
3. npm install -g live-server
4. npm run watch
5. live-server

Live Server automatically reloads the browser as you edit.
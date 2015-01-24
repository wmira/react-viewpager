(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ViewPager"] = factory(require("react"));
	else
		root["ViewPager"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	/* jshint -W097 */
	"use strict";

	var renderWrapper = __webpack_require__(2);
	var React = __webpack_require__(1);

	var View = React.createClass({displayName: "View",

	    getInitialState : function() {
	        return { visible : this.props.visible, view: this.props.view }
	    },

	    componentWillReceiveProps : function(newProps) {
	        if ( this.state.visible !== newProps.visible ) {
	            this.setState({visible : newProps.visible} )
	        }
	    },

	    shouldComponentUpdate : function(nextProps, nextState) {
	        return this.state.visible !== nextState.visible;
	    },

	    render : function() {
	        var divStyle = { display: this.state.visible ? "block" : "none" };
	        
	        var theElement =  null;
	        if ( this.props.element ) {
	            theElement = this.props.element;
	        } else {
	            theElement = React.createElement("div", {ref: "el"});
	        }
	        var name = null;
	        if ( typeof this.props.view === 'string' ) {
	            name = this.props.view;
	        } else {
	            name = this.props.ref;
	            
	        }
	        
	        return (React.createElement("div", {"data-vp-name": name, style: divStyle}, 
	            theElement
	        ))
	    }


	});


	var ViewPager = React.createClass({displayName: "ViewPager",


	    getInitialState : function() {
	        //create all the views from the definition
	        var views = this.props.views || [];
	        var viewPrefix = this.props.viewPrefix ? this.props.viewPrefix : "";
	        var visible = this.props.visible;

	        return { views: views, viewPrefix: viewPrefix , visible: visible };
	    },

	    shouldComponentUpdate : function(nextProps, nextState) {
	        //if the current visible is not equal to the next visible
	        return ( nextState.visible && (nextState.visible !== this.state.visible ) );
	    },

	    render : function() {
	        var views = this.state.views;
	        var prefix = "vp-" + this.state.viewPrefix;
	        
	        return (React.createElement("div", {className: prefix}, " ", 
	                 views.map(function(view)  {
	                    if ( typeof view === 'string' ) {
	                        return React.createElement(View, {ref: view, key: view, view: view, visible: ( this.state.visible === view) })
	                    } else {
	                        return React.createElement(View, {ref: view.ref, element: view.element, visible: ( this.state.visible === view.ref) });
	                    }
	                }.bind(this))
	            
	        ))
	    },

	    show : function(view) {
	        var visible = this.state.visible;
	        if ( visible !== view ) {
	            this.setState({visible: view});
	            //FIXME: disable for now, rethink
	            // this._dispatchEvents(view,visible);
	        }
	        
	        
	    },
	/*,

	    _dispatchEvents = function(visible,hidden) {
	        var capitalize = function(tocap) {
	            return tocap[0].toUpperCase() + tocap.slice(1);
	        }
	        if ( this._receivers ) {
	            this._receivers.forEach(function(receiver) {
	                var funchidden = "on" + capitalize(hidden) + "Hidden";
	                var funcshown = "on" + capitalize(visible) + "Shown";
	                if ( receiver[funchidden] ) {
	                    receiver[funchidden].call(receiver);
	                }
	                if ( receiver[funcshown] ) {
	                    receiver[funcshown].call(receiver);

	                }
	            });
	        }
	    }
	*/
	    el : function(view) {
	        var refViews = this.refs[view];
	        if ( refViews.refs["el"] ) {
	            return this.refs[view].refs["el"].getDOMNode()
	        } 
	        return null;
	    }
	    /*,
	    
	    dispatchEvents : function(receiver) {
	        
	        if ( !this._receivers ) {
	            this._receivers = [];
	        }
	        this._receivers.push(receiver);
	    },*/
	});


	module.exports = renderWrapper(React,ViewPager);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*globals require,module,React */
	"use strict";

	/**
	 * React instance creation is a bit noisy. Use this on react a library such
	 * that its more direct to the point when creating new instance. E.g.
	 *
	   React.render(React.createElement(ViewPager,{ views : ["page11","page22","page33"], visible:"page11"}),
	            document.getElementById("viewpager-container2"));
	 * 
	 * to something like
	 *
	 * ViewPager.render({ views : ["page1","page2","page3"], visible:"page1"},"viewpager-container");
	 * or
	 * ViewPager.render("viewpager-container");
	 * 
	 * If your are exposing a library then :
	 * 
	 * var renderWrapper = require("react-render");
	 * var MyReactComponent = React.createClass... 
	 * 
	 * module.exports = renderWrapper(React,MyReactComponent)
	 *
	 */

	/**
	 * 
	 * Shortcut to React.createElement(cls,option) 
	 *
	 */
	var elWrapper = function(React,ReactClass,option) {
	    return React.createElement(ReactClass,option);
	};
	    
	var renderWrapper = function(React,ReactClass,options,el) {
	    
	    var ouroption = {};
	    //if he passed an html element or a string on the first argument
	    //then we assume he wants no options
	    var ourEl = null;
	    
	    //check if its actually an element
	    if ( ( options.tagName && options.nodeName && (typeof options.nodeType === 'number') ) 
	        || ( typeof options === 'string' ) ) {
	        ourEl = options;
	    } else {
	        ouroption = options;
	        ourEl = ( typeof el === 'string') ? document.getElementById(el) : el;
	    }

	    return React.render(elWrapper(React,ReactClass,ouroption), ourEl);
	};

	var RenderWrapper = function(React,ReactClass) {

	    return {
	        cls : ReactClass,
	        el : function(options) {
	            return elWrapper(React,ReactClass,options);
	        },
	        render : function(options,el) {
	            return renderWrapper(React,ReactClass,options,el)
	        }
	    }

	};

	module.exports = RenderWrapper;


/***/ }
/******/ ])
});

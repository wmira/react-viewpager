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
	        return (React.createElement("div", {"data-vp-name": this.state.view.name, style: divStyle}, 
	            React.createElement("div", {ref: "el"})
	        ))
	    },


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
	        return (React.createElement("div", {className: "vp-" + this.state.viewPrefix}, " ", 
	                 views.map(function(view)  {
	                    return React.createElement(View, {ref: view, key: view, view: view, visible: (this.state.visible === view) ? true : false})
	                }.bind(this))
	            
	        ))
	    },

	    show : function(view) {
	        this.setState({ visible: view })
	    },

	    /**
	     * Return the el node of this view
	     *
	     * @param view
	     */
	    el : function(view) {
	        return this.refs[view].refs["el"].getDOMNode();
	    }
	});

	module.exports = ViewPager;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});

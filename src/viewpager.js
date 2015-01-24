/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097 */
"use strict";

var renderWrapper = require("react-render-wrapper");
var React = require("react");

var View = React.createClass({

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
            theElement = <div ref={"el"}></div>;
        }
        var name = null;
        if ( typeof this.props.view === 'string' ) {
            name = this.props.view;
        } else {
            name = this.props.ref;
            
        }
        
        return (<div data-vp-name={name} style={divStyle}>
            {theElement}
        </div>)
    }


});


var ViewPager = React.createClass({


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
        
        return (<div className={prefix}> {
                 views.map(view => {
                    if ( typeof view === 'string' ) {
                        return <View ref={view} key={view} view={view} visible={( this.state.visible === view ) }/>
                    } else {
                        return <View ref={view.ref} element={view.element} visible={( this.state.visible === view.ref ) } />;
                    }
                })
            }
        </div>)
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
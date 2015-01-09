/** @jsx React.DOM */
/*globals require,module */
/* jshint -W097 */
"use strict";

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
        return (<div data-vp-name={this.state.view.name} style={divStyle}>
            <div ref={"el"}></div>
        </div>)
    },


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
        return (<div className={"vp-" + this.state.viewPrefix}> {
                 views.map(view => {
                    return <View ref={view} key={view} view={view} visible={(this.state.visible === view) ? true : false}/>
                })
            }
        </div>)
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
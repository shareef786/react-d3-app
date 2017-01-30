"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {PieChart} from 'react-d3';

(function() {
    // load your general data
    var pieData = [
        {label: 'Margarita', value: 20.0},
        {label: 'John', value: 55.0},
        {label: 'Tim', value: 25.0 }
    ];

    // var width = 700,
    //     height = 300,
    //     margins = {left: 100, right: 100, top: 50, bottom: 50},
    //     title = "User sample",
    //     // chart series,
    //     // field: is what field your data want to be selected
    //     // name: the name of the field that display in legend
    //     // color: what color is the line
    //     chartSeries = [
    //         {
    //             field: 'BMI',
    //             name: 'BMI',
    //             color: '#ff7f0e'
    //         }
    //     ],
    //     // your x accessor
    //     x = function(d) {
    //         return d.index;
    //     };

    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );

    ReactDOM.render(
        <PieChart
            data={pieData}
            width={400}
            height={400}
            radius={100}
            innerRadius={20}
            sectorBorderColor="white"
            title="Pie Chart"
        />, document.getElementById('line-chart')
    )
})()

var LineChart=React.createClass({

    propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        chartId:React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            width: 800,
            height: 300,
            chartId: 'v1_chart'
        };
    },
    getInitialState:function(){
        return {
            tooltip:{ display:false,data:{key:'',value:''}},
            width:this.props.width,
            books: [

            ]
        };
    },
    componentDidMount() {
        $.getJSON('/books.json', (response) => { this.setState({ books: response }) });
    },
    render:function(){
        var data=this.state.books;

        var margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        data.forEach(function (d) {
            d.date = parseDate(d.day);
        });

        var x = d3.time.scale().range([0, w]);
        var y = d3.scale.linear().range([h, 0]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(d3.time.days, 1)
            .tickFormat(d3.time.format('%d'))
            .tickSize(0)
            .tickPadding(8);

        var yGrid = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5)
            .tickSize(-w, 0, 0)
            .tickFormat("");

        var line = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            }).interpolate('cardinal');
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.count; })]);

        var transform='translate(' + margin.left + ',' + margin.top + ')';

        return (
            <div>
                <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

                    <g transform={transform}>

                        <Grid h={h} grid={yGrid} gridType="y"/>
                        {/*<Grid h={h} grid={xGrid} gridType="x"/> */}

                        <Axis h={h} axis={yAxis} axisType="y" />
                        <Axis h={h} axis={xAxis} axisType="x"/>

                        <path className="line shadow" d={line(data)} strokeLinecap="round"/>

                        <Dots data={data} x={x} y={y} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}/>

                        <ToolTip tooltip={this.state.tooltip}/>
                    </g>

                </svg>


            </div>
        );
    }


});
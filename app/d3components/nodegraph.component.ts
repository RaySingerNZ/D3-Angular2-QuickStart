import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    moduleId: module.id,
    selector: 'app-nodegraph',
    template: `<div class="nodegraph" id="nodegraph"></div>`
})
export class NodegraphComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log("d3: ", d3);
        this.drawGraph();
    }

    private drawGraph = () => {
        // Set up data
        let data = {
            "nodes": [
                { "name": "X1", "colour": 10, "id": 1 },
                { "name": "X2", "colour": 20, "id": 2 },
                { "name": "X3", "colour": 30, "id": 3 },
                { "name": "X4", "colour": 40, "id": 4 },
                { "name": "X5", "colour": 50, "id": 5 },
                { "name": "X6", "colour": 60, "id": 5 },
                { "name": "X7", "colour": 70, "id": 6 },
                { "name": "X8", "colour": 80, "id": 7 },
                { "name": "X9", "colour": 90, "id": 7 },
                { "name": "X10", "colour": 5, "id": 8 },
                { "name": "X11", "colour": 10, "id": 9 },
                { "name": "X12", "colour": 15, "id": 10 },
                { "name": "X13", "colour": 20, "id": 11 },
                { "name": "X14", "colour": 25, "id": 12 },
                { "name": "X15", "colour": 30, "id": 12 },
                { "name": "X16", "colour": 35, "id": 14 },
                { "name": "X17", "colour": 40, "id": 15 },
                { "name": "X18", "colour": 45, "id": 16 },
                { "name": "X19", "colour": 50, "id": 17 },
                { "name": "X20", "colour": 55, "id": 18 },
                { "name": "X21", "colour": 60, "id": 19 },
                { "name": "X22", "colour": 65, "id": 20 },
                { "name": "X23", "colour": 70, "id": 21 },
                { "name": "X24", "colour": 800, "id": 22 },
                { "name": "X25", "colour": 900, "id": 23 },
                { "name": "X26", "colour": 100, "id": 24 },
                { "name": "X27", "colour": 10, "id": 25 }
            ],
            "links": [
                { "source": 0, "target": 1, "value": 6, "label": "test" },
                { "source": 0, "target": 12, "value": 6, "label": "test" },
                { "source": 6, "target": 5, "value": 6, "label": "test" },
                { "source": 8, "target": 5, "value": 6, "label": "test" },
                { "source": 7, "target": 1, "value": 4, "label": "test" },
                { "source": 8, "target": 10, "value": 3, "label": "test" },
                { "source": 7, "target": 14, "value": 4, "label": "test" },
                { "source": 8, "target": 15, "value": 6, "label": "test" },
                { "source": 9, "target": 1, "value": 6, "label": "test" },
                { "source": 10, "target": 1, "value": 6, "label": "test" },
                { "source": 16, "target": 1, "value": 6, "label": "test" },
                { "source": 16, "target": 2, "value": 5, "label": "test" },
                { "source": 16, "target": 3, "value": 6, "label": "test" },
                { "source": 16, "target": 4, "value": 6, "label": "test" },
                { "source": 19, "target": 18, "value": 2, "label": "test" },
                { "source": 18, "target": 1, "value": 6, "label": "test" },
                { "source": 17, "target": 19, "value": 8, "label": "test" },
                { "source": 18, "target": 11, "value": 6, "label": "test" },
                { "source": 17, "target": 13, "value": 3, "label": "test" },
                { "source": 20, "target": 13, "value": 3, "label": "test" },
                { "source": 20, "target": 21, "value": 3, "label": "test" },
                { "source": 22, "target": 20, "value": 3, "label": "test" },
                { "source": 23, "target": 21, "value": 3, "label": "test" },
                { "source": 23, "target": 24, "value": 3, "label": "test" },
                { "source": 23, "target": 25, "value": 3, "label": "test" },
                { "source": 23, "target": 26, "value": 3, "label": "test" }
            ]
        }

        let margin = { top: -5, right: -5, bottom: -5, left: -5 };
        let width = parseInt(d3.select("#d3nodegraph-container").style("width"), 10) - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;

        let color = d3.scale.category20c();

        let force = d3.layout.force()
            .charge(-300)
            .linkDistance(30)
            .size([width + margin.left + margin.right, height + margin.top + margin.bottom]);

        let zoom = d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        let drag = d3.behavior.drag()
            .origin(function (d: any) { return d; })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);

        let svg = d3.select("#nodegraph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
            .call(zoom);

        let rect = svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all");

        let container = svg.append("g");

        force
            .nodes(data.nodes)
            .links(data.links)
            .start();

        let link = container.append("g")
            .attr("class", "links")
            .selectAll(".link")
            .data(data.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function (d: any) { return Math.sqrt(d.value); });

        let node = container.append("g")
            .attr("class", "nodes")
            .selectAll(".node")
            .data(data.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("cx", function (d: any) { return d.x; })
            .attr("cy", function (d: any) { return d.y; })
            .call(drag);

        node.append("circle")
            .attr("r", function (d: any) { return d.weight * 2 + 12; })
            .style("fill", function (d: any) { return color((1 / d.colour).toString()); });


        force.on("tick", function () {
            link.attr("x1", function (d: any) { return d.source.x; })
                .attr("y1", function (d: any) { return d.source.y; })
                .attr("x2", function (d: any) { return d.target.x; })
                .attr("y2", function (d: any) { return d.target.y; });

            node.attr("transform", function (d: any) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        let linkedByIndex = {};
        data.links.forEach(function (d: any) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });

        function isConnected(a: any, b: any) {
            return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
        }

        node.on("mouseover", function (d: any) {

            node.classed("node-active", function (o: any) {
                let thisOpacity = isConnected(d, o) ? true : false;
                this.setAttribute('fill-opacity', thisOpacity);
                return thisOpacity;
            });

            link.classed("link-active", function (o: any) {
                return o.source === d || o.target === d ? true : false;
            });

            d3.select(this).classed("node-active", true);
            d3.select(this).select("circle").transition()
                .duration(750)
                .attr("r", (d.weight * 2 + 12) * 1.5);

        }).on("mouseout", function (d: any) {
            node.classed("node-active", false);
            link.classed("link-active", false);
            d3.select(this).select("circle").transition()
                .duration(750)
                .attr("r", d.weight * 2 + 12);
        });


        function dottype(d: any) {
            d.x = +d.x;
            d.y = +d.y;
            return d;
        }

        function zoomed() {
            let d3Evt: any = d3.event;
            container.attr("transform", "translate(" + d3Evt.translate + ")scale(" + d3Evt.scale + ")");
        }

        function dragstarted(d: any) {
            let d3Evt: any = d3.event;
            d3Evt.sourceEvent.stopPropagation();
            d3.select(this).classed("dragging", true);
            force.start();
        }

        function dragged(d: any) {
            let d3Evtx: any = d3.event;
            let d3Evty: any = d3.event;
            d3.select(this).attr("cx", d.x = d3Evtx.x).attr("cy", d.y = d3Evty.y);
        }

        function dragended(d: any) {
            d3.select(this).classed("dragging", false);
        }
    }

}
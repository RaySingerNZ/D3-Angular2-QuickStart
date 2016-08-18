import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { NodesService } from '../sharedservices/nodes.service';

@Component({
    moduleId: module.id,
    selector: 'app-nodegraph',
    template: `<div class="nodegraph" id="nodegraph" (window:resize)="onResize($event)"></div>`
})
export class NodegraphComponent implements OnInit {
    @Input() nodegraphData: any;

    constructor(private _nodesService: NodesService) { }

    ngOnInit() {
    }

    // If the window resizes
    onResize(event: any) {
        this.redrawGraph(this.nodegraphData);
    }

    // Watch nodegraphData for changes and redraw the graph if changed
    ngOnChanges(changes: any) {
        console.log("data changed: ", changes);
        this.redrawGraph(changes.nodegraphData.currentValue);
    }

    private redrawGraph = (data: any) => {
        if (data) {
            // remove old nodegraph from container
            d3.select(`#nodegraph`).html("");
            this.drawGraph(data);
        }
    }

    private drawGraph = (data: any) => {
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
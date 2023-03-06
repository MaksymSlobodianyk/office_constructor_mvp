import React, { useEffect } from 'react';
import * as d3 from "d3";
import { getCrossPath, getDeskPath, getSeatPath } from './paths/desk';
import { statusColor, deskStatus, sizesConfig } from '../config';
const scale = 1

const SvgArea = ({ desks, setSelectedDeskId, onDrag, containerHeight, containerWidth, moveTo }) => {
  const svgRef = React.useRef(null);
  const planRef = React.useRef(null);
  useEffect(() => {
    d3.select(planRef.current)
      .append("svg:image")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 1976)
      .attr('height', 3654)
      .attr("xlink:href", "office_plan.svg")
  }, [])

  useEffect(() => {
    d3.select(planRef.current)
      .selectAll("g")
      .data(desks)
      .join(
        enter => {
          enter.append("g")
            .attr("id", "d")
            .each(function (d, i) {
              const group = d3.select(this)
              group.append('path')
                .attr("id", "desk")
                .attr("d", d => getDeskPath(scale, 4))
                .style("fill", d => statusColor[d.status].desk)
                .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
              group.append('path')
                .attr("id", "seat")
                .attr("d", d => getSeatPath(scale, 4))
                .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
                .style("fill", d => {
                  return statusColor[d.status].seat
                })

              group.append('text')
                .attr("id", "name")
                .text(d => d.name)
                .attr("font-family", "Roboto Condensed")
                .attr("font-weight", "700")
                .style("font", `${17 * scale}px sans-serif`)
                .style("fill", d => statusColor[d.status].text)
                .style("display", "block")
                .attr("x", function (d) {
                  return d.x + sizesConfig.deskWidth * scale - this.getBBox().width - 3 * scale;
                })
                .attr("y", function (d) {
                  return d.y + sizesConfig.seatHeight * scale + sizesConfig.deskHeight * scale / 2 + this.getBBox().height / 4;
                })

              group.append('path')
                .attr("id", "cross")
                .attr("d", d => getCrossPath(d.x, d.y, scale))
                .style("stroke-width", `${2 * scale}px`)
                .style("fill", 'none')
                .filter(d => d.status === deskStatus.BOOKED)
                .style("stroke", d => statusColor[d.status].seat)

              return group
            })
            .each(function (d, i) {
              const group = d3.select(this)
              group.call(
                d3.drag()
                  .on('start', (event, data) => { setSelectedDeskId(data.id) })
                  .on('drag', function dragged(event) {
                    this.x = this.x || 0;
                    this.y = this.y || 0;
                    this.x += event.dx;
                    this.y += event.dy;
                    d3.select(this).attr('transform', 'translate(' + this.x + ',' + this.y + ')')
                  })
                  .on('end', function dragged(event, d) {
                    onDrag(d.id, Math.round(event.x), Math.round(event.y))
                  })
              )

              return group
            })
        },
        update => {
          update
            .call(
              d3.drag()
                .on('start', (event, data) => { setSelectedDeskId(data.id) })
                .on('drag', function dragged(event, d) {
                  this.x = this.x || 0;
                  this.y = this.y || 0;
                  this.x += event.dx;
                  this.y += event.dy;
                  d3.select(this).attr('transform', `translate(${this.x},${this.y})`)
                })
                .on('end', function dragged(event, d) {
                  onDrag(d.id, Math.round(event.x), Math.round(event.y))
                })
            )

          //update.attr('transform', d => `rotate(${d.rotation},${d.x + sizesConfig.deskWidth/2},${d.y + (sizesConfig.deskWidth + sizesConfig.seatHeight)/2})`)

          update.select("#desk").style("fill", d => {
            return statusColor[d.status].desk
          })

          update.select("#seat").style("fill", d => {
            return statusColor[d.status].seat
          })

          update.select("#name").style("fill", d => {
            return statusColor[d.status].text
          })

          update.filter(d => d.status === deskStatus.BOOKED)
            .select('#cross')
            .style("stroke", d => statusColor[d.status].seat)

          update.filter(d => d.status !== deskStatus.BOOKED)
            .select('#cross')
            .style("stroke", 'none')
        },
        exit => exit.remove()

      )


    const plan = d3.select(planRef.current)
    plan.lower()

    function handleZoom(e) {
      d3.select(planRef.current)
        .attr('transform', e.transform);
    }

    const zoom = d3.zoom()
      .scaleExtent([0.3, 1])
      .translateExtent([[100, 0], [1880, 3650]])
      .on('zoom', handleZoom);

    d3.select(svgRef.current)
      .call(zoom);

  }, [desks])

  // useEffect(() => {
  //   if(moveTo){
  //     d3.select(planRef.current).transition()
  //     .duration(1000)
  //     .attr("transform", moveTo);
  //   }
  // }, [moveTo])


  return (
    <svg ref={svgRef}
      width={containerWidth}
      height={containerHeight}
      viewBox={[100, 100, 500, 500].join(' ')}
      style={{ border: '1px solid red' }}
    >
      <g ref={planRef} />
    </svg>
  );
}

export default SvgArea;

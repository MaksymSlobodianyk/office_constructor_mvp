import React, { useEffect } from 'react';
import { Plan } from '../Plan/Plan';
import * as d3 from "d3";
import { getCrossPath, getDeskPath, getSeatPath } from './paths/desk';
import { statusColor, deskStatus } from '../config';
const scale = 1

const svgViewportWidth = 1976;
const svgViewportHeight = 3654;

const SvgArea = ({ desks, setSelectedDesk, onDrag, containerHeight, containerWidth }) => {
  const svgRef = React.useRef(null);
  const planRef = React.useRef(null);
  useEffect(() => {
    // d3.select(svgRef.current)
    //   .append("svg:image")
    //   .attr('x', 0)
    //   .attr('y', 0)
    //   .attr('width', 1976)
    //   .attr('height', 3654)
    //   .attr("xlink:href", "office_plan.svg")
    //   .on('click', function (data, index) {
    //     setSelectedDesk(null)// => Original DOM Event
    //   });

    d3.select(planRef.current)
      .selectAll("g")
      .data(desks)
      .join(
        enter => {
          enter.append("g")
            .each(function (d, i) {
              const group = d3.select(this)
              group.append('path')
                .attr("id", "desk")
                .attr("d", d => getDeskPath(d.x, d.y, 1, 4))
                .style("fill", d => statusColor[d.status].desk)
              group.append('path')
                .attr("id", "seat")
                .attr("d", d => getSeatPath(d.x, d.y, 1, 4))
                .style("fill", d => {
                  return statusColor[d.status].seat
                })

              group.append('text')
                .attr("id", "name")
                .text(d => d.name)
                .style("font", `${10 * scale}px sans-serif`)
                .style("fill", d => statusColor[d.status].text)
                .style("display", "block")
                .attr("x", function (d) {
                  return d.x + 60 - this.getBBox().width - 3 * scale;
                })
                .attr("y", function (d) {
                  return d.y + (36) / 2 + this.getBBox().height / 2 + 14;
                })
              return group
            })
            .each(function (d, i) {
              const group = d3.select(this)
              group.on('click', (event, data) => setSelectedDesk(data.id))
              group.call(
                d3.drag()
                  .on('drag', function dragged(event, d) {
                    this.x = this.x || 0;
                    this.y = this.y || 0;
                    this.x += event.dx;
                    this.y += event.dy;
                    d3.select(this).attr('transform', 'translate(' + this.x + ',' + this.y + ')')
                  })
                  .on('end', function dragged(event, d) {
                    onDrag(event.x, event.y)
                  })
              )

              return group
            })
            .filter(d => d.status === deskStatus.BOOKED)
            .append('path')
            .attr("id", "cross")
            .attr("d", d => getCrossPath(d.x, d.y, 1))
            .style("stroke", d => statusColor[d.status].seat)
            .style("stroke-width", `${2 * scale}px`)
            .style("fill", 'none')
        },
        update => {
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
          .append('path')
          .attr("id", "cross")
          .attr("d", d => getCrossPath(d.x, d.y, 1))
          .style("stroke", d => statusColor[d.status].seat)
          .style("stroke-width", `${2 * scale}px`)
          .style("fill", 'none')

          update.filter(d => d.status !== deskStatus.BOOKED)
          .select("#cross")
          .remove()
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
      .scaleExtent([0, 3])
      .on('zoom', handleZoom);

    d3.select(svgRef.current)
      .call(zoom);

  }, [desks])

  return (
    <svg ref={svgRef}
      width={containerWidth}
      height={containerHeight}
      viewBox={[0, 0, 500, 500].join(' ')}
    >
      <g ref={planRef}
        dangerouslySetInnerHTML={{ __html: Plan }}
      />
    </svg>
  );
}

export default SvgArea;

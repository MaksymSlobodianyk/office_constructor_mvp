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

    const dragHandler = d3.drag()
      .on('start', (event, data) => {
        setSelectedDeskId(data.id) })
      .on('drag', function dragged(event, d) {
        this.x = this.x || d.x;
        this.y = this.y || d.y;
        this.x += event.dx;
        this.y += event.dy;
        onDrag(d.id, Math.round(this.x), Math.round(this.y))
      })
      .on('end', function dragged(event, d) {
        onDrag(d.id, Math.round(event.x), Math.round(event.y))
      })
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
              group.append('path')
                .attr("id", "seat")
                .attr("d", d => getSeatPath(scale, 4))
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
                .attr("x", function () {
                  return sizesConfig.deskWidth * scale - this.getBBox().width - 3 * scale;
                })
                .attr("y", function () {
                  return sizesConfig.seatHeight * scale + sizesConfig.deskHeight * scale / 2 + this.getBBox().height / 4;
                })
              group.append('path')
                .attr("id", "cross")
                .attr("d", d => getCrossPath(0, 0, scale))
                .style("stroke-width", `${2 * scale}px`)
                .style("fill", 'none')
                .filter(d => d.status === deskStatus.BOOKED)
                .style("stroke", d => statusColor[d.status].seat)

              group.attr('transform', d => `rotate(${d.rotation},${d.x + sizesConfig.deskWidth / 2},${d.y + (sizesConfig.deskHeight + sizesConfig.seatHeight) / 2})translate(${d.x},${d.y})`)
              return group
            })
            .each(function (d, i) {
              const group = d3.select(this)
              group.call(
                dragHandler
              )

              return group
            })
        },
        update => {
          update.call(dragHandler)

          update.attr('transform', d => `rotate(${d.rotation},${d.x + sizesConfig.deskWidth / 2},${d.y + (sizesConfig.deskHeight + sizesConfig.seatHeight) / 2})translate(${d.x},${d.y})`)
          

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
      {/* <Desk desk={{
      id: 'bd03f5c3-7683-4b8e-b88d-7e249175b5c7',
      name: 123,
      x: 200,
      y: 200,
      status: deskStatus.BOOKED,
      rotation: 0
    }}
    setSelectedDeskId={setSelectedDeskId}
    /> */}
    </svg>
  );
}

export default SvgArea;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface HorizontalBarProps {
  values: Array<{
    label: string;
    value: number;
  }>;
  values_symbol: string;
  x_label: string;
  y_label: string;
  isLogScale?: boolean;
}

const HorizontalBar: React.FC<HorizontalBarProps> = ({ values, values_symbol, x_label, y_label, isLogScale = false }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = d3.map(values, d => d.value);
    const svg = d3.select(svgRef.current);
    const width = svgRef.current ? svgRef.current.parentElement?.clientWidth || 500 : 500;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };

    svg.attr('width', width).attr('height', height);

    const maxValue = d3.max(data) as number;
    const x = isLogScale
      ? d3.scaleLog().domain([1, maxValue * 1.1]).range([margin.left, width - margin.right])
      : d3.scaleLinear().domain([0, maxValue * 1.1]).range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(data.map((d, i) => i.toString()))
      .range([margin.top, height - margin.bottom])
      .padding(0.25);

    // Tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#f9f9f9')
      .style('border', '1px solid #d3d3d3')
      .style('padding', '5px')
      .style('display', 'none');

    // Boxes.
    svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', x(1))
      .attr('y', (d, i) => y(i.toString()) as number)
      .attr('width', 0) // Start with width 0 for animation
      .attr('height', y.bandwidth())
      .attr('fill', 'steelblue')
      .on('mouseover', function (event, d) {
        tooltip.style('display', 'block')
          .html(`Value: ${d} (${ values_symbol })`)
          .style('left', `${event.pageX}px`)
          .style('top', `${event.pageY - 45}px`)
          .style('font-size', '0.9em')
          .style('color', 'black')
          .style('padding', '2px 12px');
      })
      .on('mouseout', function () {
        tooltip.style('display', 'none');
      })
      .transition() // Add transition for animation
      .duration(1000)
      .attr('width', d => Math.max(0, x(d) - x(1)));

    // X labels.
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5, isLogScale ? ".0s" : undefined));

    // Y labels.
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat((d, i) => values[i].label));

    // X axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 10)
      .attr('fill', 'currentColor')
      .text(x_label);

    // Y axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', -height / 2)
      .attr('y', margin.left - 60)
      .attr('transform', 'rotate(-90)')
      .attr('fill', 'currentColor')
      .text(y_label);
  }, [values, values_symbol, x_label, y_label, isLogScale]);

  return (
    <div className="flex justify-center items-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default HorizontalBar;

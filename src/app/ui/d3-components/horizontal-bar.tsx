import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HorizontalBar: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = [10, 20, 30, 40, 50];
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };

    svg.attr('width', width).attr('height', height);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data) as number])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(data.map((d, i) => i.toString()))
      .range([margin.top, height - margin.bottom])
      .padding(0.1);

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', x(0))
      .attr('y', (d, i) => y(i.toString()) as number)
      .attr('width', d => x(d) - x(0))
      .attr('height', y.bandwidth())
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat((d, i) => `Item ${i + 1}`));
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default HorizontalBar;
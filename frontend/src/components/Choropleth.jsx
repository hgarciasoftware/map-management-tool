import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { legend } from '../lib/color-legend';
import PersonService from '../services/PersonService';

import states from '../data/states.json';
import us from '../data/states-albers-10m.json';

function Choropleth() {
  const ref = useRef();

  useEffect(() => {
    (async () => {
    const stateCount = await PersonService.getStateCount();
    const data = Object.assign(new Map(states.map(state => [state, 0])), {title: 'Number of people'});

    for (const [state, count] of stateCount.data) {
      if (data.has(state)) {
        data.set(state, count);
      }
    }

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('viewBox', [0, 0, 975, 610]);

    const format = d => `${d}`;
    const path = d3.geoPath();
    const color = d3.scaleQuantize([1, 7], d3.schemeBrBG[6]);

    svg.append('g')
      .attr('transform', 'translate(610, 20)')
      .append(() => legend({color, title: data.title, width: 260}));

    svg.append('g')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.states).features)
      .join('path')
        .attr('fill', d => color(data.get(d.properties.name)))
        .attr('d', path)
      .append('title')
        .text(d => `${d.properties.name}\n${format(data.get(d.properties.name))}`);

    svg.append('path')
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
    })();
  }, []);

  return (
    <div class="container-fluid">
      <div className="container-sm mt-3" style={{maxWidth: '33.75rem'}}>
        <p className="fw-bold mt-4">from wikipedia: a choropleth map is a type of thematic map in which a set of pre-defined areas is colored or patterned in proportion to a statistical variable.</p>
        <p className="fw-bold">this page requests the back-end database to count how many people are located in each state. that data is then given to the choropleth map and each state is colored accordingly.</p>
        <p className="fw-bold">as per the legend, brown states contain 2 or less people and green states contain 6 or more people.</p>
      </div>
      <div ref={ref}></div>
    </div>
  );
}

export default Choropleth;

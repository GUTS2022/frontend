import React, { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import { ForceGraphMethods, GraphData } from '../types/graphTypes';
import { Person } from '../types/peopleTypes';

const StudentNetwork = () => {
  const [data, setData] = useState<GraphData>();
  const graphRef = useRef<ForceGraphMethods>();

  const getData = async () => {
    await axios.get<Person[]>("http://localho.st:5000/people").then((resp) => {
      axios.get<string[]>("http://localho.st:5000/courses").then((coursesResp) => {
        axios.get<string[]>("http://localho.st:5000/societies").then((societiesResp) => {
          let mappedData = {
            "nodes": [
              ...resp.data.map(person => ({"id": person.student_id, "label": person.name, "opacity": 1, "group": 1})),
              ...coursesResp.data.map(course => ({"id": course, "opacity": 0.5, "group": 2})),
              ...societiesResp.data.map(society => ({"id": society, "opacity": 0.5, "group": 3})),
            ],
            "links": [
              ...resp.data.map(person => ({"source": person.student_id, "target": person.subject}))
            ]
          };
    
          resp.data.forEach(person => {
            person.societies.forEach(society => {
              mappedData.links.push({"source": person.student_id, "target": society})
            });
          });
          setData(mappedData);
        });
      });
    });
  }

  const onNodeClick = useCallback((node: any) => {
    const distance = 100;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    graphRef.current?.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );

    let newData = data;
    const linkedNodeIds = data?.links.filter((link: any) => {
      return link.source.id === node.id;
    }).map((link: any) => link.target.id);
    newData?.nodes.forEach(checkingNode => {
      if (!linkedNodeIds?.includes(checkingNode.id)) checkingNode.opacity = 0.0;
      node.opacity = 1.0;
    });
    setData(oldData => ({...oldData, ...newData!}));
  }, [graphRef, data]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ForceGraph3D
        ref={graphRef}
        graphData={data}
        nodeAutoColorBy="group"
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.label ? node.label : node.id);

          const rgbValues = (node.color as string).substring(1).match(/.{2}/g)?.map(hex => parseInt(hex, 16));
          sprite.color = `rgba(${rgbValues![0]}, ${rgbValues![1]}, ${rgbValues![2]}, ${node.opacity})`;
          sprite.textHeight = 8;
          return sprite;
        }}
        onNodeClick={onNodeClick}
      />
    </div>
  )
}

export default StudentNetwork

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import { GraphData } from '../types/graphTypes';
import { Person } from '../types/peopleTypes';

const StudentNetwork = () => {
  const [data, setData] = useState<GraphData>();

  const getData = async () => {
    await axios.get<Person[]>("http://localho.st:5000/people").then((resp) => {
      axios.get<string[]>("http://localho.st:5000/courses").then((coursesResp) => {
        axios.get<string[]>("http://localho.st:5000/societies").then((societiesResp) => {
          let mappedData = {
            "nodes": [
              ...resp.data.map(person => ({"id": person.student_id, "label": person.name, "group": 1})),
              ...coursesResp.data.map(course => ({"id": course, "group": 2})),
              ...societiesResp.data.map(society => ({"id": society, "group": 3})),
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ForceGraph3D
        graphData={data}
        nodeAutoColorBy="group"
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.label ? node.label : node.id);
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
      />
    </div>
  )
}

export default StudentNetwork

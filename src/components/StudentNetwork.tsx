import React, { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import { ForceGraphMethods, GraphData } from '../types/graphTypes';
import { Person } from '../types/peopleTypes';

const StudentNetwork = () => {
  const [data, setData] = useState<GraphData>();
  const graphRef = useRef<ForceGraphMethods>();
  const [search, setSearch] = useState<string>();

  const getData = async () => {
    await axios.get<Person[]>("http://localho.st:5000/people").then((resp) => {
      axios.get<string[]>("http://localho.st:5000/courses").then((coursesResp) => {
        axios.get<string[]>("http://localho.st:5000/societies").then((societiesResp) => {
          let mappedData = {
            "nodes": [
              ...resp.data.map(person => ({"id": person.student_id, "label": person.name, "opacity": 1, "group": 1, "color": "#dfdfdf"})),
              ...coursesResp.data.map(course => ({"id": course, "opacity": 1, "group": 2, "color": "#d946ef"})),
              ...societiesResp.data.map(society => ({"id": society, "opacity": 1, "group": 3, "color": "#f43f5e"})),
            ],
            "links": [
              ...resp.data.map(person => ({"source": person.student_id, "target": person.subject}))
            ]
          };
    
          resp.data.forEach(person => {
            person.societies.forEach(society => {
              mappedData.links.push({"source": person.student_id, "target": society})
              mappedData.links.push({"source": society, "target": person.student_id})
            });
            mappedData.links.push({"source": person.subject, "target": person.student_id})
          });
          setData(mappedData);
        });
      });
    });
  }

  const findNodeByName = (name: any) => {
    data?.nodes.forEach(node => {
        console.log("does " + node.label + " equal " + name + " node being searched is: " + node.id)
        if (node.label?.toLowerCase() === name.toLowerCase() || node.id.toLowerCase() === name.toLowerCase()) {
            onNodeClick(node)
        }
    })
  }

  const onNodeClick = useCallback((node: any) => {
    let distance = 100;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    graphRef.current?.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      1500  // ms transition duration
    );

    let newData = data;
    if (node.opacity !== 0.99) {
        const linkedNodeIds = data?.links.filter((link: any) => {
        console.log(node.color);
        return link.source.id === node.id;
        }).map((link: any) => link.target.id);
        newData?.nodes.forEach(checkingNode => {
            if (!linkedNodeIds?.includes(checkingNode.id)) {
                checkingNode.opacity = 0.2;
            } else {
                checkingNode.opacity = 1;
            }
        });
        node.opacity = 0.99;
    } else {
        newData?.nodes.forEach(node => {
            node.opacity = 1.0;
        })
    }
    setData(oldData => ({...oldData, ...newData!}));
  }, [graphRef, data]);

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event: any) => {
    event.preventDefault()
    findNodeByName(search)
  }

  return (
    <div>
        <form onSubmit={handleSearch}>
            <input type="text" onChange={e => {setSearch(e.target.value)}} placeholder="Search..." className="fixed top-7 right-7 z-50 w-1/5 opacity-50 focus:opacity-100 text-xl rounded-xl p-2 font-poppins"></input>
            <input type="submit" className="hidden"></input>
        </form>
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

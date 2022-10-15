export interface GraphData {
    nodes: GraphNode[],
    links: GraphLink[]
}

interface GraphNode {
    id: string,
    label?: string,
    opacity: number,
    group: number
}

interface GraphLink {
    source: string,
    target: string
}

// Copied from react-force-graph index.d.ts
type Coords = { x: number; y: number; z: number; }

export interface ForceGraphMethods {
    // Link styling
  emitParticle(link: any): any;

  // Force engine (d3-force) configuration
  d3Force(forceName: 'link' | 'charge' | 'center' | string): any | undefined;
  d3Force(forceName: 'link' | 'charge' | 'center' | string, forceFn: any): any;
  d3ReheatSimulation(): any;

  // Render control
  pauseAnimation(): any;
  resumeAnimation(): any;
  cameraPosition(position: Partial<Coords>, lookAt?: Coords, transitionMs?: number): any;
  zoomToFit(durationMs?: number, padding?: number, nodeFilter?: (node: any) => boolean): any;
  postProcessingComposer(): any;
  scene(): any;
  camera(): any;
  renderer(): any;
  controls(): object;
  refresh(): any;

  // Utility
  getGraphBbox(nodeFilter?: (node: any) => boolean): { x: [number, number], y: [number, number], z: [number, number] };
  screen2GraphCoords(x: number, y: number, distance: number): Coords;
  graph2ScreenCoords(x: number, y: number, z: number): Coords;
}
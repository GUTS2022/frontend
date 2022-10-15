export interface GraphData {
    nodes: GraphNode[],
    links: GraphLink[]
}

interface GraphNode {
    id: string,
    label?: string,
    group: number
}

interface GraphLink {
    source: string,
    target: string
}
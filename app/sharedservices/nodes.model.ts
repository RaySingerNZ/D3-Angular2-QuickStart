export interface NodegraphModel {
    nodes: Node[];
    links: Link[];
}

export interface Node {
    name: string;
    colour: number;
    id: number;
}

interface Link {
    source: number;
    target: number;
    value: number;
    label: string;
}
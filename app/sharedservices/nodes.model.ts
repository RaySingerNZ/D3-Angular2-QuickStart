export interface NodegraphModel {
    nodes: NodeModel[];
    links: LinkModel[];
}

export interface NodeModel {
    name: string;
    colour: number;
    id: number;
}

interface LinkModel {
    source: number;
    target: number;
    value: number;
    label: string;
}
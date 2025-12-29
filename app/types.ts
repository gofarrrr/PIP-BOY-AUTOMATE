export type NodeType = 'decision' | 'outcome';

export interface FlowNode {
  id: string;
  label: string;
  type: NodeType;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  color?: 'green' | 'yellow' | 'red' | 'blue'; // Fallout style color coding
  description: {
    why: string;
    evaluate: string;
    read: string;
  };
}

export interface FlowEdge {
  id: string;
  from: string;
  to: string;
  label?: string; // "Yes" or "No"
  pathType?: 'curved' | 'straight' | 'corner'; 
  controlPoints?: number[][]; // Custom control points for complex curves
  labelOffset?: { x: number; y: number }; // Manual fine-tuning for label position (pixels/10)
  labelPosition?: number; // 0 to 1, position along the path. Default 0.5
  description?: {
    why: string;
    evaluate: string;
    read: string;
  };
}

export type SelectedItem = 
  | { type: 'node'; data: FlowNode }
  | { type: 'edge'; data: FlowEdge };

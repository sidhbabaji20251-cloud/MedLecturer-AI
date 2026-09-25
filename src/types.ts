export interface DiagramNode {
  id: string;
  label: string;
  type: 'substrate' | 'enzyme' | 'cofactor' | 'receptor' | 'organelle' | 'clinical_condition';
  compartment?: string;
  description: string;
  regulation?: string;
  x: number; // coordinate percentage 0 to 100 for visual layout
  y: number; // coordinate percentage 0 to 100 for visual layout
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  style: 'conversion' | 'activation' | 'inhibition';
  cofactors?: string[];
}

export interface BiochemicalDiagram {
  title: string;
  type: 'metabolic_pathway' | 'signaling_cascade' | 'flowchart' | 'cellular_compartment';
  compartments?: string[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface SlideTable {
  headers: string[];
  rows: string[][];
}

export interface Slide {
  id?: string; // Client-side tracking ID
  title: string;
  layout: 'title' | 'objectives' | 'case_study' | 'pathophysiology' | 'molecular_mechanism' | 'biochemical_diagram' | 'clinical_correlation' | 'pharmacology' | 'q_and_a' | 'summary';
  cbmeCode?: string;
  competency?: string;
  bullets: string[];
  tableData?: SlideTable;
  diagram?: BiochemicalDiagram;
  speakerNotes: string;
}

export interface Presentation {
  topic: string;
  specialty: string;
  targetAudience: 'MBBS' | 'MD' | 'Integrated (MBBS & MD)';
  theme: 'Teal Clinical' | 'Crimson Hematology' | 'Academic Navy' | 'Emerald Pharmacology' | 'Modern Slate';
  slideCount: number;
  slides: Slide[];
}

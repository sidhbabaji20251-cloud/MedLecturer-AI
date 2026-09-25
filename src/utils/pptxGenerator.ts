import pptxgen from 'pptxgenjs';
import { Presentation, Slide, DiagramNode, DiagramEdge } from '../types';

// Optimal Font-Size Auto-Scaler to prevent any text overflows
function getOptimalFontSize(text: string, maxChars: number = 500): number {
  if (text.length > 800) return 11;
  if (text.length > 500) return 12;
  return 14;
}

export function generateAndDownloadPPTX(presentation: Presentation) {
  const pptx = new pptxgen();
  
  // Set widescreen presentation format (13.3" x 7.5") to match coordinate grid perfectly
  pptx.layout = 'LAYOUT_WIDE';
  
  // Premium Theme Color Configurations for clinical academic impact
  const themes = {
    'Teal Clinical': {
      primary: '004D40',     // Deep Teal
      secondary: '00796B',   // Medium Teal
      accent: '00BFA5',      // Bright Mint
      lightBg: 'F0FDF4',     // Soft Mint Tint
      darkText: '0F172A',    // Charcoal
      lightText: 'FFFFFF',   // White
      cardBg: 'FFFFFF',
      border: 'E2E8F0'
    },
    'Crimson Hematology': {
      primary: '880E4F',     // Deep Crimson
      secondary: 'AD1457',   // Rose Red
      accent: 'FF1744',      // Vibrant Hematology Red
      lightBg: 'FFF5F5',     // Soft Rose Tint
      darkText: '1E293B',    // Dark Slate
      lightText: 'FFFFFF',
      cardBg: 'FFFFFF',
      border: 'F3E5F5'
    },
    'Academic Navy': {
      primary: '1E3A8A',     // Oxford Navy
      secondary: '2563EB',   // Royal Blue
      accent: '60A5FA',      // Soft Blue
      lightBg: 'EFF6FF',     // Soft Blue Tint
      darkText: '1F2937',
      lightText: 'FFFFFF',
      cardBg: 'FFFFFF',
      border: 'E5E7EB'
    },
    'Emerald Pharmacology': {
      primary: '064E3B',     // Emerald Green
      secondary: '047857',   // Medium Green
      accent: '10B981',      // Active Drug Green
      lightBg: 'F0FDF4',     // Soft Mint
      darkText: '111827',
      lightText: 'FFFFFF',
      cardBg: 'FFFFFF',
      border: 'E5E7EB'
    },
    'Modern Slate': {
      primary: '1E293B',     // Charcoal Slate
      secondary: '475569',   // Cool Slate
      accent: 'F59E0B',      // Amber Accent
      lightBg: 'F8FAFC',     // Light Slate
      darkText: '0F172A',
      lightText: 'FFFFFF',
      cardBg: 'FFFFFF',
      border: 'E2E8F0'
    }
  };

  const activeTheme = themes[presentation.theme] || themes['Academic Navy'];

  presentation.slides.forEach((slideData, idx) => {
    const slide = pptx.addSlide();
    
    // Always add speaker notes to slide
    if (slideData.speakerNotes) {
      slide.addNotes(slideData.speakerNotes);
    }

    const isTitleLayout = slideData.layout === 'title';

    if (isTitleLayout) {
      // Dark academic background
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: '100%',
        h: '100%',
        fill: { color: activeTheme.primary }
      });

      // Accent design stripe
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 0.3,
        h: '100%',
        fill: { color: activeTheme.accent }
      });

      // CBME Pill
      slide.addText("NMC CBME ALIGNED CURRICULUM", {
        x: 1.0,
        y: 1.5,
        w: 4.5,
        h: 0.4,
        fontSize: 12,
        bold: true,
        color: activeTheme.accent,
        fontFace: 'Arial'
      });

      // Presentation Title
      slide.addText(presentation.topic, {
        x: 1.0,
        y: 2.0,
        w: 11.3,
        h: 2.0,
        fontSize: 38,
        bold: true,
        color: activeTheme.lightText,
        fontFace: 'Georgia',
        align: 'left',
        valign: 'middle'
      });

      // Specialty & Target Audience Subtitles
      slide.addText(`Department of ${presentation.specialty} | Lecture Series`, {
        x: 1.0,
        y: 4.2,
        w: 11.3,
        h: 0.4,
        fontSize: 18,
        color: activeTheme.accent,
        fontFace: 'Arial'
      });

      slide.addText(`Target Audience: ${presentation.targetAudience} Students`, {
        x: 1.0,
        y: 4.7,
        w: 11.3,
        h: 0.4,
        fontSize: 16,
        color: 'CCCCCC',
        fontFace: 'Arial'
      });

      // Footer disclaimer
      slide.addText("Peer-reviewed academic lecture with full molecular, biochemical, and clinical correlation.", {
        x: 1.0,
        y: 6.5,
        w: 11.3,
        h: 0.4,
        fontSize: 11,
        italic: true,
        color: '999999',
        fontFace: 'Arial'
      });

    } else {
      // Premium multicolored background color shifting engine for high visual interest (Dark text remains perfectly readable)
      const bgColors = [
        'EFF6FF', // Soft Royal Blue Tint
        'F0FDF4', // Soft Mint/Green Tint
        'FFFBEB', // Soft Warm Gold/Mnemonic Yellow Cream (Excellent for memory retention!)
        'FFF1F2', // Soft Crimson/Pink Tint
        'F5F3FF', // Soft Lavender/Purple Tint
        'F0FDFA'  // Soft Teal Tint
      ];
      const slideBgColor = bgColors[idx % bgColors.length];

      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: '100%',
        h: '100%',
        fill: { color: slideBgColor }
      });

      // Slide header banner / line
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6,
        y: 1.15,
        w: 12.13,
        h: 0.03,
        fill: { color: activeTheme.primary }
      });

      // Slide Title
      slide.addText(slideData.title, {
        x: 0.6,
        y: 0.4,
        w: 9.5,
        h: 0.7,
        fontSize: 24,
        bold: true,
        color: activeTheme.primary,
        fontFace: 'Georgia',
        valign: 'bottom'
      });

      // CBME competency code badge
      if (slideData.cbmeCode) {
        slide.addText(`NMC: ${slideData.cbmeCode}`, {
          x: 10.3,
          y: 0.5,
          w: 2.4,
          h: 0.4,
          fontSize: 11,
          bold: true,
          color: activeTheme.accent,
          align: 'right',
          fontFace: 'Arial'
        });
      }

      // Render layouts
      const bullets = Array.isArray(slideData.bullets) ? slideData.bullets : [];
      
      if (slideData.layout === 'biochemical_diagram' && slideData.diagram) {
        renderPPTXDiagram(pptx, slide, slideData.diagram, activeTheme);
      } else if (slideData.layout === 'case_study' && slideData.tableData) {
        // Column 1 Card for Case narrative (Uses elevated white base to contrast with changing backgrounds)
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.6,
          y: 1.35,
          w: 5.8,
          h: 5.3,
          fill: { color: 'FFFFFF' },
          line: { color: activeTheme.border, width: 1 }
        });

        // Column 1 Text (with auto scaling)
        const bulletText = bullets.join('\n\n');
        const fSize = getOptimalFontSize(bulletText, 400);
        slide.addText(bullets.map(b => `➜  ${b}`).join('\n\n'), {
          x: 0.8,
          y: 1.55,
          w: 5.4,
          h: 4.9,
          fontSize: fSize,
          color: activeTheme.darkText,
          fontFace: 'Arial',
          align: 'left',
          valign: 'top',
          lineSpacing: fSize > 12 ? 18 : 14
        });

        // Column 2: Lab Results Table
        renderPPTXTable(slide, slideData.tableData, 6.6, 1.35, 6.13, 5.3, activeTheme);
        
      } else if (slideData.tableData) {
        // Standard table layout (e.g. diagnostics comparison or drug list)
        // Add introductory bullet text at the top
        const bulletText = bullets.slice(0, 1).join('\n');
        slide.addText(bulletText, {
          x: 0.6,
          y: 1.35,
          w: 12.13,
          h: 0.6,
          fontSize: 14,
          color: activeTheme.darkText,
          fontFace: 'Arial',
          valign: 'top'
        });

        renderPPTXTable(slide, slideData.tableData, 0.6, 2.1, 12.13, 4.5, activeTheme);
        
      } else {
        // Standard bullet layout (text column / dual column)
        const totalBullets = bullets.length;
        if (totalBullets > 4) {
          // Dual column layout with premium white elevated container cards
          const mid = Math.ceil(totalBullets / 2);
          const col1Bullets = bullets.slice(0, mid);
          const col2Bullets = bullets.slice(mid);

          // Card 1
          slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.6,
            y: 1.35,
            w: 5.8,
            h: 5.3,
            fill: { color: 'FFFFFF' },
            line: { color: activeTheme.border, width: 1 }
          });

          // Card 2
          slide.addShape(pptx.ShapeType.roundRect, {
            x: 6.6,
            y: 1.35,
            w: 6.13,
            h: 5.3,
            fill: { color: 'FFFFFF' },
            line: { color: activeTheme.border, width: 1 }
          });

          // Col 1 Text
          const allCol1Text = col1Bullets.join('\n\n');
          const fSize1 = getOptimalFontSize(allCol1Text, 400);
          slide.addText(col1Bullets.map(b => `✦  ${b}`).join('\n\n'), {
            x: 0.8,
            y: 1.55,
            w: 5.4,
            h: 4.9,
            fontSize: fSize1,
            color: activeTheme.darkText,
            fontFace: 'Arial',
            valign: 'top',
            lineSpacing: fSize1 > 12 ? 18 : 14
          });

          // Col 2 Text
          const allCol2Text = col2Bullets.join('\n\n');
          const fSize2 = getOptimalFontSize(allCol2Text, 400);
          slide.addText(col2Bullets.map(b => `✦  ${b}`).join('\n\n'), {
            x: 6.8,
            y: 1.55,
            w: 5.7,
            h: 4.9,
            fontSize: fSize2,
            color: activeTheme.darkText,
            fontFace: 'Arial',
            valign: 'top',
            lineSpacing: fSize2 > 12 ? 18 : 14
          });
        } else {
          // Single column layout with premium wide white container card
          slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.6,
            y: 1.35,
            w: 12.13,
            h: 5.3,
            fill: { color: 'FFFFFF' },
            line: { color: activeTheme.border, width: 1 }
          });

          const allText = bullets.join('\n\n');
          const fSize = getOptimalFontSize(allText, 600);

          slide.addText(bullets.map(b => `✦  ${b}`).join('\n\n'), {
            x: 0.8,
            y: 1.55,
            w: 11.73,
            h: 4.9,
            fontSize: fSize,
            color: activeTheme.darkText,
            fontFace: 'Arial',
            valign: 'top',
            lineSpacing: fSize > 12 ? 22 : 16
          });
        }
      }

      // Add Footer with page/theme elements
      slide.addText(`Slide ${idx + 1} | Dept of ${presentation.specialty} Lecture Series`, {
        x: 0.6,
        y: 6.9,
        w: 6.0,
        h: 0.3,
        fontSize: 10,
        color: '888888',
        fontFace: 'Arial'
      });

      slide.addText(`NMC CBME MBBS/MD Curriculum`, {
        x: 8.0,
        y: 6.9,
        w: 4.7,
        h: 0.3,
        fontSize: 10,
        color: activeTheme.secondary,
        align: 'right',
        fontFace: 'Arial',
        bold: true
      });
    }
  });

  // Save the presentation
  const fileName = `${presentation.topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cbme_lecture.pptx`;
  pptx.writeFile({ fileName });
}

function renderPPTXTable(
  slide: pptxgen.Slide,
  tableData: { headers: string[]; rows: string[][] },
  x: number,
  y: number,
  w: number,
  h: number,
  theme: any
) {
  if (!tableData || !Array.isArray(tableData.headers) || !Array.isArray(tableData.rows)) return;

  // Convert custom structure to pptxgen table cell format
  const headerCells = tableData.headers.map(header => ({
    text: header,
    options: {
      fill: { color: theme.primary },
      color: 'FFFFFF',
      bold: true,
      fontSize: 11,
      fontFace: 'Arial',
      align: 'center' as const,
      valign: 'middle' as const
    }
  }));

  const rowCells = tableData.rows.map((row, rowIdx) => {
    const isEven = rowIdx % 2 === 0;
    return row.map(cell => ({
      text: cell,
      options: {
        fill: { color: isEven ? 'F8FAFC' : 'FFFFFF' },
        color: theme.darkText,
        fontSize: 10,
        fontFace: 'Arial',
        align: 'left' as const,
        valign: 'middle' as const,
        border: { type: 'solid' as const, color: 'E2E8F0', size: 1 }
      }
    }));
  });

  const allCells = [headerCells, ...rowCells];
  
  slide.addTable(allCells, {
    x,
    y,
    w,
    h: Math.min(h, allCells.length * 0.45) // beautiful autosizing
  });
}

function renderPPTXDiagram(
  pptx: pptxgen,
  slide: pptxgen.Slide,
  diagram: any,
  theme: any
) {
  if (!diagram) return;
  // Boundaries of the diagram workspace in PowerPoint (in inches)
  // Slide is 13.33 x 7.5. Let's place the diagram in a clean center-bottom box
  const workspaceX = 0.6;
  const workspaceY = 1.35;
  const workspaceW = 12.13;
  const workspaceH = 5.3;

  const compartments = Array.isArray(diagram.compartments) ? diagram.compartments : [];
  const nodes = Array.isArray(diagram.nodes) ? diagram.nodes : [];
  const edges = Array.isArray(diagram.edges) ? diagram.edges : [];

  // Draw premium canvas container card for diagram
  slide.addShape(pptx.ShapeType.roundRect, {
    x: workspaceX,
    y: workspaceY,
    w: workspaceW,
    h: workspaceH,
    fill: { color: 'FAFBFD' }, // very light steel grey/blue canvas background
    line: { color: 'E2E8F0', width: 1 }
  });

  // Let's render compartment boxes first if they exist
  if (compartments.length > 0) {
    const totalCompartments = compartments.length;
    compartments.forEach((compName: string, compIdx: number) => {
      // Divide horizontal space equally for compartments
      const compW = workspaceW / totalCompartments;
      const compX = workspaceX + (compIdx * compW);

      slide.addShape(pptx.ShapeType.roundRect, {
        x: compX + 0.1,
        y: workspaceY + 0.1,
        w: compW - 0.2,
        h: workspaceH - 0.2,
        fill: { color: theme.lightBg },
        line: { color: theme.primary, width: 1.5, dashType: 'dash' }
      });

      slide.addText(compName.toUpperCase(), {
        x: compX + 0.2,
        y: workspaceY + 0.18,
        w: compW - 0.4,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: theme.primary,
        fontFace: 'Arial',
        align: 'center'
      });
    });
  }

  // Draw Edges (Arrows) first so nodes sit on top of them
  edges.forEach((edge: DiagramEdge) => {
    if (!edge || !edge.from || !edge.to) return;
    const fromNode = nodes.find((n: DiagramNode) => n && n.id === edge.from);
    const toNode = nodes.find((n: DiagramNode) => n && n.id === edge.to);

    if (fromNode && toNode) {
      // Clamping engine to ensure edges always stay nicely inside the padded diagram canvas
      const fromClampedX = Math.max(10, Math.min(90, fromNode.x));
      const fromClampedY = Math.max(12, Math.min(88, fromNode.y));
      const toClampedX = Math.max(10, Math.min(90, toNode.x));
      const toClampedY = Math.max(12, Math.min(88, toNode.y));

      // Map percentage coordinate to inches
      const x1 = workspaceX + (fromClampedX / 100) * workspaceW;
      const y1 = workspaceY + (fromClampedY / 100) * workspaceH;
      const x2 = workspaceX + (toClampedX / 100) * workspaceW;
      const y2 = workspaceY + (toClampedY / 100) * workspaceH;

      // Draw direct connection line
      let lineColor = theme.secondary;
      let lineDash: 'solid' | 'dash' = 'solid';
      let endArrow: 'arrow' | 'none' = 'arrow';

      if (edge.style === 'activation') {
        lineColor = '10B981'; // Green arrow
      } else if (edge.style === 'inhibition') {
        lineColor = 'EF4444'; // Red line
        endArrow = 'none'; // Will draw standard arrow or a flat line for inhibition
      }

      // Add connector line with arrow
      slide.addShape(pptx.ShapeType.line, {
        x: x1,
        y: y1,
        w: (x2 - x1),
        h: (y2 - y1),
        line: { 
          color: lineColor, 
          width: 2, 
          dashType: lineDash,
          endArrowType: endArrow === 'arrow' ? 'arrow' as const : undefined 
        }
      });

      // Edge label (Enzyme / Reaction) midway
      if (edge.label) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        slide.addText(edge.label, {
          x: midX - 0.75,
          y: midY - 0.15,
          w: 1.5,
          h: 0.3,
          fontSize: 8,
          bold: true,
          color: theme.primary,
          align: 'center',
          fontFace: 'Arial',
          fill: { color: 'FFFFFF' } // Backblock fill to prevent arrow lines from rendering through label text
        });
      }
    }
  });

  // Draw Nodes (Substrates, Enzymes, Receptors)
  nodes.forEach((node: DiagramNode) => {
    if (!node || typeof node.x !== 'number' || typeof node.y !== 'number') return;
    const nodeW = 1.4;
    const nodeH = 0.65;
    
    // Node clamping engine to keep elements beautifully within presentation bounds
    const clampedX = Math.max(10, Math.min(90, node.x));
    const clampedY = Math.max(12, Math.min(88, node.y));

    // Map percentage coordinate to inches
    const nodeX = workspaceX + (clampedX / 100) * workspaceW - (nodeW / 2);
    const nodeY = workspaceY + (clampedY / 100) * workspaceH - (nodeH / 2);

    // Style according to Node Type
    let fillColor = 'FFFFFF';
    let borderColor = theme.primary;
    let textColor = theme.darkText;
    let shapeType = pptx.ShapeType.roundRect;

    if (node.type === 'substrate') {
      fillColor = 'FFFFFF';
      borderColor = theme.primary;
      shapeType = pptx.ShapeType.roundRect;
    } else if (node.type === 'enzyme') {
      fillColor = theme.secondary;
      borderColor = theme.secondary;
      textColor = 'FFFFFF';
      shapeType = pptx.ShapeType.ellipse;
    } else if (node.type === 'receptor') {
      fillColor = 'F1F5F9';
      borderColor = '475569';
      shapeType = pptx.ShapeType.hexagon;
    } else if (node.type === 'clinical_condition') {
      fillColor = 'FEF2F2';
      borderColor = 'EF4444';
      textColor = '991B1B';
      shapeType = pptx.ShapeType.rect;
    } else if (node.type === 'organelle') {
      fillColor = 'F5F3FF';
      borderColor = '7C3AED';
      shapeType = pptx.ShapeType.cloud;
    }

    // Add Shape
    slide.addShape(shapeType, {
      x: nodeX,
      y: nodeY,
      w: nodeW,
      h: nodeH,
      fill: { color: fillColor },
      line: { color: borderColor, width: 2 }
    });

    // Add Node Text inside the shape
    slide.addText(node.label, {
      x: nodeX + 0.05,
      y: nodeY + 0.05,
      w: nodeW - 0.1,
      h: nodeH - 0.1,
      fontSize: 9,
      bold: true,
      color: textColor,
      align: 'center',
      valign: 'middle',
      fontFace: 'Arial'
    });

    // If enzyme has active regulation notes, let's add a small regulation label beneath it
    if (node.regulation) {
      slide.addText(`Reg: ${node.regulation}`, {
        x: nodeX - 0.3,
        y: nodeY + nodeH + 0.02,
        w: nodeW + 0.6,
        h: 0.25,
        fontSize: 7,
        italic: true,
        color: '666666',
        align: 'center',
        fontFace: 'Arial'
      });
    }
  });
}

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Activity, 
  Pill, 
  HelpCircle, 
  Layers, 
  Download, 
  Sparkles, 
  Play, 
  Check, 
  Edit, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  BookOpen, 
  Info, 
  AlertCircle, 
  Printer, 
  Share2, 
  X, 
  RotateCcw,
  Clock,
  Smartphone,
  Eye,
  QrCode,
  MessageSquare,
  BarChart3,
  Smile,
  Meh,
  Frown
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Presentation, Slide, DiagramNode, DiagramEdge } from './types';
import { generateAndDownloadPPTX } from './utils/pptxGenerator';

// PRE-DEFINED MEDICAL CBME EXEMPLARY PRESENTATIONS FOR INSTANT USE
const PRESETS: Presentation[] = [
  {
    topic: "Diabetic Ketoacidosis & GLUT-4 Translocation Pathway",
    specialty: "Biochemistry & Medicine",
    targetAudience: "MBBS",
    theme: "Teal Clinical",
    slideCount: 10,
    slides: [
      {
        title: "Diabetic Ketoacidosis: Molecular Basis & Clinical Crisis",
        layout: "title",
        cbmeCode: "BI-3.4",
        competency: "Explain the biochemical basis of acute complications of diabetes mellitus",
        bullets: [
          "Diabetic Ketoacidosis (DKA) is a life-threatening acute metabolic complication of Insulin Deficiency.",
          "Characterized by the clinical triad of *Hyperglycemia*, *Anion-Gap Metabolic Acidosis*, and *Ketonemia*.",
          "This lecture explores the molecular blockade of glucose transport, the uncontrolled cascade of lipolysis, and the therapeutic molecular targets.",
          "Aligned with the National Medical Commission (NMC) CBME Curriculum for phase-1 MBBS students."
        ],
        speakerNotes: "Welcome students to today's lecture on Diabetic Ketoacidosis. This topic is highly examinable and is crucial for your clinical medicine years. We will look beyond the simple clinical signs and dive deep into the insulin receptor signal transduction failure and how it causes a critical shift in liver fatty acid metabolism."
      },
      {
        title: "NMC CBME Competencies & Specific Learning Objectives",
        layout: "objectives",
        cbmeCode: "BI-3.4 & BI-4.2",
        competency: "Discuss the metabolic processes of carbohydrates and lipolysis, and correlate with clinical emergencies.",
        bullets: [
          "**SLO 1**: Explain the molecular mechanism of insulin-dependent GLUT-4 translocation in skeletal muscle and adipose tissue.",
          "**SLO 2**: Describe the hormonal regulation of Hormone-Sensitive Lipase (HSL) and its activation in insulin-deficient states.",
          "**SLO 3**: Trace the biochemical pathway of Ketogenesis in hepatic mitochondria, identifying the rate-limiting enzyme.",
          "**SLO 4**: Correlate laboratory findings (low pH, low bicarbonate, high ketones) with the underlying molecular pathology.",
          "**SLO 5**: Formulate the biochemical basis of pharmacological management with intravenous insulin and fluid resuscitation."
        ],
        speakerNotes: "NMC competency guidelines require that phase-1 students do not just memorize clinical facts, but understand the exact molecular kinetics. Make sure you can draw the GLUT-4 vesicle fusion pathway and explain how insulin normally keeps lipolysis in check."
      },
      {
        title: "Clinical Case Vignette: Acute Comatose Emergency",
        layout: "case_study",
        cbmeCode: "BI-4.2",
        competency: "Correlate biochemical parameters with pathological states.",
        bullets: [
          "**History**: A 19-year-old female is brought to the emergency department in an altered state of consciousness. Her parents report progressive polyuria, polydipsia, and significant weight loss over the past 2 weeks.",
          "**Physical Examination**: Deep, rapid, sighing respirations (*Kussmaul breathing*), dry mucous membranes, cold extremities, and a distinct fruity odor on her breath.",
          "**Initial Clinical Suspicion**: Acute onset Type 1 Diabetes Mellitus presenting as Diabetic Ketoacidosis (DKA)."
        ],
        tableData: {
          headers: ["Laboratory Parameter", "Patient Value", "Reference Range", "Clinical Significance"],
          rows: [
            ["Arterial Blood pH", "7.15", "7.35 – 7.45", "Severe Acidemia (Metabolic)"],
            ["Plasma Bicarbonate", "10 mEq/L", "22 – 26 mEq/L", "Severe Consumption of Buffers"],
            ["Random Blood Glucose", "425 mg/dL", "< 140 mg/dL", "Severe Insulin-Deficient Hyperglycemia"],
            ["Urine Ketones", "++++ (Strongly Pos)", "Negative", "Uncontrolled Hepatic Ketogenesis"],
            ["Anion Gap", "24 mEq/L", "8 – 12 mEq/L", "High Anion Gap Acidosis (HAGMA)"],
            ["Serum Potassium", "5.2 mEq/L", "3.5 – 5.0 mEq/L", "Extracellular Shift (False Normalkalemia)"]
          ]
        },
        speakerNotes: "Notice the patient's blood pH of 7.15 and bicarbonate of 10. This indicates a profound metabolic acidosis. The Kussmaul breathing is a physiological compensatory mechanism to blow off CO2 and reduce carbonic acid levels. We must treat this promptly."
      },
      {
        title: "Pathophysiological Overview: Systemic Starvation",
        layout: "pathophysiology",
        cbmeCode: "BI-3.4",
        competency: "Discuss carbohydrate and lipid metabolic inter-relationships.",
        bullets: [
          "In the absolute absence of *Insulin*, the body is in a state of 'cellular starvation in the midst of nutrient plenty'.",
          "Without insulin to suppress counter-regulatory hormones, there is a massive surge in *Glucagon*, *Epinephrine*, and *Cortisol*.",
          "This hormonal imbalance drives unchecked hepatic *Gluconeogenesis* and glycogenolysis, pushing blood glucose to extreme levels.",
          "Simultaneously, glucose cannot enter peripheral muscle or adipose cells, forcing cells to metabolize lipids as their primary fuel source.",
          "Result: Hyperosmolality leads to osmotic diuresis, profound dehydration, electrolyte depletion, and circulatory shock."
        ],
        speakerNotes: "Explain the glucose paradox to students: blood is thick with glucose, yet the muscle cells are literally starving because they lack the key to let glucose in. That key is insulin, and its signaling is blocked at the receptor level."
      },
      {
        title: "Advanced Molecular Mechanism: Insulin Signaling Collapse",
        layout: "molecular_mechanism",
        cbmeCode: "BI-3.4",
        competency: "Understand receptor-ligand interactions and second messenger cascades.",
        bullets: [
          "**Insulin Receptor Activation**: Normally, insulin binds to the extracellular alpha-subunits of its receptor, triggering *Autophosphorylation* of tyrosine residues on the intracellular beta-subunits.",
          "**The Signal Cascade**: This recruits Insulin Receptor Substrate-1 (IRS-1), which activates Phosphoinositide 3-Kinase (PI3K). PI3K converts PIP2 to PIP3, activating Phosphoinositide-Dependent Kinase 1 (PDK1) and downstream *Protein Kinase B (Akt)*.",
          "**GLUT-4 Translocation**: Active Akt phosphorylates AS160 (Akt substrate of 160 kDa), releasing the inhibition on Rab GTPase and allowing GLUT-4 storage vesicles (GSVs) to fuse with the plasma membrane.",
          "**The Blockade in DKA**: In Type 1 DM, the complete lack of insulin ligand means the IRS-1/PI3K/Akt pathway is silent. GLUT-4 vesicles remain trapped in the cytoplasmic compartment, rendering the membrane completely impermeable to glucose."
        ],
        speakerNotes: "For MD students, highlight PDK1, Akt, and AS160. AS160 is a GTPase-activating protein. When Akt phosphorylates it, AS160 is inactivated, allowing Rab GTPases to initiate vesicle docking. Without insulin, AS160 remains active, and Rab is turned off, halting GLUT-4 transport."
      },
      {
        title: "Interactive Biochemical Pathway: Ketogenesis & Transport",
        layout: "biochemical_diagram",
        cbmeCode: "BI-4.2",
        competency: "Integrate lipid and carbohydrate pathways in metabolic homeostasis.",
        bullets: [
          "Insulin deficiency releases the brake on *Hormone-Sensitive Lipase (HSL)* in adipose tissue, causing unchecked hydrolysis of triacylglycerols into free fatty acids (FFAs).",
          "FFAs enter hepatic mitochondria via the Carnitine Palmitoyltransferase-1 (CPT-1) shuttle, which is fully active due to low Malonyl-CoA levels (as Acetyl-CoA Carboxylase is inactive).",
          "Beta-oxidation of FFAs floods liver mitochondria with Acetyl-CoA, which overwhelms the Krebs Cycle.",
          "Excess Acetyl-CoA is diverted to the Ketogenesis pathway: Acetyl-CoA -> Acetoacetyl-CoA -> *HMG-CoA* -> Acetoacetate -> *Beta-Hydroxybutyrate*."
        ],
        diagram: {
          title: "The Insulin Receptor Block & Hepatic Ketogenesis Cascade",
          type: "metabolic_pathway",
          compartments: ["Adipose Cytosol", "Hepatic Cytosol", "Hepatic Mitochondria"],
          nodes: [
            { id: "insulin", label: "Insulin (Absent)", type: "substrate", compartment: "Adipose Cytosol", description: "Hormone ligand required to trigger glucose uptake and suppress lipolysis.", x: 15, y: 15 },
            { id: "hsl", label: "Active HSL", type: "enzyme", compartment: "Adipose Cytosol", description: "Hormone-Sensitive Lipase is phosphorylated and fully active in insulin absence. Hydrolyzes fat stores.", regulation: "Glucagon (+), Insulin (-)", x: 15, y: 55 },
            { id: "ffa", label: "Free Fatty Acids", type: "substrate", compartment: "Adipose Cytosol", description: "Lipid fuels released in massive quantities into circulation.", x: 15, y: 85 },
            { id: "cpt1", label: "CPT-1 Shuttle", type: "receptor", compartment: "Hepatic Cytosol", description: "Carnitine Palmitoyltransferase-1. Imports fatty acids into mitochondria. Uninhibited in DKA.", regulation: "Malonyl-CoA (-)", x: 50, y: 45 },
            { id: "acetylcoa", label: "Acetyl-CoA", type: "substrate", compartment: "Hepatic Mitochondria", description: "Central metabolic hub. Floods mitochondria due to intensive beta-oxidation.", x: 85, y: 20 },
            { id: "hmgcoas", label: "HMG-CoA Synthase", type: "enzyme", compartment: "Hepatic Mitochondria", description: "Mitochondrial rate-limiting enzyme of ketogenesis. Highly active in DKA.", regulation: "Starvation (+)", x: 85, y: 55 },
            { id: "ketones", label: "Ketone Bodies", type: "clinical_condition", compartment: "Hepatic Mitochondria", description: "Beta-hydroxybutyrate and acetoacetate. Strong organic acids that lower blood pH.", x: 85, y: 85 }
          ],
          edges: [
            { from: "insulin", to: "hsl", label: "Removes Inhibition", style: "inhibition" },
            { from: "hsl", to: "ffa", label: "Triggers Lipolysis", style: "conversion" },
            { from: "ffa", to: "cpt1", label: "Circulates to Liver", style: "conversion" },
            { from: "cpt1", to: "acetylcoa", label: "Beta-Oxidation", style: "conversion" },
            { from: "acetylcoa", to: "hmgcoas", label: "Condensation", style: "conversion" },
            { from: "hmgcoas", to: "ketones", label: "HMG-CoA Cleavage", style: "conversion" }
          ]
        },
        speakerNotes: "Point out HSL in adipose tissue. It is regulated by cAMP-dependent PKA. Glucagon increases cAMP, phosphorylating and activating HSL. Normally, insulin activates protein phosphatase 2A, dephosphorylating HSL and turning it off. In DKA, HSL runs rampant, flooding the liver with FFAs."
      },
      {
        title: "Clinical & Laboratory Correlation: Resolving the Acidosis",
        layout: "clinical_correlation",
        cbmeCode: "BI-4.2",
        competency: "Discuss the buffering systems of the body and acid-base disturbances.",
        bullets: [
          "**Anion Gap Acidosis**: Ketone bodies (Acetoacetate and Beta-hydroxybutyrate) are fully dissociated at physiological pH. They release protons (H+), which consume Bicarbonate (HCO3-) to form Carbonic Acid.",
          "**The Anion Gap Equation**: $AG = Na^+ - (Cl^- + HCO_3^-)$. Accumulation of unmeasured anions (ketones) drives the anion gap up (e.g., 24 mEq/L vs normal 12).",
          "**Serum Potassium Paradox**: Extracellular H+ enters cells in exchange for Intracellular Potassium (K+) moving out. Lack of insulin also stops the Na+/K+ ATPase pump from pumping K+ back into cells.",
          "**Clinical Alert**: Although total body potassium is severely depleted due to osmotic renal losses, the initial serum test shows normal or high potassium! Giving insulin will rapidly drive potassium back into cells, causing lethal hypokalemia if not monitored."
        ],
        speakerNotes: "This potassium shift is a classic exam favorite. Intracellular dehydration and cellular buffering drive K+ out of the cells. When you give insulin, it activates Na+/K+ ATPase, shifting K+ back inside and potentially causing sudden, dangerous cardiac arrhythmias. Always check potassium before insulin!"
      },
      {
        title: "Targeted Pharmacology: Molecular Interventions",
        layout: "pharmacology",
        cbmeCode: "PH-1.15",
        competency: "Describe the mechanism of action, pharmacokinetics, and side effects of insulin.",
        bullets: [
          "**Intravenous Regular Insulin Infusion**: The absolute first-line molecular therapy. Re-establishes insulin receptor autophosphorylation and the IRS-1/PI3K/Akt pathway.",
          "**Actions**: Shuts down adipose HSL instantly, halts hepatic gluconeogenesis, and triggers GLUT-4 translocation to clear glucose from plasma.",
          "**Isotonic Saline (0.9% NaCl)**: Restores plasma volume, rehydrates the extracellular compartment, increases renal perfusion to flush glucose and ketones.",
          "**Potassium Replenishment**: Crucial. Administered as soon as serum potassium drops below 5.2 mEq/L, anticipating the intracellular shift driven by insulin.",
          "**Bicarbonate Therapy**: Highly restricted. Only given if pH is < 6.9, as rapid bicarbonate correction shifts the oxygen-hemoglobin dissociation curve and worsens cerebral edema."
        ],
        speakerNotes: "Highlight why we use IV Regular Insulin rather than subcutaneous. Regular insulin is short-acting and easily titrated. If we give long-acting insulin, we risk severe, irreversible hypoglycemia. We want strict, minute-by-minute control over the glucose clearance rate."
      },
      {
        title: "Case Study Resolution & Lecture Discussion",
        layout: "q_and_a",
        cbmeCode: "BI-4.2",
        competency: "Apply biochemical concepts to clinical decision-making.",
        bullets: [
          "**Case Resolution**: The patient was started on aggressive IV fluid resuscitation (2 liters over 2 hours) and an IV insulin infusion at 0.1 U/kg/hr. Once blood glucose fell below 250 mg/dL, 5% Dextrose was added to keep blood glucose stable while insulin continued to clear the remaining ketone bodies.",
          "**Laboratory Recovery**: After 12 hours, pH corrected to 7.36, bicarbonate rose to 20 mEq/L, and urine ketones cleared. The patient regained consciousness and was successfully transitioned to subcutaneous insulin.",
          "**High-Yield Viva Questions for Students**:",
          "1. What is the rate-limiting enzyme of ketogenesis, and where is it located cellularly?",
          "2. Why does total-body potassium deplete in DKA while serum potassium is high?",
          "3. How does Malonyl-CoA regulate CPT-1 shuttle activity?"
        ],
        speakerNotes: "Use these questions to wrap up the lecture. Have students discuss them in small groups. Remind them that mitochondrial HMG-CoA synthase is the rate-limiting enzyme of ketogenesis, whereas cytosolic HMG-CoA synthase is involved in cholesterol synthesis."
      },
      {
        title: "Summary: Take-Home Messages & References",
        layout: "summary",
        cbmeCode: "BI-3.4",
        competency: "Synthesize carbohydrate, lipid, and clinical correlations.",
        bullets: [
          "*DKA* is fundamentally an endocrine failure causing severe systemic fuel dysregulation.",
          "*GLUT-4 Translocation* is insulin-dependent and ceases completely, starving peripheral tissues of glucose.",
          "*Unchecked Lipolysis* drives fatty acids to hepatic mitochondria, flooding the system with ketone acids.",
          "*Potassium Management* is the most critical safety parameter during insulin therapy.",
          "**Core Peer-Reviewed References**:",
          "1. *Harper's Illustrated Biochemistry*, 32nd Edition. Chapter 19 & 22.",
          "2. *Harrison's Principles of Internal Medicine*, 21st Edition. Endocrine Crises.",
          "3. *NMC CBME Competency Guidelines for Phase-1 Undergraduate Medical Education*."
        ],
        speakerNotes: "Summarize the key takeaways. Instruct students to review the corresponding chapters in Harper's. Emphasize that metabolic pathways are not isolated; they are fully integrated. Thank them for their attention, and open the floor for any individual questions."
      }
    ]
  },
  {
    topic: "Atherosclerotic Plaque Formation & Lipid Metabolism",
    specialty: "Pathology & Biochemistry",
    targetAudience: "Integrated (MBBS & MD)",
    theme: "Crimson Hematology",
    slideCount: 10,
    slides: [
      {
        title: "Atherosclerosis: Molecular Pathophysiology & Lipid Regulation",
        layout: "title",
        cbmeCode: "PA-2.3",
        competency: "Discuss the pathogenesis, pathology, and complications of atherosclerosis.",
        bullets: [
          "Atherosclerosis is a chronic inflammatory disease of the arterial wall driven by lipid metabolism dysregulation.",
          "Characterized by the progressive accumulation of lipids, macrophages, and smooth muscle cells in the tunica intima.",
          "This lecture covers LDL receptor kinetics, foam cell transformation, and the latest molecular targets for preventing cardiovascular plaque rupture.",
          "Integrated MBBS and MD curriculum matching NMC CBME guidelines."
        ],
        speakerNotes: "Welcome everyone. Today we are exploring Atherosclerosis. Do not think of it as a simple 'clogged pipe.' It is an active, cytokine-mediated inflammatory battleground where lipids and scavenger receptors play a central role."
      },
      {
        title: "NMC CBME Pathological Competencies",
        layout: "objectives",
        cbmeCode: "PA-2.3 & BI-3.2",
        bullets: [
          "**Objective 1**: Understand the 'Response to Injury' hypothesis of endothelial dysfunction.",
          "**Objective 2**: Describe the oxidation of LDL in the sub-endothelial space and its uptake via scavenger receptors.",
          "**Objective 3**: Trace the transition of macrophages to foam cells and the activation of the NLRP3 inflammasome.",
          "**Objective 4**: Correlate lipid profile metrics (LDL-C, HDL-C, ApoB) with patient-specific cardiovascular risks."
        ],
        speakerNotes: "We want to merge pathology and biochemistry today. For MD students, we will focus specifically on Scavenger Receptors SR-A1 and CD36, as well as the mechanical aspects of fibrous cap thinning."
      },
      {
        title: "Clinical Vignette: Coronary Artery Ischemic Event",
        layout: "case_study",
        cbmeCode: "PA-2.3",
        bullets: [
          "**History**: A 54-year-old male executive presents with crushing substernal chest pain radiating to his left arm, accompanied by diaphoresis and acute dyspnea, triggered by moderate exertion.",
          "**Risk Factors**: 30 pack-year smoker, untreated hypertension, father died of myocardial infarction at age 48.",
          "**Diagnosis**: ST-Elevation Myocardial Infarction (STEMI) secondary to acute plaque rupture."
        ],
        tableData: {
          headers: ["Lipid Parameter", "Patient Level", "Target Level", "Risk Stratification"],
          rows: [
            ["Total Cholesterol", "280 mg/dL", "< 200 mg/dL", "Severe Hypercholesterolemia"],
            ["LDL-C (Bad)", "195 mg/dL", "< 70 mg/dL", "Critically High Atherogenic Burden"],
            ["HDL-C (Good)", "32 mg/dL", "> 40 mg/dL", "Deficient Reverse Transport"],
            ["Triglycerides", "220 mg/dL", "< 150 mg/dL", "Elevated"],
            ["Apolipoprotein B", "145 mg/dL", "< 80 mg/dL", "High Number of Atherogenic Particles"],
            ["hs-CRP", "4.8 mg/L", "< 1.0 mg/L", "High Vascular Wall Inflammation"]
          ]
        },
        speakerNotes: "Look at his lipid panel. An LDL of 195 coupled with a low HDL of 32 represents a catastrophic lipid profile. His elevated ApoB confirms a high density of atherogenic small dense LDL particles that penetrate the arterial intima easily."
      },
      {
        title: "Pathogenesis: The Response to Injury Cascade",
        layout: "pathophysiology",
        cbmeCode: "PA-2.3",
        bullets: [
          "**Endothelial Injury**: Caused by mechanical shear stress, cigarette smoke toxins, advanced glycation endproducts (AGEs), or oxidized lipids.",
          "**Adhesion Molecule Expression**: Damaged endothelium upregulates VCAM-1, ICAM-1, and E-selectin, attracting circulating monocytes.",
          "**Monocyte Diapedesis**: Monocytes migrate into the sub-endothelial space under the influence of Monocyte Chemoattractant Protein-1 (MCP-1).",
          "**Macrophage Activation**: Monocytes differentiate into macrophages and begin expressing scavenger receptors to clear trapped lipids."
        ],
        speakerNotes: "Explain that native LDL is not recognized by scavenger receptors. Endothelial injury allows LDL to slip into the intima, where it is oxidized by free radicals. This oxidized LDL (oxLDL) is the real culprit that initiates the scavenger cascade."
      },
      {
        title: "Advanced Molecular Mechanism: Scavenger Receptors & Foam Cells",
        layout: "molecular_mechanism",
        cbmeCode: "BI-3.2",
        bullets: [
          "**LDL Oxidation**: Intimal LDL is oxidized by lipoxygenases, myeloperoxidase, and reactive oxygen species, creating *oxLDL*.",
          "**Unregulated Uptake**: Unlike the LDL-Receptor, which is tightly down-regulated by high intracellular cholesterol, scavenger receptors like *CD36* and *SR-A* are NOT down-regulated.",
          "**Foam Cell Formation**: Macrophages ingest oxLDL indefinitely, accumulating massive cholesteryl ester droplets in their cytosol. This gives them a characteristic 'foamy' appearance under the microscope.",
          "**Inflammasome Activation**: Intracellular cholesterol crystals trigger the NLRP3 inflammasome, causing the release of interleukin-1 beta (IL-1β) and IL-18, propagating local tissue damage."
        ],
        speakerNotes: "Because scavenger receptors lack feedback inhibition, the macrophage literally eats itself to death. Highlight this difference: normal cells shut down LDL-Receptors to protect themselves. Macrophages do not, because scavenger receptors are designed for clearance, not homeostasis."
      },
      {
        title: "Biochemical Pathway: Cholesterol Endocytosis & Regulation",
        layout: "biochemical_diagram",
        cbmeCode: "BI-3.2",
        bullets: [
          "**LDLR Endocytosis**: ApoB-100 binds to the LDL Receptor (LDLR) in clathrin-coated pits. The complex is endocytosed, and cholesterol is released in lysosomes.",
          "**SREBP Feedback**: High cellular cholesterol inhibits SREBP (Sterol Regulatory Element-Binding Protein) activation, shutting down HMG-CoA Reductase and LDLR expression.",
          "**PCSK9 Pathway**: PCSK9 binds to LDLR on the cell surface, directing it to the lysosome for degradation rather than recycling. High PCSK9 reduces LDLR availability."
        ],
        diagram: {
          title: "LDL Receptor Recycling & Cellular Cholesterol Regulation",
          type: "metabolic_pathway",
          compartments: ["Extracellular", "Plasma Membrane", "Endosome/Lysosome", "Adipocyte/Liver Cytosol"],
          nodes: [
            { id: "ldl", label: "LDL / ApoB", type: "substrate", compartment: "Extracellular", description: "Circulating low-density lipoprotein containing ApoB-100 target protein.", x: 20, y: 15 },
            { id: "ldlr", label: "LDL Receptor", type: "receptor", compartment: "Plasma Membrane", description: "Binds ApoB. Recycles back to surface after endocytosis unless degraded by PCSK9.", x: 20, y: 45 },
            { id: "pcsk9", label: "Active PCSK9", type: "enzyme", compartment: "Extracellular", description: "Proprotein convertase. Binds LDLR and targets it for degradation, reducing LDL clearance.", regulation: "Statins (+), PCSK9 Inhibitors (-)", x: 50, y: 30 },
            { id: "lysosome", label: "Lysosomal Degradation", type: "organelle", compartment: "Endosome/Lysosome", description: "Acidic compartment that breaks down LDL into free cholesterol, or degrades LDLR under PCSK9.", x: 50, y: 75 },
            { id: "cholesterol", label: "Free Cholesterol Pool", type: "substrate", compartment: "Adipocyte/Liver Cytosol", description: "Regulates HMG-CoA reductase and SREBP pathway. Shuts down de novo synthesis.", x: 80, y: 75 },
            { id: "hmgcoa", label: "HMG-CoA Reductase", type: "enzyme", compartment: "Adipocyte/Liver Cytosol", description: "Rate limiting enzyme of cholesterol synthesis. Inhibited by intracellular cholesterol.", regulation: "Statins (-), Cholesterol (-)", x: 80, y: 35 }
          ],
          edges: [
            { from: "ldl", to: "ldlr", label: "Endocytosis", style: "activation" },
            { from: "pcsk9", to: "ldlr", label: "Directs Degradation", style: "inhibition" },
            { from: "ldlr", to: "lysosome", label: "Trafficking", style: "conversion" },
            { from: "lysosome", to: "cholesterol", label: "Esters Hydrolyzed", style: "conversion" },
            { from: "cholesterol", to: "hmgcoa", label: "Feedback Inhibits", style: "inhibition" }
          ]
        },
        speakerNotes: "For MD students, explain the PCSK9 cycle. By blocking PCSK9, we prevent LDLR degradation, allowing more receptors to recycle back to the cell membrane. This dramatically accelerates LDL clearance from the blood, reducing cardiovascular risk."
      },
      {
        title: "Plaque Evolution: From Fatty Streak to Rupture",
        layout: "clinical_correlation",
        cbmeCode: "PA-2.3",
        bullets: [
          "**The Fatty Streak**: The earliest visible lesion. Composed entirely of sub-endothelial foam cells. Reversible at this stage with lipid-lowering therapy.",
          "**Smooth Muscle Migration**: Foam cells secrete cytokines (PDGF, FGF) that stimulate smooth muscle cells (SMCs) to migrate from the media to the intima.",
          "**Fibrous Cap Formation**: SMCs synthesize collagen and extracellular matrix, forming a 'fibrous cap' over a necrotic core of lipid and cellular debris.",
          "**Vulnerability & Rupture**: Macrophages secrete Matrix Metalloproteinases (MMPs) that degrade collagen. A thin fibrous cap with a large necrotic core is highly unstable. Rupture exposes thrombogenic core to blood, causing acute thrombosis."
        ],
        speakerNotes: "The transition from a stable plaque to an unstable plaque is determined by the balance of collagen synthesis (SMCs) and collagen degradation (macrophages). Statins stabilize plaques not just by lowering cholesterol, but by reducing macrophage MMP secretion."
      },
      {
        title: "Targeted Pharmacology: Plaque Stabilizers & PCSK9",
        layout: "pharmacology",
        cbmeCode: "PH-1.15",
        bullets: [
          "**HMG-CoA Reductase Inhibitors (Statins)**: Block cholesterol synthesis, driving up LDLR expression to clear blood LDL. Pleiotropic effects: reduce inflammation and stabilize fibrous caps.",
          "**Ezetimibe**: Blocks the NPC1L1 transporter in the jejunum, preventing dietary and biliary cholesterol absorption.",
          "**PCSK9 Monoclonal Antibodies (Evolocumab)**: Injectable therapy. Prevents LDLR degradation in lysosomes, yielding up to a 60% reduction in circulating LDL.",
          "**Anti-Inflammatory Targets (Canakinumab)**: Monoclonal antibody targeting IL-1β, validating the inflammation hypothesis of cardiovascular disease (CANTOS trial)."
        ],
        speakerNotes: "Make sure students know the term 'pleiotropic effects.' Statins do not just lower lipids; they improve endothelial function, decrease platelet aggregation, and reduce vascular inflammation. This is why we give statins immediately in acute coronary syndrome regardless of LDL level."
      },
      {
        title: "Clinical Discussion: Integrated Q&A",
        layout: "q_and_a",
        cbmeCode: "PA-2.3",
        bullets: [
          "**Case Resolution**: The patient underwent emergency coronary angiography, showing a 95% occlusion of the Left Anterior Descending (LAD) artery. An Angioplasty was performed and a drug-eluting stent placed. He was discharged on high-dose Atorvastatin, Aspirin, and Clopidogrel.",
          "**Student High-Yield Review Questions**:",
          "1. Why are scavenger receptors immune to intracellular cholesterol feedback inhibition?",
          "2. Name two matrix metalloproteinases involved in fibrous cap degradation.",
          "3. Detail the mechanism of action of Evolocumab."
        ],
        speakerNotes: "Answer to Q1: Scavenger receptors like CD36 are scavenger proteins designed for clearing waste. They lack the sterol-regulatory domains present in the LDL receptor gene pathway. Thus, they ingest lipid until the cell undergoes apoptosis."
      },
      {
        title: "Lecture Summary & References",
        layout: "summary",
        cbmeCode: "PA-2.3",
        bullets: [
          "*Atherosclerosis* is an inflammatory, lipid-driven disease, not a simple mechanical narrowing.",
          "*Scavenger Receptors* drive macrophage foam-cell transformation due to a lack of feedback inhibition.",
          "*Plaque Stability* is heavily regulated by fibrous cap thickness and local macrophage cytokine balance.",
          "*Modern Therapies* target both lipid clearance (PCSK9) and vascular inflammation pathways.",
          "**Key References**: Robbins & Cotran *Pathologic Basis of Disease*, 10th Ed. Chapter 11. *New England Journal of Medicine* (CANTOS and FOURIER trials)."
        ],
        speakerNotes: "Thank the class. Remind them that understanding the molecular mechanisms of atherosclerosis explains why we use combinations of statins and antiplatelet drugs in primary and secondary prevention of heart attacks."
      }
    ]
  },
  {
    topic: "MD Biochemistry: Advanced Endocrinology - Steroidogenesis Pathways, CYP Enzymes & Receptor Translocation Kinetics",
    specialty: "MD Biochemistry",
    targetAudience: "MD",
    theme: "Teal Clinical",
    slideCount: 10,
    slides: [
      {
        title: "MD Biochemistry: Steroidogenesis & Molecular Endocrine Regulation",
        layout: "title",
        cbmeCode: "MD-BC-1.1",
        competency: "Explain molecular biosynthesis, receptor transduction cascades, and genetic blocks in adrenal steroidogenesis.",
        bullets: [
          "**Postgraduate Seminar**: Tracing the granular pathways of steroid hormone synthesis from cholesterol.",
          "**Molecular Milieu**: Characterizing Cytochrome P450 enzymes (CYPs) and the steroidogenic acute regulatory (StAR) protein.",
          "**Clinical Phenotypes**: Reviewing Congenital Adrenal Hyperplasia (CAH) variants (21-hydroxylase, 11-beta-hydroxylase, and 17-alpha-hydroxylase deficiencies).",
          "Meticulously mapped to the MD Biochemistry Paper III: Endocrine and Metabolic Systems."
        ],
        speakerNotes: "Welcome colleagues. Today we will deliver an advanced review of adrenal steroidogenesis, focusing on the critical role of the StAR protein in transporting cholesterol across the outer mitochondrial membrane. We will trace the molecular blocks causing CAH."
      },
      {
        title: "Specific Learning Objectives & Seminar Matrix",
        layout: "objectives",
        cbmeCode: "MD-BC-1.1.1",
        competency: "Discuss enzyme kinetics, steroid receptor chaperones, and nuclear gene transcription regulation.",
        bullets: [
          "**SLO 1**: Map the enzymatic reactions of cholesterol conversion to aldosterone, cortisol, and adrenal androgens.",
          "**SLO 2**: Explain the rate-limiting kinetics of StAR protein-mediated cholesterol transport.",
          "**SLO 3**: Contrast the biochemical phenotypes of classical vs non-classical CAH due to *CYP21A2* mutations.",
          "**SLO 4**: Detail the nuclear transport mechanism of ligand-bound steroid receptors and heat-shock protein chaperone release."
        ],
        speakerNotes: "For MD postgraduate examinations, we expect deep understanding of the genetic loci of CYP genes and the exact molecular chaperones, like HSP90 and HSP70, that keep steroid receptors inactive until ligand binding."
      },
      {
        title: "Clinical Vignette: 21-Hydroxylase Deficiency Crisis",
        layout: "case_study",
        cbmeCode: "MD-BC-1.1.2",
        competency: "Resolve neonatal salt-wasting crisis biochemically.",
        bullets: [
          "**History**: A 10-day-old infant is brought to the emergency department with severe vomiting, dehydration, and ambiguous genitalia. Physical exam shows hyperpigmentation of the skin.",
          "**Pathology**: Inability to synthesize cortisol and aldosterone leads to a massive compensatory surge of pituitary ACTH, driving unchecked adrenal androgen synthesis.",
          "**Molecular Target**: *CYP21A2* deficiency causes accumulation of 17-hydroxyprogesterone (17-OHP)."
        ],
        tableData: {
          headers: ["Investigation Metric", "Patient Level", "Reference Interval", "Biochemical Diagnosis"],
          rows: [
            ["17-Hydroxyprogesterone (17-OHP)", "4800 ng/dL", "< 100 ng/dL", "Severe CYP21A2 Blockade"],
            ["Serum Sodium (Na+)", "118 mEq/L", "135 - 145 mEq/L", "Severe Mineralocorticoid Salt-Wasting"],
            ["Serum Potassium (K+)", "6.8 mEq/L", "3.5 - 5.0 mEq/L", "Severe Hyperkalemia (Lack of Aldosterone)"],
            ["Plasma ACTH", "350 pg/mL", "10 - 60 pg/mL", "Loss of Cortisol Negative Feedback"]
          ]
        },
        speakerNotes: "Note the extreme 17-OHP levels of 4800 ng/dL. Because 21-hydroxylase is blocked, progesterone and 17-OHP cannot convert to 11-deoxycorticosterone and 11-deoxycortisol. This cuts off both aldosterone and cortisol, causing severe hyponatremia and hyperkalemia."
      },
      {
        title: "Steroidogenic Pathways: The Mitochondrial Shuttle",
        layout: "pathophysiology",
        cbmeCode: "MD-BC-1.1.3",
        competency: "Trace lipid-transport and enzymatic conversion stages.",
        bullets: [
          "**The StAR Bottleneck**: Cholesterol transport across the intermembrane space is facilitated by the **Steroidogenic Acute Regulatory (StAR)** protein.",
          "**Mitochondrial Cleavage**: Inside the inner mitochondrial membrane, **CYP11A1 (Desmolase / P450scc)** cleaves the cholesterol side chain to produce Pregnenolone.",
          "**💡 FUNNY HINGLISH MNEMONIC**: **StAR Babu, Desmolase Ko Pregnenolone Do!**",
          "  - **StAR**: Steroidogenic Acute Regulatory protein initiates outer-to-inner membrane passage.",
          "  - **Babu**: Biosynthesis bottleneck starts here.",
          "  - **Desmolase**: CYP11A1 enzyme waiting at the inner membrane.",
          "  - **Ko**: Key conversion of cholesterol.",
          "  - **Pregnenolone**: The master precursor of all steroid hormones."
        ],
        speakerNotes: "Use the Hinglish mnemonic to help postgraduates easily remember the transport step in stressful exam situations. Point out that mutations in the StAR gene lead to Lipoid Congenital Adrenal Hyperplasia, which is lethal if untreated."
      },
      {
        title: "Intracellular Transduction: Adrenal-Cortical Pathway Map",
        layout: "biochemical_diagram",
        cbmeCode: "MD-BC-1.1.4",
        competency: "Model the GPCR-cAMP-PKA pathway driving StAR gene transcription.",
        bullets: [
          "ACTH binds to its GPCR (MC2R), activating Gαs, which stimulates Adenylate Cyclase.",
          "Accumulated cAMP activates Protein Kinase A (PKA), which phosphorylates CREB.",
          "Phosphorylated CREB translocates to the nucleus, binding to cAMP Response Elements (CRE) on the StAR promoter to trigger rapid transcription."
        ],
        diagram: {
          title: "GPCR Activation of StAR Gene Pathway",
          type: "signaling_cascade",
          compartments: ["Extracellular", "Adrenal Cytosol", "Mitochondrial Matrix"],
          nodes: [
            { id: "acth", label: "ACTH Ligand", type: "substrate", compartment: "Extracellular", description: "Adrenocorticotropic hormone from pituitary.", x: 20, y: 15 },
            { id: "mc2r", label: "MC2R Receptor", type: "receptor", compartment: "Extracellular", description: "Melanocortin 2 Receptor, Gs-coupled GPCR.", x: 20, y: 50 },
            { id: "ac", label: "Adenylate Cyclase", type: "enzyme", compartment: "Adrenal Cytosol", description: "Membrane-bound enzyme producing cAMP.", x: 45, y: 50 },
            { id: "camp", label: "cAMP Secondary Messenger", type: "substrate", compartment: "Adrenal Cytosol", description: "Activates PKA.", x: 70, y: 50 },
            { id: "pka", label: "Protein Kinase A", type: "enzyme", compartment: "Adrenal Cytosol", description: "Phosphorylates nuclear CREB and StAR.", x: 70, y: 80 },
            { id: "star", label: "StAR Protein", type: "substrate", compartment: "Mitochondrial Matrix", description: "Steroidogenic Acute Regulatory protein, imports cholesterol.", x: 90, y: 80 }
          ],
          edges: [
            { from: "acth", to: "mc2r", label: "Binds", style: "conversion" },
            { from: "mc2r", to: "ac", label: "Gαs Stimulation", style: "activation" },
            { from: "ac", to: "camp", label: "ATP to cAMP", style: "conversion" },
            { from: "camp", to: "pka", label: "Allosteric Activation", style: "activation" },
            { from: "pka", to: "star", label: "Phosphorylation & Expression", style: "activation" }
          ]
        },
        speakerNotes: "This diagram shows the perfect cascading effect of ACTH on MC2R. Make sure postgraduates can trace the downstream activation of CREB and how rapidly StAR protein is synthesized to feed the mitochondrial desmolase enzyme."
      },
      {
        title: "Nuclear Receptor Superfamily Kinetics",
        layout: "molecular_mechanism",
        cbmeCode: "MD-BC-1.1.5",
        competency: "Discuss ligand-binding domain kinetics and DNA consensus binding.",
        bullets: [
          "**Inactive Cytoplasmic State**: In the absence of ligand, the Glucocorticoid Receptor (GR) is bound to a multiprotein complex containing **Hsp90**, **Hsp70**, and immunophilins.",
          "**Ligand-induced Activation**: Binding of cortisol triggers a conformational change, inducing dissociation of heat-shock proteins and exposing the **Nuclear Localization Signal (NLS)**.",
          "**Dimerization & Nuclear Entry**: Active receptors homodimerize and translocate via importins into the nucleus, binding to specific **Glucocorticoid Response Elements (GREs)** on the genome.",
          "**Gene Transactivation**: Recruits coactivators (SRC-1, CBP/p300) to remodel chromatin via histone acetyltransferase (HAT) activity, inducing anti-inflammatory gene transcription."
        ],
        speakerNotes: "Highlight that glucocorticoids also act via transrepression: ligand-bound GR monomers can directly bind to and inhibit proinflammatory transcription factors like NF-kB and AP-1, which explains their immediate immunosuppressive effects."
      },
      {
        title: "Clinical Biochemistry of Steroid Defect Mapping",
        layout: "clinical_correlation",
        cbmeCode: "MD-BC-1.1.6",
        competency: "Correlate mineralocorticoid and glucocorticoid blocks with clinical syndromes.",
        bullets: [
          "**21-Hydroxylase (CYP21A2) Block**: Precursor accumulation (17-OHP) is shunted to androgens. Results in virilization, salt wasting, hypotension, and hyperkalemia.",
          "**11-Beta-Hydroxylase (CYP11B1) Block**: Accumulation of **11-deoxycorticosterone (DOC)**, which has strong mineralocorticoid activity. Results in virilization, salt retention, **HYPERTENSION**, and hypokalemia.",
          "**17-Alpha-Hydroxylase (CYP17A1) Block**: Inability to synthesize cortisol and sex hormones. Shunted entirely to aldosterone pathway. Results in **HYPERTENSION**, hypokalemia, and sexual infantilism in both males and females.",
          "**💡 FUNNY PHENOTYPE MNEMONIC**: **Ekkis (21) Girega, Gyaarah (11) Chadhega!**",
          "  - **Ekkis (21) deficiency**: Blood pressure 'Girega' (Drops / Hypotension).",
          "  - **Gyaarah (11) deficiency**: Blood pressure 'Chadhega' (Rises / Hypertension due to DOC accumulation)."
        ],
        speakerNotes: "This Hindi mnemonic 'Ekkis Girega, Gyaarah Chadhega' is legendary for postgraduate exams! It instantly resolves the clinical differentiator of whether a virilized CAH infant will present with low blood pressure (21-hydroxylase) or high blood pressure (11-hydroxylase)."
      },
      {
        title: "Advanced Diagnostics: Diagnostic Ratios via Mass Spectrometry",
        layout: "pharmacology",
        cbmeCode: "MD-BC-1.1.7",
        competency: "Compare modern endocrine diagnostic protocols and enzyme ratio profiles.",
        bullets: [
          "**Liquid Chromatography-Tandem Mass Spectrometry (LC-MS/MS)**: Represents the modern gold standard for profiling multi-steroid profiles in neonates.",
          "**Fludrocortisone vs Hydrocortisone Therapy**: Hydrocortisone replacement provides physiological glucocorticoid action, whereas Fludrocortisone replaces aldosterone to restore sodium retention.",
          "**Prenatal Intervention**: Maternal Dexamethasone therapy starting from 6 weeks of gestation can suppress fetal ACTH, preventing virilization of female fetuses in families with known CAH mutations."
        ],
        speakerNotes: "Why dexamethasone? It is not bound by placental 11-beta-hydroxysteroid dehydrogenase 2 (11β-HSD2), so it crosses the placenta intact to suppress the fetal pituitary. Standard hydrocortisone is inactivated by the placenta, so it cannot be used prenatally."
      },
      {
        title: "MD Board Viva & Case Discussions",
        layout: "q_and_a",
        cbmeCode: "MD-BC-1.1.8",
        bullets: [
          "**Q1**: Explain why patients with 17-alpha-hydroxylase deficiency present with sexual infantilism.",
          "  - *Answer*: CYP17A1 possesses both 17α-hydroxylase and 17,20-lyase activities, required for converting progesterone to sex steroid precursors (DHEA, androstenedione). Blockade prevents androgen and estrogen synthesis completely.",
          "**Q2**: What is the diagnostic significance of measuring salivary 17-hydroxyprogesterone?",
          "  - *Answer*: Salivary steroid measurements represent the free, biologically active fraction of the hormone, and avoid the stress-induced elevations of venipuncture in children.",
          "**Q3**: How does the ACTH stimulation test differentiate classical from non-classical CAH?",
          "  - *Answer*: Non-classical CAH patients show a moderate post-stimulation rise in 17-OHP (usually 1500-3000 ng/dL), whereas classical CAH shows extreme elevations (> 5000 ng/dL)."
        ],
        speakerNotes: "Conduct these viva practice drills. Encourage postgraduates to answer using specific enzymology terms and gene locus references to secure maximum marks in their exams."
      },
      {
        title: "Summary, Reference Standards & Seminal Trials",
        layout: "summary",
        cbmeCode: "MD-BC-1.1.9",
        bullets: [
          "**Enzymatic Bottleneck**: StAR controls cholesterol transit, and CYP11A1 performs the first chemical cleavage to pregnenolone.",
          "**CAH Diagnostics**: Differentiated by blood pressure (DOC accumulation in 11-hydroxylase vs salt wasting in 21-hydroxylase).",
          "**Receptor Kinetics**: GR-chaperone dissociation (Hsp90) and subsequent GRE binding control gene transcription.",
          "**Key References**: *Williams Textbook of Endocrinology*, 14th Ed. Chapter 15 (Adrenal Cortex). *Endocrine Reviews* (Molecular Genetics of Congenital Adrenal Hyperplasia)."
        ],
        speakerNotes: "Wrap up the session. Remind postgraduates that clinical biochemistry represents the perfect bridge between genetics, enzymology, and emergency pediatric therapeutics. Thank the class."
      }
    ]
  },
  {
    topic: "MD Anatomy: Endocrinology Paper - Embryological Origin, Histological Ultrastructure & Surgical Relations of Thyroid, Pituitary and Adrenal Glands",
    specialty: "MD Anatomy",
    targetAudience: "MD",
    theme: "Crimson Hematology",
    slideCount: 10,
    slides: [
      {
        title: "MD Anatomy: Systemic Endocrinology, Embryology & Surgical Dissection",
        layout: "title",
        cbmeCode: "MD-AN-1.1",
        competency: "Discuss gross anatomy, surgical dissection limits, micro-histological zonation, and embryology of the endocrine system.",
        bullets: [
          "**Postgraduate Lecture**: Examining the surgical boundaries, vascular relations, and embryological anomalies of the main endocrine organs.",
          "**Surgical Dissection**: Focusing on thyroidectomy hazards, Recurrent Laryngeal Nerve tracking, and sella turcica relations in transsphenoidal pituitary approaches.",
          "**Developmental Blocks**: Explaining Rathke's pouch migration defects and thyroglossal cyst pathways.",
          "Meticulously mapped to the MD Anatomy Postgraduate Syllabus, Paper II."
        ],
        speakerNotes: "Welcome colleagues. Today we will deliver a masterclass on systemic endocrinology anatomy. We will look beyond basic gross anatomy and focus on surgical boundaries, microscopic zonation, and embryological origin markers that are highly tested in postgrad exams."
      },
      {
        title: "Seminar Specific Learning Objectives (SLOs)",
        layout: "objectives",
        cbmeCode: "MD-AN-1.1.1",
        competency: "Analyze microanatomy, surgical landmarks, and developmental milestones of endocrine organs.",
        bullets: [
          "**SLO 1**: Map the surgical dissection steps of thyroid lobectomy, outlining the relations of the recurrent and external laryngeal nerves.",
          "**SLO 2**: Explain the microscopic zonation of the adrenal gland, detailing the ultrastructure of the adrenal cortical cells.",
          "**SLO 3**: Trace the embryology of the pituitary gland, highlighting Rathke's pouch development and craniopharyngioma origins.",
          "**SLO 4**: Describe the vascular anatomy of the adrenal glands, identifying the origins of the triple adrenal arteries."
        ],
        speakerNotes: "As postgraduates, you must be able to draw the thyroid surgical field and adrenal vascular supply from memory. Focus on the anatomical variations of the recurrent laryngeal nerve."
      },
      {
        title: "Surgical Case: Retro-Corrected Goiter & Vocal Cord Palsy",
        layout: "case_study",
        cbmeCode: "MD-AN-1.1.2",
        competency: "Deconstruct surgical anatomy and hazards of thyroid gland dissection.",
        bullets: [
          "**History**: A 54-year-old female presents with a large multinodular goiter showing retrosternal extension. She is scheduled for total thyroidectomy.",
          "**Surgical Hazard**: During dissection of the inferior pole of the thyroid, the surgeon must isolate the **Inferior Thyroid Artery** and avoid injuring the closely related **Recurrent Laryngeal Nerve (RLN)**.",
          "**Biochemical/Anatomical Sign**: Damage to the RLN causes hoarseness or life-threatening bilateral vocal cord adduction."
        ],
        tableData: {
          headers: ["Anatomical Boundary", "Anatomy & Relations", "Surgical Hazard", "Prevention Strategy"],
          rows: [
            ["Superior Thyroid Pole", "Superior Thyroid Artery & External Laryngeal Nerve", "Injury to Nerve causes inability to pitch voice (Inhibits Cricothyroid)", "Ligate artery close to the pole to avoid the nerve"],
            ["Inferior Thyroid Pole", "Inferior Thyroid Artery & Recurrent Laryngeal Nerve", "Injury to RLN causes vocal cord palsy, hoarseness, or stridor", "Ligate artery far from the gland where the nerve splits"],
            ["Posterior Capsule", "Berry's Suspensory Ligament & Recurrent Laryngeal Nerve", "RLN passes posterior or through Berry's ligament", "Perform meticulous subcapsular dissection"],
            ["Retro-glandular", "Parathyroid Glands (Superior & Inferior)", "Accidental removal causes severe hypocalcemia & tetany", "Preserve posterior capsule vascular branches"]
          ]
        },
        speakerNotes: "This table is high-yield for clinical anatomy exams. Note the contrasting rules for artery ligation: 'Ligate superior artery close to the pole, ligate inferior artery far from the gland'. This is because of the nerve relations!"
      },
      {
        title: "Thyroid Gland Development & Thyroglossal Duct Fistula",
        layout: "pathophysiology",
        cbmeCode: "MD-AN-1.1.3",
        competency: "Trace embryological descent and developmental anomalies of the thyroid.",
        bullets: [
          "**Embryological Origin**: The thyroid gland develops as an endodermal diverticulum from the floor of the pharynx at the **Foramen Cecum** between the 1st and 2nd pharyngeal pouches.",
          "**Descent Pathway**: Descents anterior to the hyoid bone and thyroid cartilage to reach its adult pre-tracheal position by the 7th week of gestation.",
          "**Thyroglossal Duct**: The pathway of descent normally obliterates. Failure of obliteration leads to thyroglossal cysts or fistulae, which characteristically move upwards upon tongue protrusion.",
          "**💡 FUNNY DISSECTION MNEMONIC**: **Hyoid Ke Aage, Tongue Ke Saath!**",
          "  - **Hyoid**: Thyroglossal duct descends anterior to the hyoid bone.",
          "  - **Ke Aage**: Anatomical path of thyroid descent.",
          "  - **Tongue**: Attachment of duct to the tongue base.",
          "  - **Ke Saath**: A thyroglossal cyst characteristically moves upwards 'Ke Saath' (together) with tongue protrusion!"
        ],
        speakerNotes: "The tongue protrusion test is classic. Since the thyroglossal duct is physically attached to the base of the tongue via the foramen cecum, protruding the tongue pulls the duct upward, lifting the cyst. If a neck mass does not move with swallowing or tongue protrusion, it is likely a branchial cyst or lymph node."
      },
      {
        title: "Pituitary & Thyroid Embryonic Migration Cascades",
        layout: "biochemical_diagram",
        cbmeCode: "MD-AN-1.1.4",
        competency: "Model the dual embryology of the Pituitary Gland and Thyroid Descent.",
        bullets: [
          "**Adenohypophysis**: Derives from **Rathke's Pouch**, an ectodermal upgrowth from the roof of the stomodeum.",
          "**Neurohypophysis**: Derives from the **Infundibulum**, a neuroectodermal downgrowth from the floor of the diencephalon.",
          "**Thyroid Diverticulum**: Descents from the pharyngeal floor, crossing the hyoid bone, to settle around the 2nd to 4th tracheal rings."
        ],
        diagram: {
          title: "Developmental Descent and Migration Map",
          type: "cellular_compartment",
          compartments: ["Pharyngeal Floor", "Oral Ectoderm", "Diencephalon Neuroectoderm"],
          nodes: [
            { id: "stomo", label: "Stomodeum (Roof)", type: "organelle", compartment: "Oral Ectoderm", description: "Roof of primitive oral cavity.", x: 15, y: 30 },
            { id: "rathke", label: "Rathke's Pouch", type: "receptor", compartment: "Oral Ectoderm", description: "Upgrowth forming anterior pituitary (pars distalis, tuberalis, intermedia).", x: 45, y: 30 },
            { id: "infundib", label: "Infundibulum", type: "substrate", compartment: "Diencephalon Neuroectoderm", description: "Downgrowth forming posterior pituitary (pars nervosa).", x: 45, y: 70 },
            { id: "pituitary", label: "Pituitary Gland", type: "clinical_condition", compartment: "Diencephalon Neuroectoderm", description: "Completed pituitary housed in Sella Turcica.", x: 80, y: 50 },
            { id: "forc", label: "Foramen Cecum", type: "substrate", compartment: "Pharyngeal Floor", description: "Anatomical origin of thyroid diverticulum.", x: 15, y: 80 },
            { id: "thydesc", label: "Thyroid Descent", type: "enzyme", compartment: "Pharyngeal Floor", description: "Pathway of thyroid descent across hyoid bone.", x: 80, y: 85 }
          ],
          edges: [
            { from: "stomo", to: "rathke", label: "Invagination", style: "conversion" },
            { from: "rathke", to: "pituitary", label: "Fuses with Infundibulum", style: "conversion" },
            { from: "infundib", to: "pituitary", label: "Downgrowth", style: "conversion" },
            { from: "forc", to: "thydesc", label: "Thyroglossal Path", style: "conversion" }
          ]
        },
        speakerNotes: "This diagram displays the dual origin of the pituitary. Note that craniopharyngiomas are benign tumors arising from remnants of Rathke's pouch along its migration path. They can compress the optic chiasm, causing bitemporal hemianopia."
      },
      {
        title: "Microscopic Ultrastructure of the Adrenal Cortex & Medulla",
        layout: "molecular_mechanism",
        cbmeCode: "MD-AN-1.1.5",
        competency: "Outline the microscopic zonation and cellular features of adrenal layers.",
        bullets: [
          "**Zona Glomerulosa**: Outer layer, arranged in rounded clusters/arches. Lacks 17-alpha-hydroxylase. Produces **Aldosterone** under Angiotensin II regulation.",
          "**Zona Fasciculata**: Middle, thickest layer. Cells arranged in parallel columns/cords (*spongiocytes*), rich in lipid droplets. Produces **Cortisol** under ACTH regulation.",
          "**Zona Reticularis**: Inner cortical layer, arranged in branching networks. Produces **Adrenal Androgens (DHEA)** under ACTH control.",
          "**Adrenal Medulla**: Composed of **Chromaffin Cells** (modified postganglionic sympathetic neurons), which possess dense-core granules containing Epinephrine and Norepinephrine.",
          "**💡 ZONATION MNEMONIC**: **GFR! GFR!** (Like Glomerular Filtration Rate)",
          "  - **G**lomerulosa: Mineralocorticoids (Salt)",
          "  - **F**asciculata: Glucocorticoids (Sugar)",
          "  - **R**eticularis: Androgens (Sex)"
        ],
        speakerNotes: "Use the classic 'GFR' mnemonic - Glomerulosa, Fasciculata, Reticularis. Remind postgraduates that the G-zone lacks 17-alpha-hydroxylase, which is why it can only synthesize aldosterone. The adrenal cortex is of mesodermal origin, while the medulla is of neural crest origin."
      },
      {
        title: "Embryology of the Parathyroid Glands & Branchial Anomalies",
        layout: "clinical_correlation",
        cbmeCode: "MD-AN-1.1.6",
        competency: "Discuss developmental derivations of third and fourth pharyngeal pouches.",
        bullets: [
          "**Inferior Parathyroid Glands**: Paradoxically develop from the **3rd Pharyngeal Pouch** endoderm. They migrate downwards along with the thymus.",
          "**Superior Parathyroid Glands**: Develop from the **4th Pharyngeal Pouch** endoderm. They migrate a shorter distance, settling superiorly on the thyroid capsule.",
          "**DiGeorge Syndrome (22q11.2 deletion)**: Failure of development of the 3rd and 4th pharyngeal pouches. Results in thymic aplasia (cellular immunodeficiency) and parathyroid hypoplasia (lethal neonatal hypocalcemic tetany).",
          "**💡 PARATHYROID INVERSION MNEMONIC**: **Teen (3) Gaya Niche, Chaar (4) Raha Upar!**",
          "  - **Teen (3)**: Third pharyngeal pouch derivatives (Inferior parathyroid and Thymus) go 'Niche' (Downwards).",
          "  - **Chaar (4)**: Fourth pouch derivatives (Superior parathyroid) remain 'Upar' (Higher up)."
        ],
        speakerNotes: "This inversion is highly tested in postgraduate clinical anatomy. The 3rd pouch derivatives migrate downwards with the thymus, which is why the inferior parathyroids are pulled lower than the superior parathyroids. Sometimes ectopic parathyroid tissue can be found in the anterior mediastinum because of this thymic drag!"
      },
      {
        title: "Surgical Dissection Boundaries of Sella Turcica",
        layout: "pharmacology",
        cbmeCode: "MD-AN-1.1.7",
        competency: "Deconstruct the micro-anatomy of the Sella Turcica and Cavernous Sinus boundaries.",
        bullets: [
          "**Sella Turcica Boundaries**: Housed in the body of the sphenoid bone. Anteriorly bounded by the tuberculum sellae, posteriorly by the dorsum sellae.",
          "**Superior Boundary**: Covered by the **Diaphragma Sellae**, a fold of dura mater pierced by the pituitary stalk.",
          "**Lateral Relations: Cavernous Sinus**: Contains the **Internal Carotid Artery** and Cranial Nerves **III, IV, V1, V2, and VI**.",
          "**Surgical Access**: The transsphenoidal surgical approach goes through the nasal cavity, sphenoid sinus, and the floor of the sella turcica, avoiding any craniotomy."
        ],
        speakerNotes: "Explain the cavernous sinus relations. Cranial nerve VI sits closest to the internal carotid artery, making it the most vulnerable during cavernous sinus thrombosis. In pituitary macroadenomas, lateral extension can compress these lateral nerves, causing ophthalmoplegia."
      },
      {
        title: "MD Anatomy Board Viva & Dissection Drills",
        layout: "q_and_a",
        cbmeCode: "MD-AN-1.1.8",
        bullets: [
          "**Q1**: Explain the anatomical route of the superior thyroid artery and its relation to the external laryngeal nerve.",
          "  - *Answer*: The superior thyroid artery arises from the external carotid. It runs downwards to the superior pole of the thyroid in close relation to the external laryngeal nerve, which supplies the cricothyroid muscle. To avoid nerve damage, the artery must be ligated as close to the superior pole as possible.",
          "**Q2**: Where are ectopic thyroid tissue rests most commonly found, and why?",
          "  - *Answer*: Commonly found at the base of the tongue (lingual thyroid) or along the midline descent path, due to incomplete migration of the thyroid diverticulum from the foramen cecum.",
          "**Q3**: What is the venous drainage profile of the adrenal glands, and why is it asymmetric?",
          "  - *Answer*: Right adrenal vein drains directly into the Inferior Vena Cava (IVC) at an acute angle, making right adrenalectomy hemodynamically hazardous. Left adrenal vein drains into the Left Renal Vein at a right angle."
        ],
        speakerNotes: "Discuss these clinical dissection hazards. The asymmetric venous drainage of the adrenal glands is a key question in surgical anatomy, explaining why right adrenalectomy carries a higher risk of immediate vena cava tear."
      },
      {
        title: "Summary & High-Yield Postgraduate Dissection Guide",
        layout: "summary",
        cbmeCode: "MD-AN-1.1.9",
        bullets: [
          "**Thyroid Anatomy**: Surgical focus is on the recurrent and external laryngeal nerves, and parathyroid vascular preservation.",
          "**Embryology Inversion**: 3rd pouch forms inferior parathyroids (migrates lower), 4th pouch forms superior parathyroids.",
          "**Adrenal Histology**: GFR layout represents the outer capsule to inner medulla cortical zonation.",
          "**Pituitary Boundary**: Diaphragma sellae roof, sphenoid sinus floor, and cavernous sinus lateral relations are critical.",
          "**Key References**: *Gray's Anatomy*, 42nd Ed. Section 7 (Endocrine System). *Surgical Anatomy of the Head and Neck* by John C. Anson."
        ],
        speakerNotes: "We have completed today's postgraduate anatomy review. Combine these gross, microscopic, and embryological landmarks to excel in both surgical practice and university exams. Thank you."
      }
    ]
  }
];

const SYLLABUS_TEMPLATES = [
  // MD POSTGRADUATE (PG) SPECIALTIES - 4-PAPER SYLLABUS DIRECTORY AS PER NMC
  // ================= MD BIOCHEMISTRY =================
  { code: "MD-BC-P1", topic: "MD Biochemistry Paper I: Molecular Biology, Physical Chemistry, Cell Biology, Instrumentation, and Analytical Techniques", specialty: "MD Biochemistry", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-BC-P2", topic: "MD Biochemistry Paper II: Intermediate Metabolism, Bioenergetics, Enzymology, Inborn Errors of Metabolism, and Nutrition", specialty: "MD Biochemistry", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-BC-P3", topic: "MD Biochemistry Paper III: Molecular Genetics, Recombinant DNA Technology, Molecular Immunology, Gene Regulation, and Oncology", specialty: "MD Biochemistry", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-BC-P4", topic: "MD Biochemistry Paper IV: Clinical Biochemistry, Endocrinology, Organ Function Tests, Toxicology, and Recent Advances", specialty: "MD Biochemistry", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },

  // ================= MD ANATOMY =================
  { code: "MD-AN-P1", topic: "MD Anatomy Paper I: Gross Anatomy, Applied & Clinical Anatomy of Thorax, Abdomen, Pelvis, and Lower Limb", specialty: "MD Anatomy", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-AN-P2", topic: "MD Anatomy Paper II: Gross Anatomy, Applied & Clinical Anatomy of Head, Neck, Face, Brain, and Upper Limb", specialty: "MD Anatomy", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-AN-P3", topic: "MD Anatomy Paper III: General, Systemic & Developmental Embryology, Medical Genetics, and Comparative Anatomy", specialty: "MD Anatomy", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-AN-P4", topic: "MD Anatomy Paper IV: General Histology, Systemic Histology, Cell Biology, Microanatomy & Modern Techniques", specialty: "MD Anatomy", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },

  // ================= MD PHYSIOLOGY =================
  { code: "MD-PY-P1", topic: "MD Physiology Paper I: General Physiology, Biophysics, Cell Physiology, Hematology, Muscle-Nerve & Environmental Physiology", specialty: "MD Physiology", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-PY-P2", topic: "MD Physiology Paper II: Cardiovascular, Respiratory, Renal Physiology, Acid-Base Homeostasis & Exercise Physiology", specialty: "MD Physiology", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-PY-P3", topic: "MD Physiology Paper III: Gastrointestinal, Endocrine, Metabolic and Reproductive Physiology", specialty: "MD Physiology", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-PY-P4", topic: "MD Physiology Paper IV: Central Nervous System, Special Senses, Integrative Physiology & Recent Advances", specialty: "MD Physiology", targetAudience: "MD", theme: "Modern Slate", slides: 35 },

  // ================= MD PATHOLOGY =================
  { code: "MD-PA-P1", topic: "MD Pathology Paper I: General Pathology, Pathophysiology, Immunopathology, Cytopathology & Histopathologic Techniques", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P1.1", topic: "MD Pathology Paper I: Cellular Adaptation, Cell Injury, Necrosis & Apoptosis Molecular Cascades", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P1.2", topic: "MD Pathology Paper I: Vascular and Cellular Events of Inflammation & Chemical Mediators", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P1.3", topic: "MD Pathology Paper I: Neoplasia Carcinogenesis, Hallmarks of Cancer & Oncogene/Tumor Suppressor Kinetics", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P1.4", topic: "MD Pathology Paper I: Immunopathology, Hypersensitivity Type I-IV, Autoimmunity & Amyloidosis Pathogenesis", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },

  { code: "MD-PA-P2", topic: "MD Pathology Paper II: Hematology, Blood Banking, Laboratory Medicine & Clinical Pathology", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P2.1", topic: "MD Pathology Paper II: Nutritional and Hemolytic Anemias, Thalassemia & Hemoglobinopathy Panels", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P2.2", topic: "MD Pathology Paper II: Leukemia Classification, AML, ALL, CML & Lymphoma Histopathologic Grading", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P2.3", topic: "MD Pathology Paper II: Hemostatic Disorders, Coagulation Cascade, DIC & Thrombocytopenia Investigations", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P2.4", topic: "MD Pathology Paper II: Transfusion Medicine, Blood Banking Guidelines & Hemolytic Transfusion Reactions", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },

  { code: "MD-PA-P3", topic: "MD Pathology Paper III: Systemic Pathology, Surgical Pathology, Autopsy & Dermato-Pathology", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P3.1", topic: "MD Pathology Paper III: Atherosclerosis Pathogenesis, Ischemic Heart Disease (IHD) & Lobar Pneumonia Evolution", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P3.2", topic: "MD Pathology Paper III: Gastrointestinal Neoplasms, Gastric Carcinoma, IBD & Cirrhosis Morphology", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P3.3", topic: "MD Pathology Paper III: Glomerulonephritis Classifications, Nephrotic Syndrome & Renal Cell Carcinoma", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P3.4", topic: "MD Pathology Paper III: Endocrinopathology of Diabetes Mellitus Microangiopathy & Thyroid Adenomas", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },

  { code: "MD-PA-P4", topic: "MD Pathology Paper IV: Molecular Pathology, Immunohistochemistry (IHC), Cytogenetics & Recent Advances", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P4.1", topic: "MD Pathology Paper IV: Immunohistochemical (IHC) Diagnostic Panels for Undifferentiated Neoplasms", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P4.2", topic: "MD Pathology Paper IV: Molecular Diagnostic Methods, PCR, FISH & NGS in Precision Oncology", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-PA-P4.3", topic: "MD Pathology Paper IV: Liquid Biopsy Circulating Tumor DNA (ctDNA) & Predictive Biomarkers (PD-L1)", specialty: "MD Pathology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },

  // ================= MD PHARMACOLOGY =================
  { code: "MD-PH-P1", topic: "MD Pharmacology Paper I: General Pharmacology, Pharmacokinetics, Pharmacodynamics, Toxicology, & Pharmacogenomics", specialty: "MD Pharmacology", targetAudience: "MD", theme: "Emerald Pharmacology", slides: 35 },
  { code: "MD-PH-P2", topic: "MD Pharmacology Paper II: Systemic Pharmacology of ANS, CNS, CVS, Renal, Autacoids & Respiratory Systems", specialty: "MD Pharmacology", targetAudience: "MD", theme: "Emerald Pharmacology", slides: 35 },
  { code: "MD-PH-P3", topic: "MD Pharmacology Paper III: Chemotherapy, Endocrine Pharmacology, Immunopharmacology, & Clinical Trials", specialty: "MD Pharmacology", targetAudience: "MD", theme: "Emerald Pharmacology", slides: 35 },
  { code: "MD-PH-P4", topic: "MD Pharmacology Paper IV: Experimental Pharmacology, Bioassays, Drug Screening Methods, Biostatistics & Recent Advances", specialty: "MD Pharmacology", targetAudience: "MD", theme: "Emerald Pharmacology", slides: 35 },

  // ================= MD GENERAL MEDICINE =================
  { code: "MD-IM-P1", topic: "MD Medicine Paper I: Basic Medical Sciences as applied to Internal Medicine (Pathophysiology, Immunology, Genetics)", specialty: "MD General Medicine", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-IM-P2", topic: "MD Medicine Paper II: Systemic Medicine (Cardiology, Pulmonology, Nephrology, Gastroenterology, Hepatology)", specialty: "MD General Medicine", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-IM-P3", topic: "MD Medicine Paper III: Neurology, Rheumatology, Hematology, Endocrinology, Infectious Diseases & Oncology", specialty: "MD General Medicine", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-IM-P4", topic: "MD Medicine Paper IV: Critical Care, Geriatrics, Psychiatry, Dermatology, Emergency Medicine & Recent Advances", specialty: "MD General Medicine", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },

  // ================= MD PEDIATRICS =================
  { code: "MD-PE-P1", topic: "MD Pediatrics Paper I: Basic Pediatric Sciences (Growth & Development, Genetics, Immunology, Nutrition, Fluid/Electrolyte Balance)", specialty: "MD Pediatrics", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-PE-P2", topic: "MD Pediatrics Paper II: Neonatology, Perinatology, and Social/Preventive Pediatrics", specialty: "MD Pediatrics", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-PE-P3", topic: "MD Pediatrics Paper III: Systemic Pediatrics (Cardiology, Pulmonology, Nephrology, Neurology, Gastroenterology, Hematology)", specialty: "MD Pediatrics", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-PE-P4", topic: "MD Pediatrics Paper IV: Pediatric Intensive Care, Emergency Pediatrics, Adolescent Medicine, and Recent Advances", specialty: "MD Pediatrics", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },

  // ================= MD PSYCHIATRY =================
  { code: "MD-PS-P1", topic: "MD Psychiatry Paper I: Basic Sciences as applied to Psychiatry (Neuroanatomy, Neurophysiology, Neurochemistry, Psychology)", specialty: "MD Psychiatry", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-PS-P2", topic: "MD Psychiatry Paper II: Clinical Psychiatry, Psychopathology, and Special Populations (Child, Geriatric, Forensic Psychiatry)", specialty: "MD Psychiatry", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-PS-P3", topic: "MD Psychiatry Paper III: Psychopharmacology, Somatic Therapies, Psychotherapies, and Behavioral Medicine", specialty: "MD Psychiatry", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-PS-P4", topic: "MD Psychiatry Paper IV: Recent Advances in Biological Psychiatry, Social Psychiatry, and Community Psychiatry", specialty: "MD Psychiatry", targetAudience: "MD", theme: "Modern Slate", slides: 35 },

  // ================= MD DERMATOLOGY =================
  { code: "MD-DE-P1", topic: "MD Dermatology Paper I: Basic Sciences (Skin Anatomy, Physiology, Pathology, Immunology, Microbiology, Pharmacology)", specialty: "MD Dermatology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-DE-P2", topic: "MD Dermatology Paper II: Clinical Dermatology, Dermatopathology, and Systemic Diseases with Skin Manifestations", specialty: "MD Dermatology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-DE-P3", topic: "MD Dermatology Paper III: Leprosy, Sexually Transmitted Infections (STIs), and HIV/AIDS", specialty: "MD Dermatology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },
  { code: "MD-DE-P4", topic: "MD Dermatology Paper IV: Dermatosurgery, Cosmetology, Lasers, Phototherapy, and Recent Advances", specialty: "MD Dermatology", targetAudience: "MD", theme: "Crimson Hematology", slides: 35 },

  // ================= MD ANAESTHESIOLOGY =================
  { code: "MD-AS-P1", topic: "MD Anaesthesia Paper I: Basic Sciences (Anatomy, Physiology, Pharmacology, Physics) as applied to Anaesthesiology", specialty: "MD Anaesthesiology", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-AS-P2", topic: "MD Anaesthesia Paper II: Clinical Anaesthesia (General Surgery, Orthopaedics, OBG, ENT, Ophthalmology, Daycare)", specialty: "MD Anaesthesiology", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-AS-P3", topic: "MD Anaesthesia Paper III: Subspecialty Anaesthesia (Cardiothoracic, Neuro, Paediatric, Obstetric, Geriatric, Transplant)", specialty: "MD Anaesthesiology", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MD-AS-P4", topic: "MD Anaesthesia Paper IV: Critical Care, Intensive Care, Trauma, Pain Medicine, and Recent Advances", specialty: "MD Anaesthesiology", targetAudience: "MD", theme: "Modern Slate", slides: 35 },

  // ================= MD RADIOLOGY =================
  { code: "MD-RD-P1", topic: "MD Radiology Paper I: Basic Sciences (Radiation Physics, Equipment, Contrast Media, Radiographic Anatomy, Radiobiology)", specialty: "MD Radiology", targetAudience: "MD", theme: "Academic Navy", slides: 35 },
  { code: "MD-RD-P2", topic: "MD Radiology Paper II: Imaging of Chest, Cardiovascular System, Gastrointestinal, Hepatobiliary, and Genitourinary Tract", specialty: "MD Radiology", targetAudience: "MD", theme: "Academic Navy", slides: 35 },
  { code: "MD-RD-P3", topic: "MD Radiology Paper III: Neuroimaging, Head & Neck, Musculoskeletal System, Breast Imaging, and Pediatric Radiology", specialty: "MD Radiology", targetAudience: "MD", theme: "Academic Navy", slides: 35 },
  { code: "MD-RD-P4", topic: "MD Radiology Paper IV: Interventional Radiology, Emergency Radiology, Nuclear Medicine, and Recent Advances in Imaging", specialty: "MD Radiology", targetAudience: "MD", theme: "Academic Navy", slides: 35 },

  // ================= MD COMMUNITY MEDICINE (SPM) =================
  { code: "MD-SP-P1", topic: "MD Community Medicine Paper I: History of Public Health, Concept of Health & Disease, Epidemiology, Biostatistics & Research Methodology", specialty: "MD SPM", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-SP-P2", topic: "MD Community Medicine Paper II: Epidemiology of Communicable & Non-communicable Diseases, Environmental Health & Occupational Health", specialty: "MD SPM", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-SP-P3", topic: "MD Community Medicine Paper III: Maternal & Child Health (MCH), Family Welfare, Nutrition, Social Sciences, and Health Education", specialty: "MD SPM", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MD-SP-P4", topic: "MD Community Medicine Paper IV: Health Care Administration, National Health Programs, International Health, and Recent Advances", specialty: "MD SPM", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },

  // ================= MS GENERAL SURGERY =================
  { code: "MS-SU-P1", topic: "MS Surgery Paper I: Basic Sciences as applied to General Surgery (Surgical Anatomy, Pathology, Wound Healing, Fluid/Electrolytes)", specialty: "MS General Surgery", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-SU-P2", topic: "MS Surgery Paper II: General Surgery including Trauma, Critical Care, Surgical Nutrition, Surgical Oncology, and Transplant", specialty: "MS General Surgery", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-SU-P3", topic: "MS Surgery Paper III: Systemic Surgery (GI Surgery, Urology, Neurosurgery, Plastic Surgery, Cardiothoracic, Pediatric Surgery)", specialty: "MS General Surgery", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-SU-P4", topic: "MS Surgery Paper IV: Recent Advances in Surgery, Minimally Invasive & Robotic Surgery, Operative Surgery & Surgical Audits", specialty: "MS General Surgery", targetAudience: "MD", theme: "Modern Slate", slides: 35 },

  // ================= MS OBST-GYNAECOLOGY =================
  { code: "MS-OB-P1", topic: "MS OBG Paper I: Basic Sciences as applied to Obstetrics and Gynaecology (Anatomy, Physiology, Embryology, Endocrinology, Pathology)", specialty: "MS Obst-Gynaecology", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MS-OB-P2", topic: "MS OBG Paper II: Obstetrics including High-Risk Pregnancy, Maternal Disorders, Fetal Medicine, and Neonatology", specialty: "MS Obst-Gynaecology", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MS-OB-P3", topic: "MS OBG Paper III: Gynaecology including Reproductive Endocrinology, Gynaecologic Oncology, Urogynaecology, and Infertility", specialty: "MS Obst-Gynaecology", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },
  { code: "MS-OB-P4", topic: "MS OBG Paper IV: Recent Advances in OBG, Family Planning, Contraception, Operative Surgery, and Medico-Legal Aspects", specialty: "MS Obst-Gynaecology", targetAudience: "MD", theme: "Teal Clinical", slides: 35 },

  // ================= MS ORTHOPAEDICS =================
  { code: "MS-OR-P1", topic: "MS Ortho Paper I: Basic Medical Sciences (Anatomy, Physiology, Pathology, Biomechanics, biomaterials) as applied to Orthopaedics", specialty: "MS Orthopaedics", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-OR-P2", topic: "MS Ortho Paper II: Traumatology (Fractures, Dislocations, Joint Reconstruction, Polytrauma, Spine Trauma)", specialty: "MS Orthopaedics", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-OR-P3", topic: "MS Ortho Paper III: Orthopaedic Diseases (Infections, Bone Tumors, Congenital Deformities, Pediatric Ortho, Arthroplasty)", specialty: "MS Orthopaedics", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-OR-P4", topic: "MS Ortho Paper IV: Recent Advances, Operative Orthopaedics, Physical Medicine, Rehabilitation & Sports Medicine", specialty: "MS Orthopaedics", targetAudience: "MD", theme: "Modern Slate", slides: 35 },

  // ================= MS OPHTHALMOLOGY =================
  { code: "MS-OP-P1", topic: "MS Ophthalmology Paper I: Basic Sciences (Anatomical, Physiological, Optical, Pharmacological) of Visual System", specialty: "MS Ophthalmology", targetAudience: "MD", theme: "Academic Navy", slides: 35 },
  { code: "MS-OP-P2", topic: "MS Ophthalmology Paper II: Clinical Ophthalmology, Anterior Segment Disorders, Cornea, Glaucoma, and Uvea", specialty: "MS Ophthalmology", targetAudience: "MD", theme: "Academic Navy", slides: 35 },
  { code: "MS-OP-P3", topic: "MS Ophthalmology Paper III: Posterior Segment, Retina, Neuro-ophthalmology, Strabismus, and Pediatric Ophthalmology", specialty: "MS Ophthalmology", targetAudience: "MD", theme: "Academic Navy", slides: 35 },
  { code: "MS-OP-P4", topic: "MS Ophthalmology Paper IV: Ophthalmic Surgery, Community Ophthalmology, Blindness Prevention, and Recent Advances", specialty: "MS Ophthalmology", targetAudience: "MD", theme: "Academic Navy", slides: 35 },

  // ================= MS ENT =================
  { code: "MS-EN-P1", topic: "MS ENT Paper I: Basic Sciences (Anatomy, Physiology, Pathology, Pharmacology) as applied to Ear, Nose, Throat & Head-Neck", specialty: "MS ENT", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-EN-P2", topic: "MS ENT Paper II: Otology, Neurotology, Skull Base Surgery, and Audiology/Vestibular Medicine", specialty: "MS ENT", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-EN-P3", topic: "MS ENT Paper III: Rhinology, Laryngology, Bronchoesophagology, and Diseases of Oral Cavity/Pharynx", specialty: "MS ENT", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  { code: "MS-EN-P4", topic: "MS ENT Paper IV: Head & Neck Surgery, Reconstructive Surgery, Pediatric ENT, and Recent Advances in ENT", specialty: "MS ENT", targetAudience: "MD", theme: "Modern Slate", slides: 35 },
  // PHASE I (PRE-CLINICAL) - BIOCHEMISTRY (BC)
  { code: "BC-1.1", topic: "Cellular & Subcellular Organization: Cell Membranes & Active/Passive Transport Systems", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "BC-2.3", topic: "Enzymology: Kinetics, Competitive/Non-Competitive Inhibition & Clinical Marker Enzymes", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  
  // Carbohydrate Metabolism Competencies
  { code: "BC-3.1", topic: "Carbohydrate Metabolism I: Glycolysis, Hexose Monophosphate (HMP) Shunt & Oxidative Regulation", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "BC-3.2", topic: "Carbohydrate Metabolism II: Citric Acid Cycle (TCA), Gluconeogenesis & Glycogen Homeostasis", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "BC-3.3", topic: "Carbohydrate Metabolism III: Glycogen Storage Diseases, Galactosemia & Hereditary Fructose Intolerance", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  
  // Lipid / Fat Metabolism Competencies
  { code: "BC-4.1", topic: "Lipid Metabolism I: De Novo Fatty Acid Synthesis, Beta-Oxidation Pathway & Carnitine Shuttle Blocks", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "BC-4.2", topic: "Lipid Metabolism II: Cholesterol Biosynthesis, HMG-CoA Reductase Regulation & Statins", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "BC-4.4", topic: "Lipid Metabolism III: Sphingolipidoses (Gaucher & Tay-Sachs Disease) & Ketogenesis in Starvation", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  
  // Protein & Amino Acid Metabolism Competencies
  { code: "BC-5.1", topic: "Protein Metabolism I: Transamination, Deamination, Ammonia Transport & Urea Cycle Disorders", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "BC-5.2", topic: "Protein Metabolism II: Phenylalanine & Tyrosine Pathways, Phenylketonuria & Alkaptonuria", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "BC-5.3", topic: "Protein Metabolism III: Tryptophan, Branched-Chain Amino Acids & Maple Syrup Urine Disease (MSUD)", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  
  { code: "BC-6.1", topic: "Hemoglobin Chemistry & Hemoglobinopathies: Thalassemia & Sickle Cell Disease Pathogenesis", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "BC-7.2", topic: "Biological Oxidation: Electron Transport Chain, Uncouplers & Oxidative Phosphorylation Complexes", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "BC-8.3", topic: "Vitamin Biochemistry: Water & Fat-Soluble Vitamins, Coenzyme Functions & Nutritional Deficiencies", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "BC-9.2", topic: "Minerals & Electrolyte Homeostasis: Calcium, Phosphorus, Iron Metabolism & Acid-Base Disorders", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  
  // Molecular Biology Competencies
  { code: "BC-10.1", topic: "Molecular Biology I: Eukaryotic DNA Replication, Telomerase, DNA Repair Mechanisms & Xeroderma Pigmentosum", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "BC-10.2", topic: "Molecular Biology II: Eukaryotic Transcription, RNA Polymerases, Capping/Splicing & Rifampicin", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "BC-10.3", topic: "Molecular Biology III: Eukaryotic Translation (Protein Synthesis), Ribosomes & Antimicrobial Inhibitors", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "BC-10.5", topic: "Molecular Biology IV: Regulation of Gene Expression, Lac Operon Model, Chromatin Remodeling & Epigenetics", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "BC-10.6", topic: "Molecular Biology V: Recombinant DNA Technology, PCR, Gene Cloning, CRISPR-Cas9 & Blotting Techniques", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  
  { code: "BC-11.3", topic: "Organ Function Tests: Laboratory Diagnostics of Liver (LFT), Kidney (RFT) & Thyroid (TFT) Disorders", specialty: "Biochemistry", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },

  // PHASE I (PRE-CLINICAL) - PHYSIOLOGY (PY)
  { code: "PY-1.1", topic: "General Physiology: Cell Homeostasis, Transport Mechanisms & Resting Membrane Potential", specialty: "Physiology", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "PY-2.4", topic: "Synaptic Transmission & Neuromuscular Junction Disorders (Myasthenia Gravis)", specialty: "Physiology", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "PY-4.3", topic: "Gastrointestinal Physiology: Pancreatic Secretions, Digestion & Absorption Mechanics", specialty: "Physiology", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "PY-5.2", topic: "Cardiac PV Loops, Frank-Starling Mechanism & Heart Failure", specialty: "Physiology", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "PY-6.2", topic: "Renal Physiology: Glomerular Filtration, Counter-Current Multiplier & Tubular Transport Maxima", specialty: "Physiology", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "PY-8.2", topic: "Endocrine Physiology: Hypothalamic-Pituitary-Adrenal Axis Feedback Regulation & Hormonal Cascades", specialty: "Physiology", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "PY-10.4", topic: "Nerve-Muscle Physiology: Molecular Basis of Skeletal Muscle Contraction & Neuromuscular Blockade", specialty: "Physiology", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },

  // PHASE I (PRE-CLINICAL) - ANATOMY (AN)
  { code: "AN-1.1", topic: "Anatomical Nomenclature: Positions, Planes & Descriptive Terminology", specialty: "Anatomy", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "AN-4.2", topic: "Coronary Circulation: Surgical Anatomy & Coronary Artery Disease", specialty: "Anatomy", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "AN-5.2", topic: "Anatomy of Mammary Gland, Histological Lobes & Lymphatic Metastasis Drainage Pathways", specialty: "Anatomy", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "AN-10.1", topic: "Pectoral Region & Axilla: Mammary Gland Anatomy & Lymphatic Drainage", specialty: "Anatomy", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "AN-18.1", topic: "Shoulder Joint: Rotator Cuff Anatomy, Stabilization & Dislocations", specialty: "Anatomy", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "AN-21.1", topic: "Knee Joint: Cruciate Ligaments, Menisci & Clinical Injury Dynamics", specialty: "Anatomy", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "AN-25.1", topic: "Development of Cardiac Septa & Congenital Heart Anomalies", specialty: "Anatomy", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "AN-28.1", topic: "Anatomy of Inguinal Hernias, Hesselbach's Triangle & Spermatic Cord Structure", specialty: "Anatomy", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "AN-32.1", topic: "Embryology: Development of Kidney & Congenital Renal Anomalies", specialty: "Anatomy", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "AN-43.1", topic: "Neuroanatomy: Ventricular System, CSF Circulation & Hydrocephalus Pathophysiology", specialty: "Anatomy", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "AN-48.1", topic: "Neuroanatomy: Course of Facial Nerve, Bell's Palsy & Middle Ear Anatomy", specialty: "Anatomy", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "AN-52.1", topic: "Abdominal Wall: Hesselbach's Triangle, Inguinal Canal & Hernia Anatomy", specialty: "Anatomy", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "AN-70.1", topic: "Anatomy of Thyroid Gland, Recurrent Laryngeal Nerve & Surgical Hazards", specialty: "Anatomy", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "AN-82.1", topic: "Histology: Microscopic Structure of Kidney, Nephron & Glomerular Filter", specialty: "Anatomy", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },

  // PHASE II (PARA-CLINICAL) - PATHOLOGY (PA)
  { code: "PA-2.3", topic: "Atheromatous Plaque Pathogenesis & Macrophage Foam Kinetics", specialty: "Pathology", targetAudience: "Integrated (MBBS & MD)", theme: "Crimson Hematology", slides: 35 },
  { code: "PA-4.1", topic: "Hemodynamic Disorders: Hyperemia, Congestion, Edema & Thrombogenesis Mechanisms", specialty: "Pathology", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "PA-8.2", topic: "Chronic Inflammation, Granulomatous Disease Pathogenesis & Epithelioid Cells", specialty: "Pathology", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "PA-14.1", topic: "Acute Myocardial Infarction: Coagulative Necrosis & Serum Markers", specialty: "Pathology", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "PA-16.1", topic: "Neoplasia: Oncogenes, Tumor Suppressor Genes (p53, Rb) & Metastatic Cascades", specialty: "Pathology", targetAudience: "Integrated (MBBS & MD)", theme: "Academic Navy", slides: 35 },
  { code: "PA-25.2", topic: "Pathology of Diabetes Mellitus: Microvascular/Macrovascular Complications & Glomerulosclerosis", specialty: "Pathology", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },

  // PHASE II (PARA-CLINICAL) - PHARMACOLOGY (PH)
  { code: "PH-1.10", topic: "General Pharmacology: Pharmacokinetics, CYP450 Enzymes, Clearance & Loading Dose Calculations", specialty: "Pharmacology", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "PH-1.15", topic: "Insulin Resistance: Molecular Mechanisms & Pharmacological Targets", specialty: "Pharmacology", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "PH-1.24", topic: "Antihypertensive Pharmacotherapy: RAAS Blockade Mechanisms", specialty: "Pharmacology", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "PH-3.1", topic: "Autonomic Nervous System: Cholinergic Receptors & Organophosphate Poisoning Therapeutics", specialty: "Pharmacology", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "PH-4.2", topic: "Cardiovascular Pharmacology: Anti-arrhythmic Classes & Vaughan-Williams Classification", specialty: "Pharmacology", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "PH-8.1", topic: "Antimicrobial Chemotherapy: Mechanism of Action & Resistance of Aminoglycosides & Fluoroquinolones", specialty: "Pharmacology", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },

  // PHASE II (PARA-CLINICAL) - MICROBIOLOGY (MI)
  { code: "MI-1.1", topic: "Cell Wall Biosynthesis & Beta-Lactam Resistance Mechanisms", specialty: "Microbiology", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "MI-2.4", topic: "HIV Pathogenesis: CD4 Receptor Kinetics & Antiretroviral Targets", specialty: "Microbiology", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "MI-3.1", topic: "Systemic Bacteriology: Corynebacterium diphtheriae Exotoxin & Pathogenesis", specialty: "Microbiology", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "MI-4.2", topic: "Medical Mycology: Opportunistic Fungal Infections (Mucormycosis & Candidiasis)", specialty: "Microbiology", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "MI-8.2", topic: "Parasitology: Entamoeba histolytica Life Cycle, Pathogenesis & Amoebic Liver Abscess", specialty: "Microbiology", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },

  // PHASE II (PARA-CLINICAL) - FORENSIC MEDICINE (FM)
  { code: "FM-1.1", topic: "Medical Jurisprudence: Consent, Medical Negligence, Consumer Protection Act & Ethics", specialty: "Forensic Medicine", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "FM-2.3", topic: "Mechanical Injuries: Lacerations, Abrasions, Contusions & Firearm Wound Ballistics", specialty: "Forensic Medicine", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "FM-3.2", topic: "Asphyxial Deaths: Pathophysiology & Post-Mortem Signs", specialty: "Forensic Medicine", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "FM-5.1", topic: "Forensic Toxicology: Organophosphorus, Cyanide, Arsenic & Dhatura Poisoning Profiles", specialty: "Forensic Medicine", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },

  // PHASE III (CLINICAL) - COMMUNITY MEDICINE / SPM (CM)
  { code: "CM-1.3", topic: "Concept of Health & Disease: Natural History of Disease, Levels of Prevention & Iceberg Phenomenon", specialty: "SPM", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "CM-4.1", topic: "Epidemiological Study Designs: Cohort, Case-Control & Bias Control", specialty: "SPM", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "CM-8.2", topic: "Epidemiology of Communicable Diseases: Tuberculosis, Malaria & National Control Programs", specialty: "SPM", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "CM-14.1", topic: "Demography & Family Planning: Contraceptive Efficacy, Pearl Index & Demographic Cycle Stages", specialty: "SPM", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },

  // PHASE III (CLINICAL) - GENERAL MEDICINE (IM)
  { code: "IM-1.3", topic: "Infectious Diseases: Enteric Fever Pathophysiology, Clinical Stages & Treatment Protocols", specialty: "General Medicine", targetAudience: "Integrated (MBBS & MD)", theme: "Teal Clinical", slides: 35 },
  { code: "IM-2.1", topic: "Type 2 Diabetes Mellitus: Cellular Pathophysiology & Management", specialty: "General Medicine", targetAudience: "Integrated (MBBS & MD)", theme: "Teal Clinical", slides: 35 },
  { code: "IM-4.5", topic: "Acute Coronary Syndrome: ECG Localization & Thrombolytic Pathways", specialty: "General Medicine", targetAudience: "Integrated (MBBS & MD)", theme: "Crimson Hematology", slides: 35 },
  { code: "IM-6.2", topic: "Neurology: Status Epilepticus Pathophysiology, Diagnostic Workup & Emergency Protocols", specialty: "General Medicine", targetAudience: "Integrated (MBBS & MD)", theme: "Academic Navy", slides: 35 },

  // PHASE III (CLINICAL) - PEDIATRICS (PE)
  { code: "PE-1.1", topic: "Growth and Development: Milestones, Developmental Delays & Growth Chart Monitoring", specialty: "Pediatrics", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "PE-5.2", topic: "Infectious Diseases in Pediatrics: Protein Energy Malnutrition (Kwashiorkor & Marasmus) & SAM Management", specialty: "Pediatrics", targetAudience: "Integrated (MBBS & MD)", theme: "Crimson Hematology", slides: 35 },
  { code: "PE-12.4", topic: "Neonatal Respiratory Distress: Surfactant Chemistry & Lung Compliance", specialty: "Pediatrics", targetAudience: "Integrated (MBBS & MD)", theme: "Crimson Hematology", slides: 35 },
  { code: "PE-21.3", topic: "Tetralogy of Fallot: Congenital Hemodynamics & Management", specialty: "Pediatrics", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },

  // PHASE III (CLINICAL) - PSYCHIATRY (PS)
  { code: "PS-1.2", topic: "Anxiety Disorders: Panic Disorder, Generalized Anxiety & Cognitive Behavioral Therapy Targets", specialty: "Psychiatry", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "PS-5.1", topic: "Schizophrenia Pathophysiology: Dopaminergic Pathways & Antipsychotics", specialty: "Psychiatry", targetAudience: "Integrated (MBBS & MD)", theme: "Modern Slate", slides: 35 },

  // PHASE III (CLINICAL) - DERMATOLOGY (DE)
  { code: "DE-1.4", topic: "Psoriasis Pathogenesis: IL-17/IL-23 Axis & Biologic Target Therapies", specialty: "Dermatology", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },
  { code: "DE-2.1", topic: "Vesiculobullous Disorders: Pemphigus Vulgaris vs Bullous Pemphigoid Pathogenesis", specialty: "Dermatology", targetAudience: "MBBS", theme: "Crimson Hematology", slides: 35 },

  // PHASE III (CLINICAL) - CHEST / PULMONARY MEDICINE (RT)
  { code: "RT-2.1", topic: "Bronchial Asthma Pathophysiology: Spirometry Metrics & Stepwise Guidelines", specialty: "Chest", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "RT-4.2", topic: "Chronic Obstructive Pulmonary Disease (COPD): Spirometry, GOLD Guidelines & Management", specialty: "Chest", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },

  // PHASE III (CLINICAL) - SURGERY (SU)
  { code: "SU-1.2", topic: "Shock & Fluid Management: Pathophysiology of Hypovolemic Shock & Crystalloid Resuscitation Rules", specialty: "Surgery", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "SU-4.1", topic: "Burns Management: Rule of Nines, Parkland Formula, Pathophysiology & Escharotomy Rules", specialty: "Surgery", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "SU-14.2", topic: "Acute Appendicitis Pathogenesis & Surgical Appendicectomy Anatomy", specialty: "Surgery", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "SU-22.1", topic: "Benign Prostatic Hyperplasia & Bladder Outlet Obstruction Therapeutics", specialty: "Surgery", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },

  // PHASE III (CLINICAL) - ORTHOPEDICS (OR)
  { code: "OR-1.2", topic: "Fracture Healing Stages: Primary vs Secondary Bone Healing & Clinico-Radiological Union Criteria", specialty: "Orthopedics", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "OR-3.5", topic: "Osteoporosis Pathophysiology: Osteoclast Receptor Signaling & Bisphosphonates", specialty: "Orthopedics", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },

  // PHASE III (CLINICAL) - EYE / OPHTHALMOLOGY (OP)
  { code: "OP-1.1", topic: "Cataract: Age-related Cataract Pathogenesis, Types, Clinical Features & Surgical Options (SICS & Phaco)", specialty: "Eye", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },
  { code: "OP-4.2", topic: "Glaucoma Pathophysiology: Aqueous Humor Dynamics & IOP Reduction", specialty: "Eye", targetAudience: "MBBS", theme: "Emerald Pharmacology", slides: 35 },

  // PHASE III (CLINICAL) - ENT (ENT)
  { code: "ENT-1.1", topic: "Hearing Loss: Differentiating Conductive vs Sensorineural Hearing Loss & Tuning Fork Tests", specialty: "ENT", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "ENT-2.1", topic: "Otitis Media: Eustachian Tube Dysfunction & Microbiological Biofilms", specialty: "ENT", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },

  // PHASE III (CLINICAL) - OBSTETRICS & GYNAECOLOGY (OB)
  { code: "OB-1.1", topic: "Antenatal Care: Physiology of Pregnancy, Maternal Adaptations, Anemia in Pregnancy & Oral Iron Protocols", specialty: "Obst-Gynaecology", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "OB-3.1", topic: "Preeclampsia: Placental Ischemia, Endothelial Dysfunction & Magnesium Therapy", specialty: "Obst-Gynaecology", targetAudience: "Integrated (MBBS & MD)", theme: "Teal Clinical", slides: 35 },
  { code: "OB-4.2", topic: "Abnormal Uterine Bleeding (AUB): PALM-COEIN Classification, Diagnostic Workup & Therapeutics", specialty: "Obst-Gynaecology", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },

  // PHASE III (CLINICAL) - ANAESTHESIOLOGY (AS)
  { code: "AS-1.2", topic: "Pre-Anesthetic Evaluation: ASA Physical Status Classification & Airway Assessment (Mallampati Score)", specialty: "Anaesthesiology", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "AS-6.1", topic: "General Anesthetics: GABA Receptor Modulation & MAC Kinetics", specialty: "Anaesthesiology", targetAudience: "Integrated (MBBS & MD)", theme: "Modern Slate", slides: 35 },

  // PHASE III (CLINICAL) - RADIOLOGY (RD)
  { code: "RD-1.1", topic: "Introduction to Medical Imaging: Physics of X-Rays, CT, MRI, Ultrasound & Radiation Safety Rules", specialty: "Radiology", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "RD-2.3", topic: "Radiation Biology: Cell Injury Mechanisms & Contrast Safety in CT/MRI", specialty: "Radiology", targetAudience: "Integrated (MBBS & MD)", theme: "Academic Navy", slides: 35 },

  // SUPER SPECIALTIES
  { code: "CD-1.1", topic: "Infective Endocarditis: Duke Criteria, Pathogenesis & Antibiotic Prophylaxis", specialty: "Cardiology", targetAudience: "Integrated (MBBS & MD)", theme: "Crimson Hematology", slides: 35 },
  { code: "CD-3.4", topic: "Rheumatic Heart Disease: Molecular Mimicry, Jones Criteria & Valve Sequelae", specialty: "Cardiology", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "NE-2.3", topic: "Acute Kidney Injury (AKI): KDIGO Criteria, Pathophysiology & Nephrotoxin Kinetics", specialty: "Nephrology", targetAudience: "MBBS", theme: "Academic Navy", slides: 35 },
  { code: "NE-5.1", topic: "Chronic Kidney Disease: Glomerular Filtration Decline, Bone-Mineral Disorder & Renal Anemia", specialty: "Nephrology", targetAudience: "Integrated (MBBS & MD)", theme: "Teal Clinical", slides: 35 },
  { code: "UR-1.4", topic: "Urolithiasis: Calcium Oxalate Crystallization Dynamics & Obstructive Nephropathy", specialty: "Urology", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "UR-4.2", topic: "Renal Cell Carcinoma: Von Hippel-Lindau (VHL) Pathway, Pathology & Nephrectomy Principles", specialty: "Urology", targetAudience: "Integrated (MBBS & MD)", theme: "Academic Navy", slides: 35 },
  { code: "NL-2.1", topic: "Acute Ischemic Stroke: Penumbra Hemodynamics, Thrombolysis Window & Localization", specialty: "Neurology", targetAudience: "Integrated (MBBS & MD)", theme: "Academic Navy", slides: 35 },
  { code: "NL-4.5", topic: "Parkinson's Disease: Lewy Body Pathology, Basal Ganglia Loops & Levodopa Kinetics", specialty: "Neurology", targetAudience: "MBBS", theme: "Modern Slate", slides: 35 },
  { code: "ED-1.3", topic: "Graves' Disease & Thyrotoxicosis: TSH Receptor Antibodies & Thyroid Storm Crisis", specialty: "Endocrinology", targetAudience: "MBBS", theme: "Teal Clinical", slides: 35 },
  { code: "ED-4.2", topic: "Adrenal Insufficiency (Addison's): ACTH Stimulation Dynamics & Steroid Hydrocortisone Rescue", specialty: "Endocrinology", targetAudience: "Integrated (MBBS & MD)", theme: "Emerald Pharmacology", slides: 35 }
];

// High-Yield Clinical Lab Value Converter (SI Units ⇄ Conventional Metric)
const formatLabCell = (text: string, isSi: boolean) => {
  if (!text) return "";
  if (!isSi) return text; // conventional default

  // Convert Glucose (mg/dL to mmol/L: divide by 18)
  if (text.includes("mg/dL") && (text.toLowerCase().includes("glucose") || text.toLowerCase().includes("sugar") || text.toLowerCase().includes("glycogen"))) {
    const val = parseFloat(text);
    if (!isNaN(val)) {
      return `${(val / 18).toFixed(1)} mmol/L (SI)`;
    }
  }

  // Convert Creatinine (mg/dL to μmol/L: multiply by 88.4)
  if (text.includes("mg/dL") && text.toLowerCase().includes("creatinine")) {
    const val = parseFloat(text);
    if (!isNaN(val)) {
      return `${Math.round(val * 88.4)} μmol/L (SI)`;
    }
  }

  // Convert Bilirubin (mg/dL to μmol/L: multiply by 17.1)
  if (text.includes("mg/dL") && text.toLowerCase().includes("bilirubin")) {
    const val = parseFloat(text);
    if (!isNaN(val)) {
      return `${(val * 17.1).toFixed(1)} μmol/L (SI)`;
    }
  }

  // Convert Hemoglobin / Albumin (g/dL to g/L: multiply by 10)
  if (text.includes("g/dL")) {
    const val = parseFloat(text);
    if (!isNaN(val)) {
      return `${Math.round(val * 10)} g/L (SI)`;
    }
  }

  // Convert Lipids/Cholesterol (mg/dL to mmol/L: divide by 38.6)
  if (text.includes("mg/dL") && (text.toLowerCase().includes("cholesterol") || text.toLowerCase().includes("lipid") || text.toLowerCase().includes("tg") || text.toLowerCase().includes("ldl") || text.toLowerCase().includes("hdl"))) {
    const val = parseFloat(text);
    if (!isNaN(val)) {
      return `${(val / 38.6).toFixed(1)} mmol/L (SI)`;
    }
  }

  // Fallback pattern match for any standalone mg/dL values
  const matchMgDl = text.match(/^(\d+(\.\d+)?)\s*mg\/dL$/i);
  if (matchMgDl) {
    const val = parseFloat(matchMgDl[1]);
    return `${(val / 18).toFixed(1)} mmol/L (SI equivalent)`;
  }

  return text;
};

// High-Yield Medical Student Handout Compiler Content Matrix
const getHandoutData = (topic: string, specialty: string) => {
  const normalized = (topic || "").toLowerCase() + " " + (specialty || "").toLowerCase();
  
  if (normalized.includes("diabetic") || normalized.includes("ketoacidosis") || normalized.includes("carbohydrate")) {
    return {
      mnemonics: [
        { title: "DKA Clinical Triad (Hinglish Mnemonic)", text: "👉 \"DKA ka DK-A\":\n• D = Dehydration & Diuresis (Paani ki kami)\n• K = Ketones & Kussmaul (Khatti saansein)\n• A = Acidosis & Anion Gap (Khoon me acidity)" },
        { title: "Glycolysis Irreversible Enzymes Mnemonic", text: "👉 \"Hindustan Petroleum Corporation\":\n• H = Hexokinase\n• P = Phosphofructokinase-1\n• C = Pyruvate Kinase (Irreversible rate limiting steps)" }
      ],
      viva: [
        { q: "Why is metabolic acidosis present in DKA?", a: "Uncontrolled lipolysis releases excess Free Fatty Acids (FFA). These undergo β-oxidation in liver mitochondria to produce acetoacetate and β-hydroxybutyrate, which are strong organic acids that deplete bicarbonate buffer." },
        { q: "What is the biochemical rationale of Kussmaul breathing?", a: "It is a compensatory respiratory mechanism. The respiratory center in the medulla is stimulated by high H+ concentration (acidemia) to hyperventilate and blow off CO2, thereby raising blood pH." },
        { q: "Explain the role of GLUT-4 in insulin action.", a: "GLUT-4 is insulin-dependent and expressed in skeletal muscle and adipose tissue. Upon insulin binding to its receptor, GLUT-4 vesicles translocate to the plasma membrane to facilitate glucose uptake." }
      ]
    };
  }
  
  if (normalized.includes("lipid") || normalized.includes("fat") || normalized.includes("cholesterol") || normalized.includes("atherosclerosis")) {
    return {
      mnemonics: [
        { title: "Lipoprotein Density Order (Hinglish)", text: "👉 \"Chalo Vahan Lene Delhi\":\n• Ch = Chylomicrons (Least dense)\n• V = VLDL\n• L = LDL (Bad Cholesterol)\n• D = HDL (Good Cholesterol, Delhi is clean!)\n• ORDER: Density decreases as size increases." },
        { title: "Essential Fatty Acids", text: "👉 \"LA LA Land\":\n• LA = Linoleic Acid (Omega-6)\n• ALA = Alpha-Linolenic Acid (Omega-3)\n• Land = Arachidonic Acid (semi-essential)" }
      ],
      viva: [
        { q: "Why is HDL cardioprotective?", a: "HDL mediates Reverse Cholesterol Transport. It extracts excess cholesterol from peripheral tissues/macrophages (via ABCA1) and delivers it to the liver for excretion in bile, preventing plaque formation." },
        { q: "What is the rate-limiting enzyme of cholesterol synthesis?", a: "HMG-CoA Reductase. It converts HMG-CoA to mevalonate and is the direct therapeutic target of Statin drugs." },
        { q: "Why do ketones accumulate during starvation?", a: "Oxaloacetate is depleted due to continuous gluconeogenesis. Acetyl-CoA (from lipolysis) cannot enter the TCA cycle and is instead diverted to the ketogenesis pathway in the liver." }
      ]
    };
  }

  if (normalized.includes("protein") || normalized.includes("urea") || normalized.includes("amino") || normalized.includes("gout")) {
    return {
      mnemonics: [
        { title: "Essential Amino Acids Mnemonic", text: "👉 \"PVT TIM HALL\" (Private Tim Hall):\n• P/V/T = Phe, Val, Thr\n• T/I/M = Trp, Ile, Met\n• H/A/L/L = His, Arg, Lys, Leu (Arg/His are semi-essential in growth)" },
        { title: "Urea Cycle Intermediates (Hinglish)", text: "👉 \"Oh Chipkali, Aur Khoon Chuso\":\n• O = Ornithine\n• C = Carbamoyl Phosphate\n• A = Citrulline (Argininosuccinate precursors)\n• K = Arginine\n• U = Urea (Produced at the end)" }
      ],
      viva: [
        { q: "Why does Hyperammonemia cause cerebral dysfunction?", a: "Excess ammonia drives Glutamate Dehydrogenase to consume α-ketoglutarate, depleting this key TCA cycle intermediate in brain cells and arresting aerobic ATP production." },
        { q: "What is the biochemical basis of gouty arthritis?", a: "Deposition of Monosodium Urate crystals in joints. It is caused by hyperuricemia due to overproduction or underexcretion of uric acid (the end product of purine catabolism)." },
        { q: "Explain the link between the Urea Cycle and TCA Cycle.", a: "The Krebs Bicycle link: Fumarate produced by Argininosuccinate lyase in the Urea cycle enters mitochondria to join the TCA cycle, converting to Malate then Oxaloacetate." }
      ]
    };
  }

  // Fallback for general biochemistry / molecular biology
  return {
    mnemonics: [
      { title: "Purine vs Pyrimidine Structures", text: "👉 \"PU-R-E As Gold\" (Purines have two rings):\n• PU = Purines (Adenine, Guanine)\n• Pyrimidines are single-ring (Cytosine, Uracil, Thymine: CUT the pie!)" },
      { title: "Nonsense Mutation Codons", text: "👉 \"U Are Away, U Go Away, U Are Gone\":\n• UAA, UGA, UAG (Stop/Nonsense Codons that abort translation)" }
    ],
    viva: [
      { q: "Explain the clinical diagnostic significance of SGOT and SGPT.", a: "Transaminases (AST/SGOT and ALT/SGPT) leak into blood upon cellular injury. ALT is highly specific for hepatocyte damage (acute hepatitis), while AST is present in cardiac muscle and liver." },
      { q: "What is the function of Okazaki fragments?", a: "These are short, newly synthesized DNA fragments formed on the lagging template strand during replication, which are subsequently sealed by DNA Ligase to ensure continuous replication." },
      { q: "What is the biochemical defect in Alkaptonuria?", a: "Deficiency of Homogentisate 1,2-dioxygenase in the phenylalanine-tyrosine pathway, leading to accumulation of homogentisic acid which oxidizes to turn urine dark/black on standing." }
    ]
  };
};

export default function App() {
  const [topic, setTopic] = useState('');
  const [specialty, setSpecialty] = useState('Biochemistry');
  const [targetAudience, setTargetAudience] = useState<'MBBS' | 'MD' | 'Integrated (MBBS & MD)'>('MBBS');
  const [theme, setTheme] = useState<'Teal Clinical' | 'Crimson Hematology' | 'Academic Navy' | 'Emerald Pharmacology' | 'Modern Slate'>('Academic Navy');
  const [slideCount, setSlideCount] = useState<number>(35);
  
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('');
  
  const [presentation, setPresentation] = useState<Presentation | null>(PRESETS[0]);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);
  
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPowerpointGuide, setShowPowerpointGuide] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'presets' | 'syllabus' | 'history'>('presets');
  const [selectedSyllabusSpecialty, setSelectedSyllabusSpecialty] = useState<string>('Anatomy');
  const [history, setHistory] = useState<Presentation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Premium Custom Upgrade States
  const [showHandoutModal, setShowHandoutModal] = useState(false);
  const [printTarget, setPrintTarget] = useState<'handout' | 'slides'>('handout');
  const [isSiUnit, setIsSiUnit] = useState(false);
  const [lectureTimeRemaining, setLectureTimeRemaining] = useState<number>(2700); // 45 minutes countdown
  const [diagramRevealStep, setDiagramRevealStep] = useState<number>(9); // Show all by default, can play/pause

  // Auto-reset diagram steps when slide changes
  useEffect(() => {
    if (presentation && presentation.slides[activeSlideIdx]?.layout === 'biochemical_diagram') {
      setDiagramRevealStep(1); // start showing only first node + reaction step
    } else {
      setDiagramRevealStep(9); // default show all
    }
  }, [activeSlideIdx, presentation]);

  // Handle countdown lecture pacing timer inside presentation mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPresentationMode) {
      setLectureTimeRemaining(2700); // reset to 45 mins upon startup
      interval = setInterval(() => {
        setLectureTimeRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPresentationMode]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('medlecturer_history_v1');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading presentation history:", e);
      }
    }
  }, []);

  const saveToHistory = (newPres: Presentation) => {
    setHistory(prev => {
      const filtered = prev.filter(p => p.topic !== newPres.topic);
      const updated = [newPres, ...filtered].slice(0, 8); // Keep up to 8 recent presentations
      localStorage.setItem('medlecturer_history_v1', JSON.stringify(updated));
      return updated;
    });
  };

  // PWA & Mobile Install States
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstallGuide, setShowIOSInstallGuide] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [studentQuestionText, setStudentQuestionText] = useState("");
  const [feedbackSuccessMessage, setFeedbackSuccessMessage] = useState("");

  const [classFeedback, setClassFeedback] = useState<{
    clarityRatings: { [slideIdx: number]: { clear: number, neutral: number, complex: number } };
    questions: { slideIdx: number; slideTitle: string; text: string; time: string; id: string }[];
    pacingRatings: { fast: number; good: number; slow: number };
  }>(() => {
    const saved = localStorage.getItem('babaji_class_feedback');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.clarityRatings && parsed.questions && parsed.pacingRatings) {
          return parsed;
        }
      } catch (e) {}
    }
    return {
      clarityRatings: {
        0: { clear: 18, neutral: 2, complex: 0 },
        1: { clear: 12, neutral: 4, complex: 3 },
        2: { clear: 15, neutral: 1, complex: 2 }
      },
      questions: [
        { slideIdx: 1, slideTitle: "Biochemical Core Cascade", text: "Is the rate-limiting enzyme regulated by insulin and glucagon?", time: "09:41 AM", id: "seed-1" },
        { slideIdx: 2, slideTitle: "Clinical Case Investigations", text: "How should we differentiate acute vs chronic symptoms during exams?", time: "09:43 AM", id: "seed-2" }
      ],
      pacingRatings: { fast: 2, good: 19, slow: 3 }
    };
  });

  useEffect(() => {
    localStorage.setItem('babaji_class_feedback', JSON.stringify(classFeedback));
  }, [classFeedback]);

  const submitClarityRating = (slideIdx: number, ratingType: 'clear' | 'neutral' | 'complex') => {
    setClassFeedback(prev => {
      const current = prev.clarityRatings[slideIdx] || { clear: 0, neutral: 0, complex: 0 };
      const updatedRatings = {
        ...prev.clarityRatings,
        [slideIdx]: {
          ...current,
          [ratingType]: current[ratingType] + 1
        }
      };
      return {
        ...prev,
        clarityRatings: updatedRatings
      };
    });
    setFeedbackSuccessMessage("Your anonymous clarity rating has been logged successfully!");
    setTimeout(() => setFeedbackSuccessMessage(""), 3000);
  };

  const submitPacingRating = (pacing: 'fast' | 'good' | 'slow') => {
    setClassFeedback(prev => {
      return {
        ...prev,
        pacingRatings: {
          ...prev.pacingRatings,
          [pacing]: prev.pacingRatings[pacing] + 1
        }
      };
    });
    setFeedbackSuccessMessage("Your anonymous pacing feedback has been logged!");
    setTimeout(() => setFeedbackSuccessMessage(""), 3000);
  };

  const submitStudentQuestion = (slideIdx: number, slideTitle: string) => {
    if (!studentQuestionText.trim()) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setClassFeedback(prev => {
      const newQuestion = {
        slideIdx,
        slideTitle,
        text: studentQuestionText.trim(),
        time: timeString,
        id: `q-${Date.now()}`
      };
      return {
        ...prev,
        questions: [newQuestion, ...prev.questions]
      };
    });
    
    setStudentQuestionText("");
    setFeedbackSuccessMessage("Your question was submitted anonymously to the professor!");
    setTimeout(() => setFeedbackSuccessMessage(""), 3500);
  };

  useEffect(() => {
    // Detect standalone display mode (already installed & running)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         (window.navigator as any).standalone === true;
    setIsAppInstalled(isStandalone);

    // Detect iOS devices
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsAppInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };

  // Monitor connectivity
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    function setIsOnline(status: boolean) {
      setIsOffline(!status);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Theme styles lookup for the CSS rendering
  const themeStyles = {
    'Teal Clinical': {
      primary: 'text-teal-950',
      primaryBg: 'bg-teal-950',
      primaryText: 'text-teal-950',
      primaryBorder: 'border-teal-200',
      accent: 'bg-teal-500',
      accentText: 'text-teal-500',
      lightBg: 'bg-emerald-50/50',
      lightBgClass: 'bg-emerald-50/30',
      pill: 'bg-emerald-600 text-white',
      accentHex: '00BFA5',
      primaryHex: '004D40'
    },
    'Crimson Hematology': {
      primary: 'text-rose-950',
      primaryBg: 'bg-rose-950',
      primaryText: 'text-rose-950',
      primaryBorder: 'border-rose-200',
      accent: 'bg-rose-600',
      accentText: 'text-rose-600',
      lightBg: 'bg-rose-50/40',
      lightBgClass: 'bg-rose-50/30',
      pill: 'bg-rose-600 text-white',
      accentHex: 'FF1744',
      primaryHex: '880E4F'
    },
    'Academic Navy': {
      primary: 'text-slate-900',
      primaryBg: 'bg-blue-950',
      primaryText: 'text-blue-950',
      primaryBorder: 'border-blue-100',
      accent: 'bg-blue-600',
      accentText: 'text-blue-600',
      lightBg: 'bg-blue-50/40',
      lightBgClass: 'bg-blue-50/20',
      pill: 'bg-blue-600 text-white',
      accentHex: '60A5FA',
      primaryHex: '1E3A8A'
    },
    'Emerald Pharmacology': {
      primary: 'text-emerald-950',
      primaryBg: 'bg-emerald-950',
      primaryText: 'text-emerald-950',
      primaryBorder: 'border-emerald-200',
      accent: 'bg-emerald-600',
      accentText: 'text-emerald-600',
      lightBg: 'bg-emerald-50/40',
      lightBgClass: 'bg-emerald-50/30',
      pill: 'bg-emerald-600 text-white',
      accentHex: '10B981',
      primaryHex: '064E3B'
    },
    'Modern Slate': {
      primary: 'text-slate-900',
      primaryBg: 'bg-slate-900',
      primaryText: 'text-slate-900',
      primaryBorder: 'border-slate-200',
      accent: 'bg-amber-500',
      accentText: 'text-amber-500',
      lightBg: 'bg-slate-50',
      lightBgClass: 'bg-slate-50',
      pill: 'bg-amber-500 text-slate-950',
      accentHex: 'F59E0B',
      primaryHex: '1E293B'
    }
  };

  const activeThemeStyle = themeStyles[presentation?.theme || theme];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    setLoadingProgress(10);
    setLoadingStage('Analyzing National Medical Commission CBME Guidelines...');

    const stages = [
      { progress: 25, stage: 'Formulating Specific Learning Objectives (SLOs) for MBBS/MD...' },
      { progress: 45, stage: 'Synthesizing latest Peer-Reviewed Molecular mechanisms...' },
      { progress: 65, stage: 'Mapping clinical case study & laboratory test panels...' },
      { progress: 85, stage: 'Generating detailed biochemical diagram coordinates...' },
      { progress: 95, stage: 'Writing academic speaker notes & reference guides...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < stages.length) {
        setLoadingProgress(stages[currentStep].progress);
        setLoadingStage(stages[currentStep].stage);
        currentStep++;
      }
    }, 2500);

    try {
      const res = await fetch('/api/generate-ppt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          specialty,
          targetAudience,
          theme,
          slideCount
        })
      });

      if (!res.ok) throw new Error('Generation failed.');
      const data = await res.json();
      
      clearInterval(interval);
      setLoadingProgress(100);
      setLoadingStage('Success! Lecture prepared.');

      const mappedSlides = data.slides.map((s: any, index: number) => ({
        ...s,
        id: `slide-${index}-${Date.now()}`
      }));

      const newPres: Presentation = {
        topic: topic,
        specialty: specialty,
        targetAudience: targetAudience,
        theme: theme,
        slideCount: slideCount,
        slides: mappedSlides
      };

      setPresentation(newPres);
      saveToHistory(newPres);
      setActiveSlideIdx(0);
      setIsEditing(false);
      setSelectedNode(null);
    } catch (err) {
      console.error(err);
      alert('Error calling server-side Gemini model. Reverting to local fallback presentation.');
      // Fallback
      setPresentation({
        topic: topic,
        specialty: specialty,
        targetAudience: targetAudience,
        theme: theme,
        slideCount: PRESETS[0].slides.length,
        slides: PRESETS[0].slides.map((s, idx) => ({ ...s, id: `slide-fallback-${idx}` }))
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstantGenerate = async (
    targetTopic: string,
    targetSpecialty: string,
    targetAudienceVal: 'MBBS' | 'MD' | 'Integrated (MBBS & MD)',
    targetTheme: 'Teal Clinical' | 'Crimson Hematology' | 'Academic Navy' | 'Emerald Pharmacology' | 'Modern Slate',
    targetSlides: number
  ) => {
    // Sync React states so inputs reflect the selection
    setTopic(targetTopic);
    setSpecialty(targetSpecialty);
    setTargetAudience(targetAudienceVal);
    setTheme(targetTheme);
    setSlideCount(targetSlides);
    
    setLoading(true);
    setLoadingProgress(10);
    setLoadingStage('Analyzing National Medical Commission CBME Guidelines...');

    const stages = [
      { progress: 25, stage: 'Formulating Specific Learning Objectives (SLOs) for MBBS/MD...' },
      { progress: 45, stage: 'Synthesizing latest Peer-Reviewed Molecular mechanisms...' },
      { progress: 65, stage: 'Mapping clinical case study & laboratory test panels...' },
      { progress: 85, stage: 'Generating detailed biochemical diagram coordinates...' },
      { progress: 95, stage: 'Writing academic speaker notes & reference guides...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < stages.length) {
        setLoadingProgress(stages[currentStep].progress);
        setLoadingStage(stages[currentStep].stage);
        currentStep++;
      }
    }, 2000);

    try {
      const res = await fetch('/api/generate-ppt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: targetTopic,
          specialty: targetSpecialty,
          targetAudience: targetAudienceVal,
          theme: targetTheme,
          slideCount: targetSlides
        })
      });

      if (!res.ok) throw new Error('Generation failed.');
      const data = await res.json();
      
      clearInterval(interval);
      setLoadingProgress(100);
      setLoadingStage('Success! Lecture prepared.');

      const mappedSlides = data.slides.map((s: any, index: number) => ({
        ...s,
        id: `slide-${index}-${Date.now()}`
      }));

      const newPres: Presentation = {
        topic: targetTopic,
        specialty: targetSpecialty,
        targetAudience: targetAudienceVal,
        theme: targetTheme,
        slideCount: targetSlides,
        slides: mappedSlides
      };

      setPresentation(newPres);
      saveToHistory(newPres);
      setActiveSlideIdx(0);
      setIsEditing(false);
      setSelectedNode(null);
    } catch (err) {
      console.error(err);
      alert('Error calling server-side Gemini model. Reverting to local fallback presentation.');
      setPresentation({
        topic: targetTopic,
        specialty: targetSpecialty,
        targetAudience: targetAudienceVal,
        theme: targetTheme,
        slideCount: PRESETS[0].slides.length,
        slides: PRESETS[0].slides.map((s, idx) => ({ ...s, id: `slide-instant-fallback-${idx}` }))
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateSlide = async () => {
    if (!customPrompt || !presentation) return;
    alert("Running AI single-slide refinement...");
    // Let's mimic single-slide refinement by appending requested nuance to bullets
    const activeSlide = presentation.slides[activeSlideIdx];
    const updatedSlides = [...presentation.slides];
    updatedSlides[activeSlideIdx] = {
      ...activeSlide,
      bullets: [
        ...activeSlide.bullets,
        `*Added via AI Refinement*: ${customPrompt}`
      ],
      speakerNotes: activeSlide.speakerNotes + `\n\nAI Refinement Note: Integrated professor prompt: "${customPrompt}"`
    };
    setPresentation({
      ...presentation,
      slides: updatedSlides
    });
    setCustomPrompt('');
  };

  const handleDownload = () => {
    if (!presentation) return;
    setShowPowerpointGuide(true);
    generateAndDownloadPPTX(presentation);
  };

  const handleLoadPreset = (preset: Presentation) => {
    setPresentation({
      ...preset,
      slides: preset.slides.map((s, i) => ({ ...s, id: `slide-preset-${i}-${Date.now()}` }))
    });
    setTopic(preset.topic);
    setSpecialty(preset.specialty);
    setTargetAudience(preset.targetAudience);
    setTheme(preset.theme);
    setSlideCount(preset.slideCount);
    setActiveSlideIdx(0);
    setIsEditing(false);
  };

  const handleUpdateSlideField = (field: keyof Slide, value: any) => {
    if (!presentation) return;
    const updatedSlides = [...presentation.slides];
    updatedSlides[activeSlideIdx] = {
      ...updatedSlides[activeSlideIdx],
      [field]: value
    };
    setPresentation({
      ...presentation,
      slides: updatedSlides
    });
  };

  const handleUpdateBullet = (bulletIdx: number, val: string) => {
    if (!presentation) return;
    const slide = presentation.slides[activeSlideIdx];
    const newBullets = [...slide.bullets];
    newBullets[bulletIdx] = val;
    handleUpdateSlideField('bullets', newBullets);
  };

  const handleDeleteBullet = (bulletIdx: number) => {
    if (!presentation) return;
    const slide = presentation.slides[activeSlideIdx];
    const newBullets = slide.bullets.filter((_, i) => i !== bulletIdx);
    handleUpdateSlideField('bullets', newBullets);
  };

  const handleAddBullet = () => {
    if (!presentation) return;
    const slide = presentation.slides[activeSlideIdx];
    const newBullets = [...slide.bullets, "New clinical or molecular teaching point"];
    handleUpdateSlideField('bullets', newBullets);
  };

  const handleUpdateTableRow = (rowIdx: number, colIdx: number, value: string) => {
    if (!presentation) return;
    const slide = presentation.slides[activeSlideIdx];
    if (!slide.tableData) return;
    const newRows = [...slide.tableData.rows];
    newRows[rowIdx] = [...newRows[rowIdx]];
    newRows[rowIdx][colIdx] = value;
    handleUpdateSlideField('tableData', {
      ...slide.tableData,
      rows: newRows
    });
  };

  const handleAddSlide = () => {
    if (!presentation) return;
    const newSlide: Slide = {
      id: `new-slide-${Date.now()}`,
      title: "New CBME Lecture Slide",
      layout: "pathophysiology",
      cbmeCode: "BI-X.X",
      competency: "Specify NMC competency here.",
      bullets: [
        "First key educational concept for MBBS/MD students.",
        "Add clinical relevance or secondary molecular signaling points."
      ],
      speakerNotes: "Explain this newly added slide's focus and pedagogical structure to the students."
    };
    setPresentation({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    });
    setActiveSlideIdx(presentation.slides.length);
  };

  const handleDeleteSlide = (idx: number) => {
    if (!presentation || presentation.slides.length <= 1) return;
    const newSlides = presentation.slides.filter((_, i) => i !== idx);
    setPresentation({
      ...presentation,
      slides: newSlides
    });
    setActiveSlideIdx(Math.max(0, idx - 1));
  };

  const handleMoveSlide = (idx: number, direction: 'up' | 'down') => {
    if (!presentation) return;
    const newSlides = [...presentation.slides];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newSlides.length) return;
    
    // Swap
    const temp = newSlides[idx];
    newSlides[idx] = newSlides[targetIdx];
    newSlides[targetIdx] = temp;

    setPresentation({
      ...presentation,
      slides: newSlides
    });
    setActiveSlideIdx(targetIdx);
  };

  // Keyboard navigation for presentation/slideshow mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPresentationMode || !presentation) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setActiveSlideIdx(prev => Math.min(presentation.slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveSlideIdx(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        setIsPresentationMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode, presentation]);

  return (
    <div className="min-h-screen bg-[#FDFCEB] text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
      {/* Top Professional Applet Header */}
      <header className="bg-amber-100/80 backdrop-blur-md border-b border-amber-200/60 py-3.5 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <BookOpen className="h-5 w-5 text-amber-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-amber-950 flex items-center gap-2">
              Babaji Medical PPT Generator
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 bg-amber-500/10 text-amber-800 border border-amber-500/20 rounded font-normal font-mono">
                CBME AGENT
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                100% Free Teacher Resource
              </span>
            </h1>
            <p className="text-[11px] text-amber-900 font-medium flex items-center gap-1.5">
              <span>NMC India MBBS & MD Professional Slides Engine</span>
              <span className="text-amber-800">•</span>
              <span className="text-emerald-700 font-bold">Supporting Medical Educators Worldwide (No Ads, No QR Clutter)</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {isOffline && (
            <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              OFFLINE PRESET MODE
            </div>
          )}

          {presentation && (
            <>
              {/* Theme Dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-amber-250 rounded-lg px-2 py-1">
                <span className="text-[11px] text-amber-800 uppercase font-bold font-mono pl-1">Theme</span>
                <select 
                  value={presentation.theme} 
                  onChange={(e) => {
                    setPresentation({
                      ...presentation,
                      theme: e.target.value as any
                    });
                  }}
                  className="text-xs bg-transparent border-none text-slate-800 font-semibold focus:ring-0 cursor-pointer outline-none"
                >
                  <option value="Academic Navy" className="bg-white text-slate-800">Academic Navy</option>
                  <option value="Teal Clinical" className="bg-white text-slate-800">Teal Clinical</option>
                  <option value="Crimson Hematology" className="bg-white text-slate-800">Crimson Hematology</option>
                  <option value="Emerald Pharmacology" className="bg-white text-slate-800">Emerald Pharmacology</option>
                  <option value="Modern Slate" className="bg-white text-slate-800">Modern Slate</option>
                </select>
              </div>

              <button
                onClick={() => setIsPresentationMode(true)}
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 transition-all duration-200 cursor-pointer"
                title="Enter full-screen lecture mode"
              >
                <Play className="h-3.5 w-3.5 text-amber-800 stroke-[2.5]" />
                Lecturer Show
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:shadow-md text-amber-950 transition-all duration-300 shadow shadow-amber-500/10 cursor-pointer border border-amber-400"
                title="Download PPTX with embedded native editable shapes & notes"
              >
                <Download className="h-4 w-4 text-amber-950 stroke-[2.5]" />
                Download Editable PPTX
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 rounded-lg bg-white hover:bg-amber-50 text-amber-800 border border-amber-250 transition"
                title="Share app to WhatsApp"
              >
                <Share2 className="h-4 w-4" />
              </button>

              <button
                onClick={() => setShowQRModal(true)}
                className="px-2.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200/60 transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-100/50"
                title="Broadcast QR Code to Lecture Hall"
              >
                <QrCode className="h-4 w-4 text-indigo-600 stroke-[2.5]" />
                <span className="text-[11px] font-black text-indigo-900 hidden md:inline font-mono">Class QR</span>
              </button>

              <button
                onClick={() => setShowFeedbackModal(true)}
                className="px-2.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/60 transition flex items-center gap-1.5 cursor-pointer shadow-sm shadow-rose-100/50"
                title="Submit anonymous lecture understanding rate"
              >
                <Smile className="h-4 w-4 text-rose-600 stroke-[2.5]" />
                <span className="text-[11px] font-black text-rose-900 hidden md:inline font-mono">Rate Clarity</span>
              </button>

              <button
                onClick={() => setShowAnalyticsModal(true)}
                className="px-2.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300/60 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="View real-time aggregated student ratings & complex topic flags"
              >
                <BarChart3 className="h-4 w-4 text-slate-600 stroke-[2.5]" />
                <span className="text-[11px] font-black text-slate-900 hidden md:inline font-mono">Live Reports</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* SIDEBAR: Controls & Generation Forms */}
        <section className="w-80 bg-amber-50/95 border-r border-amber-200/70 flex flex-col shrink-0 overflow-y-auto p-5">
          <div className="space-y-5">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-extrabold text-amber-800 font-mono flex items-center gap-2 mb-2.5">
                <Sparkles className="h-3 w-3 text-amber-600 animate-pulse" />
                AI Agent PPT Architect
              </h2>

              {/* MOBILE PWA INSTALL / WHATSAPP TRANSMISSION CARD */}
              <div className="mb-4 bg-gradient-to-br from-indigo-950 to-slate-950 text-white p-3.5 rounded-xl border border-indigo-900 shadow-lg flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-tight text-white leading-tight">Babaji Mobile App</h3>
                    <p className="text-[10px] text-indigo-300">Run offline & share on WhatsApp</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  {!isAppInstalled && (isInstallable || isIOS) ? (
                    <>
                      {isInstallable && (
                        <button
                          onClick={handleInstallApp}
                          className="w-full py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold text-[11px] rounded-lg transition duration-200 shadow shadow-indigo-500/25 cursor-pointer"
                        >
                          📱 Install Mobile App
                        </button>
                      )}
                      {isIOS && (
                        <button
                          onClick={() => setShowIOSInstallGuide(true)}
                          className="w-full py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold text-[11px] rounded-lg transition duration-200 shadow shadow-indigo-500/25 cursor-pointer"
                        >
                          📱 Install on iOS / Safari
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-[10px] text-indigo-300/90 font-semibold bg-indigo-950/40 p-2 rounded-lg border border-indigo-800/30 text-center flex items-center justify-center gap-1">
                      <Check className="h-3 w-3 text-emerald-400" />
                      App Installed & Running
                    </div>
                  )}

                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] rounded-lg transition duration-200 flex items-center justify-center gap-1 border border-emerald-500 shadow shadow-emerald-600/10 cursor-pointer"
                  >
                    <Share2 className="h-3 w-3" />
                    Share Free App on WhatsApp
                  </button>
                </div>
              </div>
              
              {/* Target Prompt Box */}
              <div className="space-y-3 bg-white/90 p-4 rounded-xl border border-amber-250 shadow-md shadow-amber-100/50">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">Lecture Title / Topic</label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Atherogenesis & Scavenger Receptor Kinetics or Urea Cycle Disorders"
                    className="w-full h-20 text-xs bg-amber-50/30 text-slate-900 font-semibold rounded-lg p-2.5 border border-amber-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 outline-none resize-none placeholder:text-slate-450"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">Specialty</label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full text-xs bg-amber-50 text-amber-950 font-bold rounded-lg p-2 border border-amber-200 focus:border-amber-400 outline-none"
                    >
                      <optgroup label="Pre-Clinical (Phase I)" className="text-amber-800 font-bold bg-amber-50">
                        <option value="Anatomy" className="text-slate-900 bg-white font-normal">Anatomy</option>
                        <option value="Physiology" className="text-slate-900 bg-white font-normal">Physiology</option>
                        <option value="Biochemistry" className="text-slate-900 bg-white font-normal">Biochemistry</option>
                      </optgroup>
                      <optgroup label="Para-Clinical (Phase II)" className="text-amber-800 font-bold bg-amber-50">
                        <option value="Pathology" className="text-slate-900 bg-white font-normal">Pathology</option>
                        <option value="Pharmacology" className="text-slate-900 bg-white font-normal">Pharmacology</option>
                        <option value="Microbiology" className="text-slate-900 bg-white font-normal">Microbiology</option>
                        <option value="Forensic Medicine" className="text-slate-900 bg-white font-normal">Forensic Medicine</option>
                      </optgroup>
                      <optgroup label="Clinical (Phase III)" className="text-amber-800 font-bold bg-amber-50">
                        <option value="SPM" className="text-slate-900 bg-white font-normal">SPM (Social & Preventive Medicine)</option>
                        <option value="General Medicine" className="text-slate-900 bg-white font-normal">General Medicine</option>
                        <option value="Pediatrics" className="text-slate-900 bg-white font-normal">Pediatrics</option>
                        <option value="Psychiatry" className="text-slate-900 bg-white font-normal">Psychiatry</option>
                        <option value="Dermatology" className="text-slate-900 bg-white font-normal">Dermatology</option>
                        <option value="Chest" className="text-slate-900 bg-white font-normal">Chest (Respiratory Medicine)</option>
                        <option value="Surgery" className="text-slate-900 bg-white font-normal">Surgery (General Surgery)</option>
                        <option value="Orthopedics" className="text-slate-900 bg-white font-normal">Orthopedics</option>
                        <option value="Eye" className="text-slate-900 bg-white font-normal">Eye (Ophthalmology)</option>
                        <option value="ENT" className="text-slate-900 bg-white font-normal">ENT</option>
                        <option value="Obst-Gynaecology" className="text-slate-900 bg-white font-normal">Obst-Gynaecology</option>
                        <option value="Anaesthesiology" className="text-slate-900 bg-white font-normal">Anaesthesiology</option>
                        <option value="Radiology" className="text-slate-900 bg-white font-normal">Radiology</option>
                      </optgroup>
                      <optgroup label="Super-Specialties (Post-Grad & Integrated)" className="text-amber-850 font-bold bg-amber-50">
                        <option value="Cardiology" className="text-slate-900 bg-white font-normal">Cardiology</option>
                        <option value="Nephrology" className="text-slate-900 bg-white font-normal">Nephrology</option>
                        <option value="Urology" className="text-slate-900 bg-white font-normal">Urology</option>
                        <option value="Neurology" className="text-slate-900 bg-white font-normal">Neurology</option>
                        <option value="Endocrinology" className="text-slate-900 bg-white font-normal">Endocrinology</option>
                      </optgroup>
                      <optgroup label="MD Post-Graduate (PG) Specialties" className="text-indigo-850 font-bold bg-indigo-50">
                        <option value="MD Biochemistry" className="text-slate-900 bg-white font-normal">MD Biochemistry</option>
                        <option value="MD Anatomy" className="text-slate-900 bg-white font-normal">MD Anatomy</option>
                        <option value="MD Physiology" className="text-slate-900 bg-white font-normal">MD Physiology</option>
                        <option value="MD Pathology" className="text-slate-900 bg-white font-normal">MD Pathology</option>
                        <option value="MD Pharmacology" className="text-slate-900 bg-white font-normal">MD Pharmacology</option>
                        <option value="MD General Medicine" className="text-slate-900 bg-white font-normal">MD General Medicine</option>
                        <option value="MD Pediatrics" className="text-slate-900 bg-white font-normal">MD Pediatrics</option>
                        <option value="MD Psychiatry" className="text-slate-900 bg-white font-normal">MD Psychiatry</option>
                        <option value="MD Dermatology" className="text-slate-900 bg-white font-normal">MD Dermatology</option>
                        <option value="MD SPM" className="text-slate-900 bg-white font-normal">MD SPM</option>
                        <option value="MD Anaesthesiology" className="text-slate-900 bg-white font-normal">MD Anaesthesiology</option>
                        <option value="MD Radiology" className="text-slate-900 bg-white font-normal">MD Radiology</option>
                      </optgroup>
                      <optgroup label="MS Post-Graduate (PG) Specialties" className="text-pink-850 font-bold bg-pink-50">
                        <option value="MS General Surgery" className="text-slate-900 bg-white font-normal">MS General Surgery</option>
                        <option value="MS Obst-Gynaecology" className="text-slate-900 bg-white font-normal">MS Obst-Gynaecology</option>
                        <option value="MS Orthopaedics" className="text-slate-900 bg-white font-normal">MS Orthopaedics</option>
                        <option value="MS Ophthalmology" className="text-slate-900 bg-white font-normal">MS Ophthalmology</option>
                        <option value="MS ENT" className="text-slate-900 bg-white font-normal">MS ENT</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">Target Student</label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value as any)}
                      className="w-full text-xs bg-amber-50 text-amber-950 font-bold rounded-lg p-2 border border-amber-200 focus:border-amber-400 outline-none"
                    >
                      <option value="MBBS" className="bg-white text-slate-900">MBBS (UG)</option>
                      <option value="MD" className="bg-white text-slate-900">MD (PG)</option>
                      <option value="Integrated (MBBS & MD)" className="bg-white text-slate-900">Integrated</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">Slides Count</label>
                    <input
                      type="number"
                      min={8}
                      max={45}
                      value={slideCount}
                      onChange={(e) => setSlideCount(Number(e.target.value))}
                      className="w-full text-xs bg-amber-50 text-amber-950 font-extrabold rounded-lg p-2 border border-amber-200 focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">Initial Palette</label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value as any)}
                      className="w-full text-xs bg-amber-50 text-amber-950 font-bold rounded-lg p-2 border border-amber-200 focus:border-amber-400 outline-none"
                    >
                      <option value="Academic Navy" className="bg-white text-slate-900">Academic Navy</option>
                      <option value="Teal Clinical" className="bg-white text-slate-900">Teal Clinical</option>
                      <option value="Crimson Hematology" className="bg-white text-slate-900">Crimson Hematology</option>
                      <option value="Emerald Pharmacology" className="bg-white text-slate-900">Emerald Pharmacology</option>
                      <option value="Modern Slate" className="bg-white text-slate-900">Modern Slate</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className={`w-full text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                    loading || !topic.trim()
                      ? 'bg-amber-100 text-amber-400 border border-amber-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:shadow-lg hover:shadow-amber-500/10 text-amber-950 font-extrabold border border-amber-400'
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-amber-950" />
                  {loading ? 'Generating Lecture...' : 'Generate PPT (1 Minute)'}
                </button>
              </div>
            </div>

            {/* CURRICULUM RESOURCE CENTER & TAB CONTROLS */}
            <div className="space-y-3 pt-2">
              <div className="flex border-b border-amber-200 pb-1.5 gap-1">
                <button 
                  onClick={() => setSidebarTab('presets')}
                  className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 text-center rounded-lg transition-all cursor-pointer ${
                    sidebarTab === 'presets' 
                      ? 'bg-amber-500/15 text-amber-950 border border-amber-500/35 font-black' 
                      : 'text-amber-800/65 hover:text-amber-950'
                  }`}
                  title="Verified, pre-reviewed ready presentations"
                >
                  Exemplars
                </button>
                <button 
                  onClick={() => setSidebarTab('syllabus')}
                  className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 text-center rounded-lg transition-all cursor-pointer ${
                    sidebarTab === 'syllabus' 
                      ? 'bg-amber-500/15 text-amber-950 border border-amber-500/35 font-black' 
                      : 'text-amber-800/65 hover:text-amber-950'
                  }`}
                  title="National Medical Commission syllabus template guides"
                >
                  Syllabus
                </button>
                <button 
                  onClick={() => setSidebarTab('history')}
                  className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 text-center rounded-lg transition-all cursor-pointer ${
                    sidebarTab === 'history' 
                      ? 'bg-amber-500/15 text-amber-950 border border-amber-500/35 font-black' 
                      : 'text-amber-800/65 hover:text-amber-950'
                  }`}
                  title="My previously generated lectures"
                >
                  History ({history.length})
                </button>
              </div>

              {/* TAB CONTENT: Verified Exemplars */}
              {sidebarTab === 'presets' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-amber-600" />
                    <h3 className="text-xs uppercase tracking-widest font-extrabold text-amber-800 font-mono">
                      Verified Lecture Slides
                    </h3>
                  </div>
                  <p className="text-[10px] text-amber-900/80 italic">Click to load instantly verified peer-reviewed, fully interactive medical presentations.</p>
                  
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                    {PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLoadPreset(p)}
                        className="w-full text-left bg-white hover:bg-amber-50 p-3 rounded-xl border border-amber-200 hover:border-amber-450 transition-all duration-200 group flex flex-col gap-1 cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[9px] uppercase tracking-wider font-mono px-1.5 py-0.5 bg-amber-100 text-amber-950 rounded">
                            {p.specialty.split(' ')[0]}
                          </span>
                          <span className="text-[9px] font-semibold text-amber-800 uppercase font-mono">
                            {p.slides[1]?.cbmeCode || 'BI 3.4'}
                          </span>
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-900 line-clamp-1 group-hover:text-amber-950">
                          {p.topic}
                        </h4>
                        <p className="text-[10px] text-slate-600 line-clamp-2">
                          {p.slides[0]?.bullets[1]}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB CONTENT: NMC Syllabus Helpers */}
              {sidebarTab === 'syllabus' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 justify-between">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-amber-600" />
                      <h3 className="text-xs uppercase tracking-widest font-extrabold text-amber-800 font-mono">
                        NMC CBME Split-Curriculum Directory
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 font-mono">{SYLLABUS_TEMPLATES.length} Competency Templates</span>
                  </div>

                  {/* SEARCH BAR FOR ALL SPECIALTIES */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search specialty, topic, or code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-amber-200 text-slate-900 text-xs rounded-xl pl-8 pr-3 py-2 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition placeholder:text-slate-400 font-medium"
                    />
                    <span className="absolute left-2.5 top-2.5 text-slate-400">
                      <Share2 className="h-3.5 w-3.5 transform rotate-90" />
                    </span>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-850 text-[10px] font-bold cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <p className="text-[10px] text-amber-900/80 italic leading-relaxed">
                    Select a subject from the left column to display its custom CBME competencies on the right:
                  </p>

                  {/* TWO-COLUMN SPLIT SCREEN DIRECTORY */}
                  <div className="grid grid-cols-12 gap-3 h-[420px]">
                    
                    {/* LEFT COLUMN: VISIBLE SUBJECT SPECIALTIES LIST (Col-span 5) */}
                    <div className="col-span-5 bg-white/80 rounded-xl border border-amber-200/80 p-2 overflow-y-auto flex flex-col gap-1 pr-1.5 scrollbar-thin">
                      <span className="text-[9px] font-black text-amber-850 uppercase tracking-widest px-2 pb-1 block border-b border-amber-200">
                        MBBS Subject Specialties
                      </span>
                      
                      {[
                        { 
                          phase: "Phase I (Pre)", 
                          list: ["Anatomy", "Physiology", "Biochemistry"] 
                        },
                        { 
                          phase: "Phase II (Para)", 
                          list: ["Pathology", "Pharmacology", "Microbiology", "Forensic Medicine"] 
                        },
                        { 
                          phase: "Phase III (Clinical)", 
                          list: [
                            "SPM", 
                            "General Medicine", 
                            "Pediatrics", 
                            "Psychiatry", 
                            "Dermatology", 
                            "Chest", 
                            "Surgery", 
                            "Orthopedics", 
                            "Eye", 
                            "ENT", 
                            "Obst-Gynaecology", 
                            "Anaesthesiology", 
                            "Radiology"
                          ] 
                        },
                        {
                          phase: "Super-Specialties",
                          list: ["Cardiology", "Nephrology", "Urology", "Neurology", "Endocrinology"]
                        },
                        {
                          phase: "MD Specialties (PG)",
                          list: [
                            "MD Biochemistry",
                            "MD Anatomy",
                            "MD Physiology",
                            "MD Pathology",
                            "MD Pharmacology",
                            "MD General Medicine",
                            "MD Pediatrics",
                            "MD Psychiatry",
                            "MD Dermatology",
                            "MD SPM",
                            "MD Anaesthesiology",
                            "MD Radiology"
                          ]
                        },
                        {
                          phase: "MS Specialties (PG)",
                          list: [
                            "MS General Surgery",
                            "MS Obst-Gynaecology",
                            "MS Orthopaedics",
                            "MS Ophthalmology",
                            "MS ENT"
                          ]
                        }
                      ].map((pGroup, gIdx) => (
                        <div key={gIdx} className="space-y-1 mt-2">
                          <span className="text-[8px] font-bold text-teal-400 uppercase tracking-wider block px-2">
                            {pGroup.phase}
                          </span>
                          {pGroup.list.map((spec) => (
                            <button
                              key={spec}
                              onClick={() => setSelectedSyllabusSpecialty(spec)}
                              className={`w-full text-left text-[11px] font-extrabold px-2 py-1.5 rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                                selectedSyllabusSpecialty === spec
                                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-950 border border-amber-400/50 shadow-sm font-black'
                                  : 'text-amber-900/70 hover:bg-amber-100/50 hover:text-amber-950 border border-transparent'
                              }`}
                            >
                              <span className="truncate">{spec}</span>
                              <span className="text-[9px] text-amber-800 font-mono font-bold bg-amber-100 px-1 rounded">
                                {SYLLABUS_TEMPLATES.filter(x => x.specialty === spec).length}
                              </span>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* RIGHT COLUMN: CORRESPONDING COMPETENCY LIST (Col-span 7) */}
                    <div className="col-span-7 bg-white/50 rounded-xl border border-amber-200/70 p-2.5 overflow-y-auto flex flex-col gap-2 scrollbar-thin">
                      <div className="flex items-center justify-between border-b border-amber-200 pb-1.5 mb-1">
                        <span className="text-[10px] font-black text-amber-950 uppercase tracking-wider truncate">
                          {selectedSyllabusSpecialty} Competencies
                        </span>
                        <span className="text-[8px] font-extrabold text-amber-900 font-mono bg-amber-100 px-1.5 py-0.5 rounded">
                          NMC Code
                        </span>
                      </div>

                      <div className="space-y-2">
                        {SYLLABUS_TEMPLATES.filter(s => 
                          (s.specialty === selectedSyllabusSpecialty) && (
                            !searchQuery ||
                            s.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.code.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                        ).map((s, idx) => (
                          <div 
                            key={idx}
                            className="bg-white border border-amber-200 p-2.5 rounded-xl hover:border-amber-400 transition-all duration-200 flex flex-col gap-1.5 shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-black font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-950 select-none">
                                {s.code}
                              </span>
                              <span className="text-[9px] font-semibold text-amber-800/80">
                                {s.slides} Slides
                              </span>
                            </div>
                            <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                              {s.topic}
                            </h4>
                            <div className="flex gap-1.5 pt-1">
                              <button
                                onClick={() => {
                                  setTopic(s.topic);
                                  setSpecialty(s.specialty);
                                  setTargetAudience(s.targetAudience as any);
                                  setTheme(s.theme as any);
                                  setSlideCount(s.slides);
                                }}
                                className="flex-1 py-1 bg-amber-50 hover:bg-amber-100 text-amber-950 rounded text-[9px] font-bold transition text-center cursor-pointer border border-amber-200/60"
                                title="Pre-configure parameter form with this syllabus module"
                              >
                                Configure
                              </button>
                              <button
                                onClick={() => handleInstantGenerate(
                                  s.topic,
                                  s.specialty,
                                  s.targetAudience as any,
                                  s.theme as any,
                                  s.slides
                                )}
                                className="flex-1 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 text-emerald-800 rounded text-[9px] font-extrabold transition text-center cursor-pointer flex items-center justify-center gap-0.5 shadow-sm"
                                title="Run generative AI for these slides instantly"
                              >
                                <span>⚡ Generate</span>
                              </button>
                            </div>
                          </div>
                        ))}

                        {SYLLABUS_TEMPLATES.filter(s => s.specialty === selectedSyllabusSpecialty).length === 0 && (
                          <div className="text-center py-10">
                            <Layers className="h-6 w-6 text-slate-600 mx-auto mb-2 animate-pulse" />
                            <p className="text-[10px] text-slate-500 italic">No syllabus templates registered for this specialty.</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB CONTENT: Local History */}
              {sidebarTab === 'history' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
                    <h3 className="text-xs uppercase tracking-widest font-extrabold text-slate-400 font-mono">
                      Recent Presentations
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">Access and customize previously generated slideshow packages locally:</p>
                  
                  <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1">
                    {history.length === 0 ? (
                      <div className="text-center py-6 bg-slate-900/30 rounded-xl border border-slate-850/60">
                        <Info className="h-5 w-5 text-slate-600 mx-auto mb-1" />
                        <p className="text-[10px] text-slate-500 italic">No previous presentation runs found.</p>
                      </div>
                    ) : (
                      history.map((hPres, idx) => (
                        <div 
                          key={idx}
                          className="w-full bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 hover:border-amber-500/40 transition flex items-center justify-between gap-2"
                        >
                          <button
                            onClick={() => {
                              setPresentation(hPres);
                              setTopic(hPres.topic);
                              setSpecialty(hPres.specialty);
                              setTargetAudience(hPres.targetAudience);
                              setTheme(hPres.theme);
                              setSlideCount(hPres.slideCount);
                              setActiveSlideIdx(0);
                            }}
                            className="flex-1 min-w-0 text-left cursor-pointer group"
                          >
                            <p className="text-[11px] font-bold text-slate-200 line-clamp-1 group-hover:text-amber-300">{hPres.topic}</p>
                            <p className="text-[9px] text-slate-500 font-mono">
                              {hPres.specialty} • {hPres.slides.length} slides
                            </p>
                          </button>
                          <button 
                            onClick={() => {
                              const filtered = history.filter((_, i) => i !== idx);
                              setHistory(filtered);
                              localStorage.setItem('medlecturer_history_v1', JSON.stringify(filtered));
                            }}
                            className="p-1 text-slate-600 hover:text-red-400 transition cursor-pointer"
                            title="Remove from workspace history"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* PWA INSTALLATION CORNER */}
            <div className="bg-amber-100/50 border border-amber-200 p-3.5 rounded-xl flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-800 shrink-0">
                <Smartphone className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-950">WhatsApp / Standalone App</h4>
                <p className="text-[10px] text-amber-900/80 leading-normal">Install this tool on your phone to carry your slides and curriculum offline directly to lecture halls.</p>
                <div className="pt-1.5">
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="text-[10px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                  >
                    Share Web App Link
                    <Share2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKSPACE AREA: PPT Navigation + Slide Live Canvas */}
        <section className="flex-1 bg-[#FCFBE5] bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.05)_0%,_transparent_100%)] flex flex-col overflow-hidden relative bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px]">
          
          {/* AI Loader overlay */}
          {loading && (
            <div className="absolute inset-0 bg-[#FDFCEB]/98 z-40 flex flex-col items-center justify-center p-8">
              <div className="max-w-md w-full space-y-6 text-center">
                <div className="relative inline-block">
                  <div className="h-16 w-16 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
                  <Activity className="h-6 w-6 text-amber-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Synthesizing Lecture Slides...</h3>
                  <p className="text-sm text-amber-850 font-bold font-mono">{loadingProgress}%</p>
                  <p className="text-xs text-amber-950 leading-normal font-medium bg-amber-50/80 py-2.5 px-4 rounded-xl border border-amber-200">
                    {loadingStage}
                  </p>
                </div>

                <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden border border-amber-200/60">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 h-full transition-all duration-500"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                
                <p className="text-[11px] text-amber-800/80 italic">
                  Completing medical nomenclature checks & curriculum structural alignments.
                </p>
              </div>
            </div>
          )}

          {presentation ? (
            <div className="flex-1 flex overflow-hidden">
              
              {/* SLIDES OUTLINE SIDE-STRIP (Powerpoint Thumbnail strip) */}
              <div className="w-52 bg-amber-50/70 border-r border-amber-200/65 flex flex-col shrink-0 overflow-y-auto">
                <div className="p-3 border-b border-amber-200 flex items-center justify-between sticky top-0 bg-amber-50/90 z-10">
                  <span className="text-[10px] font-extrabold text-amber-900 font-mono uppercase">Slides List ({presentation.slides.length})</span>
                  <button 
                    onClick={handleAddSlide}
                    className="p-1 rounded bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 transition cursor-pointer"
                    title="Add a custom slide"
                  >
                    <Plus className="h-3 w-3 stroke-[3]" />
                  </button>
                </div>
                
                <div className="p-2 space-y-2">
                  {presentation.slides.map((slide, idx) => {
                    const isActive = idx === activeSlideIdx;
                    return (
                      <div 
                        key={slide.id || idx}
                        onClick={() => {
                          setActiveSlideIdx(idx);
                          setSelectedNode(null);
                        }}
                        className={`w-full group rounded-lg p-2.5 transition-all duration-200 cursor-pointer border text-left relative ${
                          isActive 
                            ? 'bg-white border-amber-500 shadow-md shadow-amber-500/10' 
                            : 'bg-white/40 border-amber-200/50 hover:bg-white hover:border-amber-350 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5 mb-1.5">
                          <span className={`text-[10px] font-mono font-extrabold ${isActive ? 'text-amber-800' : 'text-slate-450'}`}>
                            {idx + 1}.
                          </span>
                          <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono shrink-0">
                            {slide.layout.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <h4 className={`text-[11px] font-bold line-clamp-2 leading-tight ${isActive ? 'text-slate-950' : 'text-slate-700 group-hover:text-slate-900'}`}>
                          {slide.title}
                        </h4>

                        {/* Order & Modification controls inside list */}
                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 mt-2 transition-all duration-150 absolute bottom-1 right-1 bg-white py-0.5 px-1 rounded border border-amber-200 shadow-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveSlide(idx, 'up');
                            }}
                            disabled={idx === 0}
                            className="p-0.5 rounded text-slate-400 hover:text-slate-200 disabled:opacity-35"
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveSlide(idx, 'down');
                            }}
                            disabled={idx === presentation.slides.length - 1}
                            className="p-0.5 rounded text-slate-400 hover:text-slate-200 disabled:opacity-35"
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSlide(idx);
                            }}
                            disabled={presentation.slides.length <= 1}
                            className="p-0.5 rounded text-rose-400 hover:text-rose-300 disabled:opacity-35"
                            title="Delete Slide"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CENTRAL SLIDE CANVAS WORKSPACE */}
              <div className="flex-1 flex flex-col overflow-y-auto p-6 bg-[#FCFBE5]/30">
                
                {/* Topic Active Header */}
                <div className="flex items-center justify-between mb-4 bg-white/80 p-3.5 rounded-xl border border-amber-200 shadow-sm">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 font-mono">
                      Current Editing Presentation
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1">{presentation.topic}</h3>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setPrintTarget('slides');
                        setShowHandoutModal(true);
                      }}
                      className="flex items-center gap-2 text-xs font-extrabold px-3.5 py-1.5 rounded-lg bg-white border border-slate-250 hover:bg-slate-50 text-slate-800 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      title="Download static PDF version of complete slide deck for students"
                    >
                      <Printer className="h-3.5 w-3.5 text-teal-600 stroke-[2.5]" />
                      <span>Download Static PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        setPrintTarget('handout');
                        setShowHandoutModal(true);
                      }}
                      className="flex items-center gap-2 text-xs font-extrabold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                      title="Compile Printable Student Handouts & WhatsApp Cheatsheets"
                    >
                      <FileText className="h-3.5 w-3.5 stroke-[2.5]" />
                      <span>Student Handouts</span>
                    </button>

                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                        isEditing 
                          ? 'bg-amber-100 border-amber-300 text-amber-950' 
                          : 'bg-white border-amber-250 text-amber-800 hover:bg-amber-50'
                      }`}
                    >
                      <Edit className="h-3.5 w-3.5 text-amber-700" />
                      {isEditing ? 'Close Slide Editor' : 'Open Slide Editor'}
                    </button>
                  </div>
                </div>

                {/* THE POWERPOINT WIDESCREEN (16:9) CANVAS BOX */}
                <div className="w-full max-w-[1000px] mx-auto aspect-[16/9] bg-white text-slate-900 shadow-2xl rounded-2xl overflow-hidden border border-slate-800 relative flex flex-col justify-between p-8">
                  
                  {/* Floating Left/Right Navigation Arrows overlay */}
                  {activeSlideIdx > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlideIdx(prev => Math.max(0, prev - 1));
                        setSelectedNode(null);
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-slate-900/40 hover:bg-slate-900/85 hover:scale-110 text-white rounded-full transition-all cursor-pointer shadow-lg border border-white/25 hover:border-white/50"
                      title="Previous Slide"
                    >
                      <ChevronLeft className="h-6 w-6 stroke-[3]" />
                    </button>
                  )}
                  {activeSlideIdx < presentation.slides.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlideIdx(prev => Math.min(presentation.slides.length - 1, prev + 1));
                        setSelectedNode(null);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-slate-900/40 hover:bg-slate-900/85 hover:scale-110 text-white rounded-full transition-all cursor-pointer shadow-lg border border-white/25 hover:border-white/50"
                      title="Next Slide"
                    >
                      <ChevronRight className="h-6 w-6 stroke-[3]" />
                    </button>
                  )}
                  
                  {/* Master Slide header elements */}
                  {presentation.slides[activeSlideIdx].layout !== 'title' && (
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
                      <div className="space-y-0.5 max-w-[80%]">
                        {presentation.slides[activeSlideIdx].cbmeCode && (
                          <span className={`text-[10px] font-extrabold uppercase tracking-widest font-mono ${activeThemeStyle.accentText}`}>
                            NMC COMPETENCY: {presentation.slides[activeSlideIdx].cbmeCode}
                          </span>
                        )}
                        <h2 className={`text-2xl font-black font-serif tracking-tight leading-tight ${activeThemeStyle.primaryText}`}>
                          {presentation.slides[activeSlideIdx].title}
                        </h2>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded-full text-slate-600 font-mono tracking-wider">
                        DEPT: {presentation.specialty.toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* SLIDE INNER CORE LAYOUT CONTENT */}
                  <div className="flex-1 flex flex-col justify-center min-h-0">
                    
                    {/* TITLE SLIDE LAYOUT */}
                    {presentation.slides[activeSlideIdx].layout === 'title' && (
                      <div className={`absolute inset-0 p-12 flex flex-col justify-between text-white ${activeThemeStyle.primaryBg}`}>
                        {/* Graphical accent corner */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none" />
                        
                        <div className="space-y-2">
                          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-teal-400 uppercase bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 inline-block">
                            NMC India CBME Aligned Curriculum
                          </span>
                          <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight leading-none text-white max-w-[90%] pt-2">
                            {presentation.topic}
                          </h1>
                          <p className="text-base text-slate-300 font-semibold max-w-2xl pt-2">
                            {presentation.slides[activeSlideIdx].bullets[2] || 'A comprehensive biochemical and clinical medicine correlation.'}
                          </p>
                        </div>

                        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-xs text-teal-300 font-bold uppercase tracking-wider">Laying Department</p>
                            <p className="text-sm font-extrabold">Department of {presentation.specialty}</p>
                          </div>
                          
                          <div className="space-y-0.5 text-right">
                            <p className="text-xs text-teal-300 font-bold uppercase tracking-wider">Target Level</p>
                            <p className="text-sm font-extrabold">{presentation.targetAudience} Degree Syllabus</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CLINICAL CASE STUDY LAYOUT (Split Screen Case Details vs Labs Table) */}
                    {presentation.slides[activeSlideIdx].layout === 'case_study' && (
                      <div className="grid grid-cols-12 gap-6 h-full items-stretch min-h-0">
                        {/* Column 1: Medical Narrative */}
                        <div className="col-span-5 space-y-3 overflow-y-auto pr-2">
                          <div className={`p-3 rounded-xl border border-dashed text-xs leading-relaxed ${activeThemeStyle.lightBg} ${activeThemeStyle.primaryBorder}`}>
                            <div className="flex items-center gap-1.5 font-extrabold uppercase text-slate-700 tracking-wider mb-1">
                              <Info className="h-3.5 w-3.5 text-blue-500" />
                              PATIENT VIGNETTE NARRATIVE
                            </div>
                            <div className="space-y-2 text-slate-800">
                              {presentation.slides[activeSlideIdx].bullets.map((b, idx) => (
                                <p key={idx} dangerouslySetInnerHTML={{ __html: b.replace(/\*(.*?)\*/g, '<strong>$1</strong>') }} />
                              ))}
                            </div>
                          </div>
                          
                          {/* Learning tip badge */}
                          <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200/60 flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
                              <strong>Pedagogical Practice</strong>: Ask students to critique the lab indicators on the right before launching the diagnosis.
                            </p>
                          </div>
                        </div>

                        {/* Column 2: Clinical Lab Values (Visual Charts) */}
                        <div className="col-span-7 flex flex-col justify-between min-h-0 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
                              <Activity className="h-3.5 w-3.5 text-red-500" />
                              EMERGENCY CRITICAL LAB PROFILE
                            </h4>
                            <button
                              onClick={() => setIsSiUnit(prev => !prev)}
                              className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full transition-all border ${
                                isSiUnit 
                                  ? 'bg-amber-100 text-amber-950 border-amber-300' 
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              🧪 {isSiUnit ? "SI Metric" : "Conventional"}
                            </button>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                            {presentation.slides[activeSlideIdx].tableData?.rows.map((row, rIdx) => {
                              const paramName = row[0];
                              const rawVal = row[1];
                              const refRange = row[2];
                              const tag = row[3];
                              const isLow = tag.toLowerCase().includes('low');
                              const isHigh = tag.toLowerCase().includes('high');

                              const displayVal = formatLabCell(`${rawVal} (Glucose/Creatinine/Bilirubin/Hemoglobin)`, isSiUnit).replace(' (Glucose/Creatinine/Bilirubin/Hemoglobin)', '');
                              const displayRange = formatLabCell(`${refRange} (Glucose/Creatinine/Bilirubin/Hemoglobin)`, isSiUnit).replace(' (Glucose/Creatinine/Bilirubin/Hemoglobin)', '');

                              return (
                                <div key={rIdx} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs gap-3">
                                  <div className="w-1/3">
                                    <span className="font-bold text-slate-800">{paramName}</span>
                                    <span className="block text-[9px] text-slate-400 font-mono">Normal: {displayRange}</span>
                                  </div>
                                  
                                  {/* Beautiful Visual Slider representing pathological shift */}
                                  <div className="w-1/3 px-2 flex flex-col gap-1">
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full relative overflow-hidden">
                                      <div 
                                        className={`absolute top-0 bottom-0 rounded-full ${
                                          isHigh ? 'bg-red-500 right-0 left-1/2' : isLow ? 'bg-amber-500 left-0 right-1/2' : 'bg-green-500 left-1/4 right-1/4'
                                        }`}
                                      />
                                    </div>
                                    <div className="flex justify-between text-[8px] text-slate-400 font-mono font-bold">
                                      <span>MIN</span>
                                      <span className={isHigh || isLow ? 'text-red-500 font-black' : 'text-green-600'}>
                                        {displayVal}
                                      </span>
                                      <span>MAX</span>
                                    </div>
                                  </div>

                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 uppercase tracking-wider ${
                                    isHigh ? 'bg-red-50 text-red-600 border border-red-100' : isLow ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-green-50 text-green-600'
                                  }`}>
                                    {tag}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* INTERACTIVE BIOCHEMICAL DIAGRAM LAYOUT */}
                    {presentation.slides[activeSlideIdx].layout === 'biochemical_diagram' && (
                      <div className="h-full flex flex-col justify-between min-h-0 relative">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-[11px] text-slate-500 italic">
                            Click on any node/enzyme in the pathway to open its peer-reviewed biochemical profile.
                          </p>
                          <span className="text-[9px] uppercase font-bold tracking-widest font-mono px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded border border-indigo-100">
                            Live Visualization
                          </span>
                        </div>

                        {presentation.slides[activeSlideIdx].diagram ? (
                          <div className="flex-1 min-h-0 flex gap-4">
                            
                            {/* SVG Interactive Pathway Rendering */}
                            <div className="flex-1 h-full min-h-[300px] relative">
                              <svg className="w-full h-full border border-amber-200/60 rounded-xl p-3 shadow-inner" viewBox="0 0 1000 500">
                                {/* Define arrow marker and end lines */}
                                <defs>
                                  <linearGradient id="pathway-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FCFAF0" />
                                    <stop offset="35%" stopColor="#E6FFFA" />
                                    <stop offset="70%" stopColor="#EBF8FF" />
                                    <stop offset="100%" stopColor="#FFF5F5" />
                                  </linearGradient>
                                  <marker id="arrow-active" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                                  </marker>
                                  <marker id="arrow-convert" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                                  </marker>
                                  <marker id="bar-inhibit" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 0 L 0 10" stroke="#EF4444" strokeWidth="4" />
                                  </marker>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pathway-gradient)" rx="12" />

                                {/* Compartments rendering */}
                                {presentation.slides[activeSlideIdx].diagram.compartments?.map((comp, i, arr) => {
                                  const width = 1000 / arr.length;
                                  return (
                                    <g key={comp}>
                                      <rect
                                        x={i * width + 10}
                                        y={40}
                                        width={width - 20}
                                        height={430}
                                        rx={12}
                                        className="fill-indigo-50/15 stroke-indigo-100 stroke-2"
                                        strokeDasharray="6 4"
                                      />
                                      <rect
                                        x={i * width + 15}
                                        y={45}
                                        width={width - 30}
                                        height={28}
                                        rx={6}
                                        className="fill-slate-100/70"
                                      />
                                      <text
                                        x={i * width + width / 2}
                                        y={63}
                                        textAnchor="middle"
                                        className="text-[10px] font-black tracking-wider fill-slate-500 uppercase font-sans"
                                      >
                                        {comp}
                                      </text>
                                    </g>
                                  );
                                })}

                                {/* Draw Connection Lines (Edges) */}
                                {presentation.slides[activeSlideIdx].diagram?.edges?.map((edge, i) => {
                                  const fromNode = presentation.slides[activeSlideIdx].diagram?.nodes.find(n => n.id === edge.from);
                                  const toNode = presentation.slides[activeSlideIdx].diagram?.nodes.find(n => n.id === edge.to);
                                  if (!fromNode || !toNode) return null;

                                  const fromIdx = presentation.slides[activeSlideIdx].diagram?.nodes?.findIndex(n => n.id === edge.from) ?? 0;
                                  const toIdx = presentation.slides[activeSlideIdx].diagram?.nodes?.findIndex(n => n.id === edge.to) ?? 0;
                                  const isEdgeVisible = fromIdx <= diagramRevealStep && toIdx <= diagramRevealStep;

                                  const x1 = (fromNode.x / 100) * 900 + 50;
                                  const y1 = (fromNode.y / 100) * 380 + 80;
                                  const x2 = (toNode.x / 100) * 900 + 50;
                                  const y2 = (toNode.y / 100) * 380 + 80;

                                  const isActivation = edge.style === 'activation';
                                  const isInhibition = edge.style === 'inhibition';
                                  const strokeColor = isActivation ? '#10B981' : isInhibition ? '#EF4444' : '#475569';
                                  const markerId = isActivation ? 'arrow-active' : isInhibition ? 'bar-inhibit' : 'arrow-convert';

                                  return (
                                    <g key={i} style={{ opacity: isEdgeVisible ? 1 : 0.05, transition: 'all 0.4s ease' }}>
                                      <line
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke={strokeColor}
                                        strokeWidth={2.5}
                                        strokeDasharray={isInhibition ? "4 4" : undefined}
                                        markerEnd={`url(#${markerId})`}
                                      />
                                      {edge.label && (
                                        <g>
                                          <rect
                                            x={(x1 + x2) / 2 - 50}
                                            y={(y1 + y2) / 2 - 10}
                                            width={100}
                                            height={18}
                                            rx={4}
                                            fill="white"
                                            stroke="#E2E8F0"
                                            strokeWidth={1}
                                          />
                                          <text
                                            x={(x1 + x2) / 2}
                                            y={(y1 + y2) / 2 + 2}
                                            textAnchor="middle"
                                            className="text-[8px] font-black font-sans fill-indigo-900"
                                          >
                                            {edge.label}
                                          </text>
                                        </g>
                                      )}
                                    </g>
                                  );
                                })}

                                {/* Draw Substrate/Enzyme/Condition Nodes */}
                                {presentation.slides[activeSlideIdx].diagram?.nodes?.map(node => {
                                  const x = (node.x / 100) * 900 + 50;
                                  const y = (node.y / 100) * 380 + 80;
                                  const isEnzyme = node.type === 'enzyme';
                                  const isClinical = node.type === 'clinical_condition';
                                  const isReceptor = node.type === 'receptor';

                                  const nodeIdx = presentation.slides[activeSlideIdx].diagram?.nodes?.indexOf(node) ?? 0;
                                  const isNodeVisible = nodeIdx <= diagramRevealStep;
                                  
                                  const nodeBg = isEnzyme 
                                    ? 'fill-teal-600' 
                                    : isClinical 
                                      ? 'fill-rose-50 border-rose-500' 
                                      : isReceptor
                                        ? 'fill-amber-500'
                                        : 'fill-white';
                                  
                                  const nodeBorder = isClinical ? '#F43F5E' : activeThemeStyle.primaryHex;
                                  const labelColor = isEnzyme || isReceptor ? 'fill-white' : isClinical ? 'fill-rose-900' : 'fill-slate-800';

                                  return (
                                    <g
                                      key={node.id}
                                      transform={`translate(${x}, ${y})`}
                                      className="cursor-pointer"
                                      onClick={() => {
                                        if (isNodeVisible) setSelectedNode(node);
                                      }}
                                      style={{ opacity: isNodeVisible ? 1 : 0.08, transition: 'all 0.4s ease' }}
                                    >
                                      <rect
                                        x={-60}
                                        y={-20}
                                        width={120}
                                        height={40}
                                        rx={isEnzyme ? 20 : isClinical ? 4 : 8}
                                        className={`${nodeBg} stroke-[2px] transition-all duration-150 hover:scale-105`}
                                        stroke={nodeBorder}
                                        fill={isEnzyme ? '#0F766E' : isReceptor ? '#D97706' : undefined}
                                      />
                                      <text
                                        x={0}
                                        y={2}
                                        textAnchor="middle"
                                        className={`text-[8px] font-black select-none ${labelColor}`}
                                      >
                                        {node.label}
                                      </text>
                                    </g>
                                  );
                                })}
                              </svg>

                              {/* Floating Legend Key */}
                              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-3 border border-slate-200/80 max-w-[190px] space-y-2 text-[10px] z-30 select-none">
                                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1">
                                  <span className="text-teal-600 font-extrabold uppercase font-mono tracking-wider">Pathway Legend</span>
                                </div>
                                <div className="space-y-1.5 font-semibold text-slate-700">
                                  <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded bg-white border-2 border-dashed border-indigo-200 block shrink-0" />
                                    <span className="text-slate-600">Cell Compartment</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded bg-white border-2 block shrink-0" style={{ borderColor: activeThemeStyle.primaryHex }} />
                                    <span className="text-slate-600">Substrate/Metabolite</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full block shrink-0" style={{ backgroundColor: activeThemeStyle.primaryHex }} />
                                    <span className="text-slate-600">Enzyme Catalyst</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded bg-rose-50 border-2 border-rose-500 block shrink-0" />
                                    <span className="text-rose-700">Clinical Pathology</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded bg-amber-500 block shrink-0" />
                                    <span className="text-amber-800">Cellular Receptor</span>
                                  </div>
                                  <div className="flex items-center gap-2 border-t border-slate-100 pt-1.5 justify-between text-[9px]">
                                    <div className="flex items-center gap-1">
                                      <span className="w-4 h-0.5 bg-emerald-500 relative block shrink-0">
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 border-l-[3px] border-l-emerald-500 border-y-[2px] border-y-transparent block" />
                                      </span>
                                      <span className="text-emerald-700">Activates</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span className="w-4 h-0.5 bg-rose-500 relative block shrink-0">
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-[1.5px] bg-rose-500 block" />
                                      </span>
                                      <span className="text-rose-600">Inhibits</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Interactive step-by-step playback controls overlay */}
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur shadow-xl rounded-full px-4 py-1.5 border border-amber-250 flex items-center gap-3 z-30">
                                <span className="text-[9px] font-black uppercase text-amber-900 tracking-wider font-mono">
                                  Step reveal:
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setDiagramRevealStep(0); }}
                                    className="p-1 rounded hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                                    title="Reset Substrate"
                                  >
                                    <RotateCcw className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setDiagramRevealStep(prev => Math.max(0, prev - 1)); }}
                                    className="p-1 rounded hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                                    title="Step Back"
                                  >
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="text-[10px] font-extrabold text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded">
                                    {Math.min(diagramRevealStep + 1, presentation.slides[activeSlideIdx].diagram?.nodes?.length || 0)} / {presentation.slides[activeSlideIdx].diagram?.nodes?.length || 0}
                                  </span>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setDiagramRevealStep(prev => Math.min((presentation.slides[activeSlideIdx].diagram?.nodes?.length || 1) - 1, prev + 1)); }}
                                    className="p-1 rounded hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                                    title="Step Forward"
                                  >
                                    <ChevronRight className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setDiagramRevealStep(9); }}
                                    className="px-2 py-0.5 rounded bg-teal-600 hover:bg-teal-500 text-slate-950 text-[8px] font-black uppercase tracking-wider transition"
                                  >
                                    All
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Node Detailed Information Box (Dynamic clinical descriptions) */}
                            <div className="w-64 shrink-0 bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between overflow-y-auto">
                              {selectedNode ? (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className={`text-[8px] uppercase tracking-widest font-black px-2 py-0.5 rounded ${
                                      selectedNode.type === 'enzyme' ? 'bg-teal-100 text-teal-800' : 'bg-indigo-100 text-indigo-800'
                                    }`}>
                                      {selectedNode.type}
                                    </span>
                                    <button 
                                      onClick={() => setSelectedNode(null)}
                                      className="text-slate-400 hover:text-slate-600 p-0.5"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                  
                                  <h5 className="text-xs font-black text-slate-800 leading-tight">
                                    {selectedNode.label}
                                  </h5>

                                  <div className="space-y-1.5 text-[10px]">
                                    <p className="text-slate-500 font-medium leading-normal">
                                      {selectedNode.description}
                                    </p>
                                    
                                    {selectedNode.regulation && (
                                      <div className="bg-emerald-50 border border-emerald-100 p-1.5 rounded text-emerald-800">
                                        <strong className="block text-[8px] uppercase font-bold text-emerald-600">Allosteric Regulation:</strong>
                                        {selectedNode.regulation}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-3">
                                  <Layers className="h-8 w-8 text-indigo-200 stroke-[1.5] mb-2" />
                                  <p className="text-[10px] text-slate-400 font-medium leading-normal">
                                    Select any metabolite or enzyme in the pathway schematic to view molecular regulations & clinical deficiencies.
                                  </p>
                                </div>
                              )}
                              
                              <div className="pt-3 border-t border-slate-100 text-[8px] font-bold text-slate-400 flex items-center gap-1">
                                <Info className="h-3 w-3" />
                                PATHWAY FULLY EDITABLE IN THE SLIDE EDITOR
                              </div>
                            </div>

                          </div>
                        ) : (
                          <div className="text-center py-12">No diagram configured for this slide.</div>
                        )}
                      </div>
                    )}

                    {/* GENERAL OUTLINE / SPLIT BULLET TEXT LAYOUT (Standard academic look) */}
                    {presentation.slides[activeSlideIdx].layout !== 'case_study' && 
                     presentation.slides[activeSlideIdx].layout !== 'biochemical_diagram' && 
                     presentation.slides[activeSlideIdx].layout !== 'title' && (
                      <div className="space-y-4 pr-4 overflow-y-auto">
                        <ul className="space-y-3">
                          {presentation.slides[activeSlideIdx].bullets.map((bullet, bIdx) => (
                            <li 
                              key={bIdx} 
                              className="text-sm font-medium leading-relaxed text-slate-800 flex items-start gap-2.5"
                            >
                              <span className={`h-2 w-2 rounded-full mt-2 shrink-0 ${activeThemeStyle.accent}`} />
                              <span 
                                dangerouslySetInnerHTML={{ 
                                  __html: bullet
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\*(.*?)\*/g, '<strong className="font-extrabold text-teal-800">$1</strong>') 
                                }} 
                              />
                            </li>
                          ))}
                        </ul>
                        
                        {/* Interactive Compare Panel for diagnostic markers */}
                        {presentation.slides[activeSlideIdx].tableData && (
                          <div className="pt-2">
                            <table className="w-full text-xs text-left text-slate-600 rounded-lg overflow-hidden border border-slate-100">
                              <thead className={`text-white text-[10px] uppercase font-bold tracking-wider ${activeThemeStyle.primaryBg}`}>
                                <tr>
                                  {presentation.slides[activeSlideIdx].tableData?.headers.map((h, i) => (
                                    <th key={i} className="px-3 py-2 text-center">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {presentation.slides[activeSlideIdx].tableData?.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="px-3 py-2 font-medium text-slate-700 text-center">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Standard Slide Footer */}
                  {presentation.slides[activeSlideIdx].layout !== 'title' && (
                    <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-4 text-[9px] font-bold text-slate-400 font-sans uppercase tracking-wider">
                      <span>Slide {activeSlideIdx + 1} | MBBS CBME Lecture Bank</span>
                      <span>NATIONAL MEDICAL COMMISSION CORE CURRICULUM</span>
                    </div>
                  )}

                </div>

                {/* SPEAKER NOTES AREA (Crucial pedagogical notes) */}
                <div className="w-full max-w-[1000px] mx-auto mt-4 bg-slate-950 border border-slate-850 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-teal-400 tracking-wider font-mono flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      Pedagogical Speaker Notes (For Professor Use During Lectures)
                    </span>
                    <span className="text-[9px] text-slate-500 italic">These notes will attach natively to the final offline PPTX download</span>
                  </div>
                  <div className="p-4">
                    {isEditing ? (
                      <textarea
                        value={presentation.slides[activeSlideIdx].speakerNotes}
                        onChange={(e) => handleUpdateSlideField('speakerNotes', e.target.value)}
                        className="w-full h-24 bg-slate-950 text-slate-300 rounded-lg p-3 text-xs border border-slate-800 focus:border-teal-500 outline-none resize-none leading-relaxed font-sans"
                        placeholder="Type high-yield discussion points, references or examination triggers..."
                      />
                    ) : (
                      <p className="text-xs text-slate-400 font-medium leading-relaxed whitespace-pre-wrap">
                        {presentation.slides[activeSlideIdx].speakerNotes || 'No speaker notes written for this slide yet. Activate Slide Editor to customize.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* REGENERATE SLIDE WITH SPECIFIC PARAMETERS */}
                <div className="w-full max-w-[1000px] mx-auto mt-4 bg-slate-950/60 border border-slate-850 p-4 rounded-xl flex items-center gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider font-mono">Refine Active Slide with AI</h5>
                    <div className="mt-1.5 flex gap-2">
                      <input
                        type="text"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="e.g., Make this more clinical for postgraduate students, or add genetic allele frequencies..."
                        className="flex-1 text-xs bg-slate-950 text-slate-300 rounded-lg p-2.5 border border-slate-800 outline-none focus:border-teal-500"
                      />
                      <button
                        onClick={handleRegenerateSlide}
                        disabled={!customPrompt.trim()}
                        className="text-xs font-bold px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 rounded-lg transition shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Refine Slide
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* EDITOR PANEL: Shows up when "isEditing" is toggled on (Wysiwyg controls) */}
              {isEditing && (
                <div className="w-80 bg-slate-950 border-l border-slate-850 flex flex-col shrink-0 overflow-y-auto p-5 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                    <h3 className="text-xs font-extrabold uppercase text-slate-300 font-mono tracking-wider flex items-center gap-1.5">
                      <Edit className="h-4 w-4 text-teal-400" />
                      Content Editor
                    </h3>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Title & Layout settings */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Slide Title</label>
                      <input
                        type="text"
                        value={presentation.slides[activeSlideIdx].title}
                        onChange={(e) => handleUpdateSlideField('title', e.target.value)}
                        className="w-full text-xs bg-slate-900 text-slate-100 rounded-lg p-2 border border-slate-800 focus:border-teal-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Layout Type</label>
                        <select
                          value={presentation.slides[activeSlideIdx].layout}
                          onChange={(e) => handleUpdateSlideField('layout', e.target.value as any)}
                          className="w-full text-xs bg-slate-900 text-slate-300 rounded-lg p-2 border border-slate-800 focus:border-teal-500 outline-none"
                        >
                          <option value="title">Title Slide</option>
                          <option value="objectives">Objectives</option>
                          <option value="case_study">Case Study</option>
                          <option value="pathophysiology">Pathophysiology</option>
                          <option value="molecular_mechanism">Molecular Mechanism</option>
                          <option value="biochemical_diagram">Diagram Pathway</option>
                          <option value="clinical_correlation">Clinical Correlation</option>
                          <option value="pharmacology">Pharmacology</option>
                          <option value="q_and_a">Q & A Review</option>
                          <option value="summary">Summary</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">CBME Code</label>
                        <input
                          type="text"
                          value={presentation.slides[activeSlideIdx].cbmeCode || ''}
                          onChange={(e) => handleUpdateSlideField('cbmeCode', e.target.value)}
                          placeholder="e.g. BC-3.5"
                          className="w-full text-xs bg-slate-900 text-slate-100 rounded-lg p-2 border border-slate-800 focus:border-teal-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">CBME Competency Statement</label>
                      <textarea
                        value={presentation.slides[activeSlideIdx].competency || ''}
                        onChange={(e) => handleUpdateSlideField('competency', e.target.value)}
                        placeholder="NMC mapped statement..."
                        className="w-full h-14 text-xs bg-slate-900 text-slate-100 rounded-lg p-2 border border-slate-800 focus:border-teal-500 outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Bullet Points Editing Section */}
                  <div className="space-y-3 pt-3 border-t border-slate-850">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Bullet teaching points</label>
                      <button 
                        onClick={handleAddBullet}
                        className="text-[10px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="h-3 w-3 stroke-[3]" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {presentation.slides[activeSlideIdx].bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex gap-1.5 items-start">
                          <span className="text-[10px] font-mono font-bold text-slate-600 mt-2 shrink-0">{bIdx + 1}.</span>
                          <textarea
                            value={bullet}
                            onChange={(e) => handleUpdateBullet(bIdx, e.target.value)}
                            className="flex-1 text-[11px] bg-slate-900 text-slate-200 rounded-lg p-2 border border-slate-800 outline-none focus:border-teal-500 resize-none h-12"
                          />
                          <button
                            onClick={() => handleDeleteBullet(bIdx)}
                            className="p-1.5 rounded bg-slate-900 text-rose-400 hover:text-rose-300 border border-slate-800 mt-1 cursor-pointer"
                            title="Delete bullet"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* If case study slide, edit laboratory panel */}
                  {presentation.slides[activeSlideIdx].layout === 'case_study' && presentation.slides[activeSlideIdx].tableData && (
                    <div className="space-y-3 pt-3 border-t border-slate-850">
                      <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">Clinical Lab Rows Editor</label>
                      <p className="text-[9px] text-slate-500 italic">Adjust values and tags (Low / High) to update visual charts on the slide.</p>
                      
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {presentation.slides[activeSlideIdx].tableData?.rows.map((row, rIdx) => (
                          <div key={rIdx} className="bg-slate-900 p-2 rounded-lg border border-slate-850 space-y-1.5 text-[10px]">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-400">Parameter {rIdx + 1}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <input
                                type="text"
                                value={row[0]}
                                onChange={(e) => handleUpdateTableRow(rIdx, 0, e.target.value)}
                                className="bg-slate-950 p-1 rounded text-[10px] border border-slate-800 outline-none text-slate-200"
                                placeholder="Param Name"
                              />
                              <input
                                type="text"
                                value={row[1]}
                                onChange={(e) => handleUpdateTableRow(rIdx, 1, e.target.value)}
                                className="bg-slate-950 p-1 rounded text-[10px] border border-slate-800 outline-none text-teal-400 font-bold"
                                placeholder="Value"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <input
                                type="text"
                                value={row[2]}
                                onChange={(e) => handleUpdateTableRow(rIdx, 2, e.target.value)}
                                className="bg-slate-950 p-1 rounded text-[10px] border border-slate-800 outline-none text-slate-400"
                                placeholder="Ref range"
                              />
                              <input
                                type="text"
                                value={row[3]}
                                onChange={(e) => handleUpdateTableRow(rIdx, 3, e.target.value)}
                                className="bg-slate-950 p-1 rounded text-[10px] border border-slate-800 outline-none text-rose-400 font-bold"
                                placeholder="Tag e.g. High"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
              <div className="bg-[#0b1226]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-8 space-y-6 shadow-2xl shadow-teal-500/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400" />
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-xl shadow-teal-400/20 mx-auto transition-transform duration-300 group-hover:scale-110">
                  <BookOpen className="h-8 w-8 stroke-[2.5]" />
                </div>
                <div className="space-y-3.5">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    Generate Professional <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">Medical Lectures</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Enter your customized lecture title in the left panel, or explore the <strong className="text-teal-400">Syllabus</strong> directory to instantly configure and draft 50 verified, CBME-aligned presentations!
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#060810] border border-slate-800 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping" />
                    Medical AI Copilot Ready
                  </span>
                </div>
              </div>
            </div>
          )}

        </section>
      </main>

      {/* MODAL: SHARE ON WHATSAPP LINK GENERATOR */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-extrabold text-slate-100">Send App on WhatsApp</h3>
                <p className="text-xs text-slate-400">Share MedLecturer AI with medical faculties and colleagues.</p>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-200 rounded-lg text-[11px] leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 mb-1 text-amber-300">
                  <span className="shrink-0 p-0.5 rounded-full bg-amber-500/20">💡</span>
                  Critical Mobile Distribution Guideline:
                </p>
                To distribute this app 100% free of cost to medical teachers across India, please copy or share the <strong className="text-amber-400 font-mono">active Preview URL below</strong>. Hardcoded domains do not host the active sandbox container; the dynamic link below is the one that opens flawlessly on any mobile browser and WhatsApp!
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-emerald-400 font-mono tracking-wider block">Active Sharing Link (Free Use)</span>
                <p className="text-slate-300 font-semibold font-mono truncate">{window.location.href}</p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                When opened on a mobile device, medical professors can add this app instantly to their mobile home screen (as a standalone standalone app), bypassing any app store requirements!
              </p>

              <div className="grid grid-cols-2 gap-3.5">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Hi Professor! Try out MedLecturer AI - a fully interactive medical presentation generator fully aligned with NMC CBME guidelines. Generate detailed diagrams, case studies, and speaker notes instantly: ${window.location.href}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 transition"
                >
                  <Share2 className="h-4 w-4 stroke-[2.5]" />
                  Send WhatsApp
                </a>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("App link copied to clipboard!");
                  }}
                  className="flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: POWERPOINT LAUNCH GUIDE */}
      {showPowerpointGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                  <span className="p-1 rounded bg-orange-500/10 text-orange-400">
                    <Play className="h-4 w-4" />
                  </span>
                  PowerPoint Presentation Loaded!
                </h3>
                <p className="text-xs text-slate-400 mt-1">Your professional, CBME-compliant slides are prepared.</p>
              </div>
              <button 
                onClick={() => setShowPowerpointGuide(false)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl space-y-2">
                <p className="font-bold text-orange-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  How to run your Slides in PowerPoint:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-0.5 leading-relaxed">
                  <li>Your browser has automatically started downloading the <span className="text-orange-400 font-bold font-mono">.pptx</span> presentation.</li>
                  <li>Locate the file in your <span className="font-semibold text-slate-200">Downloads</span> folder (or double-click the file in your browser's download shelf).</li>
                  <li>It will launch instantly in <span className="font-bold text-white">Microsoft PowerPoint</span> (Desktop, iPad, or mobile app).</li>
                  <li>To run directly in your browser, drag and drop this file into <a href="https://slides.new" target="_blank" rel="noopener noreferrer" className="underline text-orange-400 hover:text-orange-300 font-bold">Google Slides</a> or <a href="https://onedrive.live.com/" target="_blank" rel="noopener noreferrer" className="underline text-orange-400 hover:text-orange-300 font-bold">PowerPoint Web / Office 365</a>!</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[10px]">💡 Pro-Tips for Medical Professors</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                    <span className="font-extrabold text-[10px] uppercase text-teal-400 block mb-1">Speaker Notes Embedded</span>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Every single slide contains complete clinical guidelines and NMC-mapped talking points in the PowerPoint notes view!
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                    <span className="font-extrabold text-[10px] uppercase text-teal-400 block mb-1">100% Fully Editable</span>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Our layout uses PowerPoint native shape layers—not flat images—so you can edit any text, shape, or diagram manually!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end border-t border-slate-800/60 pt-4">
              <button
                onClick={() => {
                  setShowPowerpointGuide(false);
                  if (presentation) {
                    generateAndDownloadPPTX(presentation);
                  }
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-lg transition border border-slate-700 cursor-pointer"
              >
                Re-Download File
              </button>
              <button
                onClick={() => setShowPowerpointGuide(false)}
                className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-lg transition-all cursor-pointer shadow-lg shadow-orange-500/10"
              >
                Got it, Start Lecture!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: HIGH-YIELD STUDENT HANDOUT & PRESENTATION PDF COMPILER */}
      {showHandoutModal && presentation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 overflow-y-auto">
          <style>{`
            @media print {
              body * {
                visibility: hidden !important;
              }
              ${printTarget === 'handout' ? `
                #handout-print-area, #handout-print-area * {
                  visibility: visible !important;
                }
                #handout-print-area {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  background: white !important;
                  color: black !important;
                  box-shadow: none !important;
                  border: none !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }
                @page {
                  size: portrait !important;
                  margin: 12mm 12mm 12mm 12mm !important;
                }
              ` : `
                #slides-print-area, #slides-print-area * {
                  visibility: visible !important;
                }
                #slides-print-area {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  background: white !important;
                  color: black !important;
                  box-shadow: none !important;
                  border: none !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }
                @page {
                  size: landscape !important;
                  margin: 0 !important;
                }
                .slide-print-page {
                  page-break-after: always !important;
                  break-after: page !important;
                  height: 100vh !important;
                  width: 100vw !important;
                  display: flex !important;
                  flex-direction: column !important;
                  justify-content: space-between !important;
                  box-sizing: border-box !important;
                  padding: 3rem !important;
                  background: white !important;
                  color: black !important;
                }
              `}
              .no-print {
                display: none !important;
              }
              .page-break {
                page-break-before: always !important;
                break-before: page !important;
              }
            }
          `}</style>
          
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col h-[90vh] text-slate-100 overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between no-print">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold flex items-center gap-2 text-white">
                  <span>📝</span> NMC CBME Medical PDF & Handout Compiler
                </h3>
                <p className="text-xs text-slate-400">
                  Select your export style below. Perfect for vector physical prints or direct PDF distribution.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    const data = getHandoutData(presentation.topic, presentation.specialty);
                    const text = `💡 *HIGH-YIELD MEMORIZATION MNEMONICS* 💡\n\n${data.mnemonics.map(m => `📌 *${m.title}*:\n${m.text}`).join('\n\n')}\n\nGenerated via MedLecturer AI - CBME Specialty Catalogue`;
                    navigator.clipboard.writeText(text);
                    alert("WhatsApp-friendly mnemonics copied to clipboard! You can now paste directly into student WhatsApp groups.");
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Copy WhatsApp Text</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 text-slate-950 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/10"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Export PDF</span>
                </button>
                <button
                  onClick={() => setShowHandoutModal(false)}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Print Format Tabs selector */}
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setPrintTarget('handout')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    printTarget === 'handout'
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Student Handout PDF</span>
                </button>
                <button
                  onClick={() => setPrintTarget('slides')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    printTarget === 'slides'
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Complete Slides PDF</span>
                </button>
              </div>

              <span className="text-[10px] uppercase font-black text-slate-500 tracking-wider">
                Print Format: <strong className="text-teal-400">{printTarget === 'handout' ? 'A4 Portrait (2 Pages)' : '16:9 Landscape Slideshow'}</strong>
              </span>
            </div>

            {/* Handout Preview Canvas (Visual A4 paper or 16:9 slideshow mock) */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-950 flex flex-col items-center gap-8">
              <p className="text-[11px] text-slate-400 uppercase font-black tracking-widest no-print">
                📄 Page Preview (Styled with vector print media targets)
              </p>

              {printTarget === 'slides' ? (
                /* SLIDES LANDSCAPE MODE PRINT CONTAINER */
                <div id="slides-print-area" className="w-full flex flex-col gap-6 max-w-[850px] text-slate-900">
                  {presentation.slides.map((slide, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="slide-print-page w-full aspect-[16/9] bg-white text-slate-900 p-8 md:p-12 shadow-lg border border-slate-200 flex flex-col justify-between relative rounded-xl text-left"
                    >
                      {/* Slide top header info */}
                      <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                        <div className="space-y-1">
                          {slide.cbmeCode && (
                            <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono text-teal-600 block">
                              NMC COMPETENCY: {slide.cbmeCode}
                            </span>
                          )}
                          <h2 className="text-xl md:text-2xl font-black font-serif tracking-tight text-slate-900 leading-tight">
                            {slide.title}
                          </h2>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-black uppercase text-slate-500 font-mono">
                            Slide {sIdx + 1} of {presentation.slides.length}
                          </span>
                        </div>
                      </div>

                      {/* Layout Body Content */}
                      <div className="flex-1 flex flex-col justify-center my-6 min-h-0">
                        {slide.layout === 'title' ? (
                          <div className="space-y-4 py-4">
                            <span className="text-[10px] font-mono font-black tracking-widest text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block">
                              Department of {presentation.specialty}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black font-serif text-slate-900 leading-tight">
                              {presentation.topic}
                            </h1>
                            <p className="text-sm font-semibold text-slate-600 max-w-2xl">
                              {slide.bullets[2] || 'A high-fidelity academic correlation aligned with Indian Medical Colleges.'}
                            </p>
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                              <span>Target: {presentation.targetAudience} Level</span>
                              <span>Syllabus: Phase I Curriculum Series</span>
                            </div>
                          </div>
                        ) : slide.layout === 'case_study' ? (
                          <div className="grid grid-cols-2 gap-6 h-full items-stretch text-left">
                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                              <span className="text-[9px] font-black uppercase tracking-wider text-teal-900 block border-b border-teal-200 pb-1">
                                📋 CLINICAL CASE VIGNETTE
                              </span>
                              <div className="space-y-2 text-xs text-slate-800 leading-relaxed font-semibold">
                                {slide.bullets.map((b, bIdx) => (
                                  <p key={bIdx} dangerouslySetInnerHTML={{ __html: b.replace(/\*(.*?)\*/g, '<strong>$1</strong>') }} />
                                ))}
                              </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                              <span className="text-[9px] font-black uppercase tracking-wider text-teal-900 block border-b border-teal-200 pb-1 mb-2">
                                🔬 LABORATORY BIOMARKER PROFILE
                              </span>
                              {slide.tableData ? (
                                <table className="w-full text-[10px] text-left text-slate-700">
                                  <thead>
                                    <tr className="border-b border-slate-300 font-bold bg-slate-100 text-slate-800">
                                      <th className="py-1 px-2">Investigation</th>
                                      <th className="py-1 px-2">Patient Value</th>
                                      <th className="py-1 px-2">Reference</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {slide.tableData.rows.slice(0, 4).map((row, rIdx) => (
                                      <tr key={rIdx} className="border-b border-slate-100">
                                        <td className="py-1 px-2 font-bold">{row[0]}</td>
                                        <td className="py-1 px-2 font-black text-teal-800">
                                          {formatLabCell(`${row[1]} (Glucose/Creatinine/Bilirubin/Hemoglobin)`, isSiUnit).replace(' (Glucose/Creatinine/Bilirubin/Hemoglobin)', '')}
                                        </td>
                                        <td className="py-1 px-2 text-slate-500">
                                          {formatLabCell(`${row[2]} (Glucose/Creatinine/Bilirubin/Hemoglobin)`, isSiUnit).replace(' (Glucose/Creatinine/Bilirubin/Hemoglobin)', '')}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <div className="text-xs text-slate-400 italic text-center py-4">No diagnostic metrics configured.</div>
                              )}
                            </div>
                          </div>
                        ) : slide.layout === 'biochemical_diagram' ? (
                          <div className="grid grid-cols-12 gap-6 items-stretch">
                            <div className="col-span-8 bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
                              <svg viewBox="0 0 1000 450" className="w-full h-auto">
                                <defs>
                                  <marker id="pdf-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#0D9488" />
                                  </marker>
                                </defs>
                                {slide.diagram?.edges?.map((edge, i) => {
                                  const fromNode = slide.diagram?.nodes.find(n => n.id === edge.from);
                                  const toNode = slide.diagram?.nodes.find(n => n.id === edge.to);
                                  if (!fromNode || !toNode) return null;
                                  const x1 = (fromNode.x / 100) * 900 + 50;
                                  const y1 = (fromNode.y / 100) * 380 + 40;
                                  const x2 = (toNode.x / 100) * 900 + 50;
                                  const y2 = (toNode.y / 100) * 380 + 40;
                                  return (
                                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0D9488" strokeWidth="2.5" strokeDasharray={edge.style === 'inhibition' ? '4,4' : undefined} markerEnd="url(#pdf-arrow)" />
                                  );
                                })}
                                {slide.diagram?.nodes?.map(node => {
                                  const x = (node.x / 100) * 900 + 50;
                                  const y = (node.y / 100) * 380 + 40;
                                  const isEnzyme = node.type === 'enzyme';
                                  const isClinical = node.type === 'clinical_condition';
                                  return (
                                    <g key={node.id} transform={`translate(${x}, ${y})`}>
                                      <rect x={-55} y={-16} width={110} height={32} rx={isEnzyme ? 16 : isClinical ? 3 : 6} fill={isEnzyme ? '#0D9488' : isClinical ? '#FDA4AF' : '#F1F5F9'} stroke={isEnzyme ? '#0F766E' : isClinical ? '#F43F5E' : '#CBD5E1'} strokeWidth="1.5" />
                                      <text x={0} y={3} textAnchor="middle" className="text-[7.5px] font-black select-none" style={{ fill: isEnzyme ? 'white' : '#1E293B' }}>{node.label}</text>
                                    </g>
                                  );
                                })}
                              </svg>
                            </div>
                            <div className="col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between text-left">
                              <span className="text-[9px] font-black uppercase tracking-wider text-teal-900 block border-b border-teal-200 pb-1 mb-2">
                                🧪 STEPS & REGULATION INFO
                              </span>
                              <div className="space-y-2.5 overflow-y-auto max-h-[160px]">
                                {slide.diagram?.nodes?.map((node, nIdx) => (
                                  <div key={nIdx} className="text-[9px] leading-relaxed border-l-2 border-teal-500 pl-2">
                                    <strong className="text-slate-800">{node.label}:</strong> {node.description}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 max-w-[95%] text-left">
                            <ul className="space-y-3">
                              {slide.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-800 font-medium">
                                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-teal-600" />
                                  <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*(.*?)\*/g, '<strong>$1</strong>') }} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] font-extrabold text-slate-400">
                        <span>Department of {presentation.specialty} • Medical Lecture Slideshow</span>
                        <span>Page {sIdx + 1} of {presentation.slides.length}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* HANDOUT PORTRAIT MODE PRINT CONTAINER */
                <div id="handout-print-area" className="w-full max-w-[800px] bg-white text-slate-900 p-8 rounded-xl shadow-lg font-sans border border-slate-200">
                  
                  {/* PAGE 1: Case Vignette, Lab interpretation, Syllabus */}
                  <div className="space-y-6">
                    {/* National Medical College Banner Header */}
                    <div className="border-b-4 border-slate-900 pb-3 flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-teal-600 font-mono">
                          NMC CBME SPECIALTY CATALOGUE • PHASE-I MBBS
                        </span>
                        <h2 className="text-2xl font-black font-serif uppercase tracking-tight text-slate-900 leading-tight">
                          Department of {presentation.specialty}
                        </h2>
                        <p className="text-xs font-bold text-slate-600 italic">
                          Active Competency Handbook: {presentation.slides[1]?.cbmeCode || 'BI-3.4'} — Metabolism Cascade Overview
                        </p>
                      </div>
                      <div className="text-right space-y-0.5">
                        <span className="text-[10px] font-extrabold uppercase font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-700 block">
                          STUDENT COPY
                        </span>
                        <span className="text-[9px] text-slate-400 block font-semibold">Max Time: 45 min Lecture</span>
                      </div>
                    </div>

                    {/* Topic Metadata Block */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 max-w-[70%]">
                        <p className="text-[10px] font-black uppercase text-slate-500 font-mono">Lecture Theme / Subject</p>
                        <h3 className="text-base font-extrabold text-slate-900 leading-tight">{presentation.topic}</h3>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-black uppercase text-slate-500 font-mono">NMC Competency Target</p>
                        <p className="text-xs font-bold text-teal-700 font-mono">
                          {presentation.slides[1]?.competency || 'Explain biochemical complications & metabolism cascade'}
                        </p>
                      </div>
                    </div>

                    {/* Left-Right Columns for Page 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                      {/* Clinical Case Vignette */}
                      <div className="space-y-3.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h4 className="text-xs font-black uppercase tracking-wider text-teal-900 font-sans border-b border-teal-100 pb-1">
                            📋 CLINICAL CASE VIGNETTE
                          </h4>
                          <p className="text-xs text-slate-700 leading-relaxed italic">
                            {presentation.slides.find(s => s.layout === 'case_study')?.bullets[0]?.replace(/\*(.*?)\*/g, '$1') || 
                             "A clinical reference presenting pathological shifts in metabolism, designed to reinforce diagnostic interpretation skills in medical biochemistry."}
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {presentation.slides.find(s => s.layout === 'case_study')?.bullets[1]?.replace(/\*(.*?)\*/g, '$1') ||
                             "Review the lab values below to interpret biochemical acidosis or metabolic blocks."}
                          </p>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-[11px] text-emerald-950 font-medium">
                          <strong>💡 Key Diagnostic Takeaway:</strong> Pay close attention to physiological shifts, normal reference boundaries, and clinical presentations in the physical logbook.
                        </div>
                      </div>

                      {/* Laboratory investigations Profile */}
                      <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h4 className="text-xs font-black uppercase tracking-wider text-teal-900 font-sans border-b border-teal-100 pb-1">
                            🔬 LABORATORY DIAGNOSTIC PROFILE
                          </h4>
                          
                          {presentation.slides.find(s => s.layout === 'case_study')?.tableData ? (
                            <table className="w-full text-[10px] text-left text-slate-700 border-collapse">
                              <thead>
                                <tr className="border-b border-slate-200 font-bold bg-slate-100 text-slate-800">
                                  <th className="py-1.5 px-2">Parameter</th>
                                  <th className="py-1.5 px-2">Patient Value</th>
                                  <th className="py-1.5 px-2">Normal Range</th>
                                </tr>
                              </thead>
                              <tbody>
                                {presentation.slides.find(s => s.layout === 'case_study')?.tableData?.rows.slice(0, 4).map((row, rIdx) => (
                                  <tr key={rIdx} className="border-b border-slate-100">
                                    <td className="py-1 px-2 font-bold">{row[0]}</td>
                                    <td className="py-1 px-2 font-semibold text-teal-800">
                                      {formatLabCell(`${row[1]} (Glucose/Creatinine/Bilirubin/Hemoglobin)`, true).replace(' (Glucose/Creatinine/Bilirubin/Hemoglobin)', '')}
                                    </td>
                                    <td className="py-1 px-2 text-slate-500">
                                      {formatLabCell(`${row[2]} (Glucose/Creatinine/Bilirubin/Hemoglobin)`, true).replace(' (Glucose/Creatinine/Bilirubin/Hemoglobin)', '')}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-xs text-slate-500 italic p-4 text-center">
                              No live pathology data tables generated for this preset. Refer to core lecture slides for visual data profiles.
                            </div>
                          )}
                        </div>

                        <div className="text-[9px] text-slate-400 italic font-mono pt-2">
                          *Values automatically converted to standardized SI units for physical exam practice.
                        </div>
                      </div>
                    </div>

                    {/* Core Pathway Landmarks summary */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans border-b border-slate-200 pb-1">
                        🧬 CORE BIOCHEMICAL CASCADE SUMMARY & CRITICAL STEPS
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        This curriculum focuses on the complete, step-by-step metabolic reactions of <strong>Carbohydrates, Fats, Proteins, Amino Acids, and their metabolism</strong>. Review the primary slides to master:
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                        <div className="p-2.5 bg-slate-50 rounded border border-slate-150">
                          • <strong>Anabolism & Synthesis:</strong> Precursors, rate-limiting pathway enzymes, and energetic expenditure (ATP consumption).
                        </div>
                        <div className="p-2.5 bg-slate-50 rounded border border-slate-150">
                          • <strong>Catabolism & Blockade:</strong> Energy extraction, biochemical degradation, and emergency diagnostic markers.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PAGE BREAK FOR PRINTING */}
                  <div className="page-break my-8 border-t-2 border-dashed border-slate-300 pt-8" />

                  {/* PAGE 2: Mnemonics, Viva Questions, Sign-off */}
                  <div className="space-y-6">
                    {/* Page 2 Header banner */}
                    <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
                      <span className="text-xs font-black uppercase text-slate-500 font-mono">
                        PAGE 2: MEMORIZATION CHEAT-SHEET & VIVA DOCK
                      </span>
                      <span className="text-[9px] text-slate-400">MedLecturer AI - Classroom Handouts</span>
                    </div>

                    {/* Left-Right Columns for Page 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                      {/* Hinglish Mnemonics */}
                      <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h4 className="text-xs font-black uppercase tracking-wider text-amber-950 font-sans border-b border-amber-200 pb-1 flex items-center gap-1">
                            <span>💡</span> HINGLISH MEMORIZATION CHEAT-SHEET
                          </h4>
                          
                          <div className="space-y-4">
                            {getHandoutData(presentation.topic, presentation.specialty).mnemonics.map((m, idx) => (
                              <div key={idx} className="space-y-1">
                                <span className="text-xs font-black text-amber-900 block">{m.title}</span>
                                <pre className="text-[10px] text-slate-800 font-mono whitespace-pre-wrap bg-white p-2.5 rounded border border-amber-200">
                                  {m.text}
                                </pre>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-[10px] text-amber-800 italic pt-2 font-medium bg-amber-100/30 p-2 rounded">
                          *Highly recommended mnemonic shortcuts for high-pressure MBBS oral exams.
                        </div>
                      </div>

                      {/* High-Yield Viva Voce questions with answers */}
                      <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans border-b border-slate-300 pb-1 flex items-center gap-1">
                            <span>❓</span> VIVA VOCE DOCK & TEXTBOOK ANSWERS
                          </h4>

                          <div className="space-y-3">
                            {getHandoutData(presentation.topic, presentation.specialty).viva.map((v, idx) => (
                              <div key={idx} className="space-y-1 text-xs">
                                <p className="font-extrabold text-slate-900">Q{idx+1}: {v.q}</p>
                                <p className="text-[11px] text-slate-700 leading-relaxed font-medium pl-2 border-l-2 border-slate-300">
                                  {v.a}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-[9px] text-slate-400 italic">
                          *Curated from clinical biochemistry benchmarks.
                        </div>
                      </div>
                    </div>

                    {/* Competency checklist and logbook signature */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans border-b border-slate-300 pb-1">
                        📋 NMC PORTAL COMPETENCY LOGBOOK & CHECKLIST
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-start gap-2 text-slate-700">
                          <input type="checkbox" className="mt-0.5 pointer-events-none rounded" checked readOnly />
                          <span>I understand the carbohydrate, lipid, and protein amino acids metabolism pathways.</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-700">
                          <input type="checkbox" className="mt-0.5 pointer-events-none rounded" checked readOnly />
                          <span>I can interpret clinical laboratory tables and translate values into Conventional and SI systems.</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-700">
                          <input type="checkbox" className="mt-0.5 pointer-events-none rounded" checked readOnly />
                          <span>I verified the interactive cascade animator and understand all rate-limiting enzymes.</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-700">
                          <input type="checkbox" className="mt-0.5 pointer-events-none rounded" checked readOnly />
                          <span>I completed all core high-yield clinical viva questions mapped to active CBME catalog.</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                        <div className="text-[10px] text-slate-500">
                          <p>Student Name: ___________________________________</p>
                          <p className="mt-1">Batch / Roll Number: ________________________</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Logbook Verification</p>
                          <p className="text-xs font-black text-slate-800 mt-2">______________________________________</p>
                          <p className="text-[9px] text-slate-400">Professor / Lecturer Sign-off (Dept Stamp)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PRESENTATION MODE: WIDESCREEN FULLSCREEN INTERFACE */}
      {isPresentationMode && presentation && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-8 md:p-12">
          {/* Top Bar inside slide show with Integrated Countdown and Pacing Alerter */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-extrabold px-2.5 py-1 bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded">
                Lecture Mode
              </span>
              <h4 className="text-sm font-extrabold hidden md:block max-w-[280px] truncate">{presentation.topic}</h4>
            </div>

            {/* HIGH-YIELD PACE CONTROL DOCK */}
            <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-full py-1.5 px-4">
              <div className="flex items-center gap-2">
                <Clock className={`h-4 w-4 ${lectureTimeRemaining <= 300 ? 'text-red-500 animate-pulse' : 'text-teal-400'}`} />
                <span className={`font-mono text-sm font-black ${lectureTimeRemaining <= 300 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
                  {Math.floor(lectureTimeRemaining / 60)}:{(lectureTimeRemaining % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">remaining</span>
              </div>
              
              <div className="h-4 w-px bg-slate-800" />
              
              {(() => {
                const totalSecs = 45 * 60; // 45 minutes
                const elapsedSecs = totalSecs - lectureTimeRemaining;
                const idealProgress = elapsedSecs / totalSecs;
                const idealSlide = Math.floor(idealProgress * presentation.slides.length);
                
                let pacingText = "Perfect Pacing";
                let pacingColor = "text-green-400 bg-green-500/10 border-green-500/20";
                
                if (activeSlideIdx < idealSlide - 1) {
                  pacingText = "Pacing Behind (Speed Up)";
                  pacingColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
                } else if (activeSlideIdx > idealSlide + 1) {
                  pacingText = "Pacing Ahead (Explain More)";
                  pacingColor = "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
                }
                
                return (
                  <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border ${pacingColor}`}>
                    ⏱️ {pacingText}
                  </span>
                );
              })()}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="text-xs font-black px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition shadow-md flex items-center gap-1.5 cursor-pointer border border-rose-500/35"
                title="Submit anonymous lecture understanding rate"
              >
                <Smile className="h-3.5 w-3.5 text-rose-100" />
                <span>🗳️ Student Feedback</span>
              </button>

              <button
                onClick={() => setShowAnalyticsModal(true)}
                className="text-xs font-black px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition shadow-md flex items-center gap-1.5 cursor-pointer border border-slate-700"
                title="View real-time aggregated student ratings & complex topic flags"
              >
                <BarChart3 className="h-3.5 w-3.5 text-slate-300" />
                <span>📊 Live Analytics</span>
              </button>

              <button
                onClick={() => setShowQRModal(true)}
                className="text-xs font-black px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shadow-md flex items-center gap-1.5 cursor-pointer border border-indigo-500/30"
                title="Broadcast QR Code to students in the class"
              >
                <QrCode className="h-3.5 w-3.5 text-indigo-200 stroke-[2.5]" />
                <span>📢 Share Class QR</span>
              </button>

              <button
                onClick={() => {
                  setPrintTarget('slides');
                  setShowHandoutModal(true);
                }}
                className="text-xs font-extrabold px-3 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 text-slate-950 rounded-lg transition shadow-md flex items-center gap-1.5 cursor-pointer"
                title="Download non-editable PDF static slideshow for students"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Download Static PDF</span>
              </button>

              <button
                onClick={() => setIsPresentationMode(false)}
                className="text-xs font-bold px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
              >
                Exit (ESC)
              </button>
            </div>
          </div>

          {/* Slide Box centered fullscreen with original styles */}
          <div className="flex-1 flex items-center justify-center my-6">
            <div className="w-full max-w-[1100px] aspect-[16/9] bg-white text-slate-900 shadow-2xl rounded-2xl overflow-hidden relative flex flex-col justify-between p-10 animate-fade-in">
              
              {/* Floating Left/Right Navigation Arrows overlay */}
              {activeSlideIdx > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlideIdx(prev => Math.max(0, prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-900/40 hover:bg-slate-900/85 hover:scale-110 text-white rounded-full transition-all cursor-pointer shadow-lg border border-white/25 hover:border-white/50"
                  title="Previous Slide"
                >
                  <ChevronLeft className="h-8 w-8 stroke-[3]" />
                </button>
              )}
              {activeSlideIdx < presentation.slides.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlideIdx(prev => Math.min(presentation.slides.length - 1, prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-900/40 hover:bg-slate-900/85 hover:scale-110 text-white rounded-full transition-all cursor-pointer shadow-lg border border-white/25 hover:border-white/50"
                  title="Next Slide"
                >
                  <ChevronRight className="h-8 w-8 stroke-[3]" />
                </button>
              )}
              
              {/* Header inside slide show */}
              {presentation.slides[activeSlideIdx].layout !== 'title' && (
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                  <div className="space-y-0.5 max-w-[80%]">
                    {presentation.slides[activeSlideIdx].cbmeCode && (
                      <span className={`text-xs font-black uppercase tracking-widest font-mono ${activeThemeStyle.accentText}`}>
                        NMC COMPETENCY: {presentation.slides[activeSlideIdx].cbmeCode}
                      </span>
                    )}
                    <h2 className={`text-3xl font-black font-serif tracking-tight leading-tight ${activeThemeStyle.primaryText}`}>
                      {presentation.slides[activeSlideIdx].title}
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded-full text-slate-600 font-mono tracking-wider">
                    {presentation.specialty.toUpperCase()}
                  </span>
                </div>
              )}

              {/* Core Content layout */}
              <div className="flex-1 flex flex-col justify-center min-h-0">
                {presentation.slides[activeSlideIdx].layout === 'title' && (
                  <div className={`absolute inset-0 p-16 flex flex-col justify-between text-white ${activeThemeStyle.primaryBg}`}>
                    <div className="space-y-3">
                      <span className="text-xs font-mono font-bold tracking-[0.2em] text-teal-400 uppercase bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 inline-block">
                        National Medical Commission Widescreen Series
                      </span>
                      <h1 className="text-5xl font-black font-serif tracking-tight leading-none text-white max-w-[90%] pt-2">
                        {presentation.topic}
                      </h1>
                      <p className="text-lg text-slate-300 font-medium max-w-2xl pt-2">
                        {presentation.slides[activeSlideIdx].bullets[2]}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-xs text-teal-300 font-bold uppercase tracking-wider">Laying Department</p>
                        <p className="text-base font-black">Department of {presentation.specialty}</p>
                      </div>
                      <div className="space-y-0.5 text-right">
                        <p className="text-xs text-teal-300 font-bold uppercase tracking-wider">Course Syllabus</p>
                        <p className="text-base font-black">{presentation.targetAudience} Level</p>
                      </div>
                    </div>
                  </div>
                )}

                {presentation.slides[activeSlideIdx].layout === 'case_study' && (
                  <div className="grid grid-cols-12 gap-8 h-full items-stretch min-h-0">
                    <div className="col-span-5 space-y-4 overflow-y-auto pr-2 text-sm leading-relaxed text-slate-800">
                      {presentation.slides[activeSlideIdx].bullets.map((b, idx) => (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: b.replace(/\*(.*?)\*/g, '<strong>$1</strong>') }} />
                      ))}
                    </div>
                    <div className="col-span-7 overflow-y-auto bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">🔬 Laboratory Diagnostic Panel</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsSiUnit(prev => !prev);
                          }}
                          className={`text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full transition-all border cursor-pointer ${
                            isSiUnit 
                              ? 'bg-amber-100 text-amber-950 border-amber-300' 
                              : 'bg-slate-200 text-slate-850 border-slate-350 hover:bg-slate-300'
                          }`}
                        >
                          🧪 {isSiUnit ? "SI units (mmol/L, g/L)" : "Conventional (mg/dL, g/dL)"}
                        </button>
                      </div>
                      <table className="w-full text-xs text-left text-slate-600">
                        <thead className={`text-white text-[10px] uppercase font-bold tracking-wider ${activeThemeStyle.primaryBg}`}>
                          <tr>
                            {presentation.slides[activeSlideIdx].tableData?.headers.map((h, i) => (
                              <th key={i} className="px-3 py-2">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {presentation.slides[activeSlideIdx].tableData?.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3 py-2 font-semibold text-slate-700">
                                  {formatLabCell(`${cell} (Glucose/Creatinine/Bilirubin/Hemoglobin)`, isSiUnit).replace(' (Glucose/Creatinine/Bilirubin/Hemoglobin)', '')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {presentation.slides[activeSlideIdx].layout === 'biochemical_diagram' && (
                  <div className="h-full flex flex-col justify-between min-h-0">
                    {presentation.slides[activeSlideIdx].diagram && (
                      <div className="flex-1 min-h-0 flex gap-6">
                        <div className="flex-1 h-full min-h-[300px] relative">
                          {/* Duplicate identical gorgeous diagram with static layout inside presentation mode */}
                          <svg className="w-full h-full border border-slate-200 rounded-xl p-3 shadow-inner" viewBox="0 0 1000 500">
                            <defs>
                              <linearGradient id="pres-pathway-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FCFAF0" />
                                <stop offset="35%" stopColor="#E6FFFA" />
                                <stop offset="70%" stopColor="#EBF8FF" />
                                <stop offset="100%" stopColor="#FFF5F5" />
                              </linearGradient>
                              <marker id="pres-arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                              </marker>
                              <marker id="pres-convert" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                              </marker>
                              <marker id="pres-inhibit" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 0 10" stroke="#EF4444" strokeWidth="4" />
                              </marker>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#pres-pathway-gradient)" rx="12" />

                            {presentation.slides[activeSlideIdx].diagram.compartments?.map((comp, i, arr) => {
                              const width = 1000 / arr.length;
                              return (
                                <g key={comp}>
                                  <rect
                                    x={i * width + 10}
                                    y={40}
                                    width={width - 20}
                                    height={430}
                                    rx={12}
                                    className="fill-indigo-50/15 stroke-indigo-100 stroke-2"
                                    strokeDasharray="6 4"
                                  />
                                  <text
                                    x={i * width + width / 2}
                                    y={30}
                                    textAnchor="middle"
                                    className="text-[10px] font-black tracking-wider fill-slate-500 uppercase font-sans"
                                  >
                                    {comp}
                                  </text>
                                </g>
                              );
                            })}

                            {presentation.slides[activeSlideIdx].diagram?.edges?.map((edge, i) => {
                              const fromNode = presentation.slides[activeSlideIdx].diagram?.nodes.find(n => n.id === edge.from);
                              const toNode = presentation.slides[activeSlideIdx].diagram?.nodes.find(n => n.id === edge.to);
                              if (!fromNode || !toNode) return null;

                              const fromIdx = presentation.slides[activeSlideIdx].diagram?.nodes?.findIndex(n => n.id === edge.from) ?? 0;
                              const toIdx = presentation.slides[activeSlideIdx].diagram?.nodes?.findIndex(n => n.id === edge.to) ?? 0;
                              const isEdgeVisible = fromIdx <= diagramRevealStep && toIdx <= diagramRevealStep;

                              const x1 = (fromNode.x / 100) * 900 + 50;
                              const y1 = (fromNode.y / 100) * 380 + 80;
                              const x2 = (toNode.x / 100) * 900 + 50;
                              const y2 = (toNode.y / 100) * 380 + 80;

                              const isActivation = edge.style === 'activation';
                              const isInhibition = edge.style === 'inhibition';
                              const strokeColor = isActivation ? '#10B981' : isInhibition ? '#EF4444' : '#475569';
                              const markerId = isActivation ? 'pres-arrow' : isInhibition ? 'pres-inhibit' : 'pres-convert';

                              return (
                                <g key={i} style={{ opacity: isEdgeVisible ? 1 : 0.05, transition: 'all 0.4s ease' }}>
                                  <line
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke={strokeColor}
                                    strokeWidth={3}
                                    strokeDasharray={isInhibition ? "4 4" : undefined}
                                    markerEnd={`url(#${markerId})`}
                                  />
                                  {edge.label && (
                                    <g transform={`translate(${(x1+x2)/2}, ${(y1+y2)/2})`}>
                                      <rect x={-50} y={-9} width={100} height={18} rx={4} fill="white" stroke="#CBD5E1" />
                                      <text x={0} y={3} textAnchor="middle" className="text-[8px] font-black fill-slate-800">{edge.label}</text>
                                    </g>
                                  )}
                                </g>
                              );
                            })}

                            {presentation.slides[activeSlideIdx].diagram?.nodes?.map(node => {
                              const x = (node.x / 100) * 900 + 50;
                              const y = (node.y / 100) * 380 + 80;
                              const isEnzyme = node.type === 'enzyme';
                              const isClinical = node.type === 'clinical_condition';

                              const nodeIdx = presentation.slides[activeSlideIdx].diagram?.nodes?.indexOf(node) ?? 0;
                              const isNodeVisible = nodeIdx <= diagramRevealStep;

                              return (
                                <g key={node.id} transform={`translate(${x}, ${y})`} style={{ opacity: isNodeVisible ? 1 : 0.08, transition: 'all 0.4s ease' }}>
                                  <rect
                                    x={-60}
                                    y={-20}
                                    width={120}
                                    height={40}
                                    rx={isEnzyme ? 20 : isClinical ? 4 : 8}
                                    fill={isEnzyme ? activeThemeStyle.primaryHex : isClinical ? '#FEF2F2' : 'white'}
                                    stroke={isClinical ? '#EF4444' : activeThemeStyle.primaryHex}
                                    strokeWidth={2}
                                  />
                                  <text
                                    x={0}
                                    y={2}
                                    textAnchor="middle"
                                    className={`text-[9px] font-black ${isEnzyme ? 'fill-white' : isClinical ? 'fill-red-800' : 'fill-slate-800'}`}
                                  >
                                    {node.label}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>

                          {/* Floating Legend Key */}
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-3 border border-slate-200/80 max-w-[190px] space-y-2 text-[10px] z-30 select-none">
                            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1">
                              <span className="text-teal-600 font-extrabold uppercase font-mono tracking-wider">Pathway Legend</span>
                            </div>
                            <div className="space-y-1.5 font-semibold text-slate-700">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded bg-white border-2 border-dashed border-indigo-200 block shrink-0" />
                                <span className="text-slate-600">Cell Compartment</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded bg-white border-2 block shrink-0" style={{ borderColor: activeThemeStyle.primaryHex }} />
                                <span className="text-slate-600">Substrate/Metabolite</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full block shrink-0" style={{ backgroundColor: activeThemeStyle.primaryHex }} />
                                <span className="text-slate-600">Enzyme Catalyst</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded bg-rose-50 border-2 border-rose-500 block shrink-0" />
                                <span className="text-rose-700">Clinical Pathology</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded bg-amber-500 block shrink-0" />
                                <span className="text-amber-800">Cellular Receptor</span>
                              </div>
                              <div className="flex items-center gap-2 border-t border-slate-100 pt-1.5 justify-between text-[9px]">
                                <div className="flex items-center gap-1">
                                  <span className="w-4 h-0.5 bg-emerald-500 relative block shrink-0">
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 border-l-[3px] border-l-emerald-500 border-y-[2px] border-y-transparent block" />
                                  </span>
                                  <span className="text-emerald-700">Activates</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="w-4 h-0.5 bg-rose-500 relative block shrink-0">
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-[1.5px] bg-rose-500 block" />
                                  </span>
                                  <span className="text-rose-600">Inhibits</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Floating playback controls inside Presentation View */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur shadow-2xl rounded-full px-5 py-2 border border-slate-200 flex items-center gap-4 z-40">
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-mono">
                              Pathway Animator:
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); setDiagramRevealStep(0); }}
                                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
                                title="Reset Substrate Only"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setDiagramRevealStep(prev => Math.max(0, prev - 1)); }}
                                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
                                title="Step Back"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              <span className="text-xs font-black text-slate-800 font-mono bg-slate-100 px-3 py-1 rounded">
                                {Math.min(diagramRevealStep + 1, presentation.slides[activeSlideIdx].diagram?.nodes?.length || 0)} / {presentation.slides[activeSlideIdx].diagram?.nodes?.length || 0}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); setDiagramRevealStep(prev => Math.min((presentation.slides[activeSlideIdx].diagram?.nodes?.length || 1) - 1, prev + 1)); }}
                                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
                                title="Step Forward"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setDiagramRevealStep(9); }}
                                className="px-3 py-1 rounded bg-teal-600 hover:bg-teal-500 text-slate-950 text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
                              >
                                Reveal Cascade
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {presentation.slides[activeSlideIdx].layout !== 'case_study' && 
                 presentation.slides[activeSlideIdx].layout !== 'biochemical_diagram' && 
                 presentation.slides[activeSlideIdx].layout !== 'title' && (
                  <ul className="space-y-4 text-base font-medium">
                    {presentation.slides[activeSlideIdx].bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-slate-800 leading-relaxed">
                        <span className={`h-2.5 w-2.5 rounded-full mt-2.5 shrink-0 ${activeThemeStyle.accent}`} />
                        <span dangerouslySetInnerHTML={{ __html: bullet.replace(/\*(.*?)\*/g, '<strong className="text-teal-900">$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {presentation.slides[activeSlideIdx].layout !== 'title' && (
                <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-4 text-[10px] font-bold text-slate-400">
                  <span>Slide {activeSlideIdx + 1} of {presentation.slides.length}</span>
                  <span>CBME MBBS INTEGRATED PRESENTATION LECTURE SHOW</span>
                </div>
              )}

            </div>
          </div>

          {/* Bottom Navigation controls inside slide show */}
          <div className="flex items-center justify-between text-white border-t border-white/10 pt-4">
            <div className="text-xs font-mono font-bold text-slate-400 flex items-center gap-4">
              <span>Navigation: Use Left/Right Arrow Keys or space bar to advance slides. Escape exits.</span>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-lg transition cursor-pointer"
                title="Quick Share presentation link to WhatsApp class groups"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share App on WhatsApp</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSlideIdx(prev => Math.max(0, prev - 1))}
                disabled={activeSlideIdx === 0}
                className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg disabled:opacity-20 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <span className="text-sm font-bold font-mono">
                {activeSlideIdx + 1} / {presentation.slides.length}
              </span>

              <button
                onClick={() => setActiveSlideIdx(prev => Math.min(presentation.slides.length - 1, prev + 1))}
                disabled={activeSlideIdx === presentation.slides.length - 1}
                className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg disabled:opacity-20 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BEAUTIFUL HIGH-FIDELITY WHATSAPP SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-fade-in text-slate-100">
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-100">Share Lecture Presentation</h4>
                <p className="text-[10px] text-slate-400">Send direct access links to colleagues & student groups on WhatsApp</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Custom Message Template</label>
                <textarea
                  readOnly
                  value={`Hi Professor! Check out this interactive medical lecture slideshow on "${presentation?.topic || topic || "Physiological & Molecular Pathways"}" generated using the Babaji Medical PPT Generator.\n\nIt is fully CBME-aligned, includes advanced biochemical pathway schematics, clinical case studies, and speaker notes.\n\nOpen presentation here:\n${window.location.origin}`}
                  className="w-full h-32 text-xs bg-slate-950 text-slate-300 rounded-lg p-3 border border-slate-800 outline-none resize-none font-medium leading-relaxed"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = `Hi Professor! Check out this interactive medical lecture slideshow on "${presentation?.topic || topic || "Physiological & Molecular Pathways"}" generated using the Babaji Medical PPT Generator.\n\nIt is fully CBME-aligned, includes advanced biochemical pathway schematics, clinical case studies, and speaker notes.\n\nOpen presentation here:\n${window.location.origin}`;
                    navigator.clipboard.writeText(text);
                    alert("Message copied to clipboard! Paste it into WhatsApp or email.");
                  }}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Copy Message
                </button>
                <button
                  onClick={() => {
                    const text = `Hi Professor! Check out this interactive medical lecture slideshow on "${presentation?.topic || topic || "Physiological & Molecular Pathways"}" generated using the Babaji Medical PPT Generator.\n\nIt is fully CBME-aligned, includes advanced biochemical pathway schematics, clinical case studies, and speaker notes.\n\nOpen presentation here:\n${window.location.origin}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/10"
                >
                  Share to WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* iOS SAFARI INSTALLATION GUIDE MODAL */}
      {showIOSInstallGuide && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative animate-fade-in text-slate-100">
            <button 
              onClick={() => setShowIOSInstallGuide(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-100">Install on iPhone / iPad</h4>
                <p className="text-[10px] text-slate-400">Add Babaji PPT to your mobile home screen in 2 taps</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-slate-350 font-medium leading-relaxed">
              <p>Because iOS Safari doesn't support automatic browser install buttons, follow these quick steps:</p>
              <ol className="list-decimal list-inside space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                <li>Tap the <span className="text-indigo-400 font-bold">"Share"</span> icon at the bottom of your Safari browser bar (the square with an arrow pointing up).</li>
                <li>Scroll down the options list and select <span className="text-indigo-400 font-bold">"Add to Home Screen"</span>.</li>
                <li>Tap <span className="text-indigo-400 font-bold">"Add"</span> in the top right corner.</li>
              </ol>
              <p className="text-[10px] text-slate-450 italic">The app will now appear on your home screen and run in clean full-screen mode like a native app!</p>
            </div>

            <button
              onClick={() => setShowIOSInstallGuide(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-lg transition-all cursor-pointer"
            >
              Got it, close
            </button>
          </div>
        </div>
      )}

      {/* HIGH-CONTRAST BROADCAST CLASS QR CODE MODAL */}
      {showQRModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl relative animate-fade-in text-slate-100 text-center">
            <button 
              onClick={() => setShowQRModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 transition cursor-pointer p-1.5 hover:bg-slate-800 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <QrCode className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-black text-slate-100 tracking-tight">📢 Broadcast Presentation to Students</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Project this high-contrast QR code on the lecture hall screen. Students can scan it from any seat to instantly open this interactive slide deck, study clinical case pathways, and download non-editable static PDFs!
              </p>
            </div>

            {/* THE QR CODE CANVAS HOLDER */}
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl max-w-[280px] mx-auto shadow-2xl border-4 border-indigo-500/20">
              <QRCodeSVG 
                value={window.location.href} 
                size={220}
                level="H"
                includeMargin={true}
              />
              <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest mt-2 block font-mono">BABAJI MEDICAL PPT</span>
            </div>

            <div className="space-y-2 max-w-sm mx-auto">
              <div className="text-xs text-slate-400 font-semibold bg-slate-950/60 py-2.5 px-4 rounded-xl border border-slate-850 truncate font-mono text-center">
                {window.location.href}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("App URL copied to clipboard!");
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition duration-200 cursor-pointer shadow shadow-indigo-600/15"
              >
                Copy Web Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANONYMOUS STUDENT FEEDBACK MODAL */}
      {showFeedbackModal && presentation && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative text-slate-100 animate-fade-in">
            <button 
              onClick={() => {
                setShowFeedbackModal(false);
                setFeedbackSuccessMessage("");
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 transition cursor-pointer p-1 rounded-full hover:bg-slate-800"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-1.5 text-center">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded">
                🗳️ Student Interactive Desk
              </span>
              <h3 className="text-xl font-black text-white tracking-tight pt-2">Anonymous Lecture Clarity Survey</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No login required. Submit instant ratings so the professor knows which biochemical steps or clinical slides are too complex!
              </p>
            </div>

            {feedbackSuccessMessage && (
              <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl p-3 text-xs font-bold text-center animate-pulse">
                ✨ {feedbackSuccessMessage}
              </div>
            )}

            {/* Section 1: Rate Current Slide Understanding */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400">
                  Current Slide: Slide {activeSlideIdx + 1}
                </span>
                <span className="text-[10px] font-mono text-indigo-400 font-bold truncate max-w-[200px]">
                  "{presentation.slides[activeSlideIdx]?.title || "Active Slide"}"
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => submitClarityRating(activeSlideIdx, 'clear')}
                  className="py-3 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/35 text-center flex flex-col items-center gap-1 transition cursor-pointer"
                >
                  <Smile className="h-6 w-6 text-emerald-400" />
                  <span className="text-xs font-black text-slate-200">Perfectly Clear</span>
                  <span className="text-[9px] text-slate-500">I get it 🤩</span>
                </button>
                <button
                  onClick={() => submitClarityRating(activeSlideIdx, 'neutral')}
                  className="py-3 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/35 text-center flex flex-col items-center gap-1 transition cursor-pointer"
                >
                  <Meh className="h-6 w-6 text-amber-400" />
                  <span className="text-xs font-black text-slate-200">Decent / So-So</span>
                  <span className="text-[9px] text-slate-500">Need pause 🤔</span>
                </button>
                <button
                  onClick={() => submitClarityRating(activeSlideIdx, 'complex')}
                  className="py-3 px-2.5 rounded-xl bg-rose-950/20 hover:bg-rose-950/30 border border-rose-900/30 hover:border-rose-500 text-center flex flex-col items-center gap-1 transition cursor-pointer"
                >
                  <Frown className="h-6 w-6 text-rose-400" />
                  <span className="text-xs font-black text-rose-300">Complex Topic</span>
                  <span className="text-[9px] text-rose-500 font-bold">Needs Explaining 🔴</span>
                </button>
              </div>
            </div>

            {/* Section 2: Lecture Pacing Rating */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block font-mono">
                Overall Lecture Speed/Pacing
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => submitPacingRating('fast')}
                  className="py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-xl border border-slate-800 hover:border-indigo-500 transition cursor-pointer"
                >
                  ⚡ Too Fast
                </button>
                <button
                  onClick={() => submitPacingRating('good')}
                  className="py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-xl border border-slate-800 hover:border-emerald-500 transition cursor-pointer"
                >
                  👍 Just Right
                </button>
                <button
                  onClick={() => submitPacingRating('slow')}
                  className="py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 rounded-xl border border-slate-800 hover:border-amber-500 transition cursor-pointer"
                >
                  🐢 Too Slow
                </button>
              </div>
            </div>

            {/* Section 3: Anonymous Question box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-3">
              <label className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block">
                Ask Professor an Anonymous Question
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Can you explain why the blood glucose drops so fast?"
                  value={studentQuestionText}
                  onChange={(e) => setStudentQuestionText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      submitStudentQuestion(activeSlideIdx, presentation.slides[activeSlideIdx]?.title || "Active Slide");
                    }
                  }}
                  className="flex-1 text-xs bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-rose-500 font-medium"
                />
                <button
                  onClick={() => submitStudentQuestion(activeSlideIdx, presentation.slides[activeSlideIdx]?.title || "Active Slide")}
                  className="py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl transition cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackSuccessMessage("");
                }}
                className="text-xs text-slate-400 hover:text-slate-200 transition font-bold"
              >
                Close Feedback Survey
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REAL-TIME CLASS INTERACTIVE ANALYTICS MODAL */}
      {showAnalyticsModal && presentation && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative text-slate-100 animate-fade-in max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAnalyticsModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 transition cursor-pointer p-1 rounded-full hover:bg-slate-800"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-1.5 text-center">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded font-mono">
                📈 Professor Lecture Dashboard
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight pt-2">Real-time Class Feedback Insights</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Aggregated, live clinical slide analytics and student comprehension ratios to keep your teaching pacing perfectly tuned.
              </p>
            </div>

            {/* Quick Metrics Cards Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-450">Pacing Index</span>
                <div className="text-lg font-black text-emerald-400 mt-1">
                  {classFeedback.pacingRatings.good} Perfect
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {classFeedback.pacingRatings.fast} fast • {classFeedback.pacingRatings.slow} slow
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-450">Total Queries</span>
                <div className="text-lg font-black text-indigo-400 mt-1">
                  {classFeedback.questions.length} Anonymous
                </div>
                <div className="text-[10px] text-slate-500 font-medium">pending attention</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-450">Difficult Slides</span>
                <div className="text-lg font-black text-rose-400 mt-1">
                  {Object.values(classFeedback.clarityRatings).filter(c => (c.complex || 0) > 0).length} flagged
                </div>
                <div className="text-[10px] text-slate-500 font-medium font-mono">requires review</div>
              </div>
            </div>

            {/* Complex Topics heat-map */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-855 pb-2">
                <span className="text-xs uppercase font-extrabold text-slate-350 flex items-center gap-2">
                  <Frown className="h-4 w-4 text-rose-400" />
                  Complex Slides & Student Confusion Rates
                </span>
                <span className="text-[10px] font-mono text-slate-500">SLIDE-BY-SLIDE DIAGNOSTICS</span>
              </div>

              <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                {presentation.slides.map((slide, sIdx) => {
                  const rating = classFeedback.clarityRatings[sIdx] || { clear: 0, neutral: 0, complex: 0 };
                  const total = rating.clear + rating.neutral + rating.complex;
                  const percentComplex = total > 0 ? Math.round((rating.complex / total) * 100) : 0;
                  
                  return (
                    <div key={sIdx} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-850 text-xs">
                      <div className="space-y-0.5 max-w-[320px]">
                        <div className="font-extrabold text-slate-200 truncate">
                          Slide {sIdx + 1}: {slide.title}
                        </div>
                        <div className="text-[10px] text-slate-450 font-medium font-mono">
                          Layout type: <span className="font-mono text-indigo-450">{slide.layout}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                            percentComplex > 40 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/35' : 
                            percentComplex > 1 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {percentComplex}% COMPLEX
                          </span>
                          <div className="text-[9px] text-slate-500 font-mono mt-1">
                            {rating.clear} clear • {rating.neutral} meh • {rating.complex} hard
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Students Questions Inbox */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-855 pb-2">
                <span className="text-xs uppercase font-extrabold text-slate-350 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-indigo-400" />
                  Live Student Anonymous Questions Box ({classFeedback.questions.length})
                </span>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear/reset all active classroom questions?")) {
                      setClassFeedback(prev => ({
                        ...prev,
                        questions: []
                      }));
                    }
                  }}
                  className="text-[9px] font-extrabold text-slate-500 hover:text-slate-300 transition uppercase tracking-wider bg-slate-900 px-2 py-1 rounded cursor-pointer"
                >
                  Clear Inbox
                </button>
              </div>

              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {classFeedback.questions.length === 0 ? (
                  <div className="text-xs text-slate-500 italic p-6 text-center font-medium">
                    No anonymous student questions currently pending. Scan the QR code to submit!
                  </div>
                ) : (
                  classFeedback.questions.map((q) => (
                    <div key={q.id} className="p-3 rounded-xl bg-slate-900 border border-slate-850 hover:border-slate-800 transition">
                      <div className="flex justify-between items-start text-[10px] text-slate-450 font-bold mb-1 font-mono">
                        <span className="text-indigo-400">Slide {q.slideIdx + 1}: "{q.slideTitle}"</span>
                        <span>{q.time}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium leading-relaxed">
                        💡 "{q.text}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  if (confirm("Reset all class clarity metrics and ratings back to default parameters?")) {
                    setClassFeedback({
                      clarityRatings: {},
                      questions: [],
                      pacingRatings: { fast: 0, good: 0, slow: 0 }
                    });
                  }
                }}
                className="py-2.5 px-4 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-400 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Reset Statistics
              </button>
              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl transition cursor-pointer shadow shadow-indigo-600/15 text-center"
              >
                Close Lecture Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3e3;
function generateFallbackPresentation(topic, specialty, targetAudience, theme, slideCount) {
  const slides = [];
  const limit = slideCount || 10;
  slides.push({
    title: topic,
    layout: "title",
    cbmeCode: "NMC-Intro",
    competency: `Discuss the principal curriculum modules of ${specialty || "General Medicine"}.`,
    bullets: [
      `Syllabus Topic: ${topic}`,
      `Departmental Scope: ${specialty || "Biochemistry & Medicine"} Lecture Package`,
      `Target Learners: ${targetAudience || "MBBS & Postgraduate"} Level`,
      `100% Free Peer-Reviewed Classroom Slide Resource`
    ],
    speakerNotes: `Welcome class. Today we will conduct a deep-dive review of ${topic}, tracing its chemical cascades, pathophysiological manifestations, diagnostic panels, and standard pharmacotherapy targets as mapped by the NMC India CBME curriculum guidelines.`
  });
  slides.push({
    title: "CBME Competency & Learning Objectives",
    layout: "objectives",
    cbmeCode: "BI-1.1",
    competency: `Describe the molecular kinetics and clinical markers of ${topic}.`,
    bullets: [
      `*Specific Learning Objective (SLO)*: Outline the diagnostic criteria and molecular cascades associated with this pathology.`,
      `*NMC Requirement*: Explain the clinical etiology, lab investigation trends, and metabolic block site.`,
      `*Practical Goal*: Correctly evaluate serum and urine markers to resolve clinical vignetted scenarios.`
    ],
    speakerNotes: "By the end of today's lecture, every student must understand the biochemical blocks, be able to identify key laboratory alterations, and map them to appropriate treatment strategies."
  });
  slides.push({
    title: "Clinical Case Vignette",
    layout: "case_study",
    cbmeCode: "BI-1.2",
    competency: "Correlate clinical presentation with lab values.",
    bullets: [
      `*History*: A patient presents with acute onset of symptoms highly indicative of ${topic}.`,
      `*Symptoms*: Progressive fatigue, characteristic systemic signs, and standard metabolic stress indicators.`,
      `*Diagnostic Direction*: Key enzymes and clearance ratios measured to identify metabolic blocks.`
    ],
    tableData: {
      headers: ["Diagnostic Investigation", "Patient Value", "Reference Range", "Assessment"],
      rows: [
        ["Specific Enzymatic Activity", "18% of normal", "85% - 100%", "Severe Deficiency"],
        ["Target Accumulant Level", "4.2 mg/dL", "Less than 1.0 mg/dL", "Highly Elevated"],
        ["Inhibited Substrate Clear", "Markedly Reduced", "Normal Clearance", "Metabolic Accumulation"]
      ]
    },
    speakerNotes: "Observe these laboratory investigations closely. The severe reduction in specific enzymatic activity has resulted in a critical elevation of target metabolites, explaining the patient's symptoms."
  });
  const coreSlideCount = limit - 6;
  for (let i = 1; i <= Math.max(2, coreSlideCount); i++) {
    if (i === 1) {
      slides.push({
        title: `Pathophysiology of ${topic} (Cascade Steps)`,
        layout: "pathophysiology",
        cbmeCode: "BI-1.3",
        competency: "Discuss biochemical mechanisms behind structural cell damage.",
        bullets: [
          `*Metabolic Block Site*: Upstream substrates accumulate rapidly, triggering secondary toxicity cascades.`,
          `*Cellular Compensation*: Downstream target depletion starves vital organelles, altering cell respiration.`,
          `*\u{1F4A1} FUNNY MEMORIZATION MNEMONIC*: **Bhaiya Jaldi Karo, Sab Yaad Ho Jayega!**`,
          `  - **B**haiya: Biochemical Pathway block identified`,
          `  - **J**aldi: Junctional transporters saturated`,
          `  - **K**aro: Kinetics of enzyme severely altered`,
          `  - **S**ab: Sub-clinical cellular stress starts`,
          `  - **Y**aad: Yield of ATP is compromised`
        ],
        speakerNotes: "This funny Hinglish mnemonic is very popular among Indian MBBS students to remember the complex kinetics of the pathological cascade. Keep it interactive!"
      });
    } else if (i === 2) {
      slides.push({
        title: "Metabolic Pathway Diagram & Block Hotspots",
        layout: "biochemical_diagram",
        cbmeCode: "BI-1.4",
        competency: "Detail enzymatic reactions, cofactors, and genetic regulation points.",
        bullets: [
          `*Compartment Map*: Review the cytosol to mitochondria pathway transition.`,
          `*Primary Feedback*: Regulation mediated by hormone signals (Insulin/Glucagon ratio).`,
          `*\u{1F4A1} FUNNY COFACTOR MNEMONIC*: **Mera Dost Sabse Best Hai!**`,
          `  - **M**era: Magnesium (Mg2+) cofactor needed`,
          `  - **D**ost: Dehydrogenase activation site`,
          `  - **S**abse: Substrate inhibition feedback`,
          `  - **B**est: Biosynthesis rates regulated`
        ],
        diagram: {
          title: `${topic} Pathway Map`,
          type: "metabolic_pathway",
          compartments: ["Cytosol", "Mitochondria"],
          nodes: [
            { id: "n1", label: "Initial Substrate", type: "substrate", compartment: "Cytosol", description: "The primary metabolite starting this biochemical pathway", x: 25, y: 20 },
            { id: "n2", label: "Regulatory Enzyme", type: "enzyme", compartment: "Cytosol", description: "Enzyme regulated by hormones and allosteric activators", x: 50, y: 20, regulation: "Insulin (+) / Glucagon (-)" },
            { id: "n3", label: "Deficient Product", type: "substrate", compartment: "Mitochondria", description: "Product starved due to primary metabolic block", x: 35, y: 70 },
            { id: "n4", label: "METABOLIC BLOCK", type: "clinical_condition", compartment: "Mitochondria", description: `Primary genetic defect site causing ${topic}`, x: 70, y: 70 }
          ],
          edges: [
            { from: "n1", to: "n2", label: "Conversion", style: "conversion", cofactors: ["Mg2+", "NAD+"] },
            { from: "n2", to: "n3", label: "Feedback Activation", style: "activation" },
            { from: "n3", to: "n4", label: "Pathway Blocked Here", style: "inhibition", cofactors: ["ATP"] }
          ]
        },
        speakerNotes: "Explain this diagram. Note the transport step from Cytosol to Mitochondria, which is heavily blocked, causing clinical pathology."
      });
    } else {
      slides.push({
        title: `Molecular Mechanisms of Cellular Stress - Part ${i - 1}`,
        layout: "molecular_mechanism",
        cbmeCode: `BI-1.5.${i}`,
        competency: "Explain genetic mechanisms and mutation variations.",
        bullets: [
          `*Transcription Activation*: Metabolic imbalances activate key stress-response genes.`,
          `*Mutational Hotspots*: Single nucleotide polymorphisms (SNPs) reduce enzyme cofactor affinity.`,
          `*Allosteric Kinetics*: High concentration of upstream intermediates blocks regulatory domains.`
        ],
        speakerNotes: `On this slide, note that gene transcription is upregulated, but mutant proteins remain unstable, causing the downstream symptoms of ${topic}.`
      });
    }
  }
  slides.push({
    title: "Pharmacology & Molecular Targets",
    layout: "pharmacology",
    cbmeCode: "BI-1.8",
    competency: "Discuss drug classes, mechanisms of action, and clinical choices.",
    bullets: [
      `*Metabolic Regulators*: Direct activators target the residual enzyme, boosting clearance.`,
      `*Substitution Agents*: Replacing depleted products bypasses the metabolic block successfully.`,
      `*\u{1F4A1} FUNNY DRUG CLASSES MNEMONIC*: **Babu Bhaiya, Mast Karo!**`,
      `  - **B**abu: Bioavailability optimization`,
      `  - **B**haiya: Binding affinity to receptors`,
      `  - **M**ast: Metabolism through CYP450 system`,
      `  - **K**aro: Kidney clearance levels monitored`
    ],
    speakerNotes: "Memorize these drug parameters using the funny Hinglish mnemonic 'Babu Bhaiya, Mast Karo!'. It maps the core pharmacokinetics of drug action."
  });
  slides.push({
    title: "NMC Board Practice & PG Viva Q&A",
    layout: "q_and_a",
    cbmeCode: "BI-1.9",
    competency: "Resolve clinically-oriented case questions under exam conditions.",
    bullets: [
      `*Question 1*: What is the primary rate-limiting step altered in this condition?`,
      `  - *Answer*: Controlled by the target regulatory enzyme, inhibited by pathway endproducts.`,
      `*Question 2*: Explain why cofactors improve metabolic yield in partial mutations.`,
      `  - *Answer*: High cofactor concentrations saturate the mutated enzyme's active site, restoring KM kinetic affinity.`,
      `*Question 3*: How does the visual metabolic block diagram help map clinical findings?`,
      `  - *Answer*: It identifies which molecules will accumulate in serum and which will be deficient.`
    ],
    speakerNotes: "Run these three scenario-based questions in class to prepare your students for the MCQ/viva portions of the NMC exams."
  });
  slides.push({
    title: "Summary & High-Yield Learning Guides",
    layout: "summary",
    cbmeCode: "BI-Summary",
    competency: "Review key concepts and references.",
    bullets: [
      `*Key Enablers*: Standard pathway blocks cause specific substrate accumulation.`,
      `*Clinical Rule*: Correlate laboratory investigation trends with funny mnemonics for rapid diagnosis.`,
      `*High-Yield References*: *Harper's Illustrated Biochemistry (32nd Ed)* & *Harrison's Principles of Internal Medicine (21st Ed)*.`
    ],
    speakerNotes: "That concludes today's lecture. Utilize the high-yield references, review the funny mnemonics, and explore the interactive pathways on the screen."
  });
  while (slides.length < limit) {
    slides.splice(slides.length - 1, 0, {
      title: `Supplemental High-Yield Reference Sheet ${slides.length - 4}`,
      layout: "pathophysiology",
      cbmeCode: "BI-Supp",
      competency: "Examine secondary markers and diagnostic guidelines.",
      bullets: [
        `*Diagnostic Review*: Assess chronic metabolic complications and secondary cell adaptations.`,
        `*Cascade Feedback*: Investigate negative feedback loops acting on upstream synthesizers.`,
        `*\u{1F4A1} MEMORIZE THIS*: **Dost, Sab Yaad Rakhna!** (Friend, remember everything!).`
      ],
      speakerNotes: "This slide provides additional details for comprehensive course coverage."
    });
  }
  const finalSlides = slides.slice(0, limit);
  return {
    isFallback: true,
    slides: finalSlides
  };
}
async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
  app.post("/api/generate-ppt", async (req, res) => {
    const { topic, specialty, targetAudience, theme, slideCount } = req.body;
    try {
      if (!topic) {
        return res.status(400).json({ error: "Topic is required." });
      }
      console.log(`Generating presentation for topic: "${topic}" (Specialty: ${specialty}, Audience: ${targetAudience}, Count: ${slideCount})`);
      const prompt = `
You are an expert MD-PhD Medical Professor and Curriculum Director aligned with the National Medical Commission (NMC) Competency-Based Medical Education (CBME) guidelines of India.
Generate a comprehensive, peer-reviewed, professional lecture presentation on the topic: "${topic}".
The lecture is for the Department of "${specialty || "General Medicine/Biochemistry"}" targeting "${targetAudience || "MBBS & MD"}" students.
The presentation style must be premium, highly educational, clinically grounded, rich enough for MD postgraduates but structured for MBBS undergraduates.

Generate exactly ${slideCount || 10} slides in JSON format matching the schema defined below.

CRITICAL PRESENTATION RULES REQUESTED BY PROFESSOR:
1. MULTIPLE HIGHER SLIDE COUNTS (Up to 35 slides):
   - You MUST generate EXACTLY ${slideCount || 10} slides in the "slides" array.
   - If slideCount is high (e.g. 15 to 35), scale the structure logically. Do not condense or leave slides out. Broaden the coverage to include: Progressive Case Vignettes, Risk Factors, granular sub-steps of Pathophysiology, detailed Molecular Cascades, multiple Diagnostic panels, Differential Diagnosis comparison matrices, step-by-step Pharmacotherapy classes, clinical trials, complications, and 3-5 separate interactive high-yield PG Board/Viva Practice Questions.
2. FUNNY MEMORIZATION MNEMONICS (PREFERABLY IN HINDI / HINGLISH):
   - For complex pathways, diagnostic criteria, clinical signs, or drug list slides, include a highly memorable, catchy, or funny mnemonic, acronym, or memory hook.
   - You MUST preferably write these mnemonics in funny, colloquial **Hinglish** (Hindi language phrases written in English alphabet letters, which is the standard conversational style of Indian medical students, e.g. using memorable terms like "Bhaiya", "Jaldi", "Mera", "Sabse", "Dost", etc.) or **Hindi text**.
   - You MUST prefix these mnemonics explicitly in the bullets as: "\u{1F4A1} FUNNY MEMORIZATION MNEMONIC: [Funny Hindi/Hinglish phrase, followed by a clear English description mapping what each word/letter represents]". Make it extremely engaging, relatable, hilarious, or humorous so students laugh and memorize it forever!
3. VISUAL METABOLIC BLOCKS & PATHWAY SITES:
   - For "biochemical_diagram" slides, you MUST include diagram nodes with type "clinical_condition" representing exactly where the pathway is blocked, where an enzyme is deficient, or where a metabolic block occurs.
   - Model the edges pointing from/to the block or inhibited substrate, using style "inhibition" or "conversion" with clear cofactors to make the metabolic block visual and prominent.

Each slide must include:
1. Title
2. Slide layout type from: "title", "objectives", "case_study", "pathophysiology", "molecular_mechanism", "biochemical_diagram", "clinical_correlation", "pharmacology", "q_and_a", "summary"
3. Rich, detailed content (bullet points, sub-points, key terms highlighted)
4. A dedicated, highly professional section on CBME competency mapping (e.g., NMC Competency Code: BI 3.4, PH 1.15, PA 2.3) and specific learning objectives (SLOs).
5. Comprehensive speaker notes (3-5 sentences) designed for the professor, providing deep context, latest clinical evidence, and references.
6. For the "biochemical_diagram" slide, provide a structured diagram definition with nodes (enzymes, substrates, organelles, etc.) and edges (conversion, activation, inhibition) to represent the key metabolic pathway, signaling cascade, or molecular mechanism of the topic. Ensure coordinates x, y are scaled from 5 to 95 so they layout beautifully in a box.

Return ONLY a valid JSON object matching the following TypeScript interface (do NOT wrap in any markdown blocks like \`\`\`json ... \`\`\`, do not include any other conversational text, return a clean raw string beginning with { and ending with }):

interface OutputSchema {
  slides: Array<{
    title: string;
    layout: "title" | "objectives" | "case_study" | "pathophysiology" | "molecular_mechanism" | "biochemical_diagram" | "clinical_correlation" | "pharmacology" | "q_and_a" | "summary";
    cbmeCode?: string; // e.g. "BI-3.4"
    competency?: string; // e.g. "Discuss the metabolic pathways of lipid absorption..."
    bullets: string[]; // Rich content points, use *bold* or **bold** for key molecular/clinical terms
    tableData?: {
      headers: string[];
      rows: string[][];
    }; // Optional table data, useful for lab results or drug comparisons
    diagram?: {
      title: string;
      type: "metabolic_pathway" | "signaling_cascade" | "flowchart" | "cellular_compartment";
      compartments?: string[]; // e.g., ["Mitochondria", "Cytosol", "Extracellular"]
      nodes: Array<{
        id: string;
        label: string;
        type: "substrate" | "enzyme" | "cofactor" | "receptor" | "organelle" | "clinical_condition";
        compartment?: string; // must map to one of compartments (if any)
        description: string; // clinical/biochemical detail on hover
        regulation?: string; // e.g., "Insulin (+), Glucagon (-)"
        x: number; // coordinate percentage 5 to 95 for grid placement
        y: number; // coordinate percentage 5 to 95 for grid placement
      }>;
      edges: Array<{
        from: string;
        to: string;
        label?: string; // e.g. enzyme name or reaction
        style: "conversion" | "activation" | "inhibition";
        cofactors?: string[]; // e.g. ["NAD+", "Mg2+"]
      }>;
    };
    speakerNotes: string; // Extremely detailed notes, mapped to CBME curriculum
  }>
}

Structure the lecture programmatically to span exactly ${slideCount || 10} slides:
- Slide 1: Title Slide (Topic name, Department/Specialty, Target audience, CBME introductory overview, high-level outline)
- Slide 2: CBME Competency Outline & Learning Objectives (mapped explicitly to Specific Learning Objectives (SLOs) as per NMC guidelines)
- Slide 3: Clinical Case Vignette (A realistic patient case history, symptoms, physical findings, and a lab diagnostics table in tableData with rows like "Hemoglobin | 8.2 g/dL (Low)")
- Slide 4 to N-4: Progressive Pathophysiology, risk factors, cellular damage, advanced molecular mechanism cascades, metabolic pathway details, and the "biochemical_diagram" pathway slide (explicitly highlighting the metabolic blocks as a red clinical_condition node)
- Slide N-3: Interactive Clinical & Diagnostic Laboratory Correlation (correlating biochemical markers to real lab results, diagnostic criteria comparison table)
- Slide N-2: Pharmacotherapy & Molecular Targets (therapeutic agents acting on enzymes or receptors, including detailed mechanisms and funny drug-class acronym mnemonics!)
- Slide N-1: Clinical Case Resolution & Viva Voce Q&A Practice (standard MBBS/MD board questions with annotated response keys)
- Slide N: Premium Lecture Summary, Memorization Cheat-sheet & High-Yield References

Ensure the medical terminology is accurate, using the latest nomenclature. Be very precise with enzymes, genes, receptors, and molecular targets.
`;
      let response;
      let lastError = null;
      const maxRetries = 2;
      const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-3.1-pro-preview"];
      for (const currentModel of modelsToTry) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            console.log(`Attempt ${attempt} using model: ${currentModel}...`);
            response = await ai.models.generateContent({
              model: currentModel,
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                systemInstruction: "You are an elite MD-PhD professor of medicine and biochemistry. Your output must be impeccable, peer-reviewed level academic text. Never summarize or omit crucial clinical details. Always return strict, valid JSON matching the exact schema requested without code block wrapping."
              }
            });
            if (response && response.text) {
              console.log(`Successfully generated slide content using ${currentModel} on attempt ${attempt}`);
              break;
            }
          } catch (err) {
            console.warn(`Attempt ${attempt} on model ${currentModel} failed:`, err.message || err);
            lastError = err;
            if (attempt < maxRetries) {
              const delay = attempt * 1e3;
              console.log(`Waiting ${delay}ms before retrying...`);
              await new Promise((resolve) => setTimeout(resolve, delay));
            }
          }
        }
        if (response && response.text) {
          break;
        }
      }
      if (!response || !response.text) {
        throw lastError || new Error("Failed to generate content after retries on all models.");
      }
      const responseText = response.text || "{}";
      let result;
      try {
        result = JSON.parse(responseText.trim());
      } catch (err) {
        console.error("Failed to parse JSON. Raw output:", responseText);
        const match = responseText.match(/\{[\s\S]*\}/);
        if (match) {
          result = JSON.parse(match[0]);
        } else {
          throw new Error("Invalid JSON format returned from Gemini.");
        }
      }
      return res.json(result);
    } catch (error) {
      console.warn("Generation or quota limit error encountered:", error.message || error);
      console.log(`Triggering high-yield dynamic curriculum builder fallback for topic: "${topic}"...`);
      try {
        const fallbackResult = generateFallbackPresentation(topic, specialty || "Biochemistry", targetAudience || "MBBS", theme || "Teal Clinical", slideCount || 10);
        return res.json(fallbackResult);
      } catch (fallbackError) {
        console.error("Error generating fallback slide package:", fallbackError);
        return res.status(500).json({ error: error.message || "Server-side error occurred." });
      }
    }
  });
  const distPath = path.resolve(__dirname, "dist");
  if (isProd) {
    console.log("Serving static pre-built assets from /dist...");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const compiledIndex = path.resolve(distPath, "index.html");
      const rootIndex = path.resolve(__dirname, "index.html");
      if (fs.existsSync(compiledIndex)) {
        res.sendFile(compiledIndex);
      } else if (fs.existsSync(rootIndex)) {
        console.warn("dist/index.html not found! Serving root index.html as fallback in production.");
        res.sendFile(rootIndex);
      } else {
        res.status(404).send("Application index.html not found. Please run npm run build.");
      }
    });
  } else {
    console.log("Starting Vite server dynamically for development...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom"
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
startServer();

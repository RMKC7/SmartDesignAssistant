import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ===============================
// FILE UPLOAD CONFIG
// ===============================
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ===============================
// MAIN API
// ===============================
app.post("/api/uiux", upload.single("screenshot"), async (req, res) => {
  try {
    const userInput = (req.body.userInput || "").trim();
    const image = req.file;

    if (!userInput && !image) {
      return res.status(400).json({ error: "No input provided" });
    }

    // ===============================
    // STAGE 1: IMAGE UI CHECK
    // ===============================
    if (image) {
      const imageCheck = await openai.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content: `
You classify images.

If image is a website, app UI, dashboard, or wireframe:
{ "is_ui": true }

Otherwise:
{ "is_ui": false }

Respond ONLY in JSON.
`,
          },
          {
            role: "user",
            content: [
              {
                type: "input_image",
                image_url: `data:${image.mimetype};base64,${image.buffer.toString(
                  "base64"
                )}`,
              },
            ],
          },
        ],
        text: { format: { type: "json_object" } },
      });

      const imageResult = JSON.parse(imageCheck.output_text);

      if (!imageResult.is_ui) {
        return res.json({ out_of_scope: true, reason: "image_not_ui" });
      }
    }

    // ===============================
    // STAGE 2: DESIGN INTENT CHECK
    // ===============================
    const designKeywords = [
      "design",
      "redesign",
      "website",
      "web",
      "app",
      "ui",
      "ux",
      "interface",
      "landing",
      "homepage",
      "dashboard",
      "product",
    ];

    const hasKeyword = designKeywords.some((k) =>
      userInput.toLowerCase().includes(k)
    );

    if (!hasKeyword && userInput) {
      const intentCheck = await openai.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content: `
Decide if this text could refer to a website, app, or digital product.

Respond ONLY in JSON.

If yes:
{ "is_uiux": true }

If no:
{ "is_uiux": false }
`,
          },
          {
            role: "user",
            content: [{ type: "input_text", text: userInput }],
          },
        ],
        text: { format: { type: "json_object" } },
      });

      const intent = JSON.parse(intentCheck.output_text);
      if (!intent.is_uiux) return res.json({ out_of_scope: true });
    }

    // ===============================
    // STAGE 3: ANALYSIS PROMPT BUILDER
    // ===============================
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const hasUrl = urlRegex.test(userInput);

    let analysisPrompt = "";

    if (hasUrl) {
      const domain = userInput
        .replace(/https?:\/\//, "")
        .split("/")[0];

      analysisPrompt = `
The user is referring to the website "${domain}".

Treat this as a DESIGN CASE STUDY.
Do NOT browse the internet.

Provide:
- UI style & branding expectations
- Color palette suggestions
- Font family suggestions
- Page headings
- Layout structure
- UX & accessibility improvements
`;
    } else if (userInput) {
      analysisPrompt = userInput;
    } else {
      analysisPrompt =
        "Analyze the UI shown in the uploaded screenshot and provide UI/UX feedback.";
    }

    // ===============================
    // STAGE 4: UX ANALYSIS
    // ===============================
    const uxResponse = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `
You are a senior UI/UX designer.

IMPORTANT:
- You never browse the web
- URLs represent brand & design context
- Accept website ideas, redesigns, concepts

Respond ONLY in valid JSON format.
The output MUST be a JSON object.


{
  "problem": string,
  "ux_principles": string[],
  "ui_suggestions": string[],
  "accessibility_notes": string[],
  "design_theme": string,
  "color_scheme": {
    "primary": string,
    "secondary": string,
    "accent": string
  },
  "component_suggestion": string,
  "mock_design": {
    "layout_type": "single-page | multi-page",
    "sections": [
      {
        "name": string,
        "components": string[],
        "description": string
      }
    ]
  }
}
`,
        },
        {
          role: "user",
          content: [
            ...(image
              ? [
                  {
                    type: "input_image",
                    image_url: `data:${image.mimetype};base64,${image.buffer.toString(
                      "base64"
                    )}`,
                  },
                ]
              : []),
            {
              type: "input_text",
              text: analysisPrompt,
            },
          ],
        },
      ],
      text: { format: { type: "json_object" } },
    });

    const uxData = JSON.parse(uxResponse.output_text);

    // ===============================
    // STAGE 5: UI MOCKUP GENERATOR
    // ===============================
    const uiReference = generateUIReference(uxData);

    res.json({
      ...uxData,
      ui_reference: uiReference,
    });
  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error);
    res.status(500).json({
      error: "UI/UX analysis failed",
      message: error.message,
    });
  }
});

// ===============================
// UI REFERENCE SVG
// ===============================
function generateUIReference(uxData) {
  const {
    design_theme = "Modern",
    color_scheme = {},
    component_suggestion = "Hero Section",
  } = uxData;

  const primary = color_scheme.primary || "#667eea";
  const secondary = color_scheme.secondary || "#764ba2";
  const accent = color_scheme.accent || "#FF6B9D";

  const svg = `
<svg width="420" height="600" viewBox="0 0 420 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .anim-float { animation: float 3s ease-in-out infinite; }
      .anim-pulse { animation: pulse 2s ease-in-out infinite; }
      .anim-slide { animation: slideIn 0.6s ease-out; }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${secondary};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${primary};stop-opacity:0.8" />
    </linearGradient>
    <radialGradient id="cardGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.9);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(255,255,255,0.7);stop-opacity:1" />
    </radialGradient>
    <filter id="shadow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
      <feOffset dx="0" dy="2" result="offsetblur"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="420" height="600" fill="#f5f7fa"/>

  <!-- Header with gradient -->
  <rect width="420" height="140" fill="url(#headerGrad)"/>
  <rect width="420" height="140" fill="url(#headerGrad)" opacity="0.1"/>

  <!-- Header Content -->
  <text x="25" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="white" class="anim-slide">
    ${design_theme}
  </text>
  <text x="25" y="110" font-family="Arial, sans-serif" font-size="13" fill="rgba(255,255,255,0.85)" class="anim-slide" style="animation-delay: 0.1s;">
    UI/UX Design Reference
  </text>

  <!-- Animated accent line -->
  <line x1="25" y1="125" x2="395" y2="125" stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity="0.6" class="anim-pulse"/>

  <!-- Hero Section Card -->
  <g class="anim-slide" style="animation-delay: 0.2s;">
    <rect x="15" y="160" width="390" height="100" rx="16" fill="white" filter="url(#shadow)" opacity="0.95"/>
    <circle cx="45" cy="195" r="15" fill="url(#accentGrad)" opacity="0.8" class="anim-pulse"/>
    <text x="70" y="185" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#333">
      ${component_suggestion}
    </text>
    <text x="70" y="207" font-family="Arial, sans-serif" font-size="12" fill="#666">
      Multi-section layout with CTA
    </text>
    <rect x="25" y="220" width="155" height="28" rx="8" fill="${accent}" opacity="0.15"/>
    <text x="40" y="240" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="${accent}">
      Primary Action Button
    </text>
  </g>

  <!-- Color Palette Section -->
  <g class="anim-slide" style="animation-delay: 0.35s;">
    <text x="25" y="290" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#333">
      Color Palette
    </text>
    <!-- Primary -->
    <circle cx="45" cy="330" r="18" fill="${primary}" class="anim-float" opacity="0.9"/>
    <text x="25" y="365" font-family="Arial, sans-serif" font-size="11" fill="#666">Primary</text>
    
    <!-- Secondary -->
    <circle cx="145" cy="330" r="18" fill="${secondary}" class="anim-float" style="animation-delay: 0.3s;" opacity="0.9"/>
    <text x="120" y="365" font-family="Arial, sans-serif" font-size="11" fill="#666">Secondary</text>
    
    <!-- Accent -->
    <circle cx="245" cy="330" r="18" fill="${accent}" class="anim-float" style="animation-delay: 0.6s;" opacity="0.9"/>
    <text x="230" y="365" font-family="Arial, sans-serif" font-size="11" fill="#666">Accent</text>

    <!-- Neutral -->
    <circle cx="345" cy="330" r="18" fill="#e0e0e0" class="anim-float" style="animation-delay: 0.9s;" opacity="0.9"/>
    <text x="325" y="365" font-family="Arial, sans-serif" font-size="11" fill="#666">Neutral</text>
  </g>

  <!-- Component Examples -->
  <g class="anim-slide" style="animation-delay: 0.5s;">
    <text x="25" y="395" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#333">
      Components
    </text>

    <!-- Card 1 -->
    <rect x="15" y="410" width="110" height="100" rx="12" fill="white" filter="url(#shadow)" opacity="0.9"/>
    <rect x="18" y="413" width="104" height="35" rx="10" fill="\${primary}" opacity="0.1"/>
    <circle cx="40" cy="435" r="6" fill="\${primary}"/>
    <circle cx="60" cy="435" r="6" fill="\${primary}" opacity="0.5"/>
    <text x="20" y="465" font-family="Arial, sans-serif" font-size="11" fill="#666">Card</text>

    <!-- Card 2 -->
    <rect x="155" y="410" width="110" height="100" rx="12" fill="white" filter="url(#shadow)" opacity="0.9"/>
    <rect x="158" y="413" width="104" height="60" rx="10" fill="\${secondary}" opacity="0.1"/>
    <text x="165" y="450" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="\${secondary}">Button</text>
    <text x="160" y="470" font-family="Arial, sans-serif" font-size="11" fill="#666">Interactive</text>

    <!-- Card 3 -->
    <rect x="295" y="410" width="110" height="100" rx="12" fill="white" filter="url(#shadow)" opacity="0.9"/>
    <circle cx="350" cy="435" r="12" fill="\${accent}" opacity="0.15"/>
    <circle cx="350" cy="435" r="8" fill="\${accent}" opacity="0.3"/>
    <text x="310" y="470" font-family="Arial, sans-serif" font-size="11" fill="#666">Icon Badge</text>
  </g>

  <!-- Typography Section -->
  <g class="anim-slide" style="animation-delay: 0.65s;">
    <text x="25" y="535" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#333">
      Typography
    </text>
    <text x="25" y="560" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="\${primary}">
      Heading (Bold)
    </text>
    <text x="25" y="580" font-family="Arial, sans-serif" font-size="12" fill="#666">
      Body text for content description
    </text>
  </g>

  <!-- Corner accent dots -->
  <circle cx="405" cy="15" r="8" fill="\${accent}" opacity="0.1" class="anim-pulse"/>
  <circle cx="15" cy="585" r="8" fill="\${primary}" opacity="0.1" class="anim-pulse"/>
</svg>
`;

  return {
    mockup_svg: svg,
    design_theme,
    color_scheme,
    component_suggestion,
    description: `${design_theme} themed design system with interactive components, color palette, and typography guidelines.`,
  };
}

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);

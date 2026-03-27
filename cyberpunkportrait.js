#!/usr/bin/env node

// --- Argument parsing ---
const args = process.argv.slice(2);
let prompt = null;
let size = "portrait";
let token = null;
let refUuid = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--size" && args[i + 1]) {
    size = args[++i];
  } else if (args[i] === "--token" && args[i + 1]) {
    token = args[++i];
  } else if (args[i] === "--ref" && args[i + 1]) {
    refUuid = args[++i];
  } else if (!args[i].startsWith("--") && prompt === null) {
    prompt = args[i];
  }
}

if (!prompt) {
  prompt =
    "cyberpunk portrait, neon lights, futuristic city background, chrome accents, synthwave aesthetic, rain-slicked streets reflection, holographic displays, dramatic rim lighting, dystopian atmosphere";
}

// --- Token resolution ---
if (!token) {
  console.error(
    "Error: No NETA_TOKEN found. Provide via --token, NETA_TOKEN env var, ~/.openclaw/workspace/.env, or ~/developer/clawhouse/.env"
  );
  process.exit(1);
}

// --- Size map ---
const sizeMap = {
  square: { width: 1024, height: 1024 },
  portrait: { width: 832, height: 1216 },
  landscape: { width: 1216, height: 832 },
  tall: { width: 704, height: 1408 },
};

const { width, height } = sizeMap[size] || sizeMap["portrait"];

// --- Headers ---
const headers = {
  "x-token": token,
  "x-platform": "nieta-app/web",
  "content-type": "application/json",
};

// --- Build request body ---
const body = {
  storyId: "DO_NOT_USE",
  jobType: "universal",
  rawPrompt: [{ type: "freetext", value: prompt, weight: 1 }],
  width,
  height,
  meta: { entrance: "PICTURE,VERSE" },
  context_model_series: "8_image_edit",
};

if (refUuid) {
  body.inherit_params = {
    collection_uuid: refUuid,
    picture_uuid: refUuid,
  };
}

// --- Make image request ---
async function makeImage() {
  const res = await fetch("https://api.talesofai.cn/v3/make_image", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Error creating image (${res.status}): ${text}`);
    process.exit(1);
  }

  const data = await res.json();
  let taskUuid;

  if (typeof data === "string") {
    taskUuid = data;
  } else if (data.task_uuid) {
    taskUuid = data.task_uuid;
  } else {
    console.error("Unexpected response:", JSON.stringify(data));
    process.exit(1);
  }

  return taskUuid;
}

// --- Poll for result ---
async function pollTask(taskUuid) {
  const maxAttempts = 90;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, 2000));

    const res = await fetch(
      `https://api.talesofai.cn/v1/artifact/task/${taskUuid}`,
      { headers }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(`Error polling task (${res.status}): ${text}`);
      process.exit(1);
    }

    const data = await res.json();
    const status = data.task_status;

    if (status === "PENDING" || status === "MODERATION") {
      continue;
    }

    // Done — extract URL
    const url =
      data.artifacts?.[0]?.url || data.result_image_url || null;

    if (!url) {
      console.error("Task finished but no image URL found:", JSON.stringify(data));
      process.exit(1);
    }

    console.log(url);
    process.exit(0);
  }

  console.error("Timed out waiting for image generation.");
  process.exit(1);
}

// --- Main ---
const taskUuid = await makeImage();
await pollTask(taskUuid);

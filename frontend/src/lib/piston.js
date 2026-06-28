// ❌ OLD (remove this)
// const PISTON_API = "https://emkc.org/api/v2/piston";

const BACKEND_API = "http://localhost:3000/run";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript" },
  python: { language: "python" },
  java: { language: "java" },
};

/**
 * @param {string} language
 * @param {string} code
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    // ✅ Backend call (IMPORTANT CHANGE)
    const response = await fetch(BACKEND_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        code: code,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    // ✅ Piston response handle
    const output = data.run?.output || "";
    const stderr = data.run?.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: output,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI("API_KEY");

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "이 고양이는 어떤 종의 고양이야?";

  const imageParts = fileToGenerativePart("cat.png", "image/png");

  const result = await model.generateContent([prompt, imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

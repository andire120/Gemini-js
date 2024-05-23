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

  const prompt = "두 사람의 특징을 설명하고 두 사람을 서로 비교해줘";

  const imageParts = [
    fileToGenerativePart("다자이 오사무.png", "image/png"),
    fileToGenerativePart("Franz Kafka.png", "image/png"),
  ];

  const result = await model.generateContent([prompt, imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();

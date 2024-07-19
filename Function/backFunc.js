import { fs } from "fs";
import { path } from "path";
const cipherData = fs.readFileSync(path.join(__dirname, "../key.json"));
const { key, algorithm } = JSON.parse(cipherData);

// Создание нового секретного ключа
const generateKeySecret = () => {
  const keyFilePath = path.join(__dirname, "../key.json");
  fs.writeFileSync(keyFilePath, JSON.stringify({ key, algorithm }));
};

module.exports.generateKeySecret = generateKeySecret;

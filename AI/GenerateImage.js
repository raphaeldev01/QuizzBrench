const axios = require("axios");

async function generateRandomImage() {
  try {
    // Gera uma URL aleatória com tamanho 800x600
    const imageUrl = `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`;
    
    // Opcional: Faz uma requisição para verificar a imagem (não necessário para a URL em si)
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    return imageUrl;
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

// Exemplo de uso
module.exports = {
    generateRandomImage
}
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração para o Express entender JSON
app.use(express.json());

// Rota principal - O que vai aparecer na tela do navegador
app.get('/', (req, res) => {
  res.send(`
      <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #4F46E5;">🚀 ZFrame Web</h1>
                  <p style="font-size: 1.2rem; color: #4B5563;">O seu app está rodando com sucesso no GitHub Codespaces!</p>
                        <div style="background: #F3F4F6; padding: 20px; display: inline-block; border-radius: 8px;">
                                <strong>Status do Servidor:</strong> Online 🟢
                                      </div>
                                          </div>
                                            `);
                                            });

                                            // Iniciando o servidor do ZFrame
                                            app.listen(PORT, () => {
                                              console.log(`\n🪐 ZFrame rodando com sucesso na porta ${PORT}`);
                                                console.log(`👉 Se o Codespaces não abrir a janela automaticamente, clique na aba 'Ports' ao lado do Terminal.\n`);
                                                });
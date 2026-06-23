import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota principal com a interface unificada do ZFrame
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ZFrame Hub</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #0f0f12; color: #fff; display: flex; height: 100vh; overflow: hidden; }
        
        /* Menu Lateral Estilo Spotify/Netflix */
        nav { width: 240px; background-color: #050507; padding: 20px; display: flex; flex-direction: column; gap: 20px; border-right: 1px solid #222; }
        .logo { font-size: 1.8rem; font-weight: bold; color: #e50914; letter-spacing: 1px; margin-bottom: 20px; }
        .nav-item { padding: 12px; border-radius: 8px; color: #b3b3b3; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
        .nav-item:hover, .nav-item.active { background-color: #1a1a24; color: #fff; }
        
        /* Área Principal de Conteúdo (Feed) */
        main { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; align-items: center; }
        .feed-container { width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 20px; }
        
        /* Criador de Post (Estilo X/Twitter) */
        .tweet-box { background: #16161f; border: 1px solid #2d2d3d; border-radius: 12px; padding: 15px; width: 100%; }
        .tweet-box textarea { width: 100%; background: transparent; border: none; color: #fff; resize: none; font-size: 1.1rem; outline: none; margin-bottom: 10px; }
        .tweet-box-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #2d2d3d; padding-top: 10px; }
        .tweet-btn { background: #1d9bf0; color: #fff; border: none; padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer; }
        
        /* Post do Feed (Estilo Instagram + X) */
        .post { background: #16161f; border: 1px solid #2d2d3d; border-radius: 12px; overflow: hidden; width: 100%; }
        .post-header { padding: 12px; display: flex; align-items: center; gap: 10px; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; background: #444; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; }
        .post-info .name { font-weight: bold; }
        .post-info .username { color: #888; font-size: 0.85rem; }
        .post-content { padding: 12px; font-size: 1rem; line-height: 1.4; }
        .post-media { width: 100%; max-height: 400px; object-fit: cover; background: #222; border-top: 1px solid #2d2d3d; border-bottom: 1px solid #2d2d3d; }
        .post-actions { padding: 12px; display: flex; gap: 20px; color: #888; font-size: 0.9rem; }
        .action:hover { color: #fff; cursor: pointer; }
      </style>
    </head>
    <body>

      <nav>
        <div class="logo">ZFRAME</div>
        <a href="#" class="nav-item active">🏠 Início (Feed)</a>
        <a href="#" class="nav-item">🎬 Filmes e Séries</a>
        <a href="#" class="nav-item">🎵 Música</a>
        <a href="#" class="nav-item">👤 Perfil</a>
      </nav>

      <main>
        <div class="feed-container">
          
          <div class="tweet-box">
            <textarea placeholder="O que está acontecendo ou o que está assistindo hoje?" rows="3"></textarea>
            <div class="tweet-box-footer">
              <span style="color: #1d9bf0; cursor: pointer; font-size: 0.9rem;">📷 Adicionar Mídia</span>
              <button class="tweet-btn">Postar</button>
            </div>
          </div>

          <div class="post">
            <div class="post-header">
              <div class="avatar" style="background: #e50914;">🔥</div>
              <div class="post-info">
                <div class="name">ZFrame Filmes</div>
                <div class="username">@zframe_movies • 2min</div>
              </div>
            </div>
            <div class="post-content">
              Acabou de chegar no catálogo! Quem já vai maratonar a nova temporada hoje a noite? 🍿🎬
            </div>
            <div class="post-actions">
              <span class="action">❤️ 1.2k</span>
              <span class="action">💬 342</span>
              <span class="action">🔄 Compartilhar</span>
            </div>
          </div>

          <div class="post">
            <div class="post-header">
              <div class="avatar" style="background: #1db954;">🎧</div>
              <div class="post-info">
                <div class="name">ZFrame Music</div>
                <div class="username">@zframe_music • 1h</div>
              </div>
            </div>
            <div class="post-content">
              A vibe de hoje está pedindo essa playlist. Dê o play e relaxe. 🔊✨
            </div>
            <div style="height: 300px; background: linear-gradient(45deg, #4158D0, #C850C0, #FFCC70); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; text-shadow: 1px 1px 5px rgba(0,0,0,0.5);">
              🎵 Hits do Momento 2026
            </div>
            <div class="post-actions">
              <span class="action">❤️ 4.8k</span>
              <span class="action">💬 890</span>
              <span class="action">🔄 Compartilhar</span>
            </div>
          </div>

        </div>
      </main>

    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`\n🪐 ZFrame rodando com sucesso na porta ${PORT}`);
});
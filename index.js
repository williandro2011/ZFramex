import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createClient } from '@supabase/supabase-js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 3000;

// ====== CONEXÃO COM O SUPABASE ======
const SUPABASE_URL = 'https://sjrcryenlarqvwjnrexf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xlrVQSWSqLQkcqbCMOg0vg_uRmh1g_v';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
// ===================================

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ZFrame Hub Profissional</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
        body { background-color: #0f0f12; color: #fff; display: flex; height: 100vh; overflow: hidden; }
        .screen { display: none; width: 100%; height: 100%; }
        .screen.active { display: flex; }
        #login-screen { justify-content: center; align-items: center; }
        .login-card { background: #16161f; border: 1px solid #2d2d3d; padding: 40px; border-radius: 16px; width: 100%; max-width: 400px; text-align: center; }
        .logo { font-size: 2.5rem; font-weight: bold; color: #e50914; letter-spacing: 2px; margin-bottom: 20px; }
        .input-group { margin-bottom: 15px; text-align: left; }
        .input-group label { display: block; color: #b3b3b3; margin-bottom: 5px; font-size: 0.9rem; }
        .input-group input, .input-group select { width: 100%; padding: 12px; background: #0f0f12; border: 1px solid #2d2d3d; border-radius: 8px; color: #fff; outline: none; }
        .btn { width: 100%; background: #e50914; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        
        .btn-action { background: #2d2d3d; color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; border: none; cursor: pointer; margin-left: 5px; }
        .btn-follow { background: #fff; color: #000; }
        .btn-follow.following { background: #2d2d3d; color: #fff; }

        nav { width: 240px; background-color: #050507; padding: 20px; display: flex; flex-direction: column; gap: 15px; border-right: 1px solid #222; }
        .nav-item { padding: 12px; border-radius: 8px; color: #b3b3b3; text-decoration: none; font-weight: 600; cursor: pointer; display: flex; gap: 10px; }
        .nav-item:hover, .nav-item.active { background-color: #1a1a24; color: #fff; }
        main { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; align-items: center; }
        .container { width: 100%; max-width: 600px; display: flex; flex-direction: column; gap: 20px; width: 100%; }
        
        /* POSTS */
        .tweet-box { background: #16161f; border: 1px solid #2d2d3d; border-radius: 12px; padding: 15px; }
        .tweet-box textarea { width: 100%; background: transparent; border: none; color: #fff; resize: none; font-size: 1.1rem; outline: none; margin-bottom: 10px; }
        .post { background: #16161f; border: 1px solid #2d2d3d; border-radius: 12px; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .post-header { display: flex; align-items: center; gap: 10px; width: 100%; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; background: #e50914; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .post-info { flex: 1; }
        .post-info .name { display: flex; align-items: center; justify-content: space-between; font-weight: bold; }
        .post-info .username { color: #888; font-size: 0.85rem; }
        .post-media { width: 100%; max-height: 400px; border-radius: 8px; overflow: hidden; margin-top: 5px; border: 1px solid #2d2d3d; }
        .post-media img, .post-media video { width: 100%; height: 100%; object-fit: cover; }
        
        /* CHAT LAYOUT */
        .chat-layout { display: flex; width: 100%; height: 100%; background: #16161f; border: 1px solid #2d2d3d; border-radius: 12px; overflow: hidden; }
        .chat-sidebar { width: 200px; border-right: 1px solid #2d2d3d; background: #0f0f12; padding: 10px; display: flex; flex-direction: column; gap: 10px; }
        .chat-sidebar-item { padding: 10px; background: #16161f; border: 1px solid #2d2d3d; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: bold; text-align: center; }
        .chat-sidebar-item.active { border-color: #e50914; background: #1a1a24; }
        .chat-main { flex: 1; display: flex; flex-direction: column; height: 100%; padding: 15px; }
        .chat-messages { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-bottom: 10px; margin-bottom: 10px; }
        .msg-bubble { max-width: 70%; padding: 10px 14px; border-radius: 12px; font-size: 0.95rem; line-height: 1.4; }
        .msg-bubble.me { background: #e50914; color: #fff; align-self: flex-end; border-bottom-right-radius: 2px; }
        .msg-bubble.other { background: #2d2d3d; color: #fff; align-self: flex-start; border-bottom-left-radius: 2px; }

        .comments-section { background: #1c1c27; padding: 10px; border-radius: 8px; margin-top: 5px; }
        .comment { font-size: 0.9rem; color: #ddd; border-bottom: 1px solid #2d2d3d; padding-bottom: 5px; margin-bottom: 5px; }
        .comment-input-box { display: flex; gap: 10px; margin-top: 5px; }
        .comment-input-box input { flex: 1; background: #0f0f12; border: 1px solid #2d2d3d; color: #fff; padding: 6px; border-radius: 4px; outline: none; }
        .profile-card { background: #16161f; border: 1px solid #2d2d3d; border-radius: 12px; padding: 25px; text-align: center; }
        .profile-avatar { width: 100px; height: 100px; border-radius: 50%; background: #444; margin: 0 auto 15px auto; background-size: cover; background-position: center; border: 3px solid #e50914; }
        .stats { display: flex; justify-content: center; gap: 30px; margin: 15px 0; color: #aaa; }
        .stats span { font-weight: bold; color: #fff; }
        .edit-form { display: none; flex-direction: column; gap: 10px; margin-top: 20px; text-align: left; background: #0f0f12; padding: 15px; border-radius: 8px; }
      </style>
      <script src="/socket.io/socket.io.js"></script>
    </head>
    <body>

      <div id="login-screen" class="screen active">
        <div class="login-card">
          <div class="logo">ZFRAME</div>
          <p style="color: #888; margin-bottom: 15px;">Banco de dados na nuvem ativado ☁️</p>
          <div class="input-group">
            <label>E-mail de Acesso</label>
            <input type="email" id="login-email" placeholder="seuemail@provedor.com">
          </div>
          <button class="btn" onclick="fazerLogin()">Entrar na Rede</button>
        </div>
      </div>

      <div id="app-screen" class="screen">
        <nav>
          <div class="logo">ZFRAME</div>
          <div id="menu-feed" class="nav-item active" onclick="mudarAba('feed')">🏠 Feed Global</div>
          <div id="menu-chats" class="nav-item" onclick="mudarAba('chats')">✉️ Mensagens</div>
          <div id="menu-perfil" class="nav-item" onclick="mudarAba('perfil')">👤 Meu Perfil</div>
          <div class="nav-item" onclick="location.reload()" style="margin-top: auto; color: #ff4a4a;">Desconectar 🚪</div>
        </nav>

        <main id="aba-feed">
          <div class="container">
            <div class="tweet-box">
              <textarea id="novo-post-texto" placeholder="Mande sua mensagem..."></textarea>
              <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <input type="text" id="novo-post-midia" placeholder="Link da Foto ou Vídeo" style="flex:1; background:#0f0f12; border:1px solid #2d2d3d; color:#fff; padding:8px; border-radius:6px; outline:none;">
                <select id="novo-post-tipo-midia" style="background:#0f0f12; border:1px solid #2d2d3d; color:#fff; border-radius:6px; padding:0 5px;">
                  <option value="foto">Foto/GIF</option>
                  <option value="video">Vídeo (.mp4)</option>
                </select>
              </div>
              <button class="btn" style="width: auto; float: right; padding: 8px 20px;" onclick="enviarPost()">Postar</button>
            </div>
            <div id="feed-posts" style="display: flex; flex-direction: column; gap: 20px; width: 100%;"></div>
          </div>
        </main>

        <main id="aba-chats" style="display: none;">
          <div class="container" style="height: 85vh;">
            <div class="chat-layout">
              <div class="chat-sidebar" id="lista-conversas-sidebar"></div>
              <div class="chat-main">
                <div id="chat-header-title" style="font-weight:bold; border-bottom:1px solid #2d2d3d; padding-bottom:10px; margin-bottom:10px; color:#888;">Selecione uma conversa</div>
                <div class="chat-messages" id="box-mensagens-privadas"></div>
                <div id="chat-input-container" style="display:none; gap:10px;">
                  <input type="text" id="input-txt-dm" placeholder="Digite uma mensagem privada..." style="flex:1; background:#0f0f12; border:1px solid #2d2d3d; color:#fff; padding:12px; border-radius:8px; outline:none;">
                  <button class="btn" style="width:auto; padding:0 20px;" onclick="enviarMensagemDireta()">Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <main id="aba-perfil" style="display: none;">
          <div class="container">
            <div class="profile-card">
              <div id="p-foto" class="profile-avatar"></div>
              <h2 id="p-nome">Nome</h2>
              <p id="p-username" style="color: #888;">@user</p>
              <p id="p-bio" style="margin-top: 10px; color: #b3b3b3;">Bio...</p>
              
              <div class="stats">
                <div><span id="p-seguidores">0</span> seguidores</div>
                <div><span id="p-seguindo">0</span> seguindo</div>
              </div>

              <button class="btn" style="background: #2d2d3d; margin-top: 15px;" onclick="toggleEditarPerfil()">Editar Perfil</button>

              <div id="edit-form" class="edit-form">
                <div class="input-group"><label>Nome</label><input type="text" id="edit-nome"></div>
                <div class="input-group"><label>Username (@)</label><input type="text" id="edit-username"></div>
                <div class="input-group"><label>Foto URL</label><input type="text" id="edit-foto"></div>
                <div class="input-group"><label>Bio</label><input type="text" id="edit-bio"></div>
                <button class="btn" onclick="salvarPerfil()">Salvar</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <script>
        const socket = io();
        let meuUsuario = JSON.parse(localStorage.getItem('z_supabase_user')) || null;
        let listaSeguindo = JSON.parse(localStorage.getItem('z_supabase_seguindo')) || [];
        let usuarioChatAtivo = null;

        if (meuUsuario) { logarInterface(); }

        function fazerLogin() {
          const email = document.getElementById('login-email').value;
          if(!email.includes('@')) return alert('Insira um e-mail válido!');
          const nick = email.split('@')[0];
          
          meuUsuario = {
            nome: nick.charAt(0).toUpperCase() + nick.slice(1),
            username: nick.toLowerCase(),
            bio: "ZFrame na Nuvem!",
            foto: "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + nick
          };
          
          localStorage.setItem('z_supabase_user', JSON.stringify(meuUsuario));
          logarInterface();
        }

        function logarInterface() {
          document.getElementById('login-screen').classList.remove('active');
          document.getElementById('app-screen').classList.add('active');
          
          // Sincroniza o usuário com o servidor/banco de dados
          socket.emit('usuarioLogado', meuUsuario);
          atualizarPerfilCampos();
        }

        function mudarAba(aba) {
          document.getElementById('aba-feed').style.display = aba === 'feed' ? 'flex' : 'none';
          document.getElementById('aba-chats').style.display = aba === 'chats' ? 'flex' : 'none';
          document.getElementById('aba-perfil').style.display = aba === 'perfil' ? 'flex' : 'none';
          
          document.getElementById('menu-feed').classList.toggle('active', aba === 'feed');
          document.getElementById('menu-chats').classList.toggle('active', aba === 'chats');
          document.getElementById('menu-perfil').classList.toggle('active', aba === 'perfil');
          
          if(aba === 'perfil') socket.emit('pedirContagemSeguidores', meuUsuario.username);
          if(aba === 'chats') renderizarSidebarChats();
        }

        function atualizarPerfilCampos() {
          document.getElementById('p-nome').innerText = meuUsuario.nome;
          document.getElementById('p-username').innerText = '@' + meuUsuario.username;
          document.getElementById('p-bio').innerText = meuUsuario.bio;
          document.getElementById('p-foto').style.backgroundImage = \`url('\${meuUsuario.foto}')\`;
          document.getElementById('p-seguindo').innerText = listaSeguindo.length;
          
          document.getElementById('edit-nome').value = meuUsuario.nome;
          document.getElementById('edit-username').value = meuUsuario.username;
          document.getElementById('edit-foto').value = meuUsuario.foto;
          document.getElementById('edit-bio').value = meuUsuario.bio;
        }

        function toggleEditarPerfil() {
          const f = document.getElementById('edit-form');
          f.style.display = f.style.display === 'flex' ? 'none' : 'flex';
        }

        function salvarPerfil() {
          meuUsuario.nome = document.getElementById('edit-nome').value;
          meuUsuario.username = document.getElementById('edit-username').value.toLowerCase().replace(/\\s+/g, '');
          meuUsuario.foto = document.getElementById('edit-foto').value;
          meuUsuario.bio = document.getElementById('edit-bio').value;
          
          localStorage.setItem('z_supabase_user', JSON.stringify(meuUsuario));
          socket.emit('usuarioLogado', meuUsuario);
          atualizarPerfilCampos();
          toggleEditarPerfil();
        }

        function alternarSeguir(usernameAlvo) {
          if(usernameAlvo === meuUsuario.username) return;
          const index = listaSeguindo.indexOf(usernameAlvo);
          if(index > -1) {
            listaSeguindo.splice(index, 1);
          } else {
            listaSeguindo.push(usernameAlvo);
          }
          localStorage.setItem('z_supabase_seguindo', JSON.stringify(listaSeguindo));
          socket.emit('atualizarRelacaoSeguir', { seguidor: meuUsuario.username, alvo: usernameAlvo });
          document.getElementById('p-seguindo').innerText = listaSeguindo.length;
        }

        function abrirConversaPrivada(usernameAlvo) {
          usuarioChatAtivo = usernameAlvo;
          mudarAba('chats');
          renderizarSidebarChats();
          document.getElementById('chat-header-title').innerText = 'Conversando com @' + usernameAlvo;
          document.getElementById('chat-input-container').style.display = 'flex';
          socket.emit('carregarMensagensDiretas', { de: meuUsuario.username, para: usernameAlvo });
        }

        function renderizarSidebarChats() {
          const sidebar = document.getElementById('lista-conversas-sidebar');
          sidebar.innerHTML = '<p style="color:#666; font-size:0.75rem; text-align:center; font-weight:bold; margin-bottom:5px;">CONVERSAS:</p>';
          
          if(listaSeguindo.length === 0) {
            sidebar.innerHTML += '<p style="color:#444; font-size:0.8rem; text-align:center; padding:10px;">Siga um amigo no feed para liberar o chat</p>';
            return;
          }

          listaSeguindo.forEach(user => {
            const classeAtiva = usuarioChatAtivo === user ? 'active' : '';
            sidebar.innerHTML += \`<div class="chat-sidebar-item \${classeAtiva}" onclick="abrirConversaPrivada('\${user}')">💬 @\${user}</div>\`;
          });
        }

        function enviarMensagemDireta() {
          const inp = document.getElementById('input-txt-dm');
          if(!inp.value.trim() || !usuarioChatAtivo) return;

          socket.emit('enviarMensagemDireta', {
            remetente: meuUsuario.username,
            destinatario: usuarioChatAtivo,
            texto: inp.value
          });
          inp.value = '';
        }

        function enviarPost() {
          const txt = document.getElementById('novo-post-texto').value;
          const midia = document.getElementById('novo-post-midia').value;
          const tipoMidia = document.getElementById('novo-post-tipo-midia').value;
          if(!txt.trim() && !midia.trim()) return;
          
          socket.emit('novoPost', {
            nome: meuUsuario.nome,
            username: meuUsuario.username,
            foto: meuUsuario.foto,
            texto: txt,
            midiaUrl: midia.trim(),
            midiaTipo: tipoMidia
          });
          document.getElementById('novo-post-texto').value = '';
          document.getElementById('novo-post-midia').value = '';
        }

        function enviarComentario(idPost) {
          const inp = document.getElementById(\`input-comentario-\${idPost}\`);
          if(!inp.value.trim()) return;
          socket.emit('novoComentario', { idPost: idPost, de: meuUsuario.nome, texto: inp.value });
          inp.value = '';
        }

        socket.on('respostaSeguidores', (qtd) => {
          document.getElementById('p-seguidores').innerText = qtd;
        });

        socket.on('receberMensagensDiretas', (mensagens) => {
          const box = document.getElementById('box-mensagens-privadas');
          box.innerHTML = '';
          mensagens.forEach(m => {
            const classeDono = m.remetente === meuUsuario.username ? 'me' : 'other';
            box.innerHTML += \`<div class="msg-bubble \${classeDono}">\${m.texto}</div>\`;
          });
          box.scrollTop = box.scrollHeight;
        });

        socket.on('atualizarFeed', (posts) => {
          const feed = document.getElementById('feed-posts');
          feed.innerHTML = '';
          
          posts.forEach(p => {
            let comentariosHTML = '';
            if(p.comentarios) {
              p.comentarios.forEach(c => {
                comentariosHTML += \`<div class="comment"><strong>\${c.de}:</strong> \${c.texto}</div>\`;
              });
            }

            const fotoBg = p.foto ? \`style="background-image: url('\${p.foto}')"\` : '';
            
            let botoesHeader = '<div>';
            if(p.username !== meuUsuario.username) {
              const jaSegue = listaSeguindo.includes(p.username);
              botoesHeader += \`<button class="btn-action btn-follow \${jaSegue ? 'following' : ''}" onclick="alternarSeguir('\${p.username}')">\${jaSegue ? 'Seguindo' : 'Seguir'}</button>\`;
              if(jaSegue) {
                botoesHeader += \`<button class="btn-action" style="background:#1d9bf0;" onclick="abrirConversaPrivada('\${p.username}')">✈️ Chat</button>\`;
              }
            }
            botoesHeader += '</div>';

            let midiaHTML = '';
            if(p.midiaUrl) {
              if(p.midiaTipo === 'video') {
                midiaHTML = \`<div class="post-media"><video src="\${p.midiaUrl}" controls loop muted></video></div>\`;
              } else {
                midiaHTML = \`<div class="post-media"><img src="\${p.midiaUrl}"></div>\`;
              }
            }

            feed.innerHTML += \`
              <div class="post">
                <div class="post-header">
                  <div class="avatar" \${fotoBg}>\${p.foto ? '' : '👤'}</div>
                  <div class="post-info">
                    <div class="name"><span>\${p.nome}</span> \${botoesHeader}</div>
                    <div class="username">@\${p.username}</div>
                  </div>
                </div>
                <div class="post-content" style="white-space: pre-wrap;">\${p.texto}</div>
                \${midiaHTML}
                <div class="comments-section">
                  <div>\${comentariosHTML}</div>
                  <div class="comment-input-box">
                    <input type="text" id="input-comentario-\${p.id}" placeholder="Comente algo...">
                    <button class="btn" style="width:auto; padding: 5px 12px;" onclick="enviarComentario(\${p.id})">Enviar</button>
                  </div>
                </div>
              </div>
            \`;
          });
        });
      </script>
    </body>
    </html>
  `);
});

// ====== LOGICA DO SERVIDOR EM REAL-TIME + BANCO CLOUD ======
io.on('connection', async (socket) => {
  
  // Buscar posts direto do Supabase e enviar para quem conectou
  try {
    const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    socket.emit('atualizarFeed', posts || []);
  } catch(e) { console.log("Aguardando criação das tabelas..."); }

  socket.on('usuarioLogado', async (user) => {
    socket.join(user.username);
    // Cria ou atualiza o perfil no banco de dados
    await supabase.from('perfis').upsert({ 
      username: user.username, 
      nome: user.nome, 
      bio: user.bio, 
      foto: user.foto 
    }, { onConflict: 'username' });
  });

  socket.on('novoPost', async (dados) => {
    // Insere o post no Supabase
    await supabase.from('posts').insert([{
      nome: dados.nome,
      username: dados.username,
      foto: dados.foto,
      texto: dados.texto,
      midiaUrl: dados.midiaUrl,
      midiaTipo: dados.midiaTipo,
      comentarios: []
    }]);

    // Busca atualizada e distribui para todos
    const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    io.emit('atualizarFeed', posts || []);
  });

  socket.on('novoComentario', async (dados) => {
    const { data: post } = await supabase.from('posts').select('*').eq('id', dados.idPost).single();
    if (post) {
      const listaComentarios = post.comentarios || [];
      listaComentarios.push({ de: dados.de, texto: dados.texto });
      
      await supabase.from('posts').update({ comentarios: listaComentarios }).eq('id', dados.idPost);
      
      const { data: todosPosts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      io.emit('atualizarFeed', todosPosts || []);
    }
  });

  socket.on('carregarMensagensDiretas', async (dados) => {
    const salaId = [dados.de, dados.para].sort().join('_');
    const { data: mensagens } = await supabase.from('mensagens').select('*').eq('sala_id', salaId).order('created_at', { ascending: true });
    socket.emit('receberMensagensDiretas', mensagens || []);
  });

  socket.on('enviarMensagemDireta', async (dados) => {
    const salaId = [dados.remetente, dados.destinatario].sort().join('_');
    
    await supabase.from('mensagens').insert([{
      sala_id: salaId,
      remetente: dados.remetente,
      destinatario: dados.destinatario,
      texto: dados.texto
    }]);

    const { data: mensagens } = await supabase.from('mensagens').select('*').eq('sala_id', salaId).order('created_at', { ascending: true });
    io.to(dados.remetente).to(dados.destinatario).emit('receberMensagensDiretas', mensagens || []);
  });
});

httpServer.listen(PORT, () => {
  console.log(`\n🪐 ZFrame Hub Conectado ao Supabase na porta ${PORT}`);
});
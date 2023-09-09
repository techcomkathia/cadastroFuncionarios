async function obterTodosUsuarios() {
    try {
        const response = await fetch(`http://localhost:3000/usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
          
            throw new Error('Erro ao buscar todos os usuários');
        }

        const data = await response.json();

        if (data.length === 0) {
            alert("Não existe nenhum usuario cadastrado")
        } else {
            console.log('Usuários encontrados com sucesso:', data);
            
            // Retorna a lista de usuários
            return data.map(item => ({
                id: item.id,
                nome: item.nome,
                sobrenome: item.sobrenome,
                cpf: item.cpf,
                data_nascimento: item.dataNascimento,
                sexo: item.sexo,
                cargo: item.cargo,
                imagemPerfil: item.imagemPerfil,
                email: item.email,
                senha: item.senha
            }));
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function exibirListaUsuarios() {
    const listaUsuarios = await obterTodosUsuarios();

    const listaUsuariosDiv = document.getElementById('lista-usuarios');
    listaUsuariosDiv.innerHTML = ''; // Limpa o conteúdo existente

    if (listaUsuarios.length === 0) {
        listaUsuariosDiv.innerHTML = 'Nenhum usuário encontrado.';
    } else {
        listaUsuarios.forEach(usuario => {
            // Criar uma div para o usuário e adicionar a classe "usuario"
            const divUsuario = document.createElement('div');
            divUsuario.classList.add('usuario');

            // Criar uma imagem de perfil
            const img = document.createElement('img');
            img.src = usuario.imagemPerfil;
            img.alt = 'Imagem de perfil de ' + usuario.nome;

            // Adicionar a imagem de perfil à div do usuário
            divUsuario.appendChild(img);

            // Criar um parágrafo para os dados do usuário
            const dadosUsuario = document.createElement('p');
            dadosUsuario.textContent = `ID: ${usuario.id}, Nome: ${usuario.nome} ${usuario.sobrenome}, Email: ${usuario.email}`;
            
            divUsuario.appendChild(dadosUsuario);

            // Adicionar a div do usuário à listaUsuariosDiv
            listaUsuariosDiv.appendChild(divUsuario);
        });
    }
}

// Chame a função para exibir a lista de usuários quando a página carregar
window.addEventListener('load', exibirListaUsuarios);
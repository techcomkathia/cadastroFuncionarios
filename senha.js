const campos = document.getElementsByClassName("obrigatorio")
const mensagensErro = document.getElementsByClassName("mensagemErro")
const formSenha = document.getElementById("formAlterarSenha")
const btnAlterarSenha = document.getElementById("btnAlterarSenha")
let usuario = []

console.log(campos)
console.log(mensagensErro)


for (mensagem of mensagensErro){
    mensagem.style.display = 'none'
}

function mostrarErro(mensagem){
    mensagem.style.display= "block"
    mensagem.style.border ='2px solid #e63636'
}

function removerErro(mensagem){
    mensagem.style.display= "none"
    mensagem.style.border= ""
}


formSenha.addEventListener("submit", function (event) {
    event.preventDefault();
});

function validarSenha(){
    const senhaValida = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    const novaSenha = campos[2].value
    if (!senhaValida.test(novaSenha) ) {
        mostrarErro(mensagensErro[2]) 
    }       
    else{
        removerErro(mensagensErro[2])
        console.log('senha validada')
    }
}


async function obterDadosUsuario(email) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            mostrarErro(mensagensErro[0])
            throw new Error('Erro ao encontrar usuário');
        }
        const data = await response.json();
        if (data.length==0){
            mostrarErro(mensagensErro[0])
        }
        else{
            console.log('Usuário encontrado com sucesso:', data);
            removerErro(mensagensErro[0])
            usuario = {
                id: data[0].id,
                nome: data[0].nome,
                sobrenome: data[0].sobrenome,
                cpf: data[0].cpf,
                data_nascimento: data[0].dataNascimento,
                sexo: data[0].sexo,
                cargo: data[0].cargo,
                imagemPerfil: data[0].imagemPerfil,
                email: data[0].email,
                senha: data[0].senha
            };
            return usuario;
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
}


async function verificarSenhaAntiga(email, senhaAntiga) {
    try {
        const usuario = await obterDadosUsuario(email);
        console.log(usuario); // Agora você tem acesso ao objeto de usuário

        if (usuario.senha!= senhaAntiga){
            mostrarErroSenha(mensagemErroSenhaAntiga)
        }
        else{
            // substituirSenha(usuario.email, novaSenha)
            console.log("as senhas conferem")
        }
    } catch (error) {
        // Lide com o erro aqui
        console.error('Erro ao buscar usuário:', error.message);
    }
}

function verificarSenhasNovasSaoIguais(){
    if(campos[2].value!=campos[3].value){
        mostrarErro(mensagensErro[3])
    }
    else{
        removerErro(mensagensErro[3])
        console.log('nova senha validada')
    }
}

campos[0].addEventListener("blur", ()=>{ obterDadosUsuario(campos[0].value)})
campos[1].addEventListener("blur", ()=>{ verificarSenhaAntiga(campos[0].value, campos[1].value)})
campos[2].addEventListener("blur", validarSenha)
campos[3].addEventListener("blur", verificarSenhasNovasSaoIguais)


async function substituirSenha(id, novaSenha) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ senha: novaSenha })
        });

        if (!response.ok) {
            throw new Error('Erro ao substituir a senha');
        }
        const data = await response.json();
        console.log('Senha substituída com sucesso:', data);
    } catch (error) {
        console.error(error.message);
    }
}

  
function atualizarSenhaAPI() {
    // Verifique se há algum campo com erro
    for (let i = 0; i < campos.length; i++) {
        if (mensagensErro[i].style.display === 'block') {
            return false; // Há um campo com erro, não envie o formulário
        }
    }
    // Se não houver nenhum campo com erro, envie o formulário
    substituirSenha(usuario.id, campos[3].value);
}

btnAlterarSenha.addEventListener("click", atualizarSenhaAPI)






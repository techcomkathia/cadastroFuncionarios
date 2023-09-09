const formCadastro = document.getElementById("formCadastro");

const campos = document.getElementsByClassName("obrigatorio")
const mensagensErro = document.getElementsByClassName("mensagemErro")


console.log(campos)
console.log(mensagensErro)


for (mensagem of mensagensErro){
    mensagem.style.display = 'none'
}

function mostrarErro(index){
    campos[index].style.border ='2px solid #e63636'
    mensagensErro[index].style.display="block"
}

function removerErro(index){
    campos[index].style.border= ""
    mensagensErro[index].style.display='none'
}


function validacaoNome(){
    let indice = 0
    const nome = campos[indice].value.trim(); 
    const regex = /^[A-Za-zà-ö' ]+$/
    
    if(nome.length < 3){
        mostrarErro(0)        
    }
    else if(!regex.test(nome)) {
        mostrarErro(0)
    }
    else{
        console.log("Nome validado")
        removerErro(0)
    }
}

function validacaoSobrenome(){
    let indice =1
    const sobrenome = campos[indice].value.trim()
    const regex = /^[A-Za-zà-ö' ]+$/
    const regexTamanho = /^[A-Za-zà-ö' ]{2,}$/
    
    if(!regexTamanho.test(sobrenome)){
        mostrarErro(indice)        
    }
    else if(!regex.test(sobrenome)) {
        mostrarErro(indice)
    }
    else{
        console.log("Sobrenome validado")
        removerErro(indice)
    }
}

function validacaoCPF(){
    let indice =2
    const cpf = campos[indice].value;
    // const regex = /^\d{11}$/
    // 111.222.333-44
    // 11122233344
    const regex = /^([0-9]{3})\.?([0-9]{3})\.?([0-9]{3})\-?([0-9]{2})$/; 

    if (!regex.test(cpf)){
        mostrarErro(indice);
    }
    else{
        console.log("CPF validado");
        removerErro(indice);
    }
}



function validarDataNasc() {
    const indice = 3;
    const dataNascimento = new Date(campos[indice].value);
    const dataAtual = new Date();
    const idadeMinima = 18;
    const idadeMaxima = 75;

    const anosDiferenca = dataAtual.getFullYear() - dataNascimento.getFullYear();

    if (anosDiferenca < idadeMinima || anosDiferenca > idadeMaxima) {
        mostrarErro(indice);
    } else {
        removerErro(indice);
        console.log("Data de nascimento validada");
    }
}

function validarCampoSelecionado(indice){ 
    if (campos[indice].value.trim() === "") {
        mostrarErro(indice)
        
    } else {
       removerErro(indice)
    }
}

function validarImagemPerfil(){
    const indice = 6
    const regex = /^(ftp|http|https):\/\/[^ \n"]+$/;

    if(!regex.test(campos[indice].value)){
        mostrarErro(indice);
    } else {
        removerErro(indice);
        console.log("imagem de perfil validada");
    }
}


function validarEmail(){
    const indice = 7
    const  regex = /[a-z._0-9]+@[^ ]+\.[^ ]{2,}/
    const email= campos[indice].value
    if (!regex.test(email)) {
       mostrarErro(indice)
    }   
    else{
        removerErro(indice)
    }
}



campos[0].addEventListener("blur", validacaoNome)
campos[1].addEventListener("blur", validacaoSobrenome)
campos[2].addEventListener("blur", validacaoCPF)
campos[3].addEventListener("blur", validarDataNasc)
campos[4].addEventListener("blur", ()=>{validarCampoSelecionado(4)})
campos[5].addEventListener("blur", ()=>{validarCampoSelecionado(5)})
campos[6].addEventListener("blur", validarImagemPerfil)
campos[7].addEventListener("blur", validarEmail)


function enviarDadosParaAPI(dados) {
    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
       
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        
    });
}



function validarFormulario() {

    // Verifique se há algum campo com erro
    for (let i = 0; i < campos.length; i++) {
        if (mensagensErro[i].style.display === 'block') {
            return false; // Há um campo com erro, não envie o formulário
        }
    }

    const dados = {
        nome: campos[0].value,
        sobrenome: campos[1].value,
        cpf: campos[2].value,
        dataNascimento: campos[3].value,
        sexo: campos[4].value,
        cargo: campos[5].value,
        imagemPerfil: campos[6].value,
        email: campos[7].value,
        senha: campos[2].value
    };
    // Se não houver nenhum campo com erro, envie o formulário
    enviarDadosParaAPI(dados);
}




formCadastro.addEventListener("submit", function (event) {
    // Impedir o comportamento padrão do formulário
    event.preventDefault();
    // Chame a função de validação do formulário
    validarFormulario();
});


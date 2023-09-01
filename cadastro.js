const menu = document.getElementById("menu");
const formCadastro = document.getElementById("formCadastro");
const formAlterarSenha = document.getElementById("formAlterarSenha");
const btnCadastrar = document.getElementById("btnCadastrar");
const btnAlterarSenha = document.getElementById("btnAlterarSenha");


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
    const regex = /^[A-Za-z ]+$/
    
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
    const regex = /^[A-Za-z ]+$/
    const regexTamanho = /^[A-Za-z]{2,}$/
    
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



function validarDataNasc(){
    let indice =3

    const dataNascimento = new Date(campos[3].value);
    const dataAtual = new Date();
    
    const idadeMinima = 18;
    const idadeMaxima = 75;
    
    const dataLimiteInferior = new Date(dataAtual.getFullYear() - idadeMaxima, dataAtual.getMonth(), dataAtual.getDate());
    const dataLimiteSuperior = new Date(dataAtual.getFullYear() - idadeMinima, dataAtual.getMonth(), dataAtual.getDate());
    
    if (dataNascimento < dataLimiteSuperior || dataNascimento > dataLimiteInferior) {
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
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;

    if(!regex.test(campos[indice])){
        mostrarErro(indice);
    } else {
        removerErro(indice);
        console.log("imagem de perfil validada");
    }
}


function validarEmail(){
    const indice = 7
    const email= campos[indice].value
    if (!/[a-z]+@[\S]+\.\S+/.test(email)) {
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
campos[7].addEventListener("blur", validarEmail)



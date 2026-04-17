
function usuario(){

    const nome = document.getElementById('nome_login').value;
    const senha = document.getElementById('senha_login').value;
    
    if (nome == 'JohnMarley' && senha == 'senha123'){
        alert("Acesso liberado!");
    } else {
        alert("Acesso negado")
    }
}
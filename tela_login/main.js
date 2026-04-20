async function enviar_usuario(){

    const usuario = document.getElementById('nome_login').value;
    const senha = document.getElementById('senha_login').value;

    const resposta = await fetch('http://127.0.0.1:8000/validar_login', {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({login_usuario: usuario, login_senha: senha})
    });

    const validacao = await resposta.json();

    if (validacao.autorizacao == true){
                                //depois resolver a porta pq quando tiver pronto isso vai da B.O. Por enquanto 
                                // porta 5500 do LiverServer
        if (validacao.status == 'aluno'){
            window.location.href = "http://127.0.0.1:5500/teste_qrcode/qr_code_john/qr_aluno.html";
        } else if ( validacao.status == 'lider'){   
            window.location.href = "http://127.0.0.1:5500/teste_qrcode/qr_code_john/scanner_lider.html";
        }
    } else {
        alert("Acesso Negado: " + validacao.mensagem);
    }   
}
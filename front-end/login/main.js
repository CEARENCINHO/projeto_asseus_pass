async function enviar_usuario(){

    const usuario = document.getElementById('nome_login').value;
    const senha = document.getElementById('senha_login').value;

    const resposta = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({usuario: usuario, senha: senha})
    });

    const validacao = await resposta.json();

    if (validacao.status_login == true){
                                //depois resolver a porta pq quando tiver pronto isso vai da B.O. Por enquanto 
                                // porta 5500 do LiverServer
        
        //if (validacao.status_usuario == 'aluno'){

        const dadoAluno = {
            nome_aluno: validacao.nome_aluno,
            conta_aluno: validacao.conta,
            status_aluno: validacao.status_usuario
        }

        localStorage.setItem('aluno',JSON.stringify(dadoAluno))
        window.location.href = "/front-end/aluno/qr_aluno.html";

        //} else if ( validacao.status_usuario == 'lider'){  
            
        //    const dadoLider = {
        //        nome_lider: validacao.nome_aluno,
        //        conta_lider: validacao.conta
        //    }

        //    localStorage.setItem('lider',JSON.stringify(dadoLider))
        //    window.location.href = "/front-end/lider/scanner_lider.html";
        //}
    //} else {
    //    alert("Acesso Negado: " + validacao.mensagem);
    }   
    alert('Cadastro feito com sucesso!')
}
const palco = document.getElementById('palco')
// ------------------------------- lider ------------------------------//


async function sucessoNaLeitura(textoDecodificado){
    //enviar para a API e validar

    const resposta = await fetch(`http://127.0.0.1:8000/validarQRCode/${textoDecodificado}`)
        
    const dados = await resposta.json()
    if (dados.usuario == true){
        document.getElementById("resultado").innerText = "Aluno:" + dados.nome;

    } else if (dados.usuario == false){
        document.getElementById("resultado").innerText = "Não cadastrado";

    } else {
        document.getElementById("resultado").innerText = dados.usuario;
    }

    setTimeout(() => {
        resultadoDiv.style.display = 'none';
        processandoLeitura = false; 
    }, 3000);


}


function tabelaBus(){
    palco.innerHTML = `
        <h1>Deu certo</h1>
    `
}

async function scanner(nome){
    palco.innerHTML = `
        <section class="infor_aluno">
            <div class="foto">
                <img src="/front-end/img/foto_aluno.png" alt="">
            </div> 
            
            <div class="infor">
                <h2 style="margin: 0px;">Nome do líder:</h2>
                <p id='nomeALuno'></p>
                <h2>Faculdade:</h2>
                <p id=nomeFaculdade></p>
                <h2>Periodo:</h2>
                <p id='periodo'></p>
            </div>
        </section>

        

        </section>
        <section class="scanner">
            <div id="leitor-camera" style="width: 300px;"></div>
    
            <h3 id="resultado"></h3>
        </section>

        <section class='button'>
            <button id="statusBus" Onclick='tabelaBus()'>Status onibus</button>
        </section>
    `
    
    const resposta = await fetch(`http://127.0.0.1:8000/buscar/${nome}`)
        
    const dados = await resposta.json()
    
    
    document.getElementById('nomeALuno').innerText = dados.nome;
    document.getElementById('nomeFaculdade').innerText = dados.faculdade;
    
    document.getElementById('periodo').innerText = dados.periodo;


    let scanner = new Html5QrcodeScanner(
        "leitor-camera", 
        { fps: 10, qrbox: {width: 200, height: 200}},
        false
    );

    scanner.render(sucessoNaLeitura);

    
    }


//---------------------------------------------------------------------//


// ------------------------------- aluno ------------------------------//
async function alterarSenha(nome){
    palco.innerHTML = `
            <section class="alterando-senha">
                <form id="alterando_login-senha">
                        <label for="senha">Altere sua senha</label>
                        <input type="text" placeholder="Crie sua senha" class="input-senha" id='senha'>
                        <input type="submit" class="butao" >
                </form>
            </section>
    `
    const formAlterar = document.getElementById('alterando_login-senha');
    

    formAlterar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const senha = document.getElementById('senha').value
        
        const dado = {
            senha: senha,
            nome: nome
        }

        
        const resposta = await fetch('http://127.0.0.1:8000/alterar',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(dado)
        })
        window.location.href = '/front-end/login/login.html'

        const validacao = await resposta.json()
        

        if (validacao.dado === true){
            carterinha(nome)
        } else {
            alterarSenha(nome)
        }
        
    })

}

async function carterinha(nome){
    palco.innerHTML = `
        <section class="infor_aluno">
            <div class="foto">
                <img src="../img/foto_aluno.png" alt="">
            </div>
            <div class="infor">
                <h2 style="margin: 0px;">Nome do aluno:</h2>
                <p id='nomeALuno'></p>
                <h2>Faculdade:</h2>
                <p id=nomeFaculdade></p>
                <h2>Periodo:</h2>
                <p id='periodo'></p>
            </div>
        </section>

        <section class="espacamento">

        </section>
        <section class="qr_code">
            <div id="caixa-qrcode-aluno"></div>
        </section>
    `
    
    try{
        
        const resposta = await fetch(`http://127.0.0.1:8000/buscar/${nome}`)
        
        const dados = await resposta.json()
        
        
        
        document.getElementById('nomeALuno').innerText = dados.nome;
        document.getElementById('nomeFaculdade').innerText = dados.faculdade;
        
        document.getElementById('periodo').innerText = dados.periodo;

        new QRCode(document.getElementById('caixa-qrcode-aluno'),{
            text: `${dados.nome}-${dados.faculdade}`,
            width: 250,
            height: 250,
            colorDark: '#000',
            colorLight: '#fff'
        });

    } catch (error) {
        alert('erro ao pegar informações')
    }
  

}
//----------------------------------------------------------------//

document.addEventListener('DOMContentLoaded',() => {
    const dadosAluno = localStorage.getItem('aluno')
    
    if (dadosAluno == null){
        window.location.href = '/front-end/login/login.html'
        return
    }

    const aluno = JSON.parse(dadosAluno);
    
    
    if (aluno.status_aluno == 'lider'){
        if (aluno.conta_aluno == 0){
            alterarSenha(aluno.nome_aluno)
        } else{
            scanner(aluno.nome_aluno)
        }
    } else{
        if (aluno.conta_aluno == 0){
            alterarSenha(aluno.nome_aluno)
        } else{
            carterinha(aluno.nome_aluno)
        }
    }
})
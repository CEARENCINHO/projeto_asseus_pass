const palco = document.getElementById('palco')

function alterarSenha(){
    palco.innerHTML = `
            <section class="alterando-senha">
                <form id="alterando_login-senha">
                        <label for="senha">Altere sua senha</label>
                        <input type="text" placeholder="Crie sua senha" class="input-senha">
                        <input type="submit" class="butao">
                </form>
            </section>
    `
    
}

function carterinha(){
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
                <p id=''periodo></p>
            </div>
        </section>

        <section class="espacamento">

        </section>
        <section class="qr_code">
            <div id="caixa-qrcode-aluno"></div>
        </section>
    `
    new QRCode(document.getElementById('caixa-qrcode-aluno'),{
        text: 'ALUNO-NOMEALUNO-FACULDADE',
        width: 250,
        height: 250,
        colorDark: '#000',
        colorLight: '#fff'
    });

}

document.addEventListener('DOMContentLoaded',() => {
    const dadosAluno = localStorage.getItem('aluno')
    
    if (dadosAluno == null){
        window.location.href = '/front-end/login/login.html'
        return
    }

    const aluno = JSON.parse(dadosAluno);
    aluno.conta_aluno = 1
    if (aluno.conta_aluno == 0){
        alterarSenha()
    } else{
        carterinha(aluno.nome_aluno)
    }
})
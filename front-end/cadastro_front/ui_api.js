document.addEventListener("DOMContentLoaded", function() {
    carregarFormularioAluno();
});
// para alternar os formularios
const palco = document.getElementById('palco-formulario');
const tabela = document.getElementById('teste');

// cadastro aluno 
function carregarFormularioAluno(){
    palco.innerHTML = `
    
    <h1>Cadastro aluno</h1>
    <hr>
    <form class="cadastro-formulario" id="cadastro-alunos">
        <div class="caixa-input">
            <label for="nome">Nome do aluno</label>
            <input type="text" id="nome" placeholder="Nome completo" required>
        </div>

        <div class="caixa-input">
            <label for="telefone">Numero de contato</label>
            <input type="text" id="telefone" placeholder="XX XXXXX XXXX" maxlength="50" pattern="[0-9]{2} [0-9]{5} [0-9]{4}" required>
        </div>

        <div class="caixa-input">
            <label for="cpf">CPF</label>
            <input type="text" id="cpf" placeholder="000-000-000-00" maxlength="14" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{2}" required>
        </div>

        <div class="caixa-input">
            <label for="email">email</label>
            <input type="email" id="email" placeholder="contato@dominio.com" required>
        </div>

        <div class="caixa-input">
            <label for="lista-faculdades">Faculdade onde estuda</label>
            <input id="lista-faculdade" list="lista-faculdades" placeholder="DIgite ou selecione" required>
            <datalist id="lista-faculdades">
                <option value="Fastech">fas</option>
                <option value="Fasipe-aquarela">
            </datalist>
        </div>

        <div class="caixa-input">
            <label for="status-aluno">Status do aluno</label>
            <select id="status-aluno">
                <option value="aluno">Aluno</option>
                <option value="lider">Líder</option>
            </select>
        </div>

        <div class="caixa-input">
            <label for="periodo">Periodo da aula</label>
            <select id="periodo">
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
                <option value="noturno">Noturno</option>
                <option value="integral">Integral</option>
            </select>
        </div>

        <div>
            <button class="botao" type="submit">Salvar</button>
        </div>
    </form>

    `;

    const cadastroAluno = document.getElementById('cadastro-alunos')

    cadastroAluno.addEventListener('submit', async (e) => {
        e.preventDefault() // para quando der submit a pagina não carregar

        nome = document.getElementById('nome').value
        telefone = document.getElementById('telefone').value
        cpf = document.getElementById('cpf').value
        email = document.getElementById('email').value
        faculdade = document.getElementById('lista-faculdade').value
        status_aluno = document.getElementById('status-aluno').value
        periodo = document.getElementById('periodo').value

        const dadosAluno = {
            nome: nome,
            telefone: telefone,
            cpf: cpf,
            email: email,
            faculdade: faculdade,
            status_aluno: status_aluno,
            periodo: periodo 
        }
    
    
        await fetch("http://127.0.0.1:8000/cadastroAluno",{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(dadosAluno)
        })
    })


}

// carregar cadastro faculdade
function carregarCadastroFaculdade(){
    palco.innerHTML = `
    <h1>Cadastro de Faculdade</h1>
    <hr>
    <form class="cadastro-formulario" id="cadastro-faculdade">
        <div class="caixa-input">
            <label for="nome-faculdade">Nome da Faculdade</label>
            <input type="text" id="nome-faculdade" placeholder="Nome da Faculdade" required>
        </div>

        <div class="caixa-input">
            <label for="endereco-faculdade">Endereço</label>
            <input type="text" id="endereco-faculdade" placeholder="rua, numero e bairro" maxlength="50" required>
        </div>

        <div class="caixa-input">
            <label for="cidade">Cidade</label>
            <select id="cidade">
                <option value="sinop">Sinop-MT</option>
                <option value="lucas do rio verde">Lucas do Rio Verde-MT</option>
            </select>
        </div>

        <div>
            <button class="botao" type="submit">Salvar</button>
        </div>
    </form>
    `
    const cadastroFaculdade = document.getElementById('cadastro-faculdade')
    
    cadastroFaculdade.addEventListener('submit', async (e) => {
        e.preventDefault()

        nomeFaculdade = document.getElementById('nome-faculdade').value
        enderecoFaculdade = document.getElementById('endereco-faculdade').value
        cidade = document.getElementById('cidade').value

        const dadosFaculdade = {
            nomeFaculdade: nomeFaculdade,
            enderecoFaculdade: enderecoFaculdade,
            cidade: cidade
        }

        await fetch('http://127.0.0.1:8000/cadastroFaculdade',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dadosFaculdade)
        })
    })
}
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from conexao import config 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class cadastroAluno(BaseModel):
    nome: str
    telefone: str
    cpf: str
    email: str
    faculdade: str
    status_aluno: str
    periodo: str

class cadastroFaculdade(BaseModel):
    nomeFaculdade: str
    enderecoFaculdade: str
    cidade: str

class login(BaseModel):
    usuario: str
    senha: str

class buscar(BaseModel):
    dado: str

class alterar(BaseModel):
    senha: str
    nome: str
def banco_associados(comando,valor=None): # função de acesso ao banco de dados
    try:
        conexao = mysql.connector.connect(**config)
        cursor = conexao.cursor()

        if valor != None:
            cursor.execute(comando,valor)
            conexao.commit()
        elif valor == None:
            cursor = conexao.cursor(dictionary=True)
            cursor.execute(comando)
            lista = cursor.fetchall()
            return lista



    except mysql.connector.Error as erro:
        print(f'Error ao conectar: {erro}')
    
    finally:
        if 'conexao' in locals() and conexao.is_connected():
            cursor.close()
            conexao.close()
            print(" Conexão encerrada.")

@app.post("/cadastroAluno")
def cadastro_aluno(dados: cadastroAluno):
    valor = (dados.nome,dados.telefone,dados.cpf,dados.email,dados.faculdade,dados.status_aluno,dados.periodo)

    comando = """
        use associados_ASSEUS;

        insert into associados (nome,numero,cpf,email,faculdade,status_aluno,periodo) values(%s,%s,%s,%s,%s,%s,%s);
"""
    banco_associados(comando,valor)

    valor = (dados.nome, dados.cpf,0)

    comando = """
    use associados_ASSEUS;

    insert into usuario (nome_usuario,senha,acesso) values(%s,%s,%s);
"""
    banco_associados(comando,valor)
    
@app.post('/cadastroFaculdade') # programar
def cadastro_Faculdade(dados: cadastroFaculdade):
    valores = dados.nomeFaculdade,dados.enderecoFaculdade, dados.cidade
    comando = '''
insert into cadastro_faculdade (nome_faculdade,endereco,cidade) values(%s,%s,%s);
'''
    banco_associados(comando,valores)

@app.post('/login')
def validarLogin(dados: login):
    
    comando = """
    select * from associados;
"""
    banco = banco_associados(comando)

    for i in banco:
        if dados.usuario == i['nome']:
            comando = 'select * from usuario;'
            lista_senha = banco_associados(comando)
            print(f'{lista_senha} oioi')
            for l in lista_senha:
                if dados.senha == l['senha']:
                    print('login valido',i['status_aluno'])
                    return {
                        'status_login':True,
                        'status_usuario':i['status_aluno'],
                        'nome_aluno':i['nome'],
                        'conta':l['acesso']
                    }
            else:
                return{
                    'status_login':False,
                    'menssagem':'Senha incorreta',
                    'status_usuario':False
                }

    else:
        return {
            'status_login':False,
            'mensagem':'Usuario não existe',
            'status_usuario':False
        }
    

@app.get('/buscar/{dado}')      
def buscarInfor(dado:str):
    
    comando = f"""
    select * from associados where nome = '{dado}';
"""
    resultado = banco_associados(comando)
    return {
        'nome':resultado[0]['nome'],
        'faculdade':resultado[0]['faculdade'],
        'periodo':resultado[0]['periodo']
    }
    
@app.post('/alterar')
def alterarSenha(dado: alterar):
    valores = dado.senha , dado.nome
    
    comando = """
    SET SQL_SAFE_UPDATES = 0;
    update usuario set senha = %s, acesso = 1 where nome_usuario = %s;
"""
    banco_associados(comando,valores)
    return {
        'dado':True
    }


@app.get('/validarQRCode/{QRCode}')
def qrcode(QRCode:str):
    print(QRCode)# codigo do QRcode: "nomeAluno-nomeFaculdade"
    try:
        nome,faculdade,trajeto = QRCode.split('-')
        print(trajeto)
        comando = 'select nome,faculdade from associados;'
        lista = banco_associados(comando) # retorna a lista que tem no banco de dados
        
        for i in lista:

            verificacao = banco_associados('select nome,faculdade from aluno_onibus;')
            for a in verificacao:
                
                if nome in a["nome"] and faculdade in a["faculdade"]:# verifica se o aluno já esta no onibus
                    
                    return{
                    'usuario': True,
                    'nome': 'Já esta dentro do onibus!'
                }


            if nome == i["nome"] and faculdade == i["faculdade"]:
                valor = i["nome"],i["faculdade"],0
                comando = '''
                insert into aluno_onibus (nome,faculdade,status_aluno) values(%s,%s,%s);
'''
                banco_associados(comando,valor)
                return{
                    'usuario': True,
                    'nome': i["nome"]
                }
        return{
            'usuario': False
        }
    except:
        return{
                    'usuario': 'QRcode não compativel!'
                }
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

def banco_associados(comando,valor=None):
    try:
        conexao = mysql.connector.connect(**config)

        cursor = conexao.cursor()
        cursor.execute("USE associados_ASSEUS;")
        cursor.close() 

        
        cursor = conexao.cursor(dictionary=True)

        if valor != None:
            cursor.execute(comando,valor)
            conexao.commit()
            return None
        elif valor == None:
            cursor.execute(comando)
            lista = cursor.fetchall()
            print(lista)
            return lista



    except mysql.connector.Error as erro:
        print(f'Error ao conectar: {erro}')
    
    finally:
        if 'cursor' in locals() and cursor is not None:
            try:
                cursor.close()
            except:
                pass
        if 'conexao' in locals() and conexao.is_connected():
            cursor.close()
            conexao.close()
            print(" Conexão encerrada.")

@app.post("/cadastroAluno")
def cadastro_aluno(dados: cadastroAluno):
    valor = (dados.nome,dados.telefone,dados.cpf,dados.email,dados.faculdade,dados.status_aluno,dados.periodo)

    comando = """
        insert into associados (nome,numero,cpf,email,faculdade,status_aluno,periodo) values(%s,%s,%s,%s,%s,%s,%s);
"""
    banco_associados(comando,valor)

    valor = (dados.nome, dados.cpf,0)

    comando = """
    insert into usuario (nome_usuario,senha,acesso) values(%s,%s,%s);
"""
    banco_associados(comando,valor)
    
@app.post('/cadastroFaculdade')
def cadastro_Faculdade(dados: cadastroFaculdade):
    return

@app.post('/login')
def validarLogin(dados: login):
    print('oi')
    comando = """
    select * from associados;
"""
    banco = banco_associados(comando)

    comando_user = 'select * from usuario;'
    lista_senha = banco_associados(comando_user)

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
    select * from associados where nome = %s;
"""
    resultado = banco_associados(comando, (dado,))

    print(resultado)
    
    
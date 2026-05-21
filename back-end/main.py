from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

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

def banco_associados(comando,valor=None):
    try:
        config = {
            'host':'127.0.0.1',
            'user':'root',
            'password':'93g@Fvk7fdc',
            'database':'banco_produto'
        }
        conexao = mysql.connector.connect(**config)
        cursor = conexao.cursor()



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

        insert into associados (nome,numero,cpf,email,faculdade,status_aluno,periodo) values (%s,%s,%s,%s,%s,%s,%s,)
"""
    banco_associados(comando,)

@app.post('/cadastroFaculdade')
def cadastro_Faculdade(dados: cadastroFaculdade):
    return
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

#def banco_associados:
    # fazer uma função que acesse banco de dados dos associados         

@app.post("/cadastroAluno")
def cadastro_aluno(dados: cadastroAluno):
    # teste para verificar se deu certo essa merda
    print(f"Nome do Aluno: {dados.nome}")
    print(f"Telefone: {dados.telefone}")
    print(f"CPF: {dados.cpf}")
    print(f"E-mail: {dados.email}")
    print(f"Faculdade: {dados.faculdade}")
    print(f"Status do Aluno: {dados.status_aluno}")
    print(f"Período: {dados.periodo}")


    # parando as 3:21 :c
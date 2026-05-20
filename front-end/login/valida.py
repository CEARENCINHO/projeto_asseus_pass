# foi criado para teste, simulando um banco de dados
from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

banco_dados = {
    "John Marley":['12345','aluno','Fastech','nortuno'],
    "Diogo":['12345','lider','Fastech','nortuno']
}

class DadosLogin(BaseModel): # aqui diz como vai se comporto os dados que entrarem
    login_usuario: str
    login_senha: str



@app.post('/validar_login')
def validacao_login(dados: DadosLogin):
    if dados.login_usuario in banco_dados:
        
        if dados.login_senha == banco_dados[dados.login_usuario][0]:
            return {"autorizacao": True, "mensagem": "valido_usuario_e_senha", "status":banco_dados[dados.login_usuario][1]}
        
        else:
            return {"autorizacao": False, "mensagem": "senha_invalida"}
    
    else:
        return {"autorizacao": False, "mensagem": "usuario_invalida"}
    
    
    
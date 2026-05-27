import mysql.connector
import json as j

with open("senha.json", "r") as s:
    config = j.load(s)

def config():
    coiso = mysql.connector.connect(
        host=config["HOST"],
        user=config["USER"],
        password=config["PASSWORD"],
        database=config["DATABASE"]
    )
    return coiso
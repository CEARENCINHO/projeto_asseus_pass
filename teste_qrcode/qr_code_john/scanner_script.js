function sucessoNaLeitura(textoDecodificado){
    document.getElementById("resultado").innerText = "Código Lido: " + textoDecodificado;

    if (navigator.vibrate) navigator.vibrate(200);
}

function erroNaLeitura(erro){

}

let scanner = new Html5QrcodeScanner(
    "leitor-camera", 
    { fps: 60, qrbox: {width: 200, height: 200}},
    false
);

scanner.render(sucessoNaLeitura, erroNaLeitura);
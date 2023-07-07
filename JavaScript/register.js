document.querySelector('#btnCadastra').addEventListener('click', () => {
    let Nome = document.querySelector('#nome');
    let Sobrenome = document.querySelector('#sobrenome');
    let Login = document.querySelector('#login');
    let Senha = document.querySelector('#senha');
    let DataNascimento = document.querySelector('#dataNascimento');

    if((Nome.value == "") || (Sobrenome.value == "") || (Login.value == "") || (Senha.value == "") || (DataNascimento.value == "")){
       alert('Verifique se todas as informações foram fornecidas corretamente!');
    }else{
        let body = document.querySelector("body");
        body.innerHTML += "<div id='mensagemDeSucesso'><h2>Cadastro realizado com sucesso!</h2><h3>Você será redirecionado para a página de login.</h3></div>"
        document.querySelector("#box").style.opacity = "20%";
        
        setTimeout(() =>{
            document.querySelector('#mensagemDeSucesso').remove();
            document.querySelector("#box").style.opacity = "100%";
            window.open('../index.html', '_self');
       }, "2000")
    }
});
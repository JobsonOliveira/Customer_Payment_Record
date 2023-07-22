document.querySelector('#entrar').addEventListener('click', () => {
    let login = document.querySelector("#login");
    let senha = document.querySelector("#senha");

    if ((login.value == "Teste") && (senha.value == "Usuario123")) {
        let aparecer = document.querySelector('#bemVindo');
        aparecer.show();
        setTimeout(()=> {
            aparecer.close();
            window.open('../HTML/paginaPrincipal.html','_self');
        }, '1000');
    }else{
        alert("Usuário ou senha inválidos!");
    }
});
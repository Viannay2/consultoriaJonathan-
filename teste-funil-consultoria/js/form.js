document.getElementById('leadForm').addEventListener('submit',function(e){
 e.preventDefault();
 document.getElementById('message').textContent='Demonstração enviada! Agora podemos conectar este formulário ao sistema real.';
 this.reset();
});

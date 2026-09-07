const perguntas=[
 {q:'Você já possui uma empresa?',o:['Sim, já tenho uma empresa','Estou começando meu negócio','Ainda não']},
 {q:'Qual o tamanho da sua empresa?',o:['1 a 5 pessoas','6 a 20 pessoas','21 a 50 pessoas','Mais de 50 pessoas']},
 {q:'Qual é o seu principal objetivo hoje?',o:['Aumentar as vendas','Melhorar a gestão','Organizar a empresa','Expandir o negócio']}
];
let atual=0;
const q=document.getElementById('question'), options=document.getElementById('options'), step=document.getElementById('step'), bar=document.getElementById('bar');
function render(){
 q.textContent=perguntas[atual].q;
 step.textContent=`Pergunta ${atual+1} de ${perguntas.length}`;
 bar.style.width=((atual+1)/perguntas.length*100)+'%';
 options.innerHTML='';
 perguntas[atual].o.forEach(text=>{
   const b=document.createElement('button');
   b.className='option'; b.textContent=text;
   b.onclick=()=>{atual++; atual<perguntas.length ? render() : location.href='formulario.html'};
   options.appendChild(b);
 });
}
render();

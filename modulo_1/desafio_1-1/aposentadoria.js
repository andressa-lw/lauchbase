const nome = "Silvana";
const sexo = "F";
const idade = 48;
const contribuicao = 23;

const homem = contribuicao >= 35 && sexo == 'M' && idade + contribuicao >= 95
const mulher = contribuicao >= 30 && sexo == 'F' && idade + contribuicao >= 85

if (mulher || homem) {
  console.log(`${nome}, você pode se aposentar!`)
} else {
  console.log(`${nome}, você não pode se aposentar!`)
}
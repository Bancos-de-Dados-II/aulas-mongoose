const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/aula');
  console.log('Conectado');
}

const anotacaoSchema = new mongoose.Schema({
  autor: String,
  data: { type: Date, default: Date.now },
  titulo: String,
  conteudo: String  
});

const Anotacao = mongoose.model('Anotacao', anotacaoSchema);

const anotacao1 = new Anotacao({
    autor: "João",
    data: "2022-12-12",
    titulo: "Exemplo de anotação",
    conteudo: "Exemplo de anotação feita em sala"
});

// Anotacao.create(anotacao1).then(console.log('Salvo'));

// listarTodos();

async function listarTodos(){
for await (const anotacao of Anotacao.find({autor:"João"},{_id:false, __v:false})) {
        console.log(anotacao); 
      }
}

Anotacao.deleteOne({ autor: 'João'}).then(console.log('Removido!'));
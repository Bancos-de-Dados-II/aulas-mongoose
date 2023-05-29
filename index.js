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

anotacaoSchema.index({titulo:'text', conteudo:'text'},{default_language:'pt', weights:{titulo:2, conteudo:1}});

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
for await (const anotacao of Anotacao.find({},{_id:false, __v:false})) {
        console.log(anotacao); 
      }
}

// Anotacao.deleteOne({ autor: 'João'}).then(console.log('Removido!'));

const obj = {
  _id: "646e4146b8391bb8a8c3024f",
  autor: 'João da Silva 2',
  data: "2023-05-29",
  conteudo: 'Exemplo de anotação feita em sala'
}

// atualizar(obj);

async function atualizar(anotacao){
  const obj = await Anotacao.findOne({_id: anotacao._id});
  obj.overwrite(anotacao);
  await obj.save().then(console.log('OK'));
}

buscarPorTexto('Aula');

async function buscarPorTexto(texto){
  Anotacao.find({$text:{$search:texto}}).then(r => console.log(r));
}
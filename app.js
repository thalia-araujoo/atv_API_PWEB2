const express = require('express'); //chama o express
const app = express();

app.use(express.json());//responsavel por converter o corpo da menssagem em json

let usuarios = [
    {id: 1, nome: 'Allan'}, 
    {id: 2, nome: 'Jonas'}
];


app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req,res) => {
    const {nome} = req.body;
    if(!nome) {
        return res.status(400).json({erro: 'O nome do usuário é obrigatório!'});
    }
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: nome,
    }
    usuarios.push(novoUsuario);
    return res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    const { nome } = req.body;

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === parseInt(id));
    if(usuarioIndex === -1) {
        return res.status(404).json({erro: 'Usuário não encontrado!'});
    }
    if(!nome) {
        return res.status(400).json({erro : 'O nome do usuário é obrigatório!'});
    }

    usuarios[usuariosIndex].nome = nome;
    return res.status(200).json(usuarios[usuarioIndex]);
});
app.delete("/usuarios/:id", (req, res) =>{
    const {id} = req.params;

    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === parseInt(id));
    if(usuarioIndex === -1) {
        return res.status(404).json({erro: 'Usuário não encontrado!'});
    }

    usuarios.splice(usuarioIndex, 1);
    return res.status(204).json("Usuário deletado com sucesso!");
    
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
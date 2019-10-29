const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const LojaSchema = mongoose.Schema({
    nome: { type: String, required: true},
    cnpj: { type: String, required: true, unique: true},
    email: { type: String},
    telefones: {
        type: [{ type: String }]
    },
    endereco: {
        type: {
            local: { type: String, requide: true },
            numero: { type: String, requide: true },
            complemento: { type: String },
            bairro: { type: String, requide: true },
            cidade: { type: String, requide: true },
            CEP: { type: String, requide: true },
        },
        required: true
    }
}, { timestamps: true });

LojaSchema.plugin(uniqueValidator, { message: "já está em uso "});

module.exports =  mongoose.model("Loja", LojaSchema);
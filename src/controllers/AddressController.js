const User = require('../models/user')
const Address = require("../models/address")
const Neighborhood = require("../models/neighborhood")
const City = require("../models/city")
const State = require("../models/state")
const cepP = require('cep-promise')


module.exports = {
    async cepRegister(req, res) {
        try{
            
            const { user_id } = req.params
            
            const {zipcode, addressNumber, complement, state, city, neighborhood, street} = req.body;


            const [haveState] = await State.findOrCreate({where: {state: state}});
            
            const [haveCity] = await City.findOrCreate({where: {city: city, state_id: haveState.dataValues.id}});
            
            const [haveNeighborhood] = await Neighborhood.findOrCreate({ where: { neighborhood: neighborhood, city_id: haveCity.dataValues.id}});

            const createAddress = await Address.create({zipcode: zipcode, street: street, neighborhood_id: haveNeighborhood.dataValues.id, addressNumber: addressNumber, complement: complement, user_id})

        return res.status(200).json({message: 'Endereço salvo com sucesso!' , createAddress})
            
        
        } catch(e){
            console.log(e)
            return res.status(400).json({e})
            
        }
    },

    async userAddressInfo(req,res){
        
        try {
            const { id } = req.params
            
            const user = await User.findByPk(id, {
                include: {
                    association: 'addresses', attributes: ['id', 'zipcode', 'street','addressNumber','complement',"user_id"],
                    include: {
                        association: 'neighborhood', attributes: ['id', 'neighborhood'],
                        include: {
                            association: 'city', attributes: ['id', 'city'],
                            include: {
                                association: 'state', attributes: ['id', 'state'],
                            }
                        }
                    }
                }
            });
            
            if (!user) {
                return res.status(400).json({error: true, msg: "Usuário não encontrado"});
            }
            
            return res.status(200).json({addresses: user.addresses});
        
        
        } catch (error) {
            res.status(400).json({error: true, msg: error});
        }
    },
    
    async updateAddress(req, res) {
        try {
            const { id } = req.params
            const address = await Address.findByPk(id);
            
            const { zipcode, state, city, neighborhood, street, addressNumber, complement } = req.body;
            
            if (!address) {
                return res.status(400).json({error: true, msg: "Endereço não encontrado"});
            }
            
            const [haveState] = await State.findOrCreate({where: {state: state}});
            
            const [haveCity] = await City.findOrCreate({where: {city: city, state_id: haveState.dataValues.id}});
            
            const [haveNeighborhood] = await Neighborhood.findOrCreate({
                where: {
                    neighborhood: neighborhood, city_id: haveCity.dataValues.id
                }
            });

            await address.update({zipcode, street, addressNumber: addressNumber, complement, neighborhood_id: haveNeighborhood.dataValues.id}, {where: id});
            
            return res.status(200).json({address, message: `Endereço atualizado`});
        
        
        } catch (error) {
           console.log(error)
           return res.status(400).json({error});
        }
    },

    async sendCepPromise(req, res){
        try {
            const { cep } = req.params
            
            const sendCep = await cepP(cep)

            return res.status(200).json({sendCep})
        
        } catch (error) {
            return res.status(400).json({error})
        }
    },

    async allAddressInfo(req, res){
        try {
            
            
            const addresses = await Address.findAll({
                include: {
                    association: 'neighborhood', attributes: ['id', 'neighborhood'],
                    include: {
                        association: 'city', attributes: ['id', 'city'],
                        include: {
                            association: 'state', attributes: ['id', 'state'],
                        }
                        
                    }
                }
            });

            return res.status(200).json(addresses);
        
        
        
        } catch (error) {
          
            return res.status(400).json({error: true, msg: error});
        
        }
    }
}
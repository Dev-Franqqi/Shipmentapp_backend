const Shipment = require("../schema/product")
import { Response } from "express";
import { Request } from "express";
import { IShipment } from "../schema/product";
import { Shipdata } from "../schema/product";



const getShipment = async (req:Request, res:Response) => {
    // const { id } = req.param.id;
    
    // try {
    //     const shipment = await Shipment.findOne({ id })
        
    //     if (!shipment) {
    //         res.status(404).json({error:"Shipment not found"})
    //     }
    //     else {
    //         res.status(200).json(shipment)
    //     }
    // }
    // catch (error) {
    //     res.status(400).json({error:error.message})
    // }

}


const createShipment = async (req:Request, res:Response) => {
    const shipItem
        = req.body as unknown as Shipdata
    
    try {
        const product:IShipment = await Shipment.createItem(shipItem)
        res.status(200).json(product)
    }
    catch (error:any) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getShipment,
    createShipment

}
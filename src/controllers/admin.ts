import ShipmentModel from "../schema/product";
import { Response } from "express";
import { Request } from "express";
import { IShipment } from "../schema/product";
import { Shipdata } from "../schema/product";

export const getShipment = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id)
    try {
        const product = await ShipmentModel.findOne({ tracking_number: id })
        if (!product) {
            res.status(404).json({ error: "There is no available shipment with that tracking number" })
        }
        res.status(200).json(product)

    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
};

export const createShipment = async (req: Request, res: Response) => {
  const shipItem = req.body as unknown as Shipdata;

  try {
    const product: IShipment = await ShipmentModel.createItem(shipItem);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


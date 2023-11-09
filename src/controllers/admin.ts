import ShipmentModel from "../schema/product";
import { Response } from "express";
import { Request } from "express";
import { IShipment } from "../schema/product";
import { Shipdata } from "../schema/product";

interface Location{
    
    city: String;
    state: String;
    postal_code: String;
    country: String;

}
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

export const updateShipmentLocation = async (req: Request, res: Response) => {
    const { id } = req.params
    const current_location  = req.body as unknown as Location
    
    try {
        const doc = await ShipmentModel.findOneAndUpdate({ tracking_number: id }, { current_location: current_location }, {
            new:true
        })

        if (!doc) {
            res.status(404).json({error:"Could not find document"})
        }
        res.status(200).json(doc)
    }
    catch (error: any) {
        res.status(400).json({error:error.message})
    }

}

export const updateShipmentStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const status = req.body as unknown as { status:string }
     try {
       const doc = await ShipmentModel.findOneAndUpdate(
         { tracking_number: id },
         status,
         {
           new: true,
         }
       );

       if (!doc) {
         res.status(404).json({ error: "Could not find document" });
       }
       res.status(200).json(doc);
     } catch (error: any) {
       res.status(400).json({ error: error.message });
     }


}

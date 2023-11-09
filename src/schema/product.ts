const mongoose = require('mongoose');
const { Docment } = mongoose;
import { Schema, model } from "mongoose";


export type Shipdata = {
 
  sender: {
    name: String;
    address: String;
    city: String;
    state: String;
    postal_code: String;
    country: String;
    contact: String;
  };
  recipient: {
    name: String;
    address: String;
    city: String;
    state: String;
    postal_code: String;
    country: String;
    contact: String;
  };
  items: Array<{
    item_id: String;
    description: String;
    quantity: number;
    weight: String;
    dimensions: String;
    value: String;
  }>;
  shipment_date: String;
  carrier: String;
 
  status: String;
  estimated_delivery_date: String;
  current_location: {
    city: String;
    state: String;
    postal_code: String;
    country: String;
  };
}

export interface IShipment extends Document {
 tracking_number: String;
  sender: {
    name: String;
    address: String;
    city: String;
    state: String;
    postal_code: String;
    country: String;
    contact: String;
  };
  recipient: {
    name: String;
    address: String;
    city: String;
    state: String;
    postal_code: String;
    country: String;
    contact: String;
  };
  items: Array<{
    item_id: String;
    description: String;
    quantity: number;
    weight: String;
    dimensions: String;
    value: String;
  }>;
  shipment_date: String;
  carrier: String;
 
  status: String;
  estimated_delivery_date: String;
  current_location: {
    city: String;
    state: String;
    postal_code: String;
    country: String;
  };
}

const ShipmentSchema = new Schema<IShipment>({

  tracking_number: { type: String, required: true },
  sender: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
    contact: { type: String, required: true },
  },
  recipient: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
    contact: { type: String, required: true },
  },
  items: [
    {
      item_id: { type: String, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      weight: { type: String, required: true },
      dimensions: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  shipment_date: { type: String, required: true },
  carrier: { type: String, required: true },
  
  status: { type: String, required: true },
  estimated_delivery_date: { type: String, required: true },
  current_location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
  },
});
function findEmptyProperties(obj: Record<string, any>): string[] | null {
  const emptyProperties: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
 
        emptyProperties.push(key);
      }
    }
  }

  if (emptyProperties.length === 0) {
    return null; // Return null if there are no empty properties
  }

  return emptyProperties;
}

function generateTrackingNumber(): String {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  const trackingNumberLength = 10; // You can adjust the length as needed
  let trackingNumber = '';

  while (trackingNumber.length < trackingNumberLength) {
    const randomChar = String.fromCharCode(Math.floor(Math.random() * 36) + 48);
    if (alphanumericRegex.test(randomChar)) {
      trackingNumber += randomChar;
    }
  }

  return trackingNumber;
}



ShipmentSchema.statics.createItem = async function (shipmentData: Shipdata) {
  
    const emptyFields = await findEmptyProperties(shipmentData);
    if (emptyFields) {
      const StringFields = emptyFields.join(", ");
      throw new Error(`Please fill in remaining fields: ${StringFields}`)
      
      
    
  }
  const trackingNumber = await generateTrackingNumber();
  const shipment = {tracking_number :trackingNumber ,...shipmentData}
  const product = await this.create(shipment)

  return product




}

const ShipmentModel = mongoose.model(
  "Shipment",
  ShipmentSchema
);


export default ShipmentModel;

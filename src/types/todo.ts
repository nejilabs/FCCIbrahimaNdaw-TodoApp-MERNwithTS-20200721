import { Document } from "mongoose"


//Here, we have a Todo interface that extends the Document type provided by mongoose. We will be using it later to interact with MongoDB. That said, we can now define how a Todo model should look.
export interface ITodo extends Document {
  name: string
  description: string
  status: boolean
}
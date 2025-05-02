import { Handler } from "aws-lambda";
import { SQSEvent } from "aws-lambda/trigger/sqs";

export const handler: Handler<SQSEvent> = async (event) => {
  try {
    console.log("LambdaY Event:", JSON.stringify(event));
    
    event.Records.forEach((record) => {
      const message = JSON.parse(record.body);
      console.log("Processing Message:", message);
    });

    return { status: "success" };
  } catch (error: any) {
    console.error("LambdaY Error:", error);
    throw new Error(JSON.stringify(error));
  }
};
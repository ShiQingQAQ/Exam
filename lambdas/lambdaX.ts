import { Handler } from "aws-lambda";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: "eu-west-1" });

export const handler: Handler = async (event) => {
  try {
    console.log("LambdaX Event:", JSON.stringify(event));

    await snsClient.send(
      new PublishCommand({
        TopicArn: process.env.TOPIC_ARN,
        Message: JSON.stringify({
          source: "LambdaX",
          data: event.body || "default_data",
        }),
      })
    );

    return { statusCode: 200 };
  } catch (error: any) {
    console.error("LambdaX Error:", error);
    throw new Error(JSON.stringify(error));
  }
};
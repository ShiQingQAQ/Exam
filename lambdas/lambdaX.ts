import { Handler } from "aws-lambda";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: "eu-west-1" });

export const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const country = body.address?.country || "Unknown";

    await snsClient.send(
      new PublishCommand({
        TopicArn: process.env.TOPIC_ARN,
        Message: JSON.stringify(body),
        MessageAttributes: {
          country: {
            DataType: "String",
            StringValue: country,
          },
        },
      })
    );

    return { statusCode: 200 };
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(JSON.stringify(error));
  }
};

import {APIGatewayProxyEvent} from 'aws-lambda'

export async function main(
  event: APIGatewayProxyEvent
) {
  console.log('event 👉', event);
  console.log(`====================MY_ENV=${process.env.MY_ENV}`)
  return {
    body: JSON.stringify({message: 'Successful lambda invocation'}),
    statusCode: 200,
  };
}
// パッケージのインストール
import { ClientConfig, Client, WebhookEvent } from '@line/bot-sdk';
import AWS from 'aws-sdk';

// アクセストークンとチャンネルシークレットをenvから読み込む
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET || '',
};

// インスタンス化
const client: Client = new Client(clientConfig);
const lambda = new AWS.Lambda();

// 実行
exports.handler = async (event: any, context: any) => {
  const body: any = JSON.parse(event.body);

  const events: WebhookEvent[] = body.events;

  events.map(
    async (event: WebhookEvent): Promise<void> => {
      try {
        console.log('event: ' + JSON.stringify(event));
        const params = {
          FunctionName: 'button-error-message',
          InvocationType: 'RequestResponse',
          Payload: JSON.stringify({
            client: client,
            event: event,
          }),
        };
        console.log(params);
        const result = await lambda.invoke(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
        console.log('result: ' + JSON.stringify(result));
        console.log('result: ' + result);
      } catch (err) {
        console.log(err);
      }
    }
  );
};

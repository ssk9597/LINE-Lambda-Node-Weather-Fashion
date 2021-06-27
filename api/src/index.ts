// パッケージのインストール
import { ClientConfig, Client, WebhookEvent } from '@line/bot-sdk';

// モジュールを読み込む
import { SendButtonMessageOrErrorMessage } from './Common/SendMessage/ButtonOrErrorMessage';

// アクセストークンとチャンネルシークレットをenvから読み込む
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET || '',
};

// インスタンス化
const client: Client = new Client(clientConfig);

// 実行
exports.handler = async (event: any, context: any) => {
  const body: any = JSON.parse(event.body);

  const events: WebhookEvent[] = body.events;

  events.map(
    async (event: WebhookEvent): Promise<void> => {
      try {
        console.log('event: ' + JSON.stringify(event));
        await SendButtonMessageOrErrorMessage(client, event);
      } catch (err) {
        console.log(err);
      }
    }
  );
};

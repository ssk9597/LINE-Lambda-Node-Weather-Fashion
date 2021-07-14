// パッケージのインストール
import { ClientConfig, Client, WebhookEvent } from '@line/bot-sdk';

// モジュールを読み込む
import { buttonMessageTemplate } from './Common/ButtonMessage/ButtonMessageTemplate';
import { errorMessageTemplate } from './Common/ButtonMessage/ErrorMessageTemplate';
import { flexMessageTemplate } from './Common/WeatherForecastMessage/FlexMessageTemplate';

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
  const response: WebhookEvent = body.events[0];

  try {
    await actionButtonOrErrorMessage(response);
    await actionFlexMessage(response);
  } catch (err) {
    console.log(err);
  }
};

// ボタンメッセージもしくはエラーメッセージを送る関数
const actionButtonOrErrorMessage = async (event: WebhookEvent) => {
  try {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    const { replyToken } = event;
    const { text } = event.message;

    if (text === '今日の洋服は？') {
      const buttonMessage = await buttonMessageTemplate();
      await client.replyMessage(replyToken, buttonMessage);
    } else {
      const errorMessage = await errorMessageTemplate();
      await client.replyMessage(replyToken, errorMessage);
    }
  } catch (err) {
    console.log(err);
  }
};

const actionFlexMessage = async (event: WebhookEvent) => {
  try {
    if (event.type !== 'message' || event.message.type !== 'location') {
      return;
    }

    const { replyToken } = event;
    const message = await flexMessageTemplate(event);

    await client.replyMessage(replyToken, message);
  } catch (err) {
    console.log(err);
  }
};

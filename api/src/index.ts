// パッケージのインストール
import { ClientConfig, Client, WebhookEvent } from '@line/bot-sdk';
import AWS from 'aws-sdk';

// モジュールを読み込む
import { ButtonMessageTemplate } from './Common/ButtonMessage/ButtonMessageTemplate';
import { ErrorMessageTemplate } from './Common/ButtonMessage/ErrorMessageTemplate';

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
      const buttonMessageTemplate = await ButtonMessageTemplate();
      console.log('buttonMessageTemplate: ' + JSON.stringify(buttonMessageTemplate));
      await client.replyMessage(replyToken, buttonMessageTemplate);
    } else {
      const errorMessageTemplate = await ErrorMessageTemplate();
      console.log('errorMessageTemplate: ' + JSON.stringify(errorMessageTemplate));
      await client.replyMessage(replyToken, errorMessageTemplate);
    }
  } catch (err) {
    console.log(err);
  }
};

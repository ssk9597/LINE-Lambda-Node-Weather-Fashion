// パッケージを読み込む
import { Client, WebhookEvent } from '@line/bot-sdk';

// モジュールを読み込む
import { ButtonMessageTemplate } from '../Template/ButtonMessageTemplate';
import { ErrorMessageTemplate } from '../Template/ErrorMessageTemplate';

exports.handler = async (events: any, context: any, callback: any) => {
  // Payload
  const client: Client = events.client;
  const event: WebhookEvent = events.event;

  try {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    const { replyToken } = event;
    const { text } = event.message;

    if (text === '今日の洋服は？') {
      const buttonMessageTemplate = await ButtonMessageTemplate();
      console.log('buttonMessageTemplate: ' + JSON.stringify(buttonMessageTemplate));
      // 追加
      callback(null, client.replyMessage(replyToken, buttonMessageTemplate));
      // await client.replyMessage(replyToken, buttonMessageTemplate);
    } else {
      const errorMessageTemplate = await ErrorMessageTemplate();
      console.log('errorMessageTemplate: ' + JSON.stringify(errorMessageTemplate));
      // 追加
      callback(null, client.replyMessage(replyToken, errorMessageTemplate));
      // await client.replyMessage(replyToken, errorMessageTemplate);
    }
  } catch (err) {
    console.log(err);
  }
};

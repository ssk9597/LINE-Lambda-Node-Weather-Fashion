// パッケージを読み込む
import { Client, WebhookEvent } from '@line/bot-sdk';

// モジュールを読み込む
import { ButtonMessageTemplate } from '../MessageTemplate/ButtonMessageTemplate';

export const SendButtonMessageOrErrorMessage = async (
  client: Client,
  event: WebhookEvent
): Promise<void> => {
  try {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    const { replyToken } = event;
    const { text } = event.message;

    if (text === '今日の洋服は？') {
      await client.replyMessage(replyToken, ButtonMessageTemplate());
    } else {
      // エラーメッセージを送る
    }
  } catch (err) {
    console.log(err);
  }
};

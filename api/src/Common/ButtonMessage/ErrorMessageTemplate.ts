// パッケージを読み込む
import { TextMessage } from '@line/bot-sdk';

export const errorMessageTemplate = (): Promise<TextMessage> => {
  return new Promise((resolve, reject) => {
    const params: TextMessage = {
      type: 'text',
      text: 'ごめんなさい、このメッセージは対応していません。',
    };
    resolve(params);
  });
};

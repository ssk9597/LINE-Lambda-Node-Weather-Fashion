// パッケージを読み込む
import { TextMessage } from '@line/bot-sdk';

export const ErrorMessageTemplate = (): Promise<TextMessage> => {
  const params: TextMessage = {
    type: 'text',
    text: 'ごめんなさい、このメッセージは対応していません。',
  };
  return new Promise((resolve, reject) => {
    resolve(params);
  });
};

// パッケージを読み込む
import { TextMessage } from '@line/bot-sdk';

export const ErrorMessageTemplate = (): TextMessage => {
  return {
    type: 'text',
    text: 'ごめんなさい、このメッセージは対応していません。',
  };
};

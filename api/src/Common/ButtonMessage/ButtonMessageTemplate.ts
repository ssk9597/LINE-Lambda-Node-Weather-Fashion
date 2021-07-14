// パッケージを読み込む
import { TemplateMessage } from '@line/bot-sdk';

export const ButtonMessageTemplate = (): Promise<TemplateMessage> => {
  return new Promise((resolve, reject) => {
    const params: TemplateMessage = {
      type: 'template',
      altText: 'This is a buttons template',
      template: {
        type: 'buttons',
        text: '今日はどんな洋服にしようかな',
        actions: [
          {
            type: 'uri',
            label: '現在地を送る',
            uri: 'https://line.me/R/nv/location/',
          },
        ],
      },
    };
    resolve(params);
  });
};

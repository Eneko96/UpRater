import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Rate as IRate } from './rate.model';
import { RateService } from './rate.service';
import { model } from 'src/lib/sentimentModel';
const cohere = require('cohere-ai'); // eslint-disable-line
cohere.init(
  process.env.COHERE_API_KEY || 'B3yFEFh14ZrzFoFDBMy6rEFKzBrSsP4qEPQXeSQN',
);

@Controller('rate')
export class RateController {
  constructor(private rateService: RateService) {}

  private logger = new Logger('RateMessageController');

  @MessagePattern('rate_created')
  public async generateSentiment(
    @Payload() Rate: IRate,
    @Ctx() _ctx: RmqContext,
  ) {
    this.logger.log('Handling rate sentiment');
    try {
      const response = await cohere.classify({
        inputs: [Rate.comment],
        model: 'large',
        examples: model.examples,
      });
      await this.rateService.updateOne(Rate.user_from, Rate._id, {
        sentiment: response.body.classifications[0].prediction,
      });
      this.logger.log(
        `sentiment for ${Rate._id} generated with: ${response.body.classifications[0].prediction}`,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

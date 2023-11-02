import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { Server } from 'socket.io';
import { StocksController } from './stocks/stocks.controller';
import { ExchangeSettingsService } from './exchange-settings/exchange-settings.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const stocksController = app.get(StocksController);
  app.enableCors();
  const httpServer = app.getHttpServer();
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Add the origin of your frontend application
      methods: ["GET", "POST"]
    }
  });

  const exchangeSettingsService = app.get(ExchangeSettingsService);
  exchangeSettingsService.setServer(io);
  exchangeSettingsService.setStocksController(stocksController);


  await app.listen(3001);
}

bootstrap();

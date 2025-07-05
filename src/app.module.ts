import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    // Carrega o .env automaticamente
    ConfigModule.forRoot({
      isGlobal: true, // Faz o ConfigService funcionar em toda a aplicação
    }),

    // Conecta ao MongoDB usando a variável do .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

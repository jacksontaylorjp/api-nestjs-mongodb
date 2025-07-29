import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI_ATLAS'),
        dbName: configService.get<string>('DB_ATLAS'),
      }),
    }),

    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Item } from './item.schema';
import { ItemService } from './item.service';
import { CreateItemDto } from './item.dto';

@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Post()
    create(@Body() data: CreateItemDto) {
        return this.itemService.create(data);
    }

    @Get()
    findAll() {
        return this.itemService.findAll();
    }

    @Get(":id")
    findOne(@Param('id') id: string) {
        return this.itemService.findOne(id);
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() data: Partial<Item>) {
        return this.itemService.update(id, data);
    }

    @Delete(":id")
    remove(@Param('id') id: string) {
        return this.itemService.remove(id);
    }
}

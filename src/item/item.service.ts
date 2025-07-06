import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemDocument } from './item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name)
        private itemModel: Model<ItemDocument>
    ) { }

    async create(data: Item): Promise<Item> {
        const newItem = new this.itemModel(data);
        return newItem.save();
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }

    async findOne(id: string): Promise<Item> {
        const item = await this.itemModel.findById(id).exec();
        if (!item) throw new NotFoundException('Item não encontrado');
        return item;
    }

    async update(id: string, data: Partial<Item>): Promise<Item | null> {
        return this.itemModel.findByIdAndUpdate(id, data, { new: true })
    }

    async remove(id: string): Promise<void>{
        await this.itemModel.findByIdAndDelete(id);
    }
}

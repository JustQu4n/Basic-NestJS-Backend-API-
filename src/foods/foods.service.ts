import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './schemas/food.schema';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodModel.create(createFoodDto);
  }

  async findAllByUser(userId: string): Promise<Food[]> {
    return this.foodModel.find({ createdBy: userId }).populate('category').exec();
  }

  async findOne(id: string): Promise<Food> {
    const food = await this.foodModel.findById(id).populate('category').exec();
    if (!food) throw new NotFoundException('Food not found');
    return food;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const food = await this.foodModel.findByIdAndUpdate(id, updateFoodDto, { new: true }).exec();
    if (!food) throw new NotFoundException('Food not found');
    return food;
  }

  async remove(id: string): Promise<Food> {
    const food = await this.foodModel.findByIdAndDelete(id).exec();
    if (!food) throw new NotFoundException('Food not found');
    return food;
  }

  async updateByUser(id: string, updateFoodDto: UpdateFoodDto, userId: string): Promise<Food> {
    const food = await this.foodModel.findOneAndUpdate({ _id: id, createdBy: userId }, updateFoodDto, { new: true }).exec();
    if (!food) throw new NotFoundException('Food not found or not owned by user');
    return food;
  }

  async removeByUser(id: string, userId: string): Promise<Food> {
    const food = await this.foodModel.findOneAndDelete({ _id: id, createdBy: userId }).exec();
    if (!food) throw new NotFoundException('Food not found or not owned by user');
    return food;
  }

  async advancedFilter({ userId, category, search, minPrice, maxPrice }: any): Promise<Food[]> {
    const query: any = { createdBy: userId };
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    return this.foodModel.find(query).populate('category').exec();
  }
}

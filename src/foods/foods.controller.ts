import { Controller, Get, Post, Body, Param, Patch, Delete, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFoodDto: CreateFoodDto, @Req() req: Request) {
    const userId = req.user?.['userId'] || req.user?.['_id'];
    if (!userId) throw new Error('UserID not found in token');
    return this.foodsService.create({ ...createFoodDto, createdBy: userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user?.['userId'] || req.user?.['_id'];
    if (!userId) throw new Error('UserID not found in token');
    return this.foodsService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto, @Req() req: Request) {
    const userId = req.user?.['userId'] || req.user?.['_id'];
    if (!userId) throw new Error('UserID not found in token');
    return this.foodsService.updateByUser(id, updateFoodDto, userId);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user?.['userId'] || req.user?.['_id'];
    if (!userId) throw new Error('UserID not found in token');
    return this.foodsService.removeByUser(id, userId);
  }
  /**
   * Filter nâng cao: ?category=...&search=...&minPrice=...&maxPrice=...
   */
  @UseGuards(JwtAuthGuard)
  @Get('filter/advanced')
  async filterFoods(@Req() req: Request) {
    const userId = req.user?.['userId'] || req.user?.['_id'];
    if (!userId) throw new Error('UserID not found in token');
    const { category, search, minPrice, maxPrice } = req.query;
    return this.foodsService.advancedFilter({ userId, category, search, minPrice, maxPrice });
  }
}

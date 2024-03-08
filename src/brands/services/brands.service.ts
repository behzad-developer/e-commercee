import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entities/brand.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}
  create(createBrandDto: CreateBrandDto, file: Express.Multer.File) {
    const entity = new BrandEntity({
      name: createBrandDto.name,
    });
    entity.path = file.path;
    return this.brandRepository.save(entity);
  }

  findAll() {
    return this.brandRepository.createQueryBuilder('b').getMany();
  }

  findOne(id: number) {
    return this.brandRepository
      .createQueryBuilder('b')
      .where('b.id=:id', { id })
      .getOne();
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    const { name } = updateBrandDto;
    const permission = new BrandEntity({
      id,
      name,
    });
    return this.brandRepository.save(permission);
  }

  async remove(id: number) {
    const entity = await this.brandRepository.findOneBy({
      id,
    });
    const result = await this.brandRepository.remove(entity);
    fs.unlinkSync(entity.path);
    return result;
  }
}

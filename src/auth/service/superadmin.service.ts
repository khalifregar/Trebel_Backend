import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin, SuperAdminDocument } from '../schemas/superadmin.schema';

@Injectable()
export class SuperadminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private superadminModel: Model<SuperAdminDocument>,
  ) {}

  async findByEmail(email: string): Promise<SuperAdmin | null> {
    return this.superadminModel.findOne({ email });
  }

  async findById(id: string): Promise<SuperAdmin | null> {
    return this.superadminModel.findById(id);
  }

  async create(data: Partial<SuperAdmin>): Promise<SuperAdmin> {
    const newSuperadmin = new this.superadminModel(data);
    return newSuperadmin.save();
  }

  async findAll(): Promise<SuperAdmin[]> {
    return this.superadminModel.find();
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.superadminModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Superadmin tidak ditemukan');
  }
}

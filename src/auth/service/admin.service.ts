import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email });
  }

  async findById(id: string): Promise<Admin | null> {
    return this.adminModel.findById(id);
  }

  async create(data: Partial<Admin>): Promise<Admin> {
    const newAdmin = new this.adminModel(data);
    return newAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find();
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.adminModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Admin tidak ditemukan');
  }
}

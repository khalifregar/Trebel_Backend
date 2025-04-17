import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../common/enums/user-role.enum';



@Schema()
export class SuperAdmin {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.SUPERADMIN })
  role: UserRole; // ✅ Tambahkan ini
}

export type SuperAdminDocument = SuperAdmin & Document;
export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);

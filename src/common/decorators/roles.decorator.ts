import { SetMetadata } from '@nestjs/common';

// Kunci metadata yang akan dibaca di guard
export const ROLES_KEY = 'roles';

// Roles bisa diisi satu atau lebih: Roles('admin'), Roles('admin', 'superadmin')
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

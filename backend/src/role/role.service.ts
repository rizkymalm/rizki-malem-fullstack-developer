import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  public async createRole(data: CreateRoleDto) {
    const check = await this.prisma.role.findFirst({
      where: {
        name: data.name,
      },
    });
    if (check) {
      throw new ConflictException('Role already exist');
    }
    const role = await this.prisma.role.create({
      data: {
        name: data.name,
      },
    });
    return role;
  }
  public async findRole(id: string) {
    const role = await this.prisma.role.findFirst({ where: { id } });
    return role;
  }
}

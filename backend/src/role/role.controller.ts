import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from './decorator/roles.decorator';
import { RoleGuard } from './guards/role.guard';
import { Role } from 'src/common/enums/role.enum';

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Post('/')
  postCreateRole(@Body() data: CreateRoleDto) {
    return this.roleService.createRole(data);
  }

  @Get()
  getRoleById(@Query('id') id: string) {
    return this.roleService.findRole(id);
  }
}

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeviceLogsService } from './device-logs.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('')
export class DeviceLogsController {
  constructor(private vehicleLogService: DeviceLogsService) {}

  
  @ApiTags('vehicle-logs')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.FOUNTLAB_ADMIN, Role.ORGANIZATION_ADMIN,Role.SOCIETY_ADMIN)
  @ApiOperation({ summary: 'Find buildings belonging to a society' })
  @ApiQuery({ name: 'deviceId', required: false })
  @ApiQuery({ name: 'vehicleId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @Get('society/:societyId/reports/vehicle-logs')
  @HttpCode(HttpStatus.OK)
  getVehicleLogs(
    @Param('societyId') societyId: number,
    @Query('deviceId') deviceId?: number,
    @Query('vehicleId') vehicleId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('pageSize') pageSize?: number,
    @Query('pageOffset') pageOffset?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('isPaginated') isPaginated?: string
  ) {
    return this.vehicleLogService.getVehicleLogs(
      +pageSize,
      +pageOffset,
      sortBy,
      sortOrder,
      isPaginated,
      +societyId,
      +deviceId,
      +vehicleId,
      startDate,
      endDate
    );
  }


  @ApiTags('schnell-backend')
  @ApiOperation({ summary: 'Logs for device associated with society' })
  @ApiQuery({ name: 'deviceId', required: false })
  @ApiQuery({ name: 'vehicleId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @Get('societies/:societyCode/device-report/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getDeviceLogs(
    @Param('societyCode') societyCode: string,
    @Query('deviceId') deviceId?: number,
    @Query('vehicleId') vehicleId?: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('pageSize') pageSize?: number,
    @Query('pageOffset') pageOffset?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('isPaginated') isPaginated?: string
  ) {
    return this.vehicleLogService.getDeviceLogs(
      +pageSize,
      +pageOffset,
      sortBy,
      sortOrder,
      isPaginated,
      societyCode,
      +deviceId,
      +vehicleId,
      startDate,
      endDate
    );
  }
}

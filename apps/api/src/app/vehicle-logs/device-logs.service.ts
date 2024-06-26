import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ViewVehicleLogsDto } from './dto/view-vehicle-logs.dto';

@Injectable()
export class DeviceLogsService {
  private prisma = new PrismaClient();

  async getVehicleLogs(
    pageSize: number,
    pageOffset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    isPaginated: string,
    societyId: number,
    deviceId: number,
    vehicleId: number,
    startDate: string,
    endDate: string
  ) {
    const society = await this.prisma.society.findFirst({
      where: { id: societyId },
      select: {
        buildings: {
          select: {
            floors: {
              select: { flats: { select: { id: true, number: true } } },
            },
          },
        },
      },
    });

    const whereArray = [];
    let whereQuery = {};

    //list all building for the perticular society
    whereArray.push({ societyId: societyId });

    //construct wherequery
    if (vehicleId) {
      whereArray.push({
        vehicleId: vehicleId,
      });
    }
    if (deviceId) {
      whereArray.push({
        deviceId: deviceId,
      });
    }

    console.log(startDate, endDate);
    if (startDate !== undefined) {
      whereArray.push({
        dateTime: { gte: new Date(startDate).toISOString() },
      });
    }
    if (endDate !== undefined) {
      whereArray.push({
        dateTime: { lte: new Date(endDate).toISOString() },
      });
    }

    if (whereArray.length > 0) {
      if (whereArray.length > 1) {
        whereQuery = { AND: whereArray };
      } else {
        whereQuery = whereArray[0];
      }
    }

    const sort = (sortBy ? sortBy : 'createdAt').toString();
    const order = sortOrder ? sortOrder : 'desc';
    const size = pageSize ? pageSize : 10;
    const offset = pageOffset ? pageOffset : 0;
    const orderBy = { [sort]: order };
    const isPaginate = isPaginated ? isPaginated : 'true';

    if (isPaginate == 'true') {
      const count = await this.prisma.deviceLog.count({
        where: whereQuery,
      });
      const listVehicleLog = await this.prisma.deviceLog.findMany({
        select: {
          id: true,
          device: { select: { id: true, name: true, deviceId: true } },
          card: {
            select: {
              number: true,
              type: true,
              flat: {
                select: { number: true },
              },
            },
          },
          vehicle: {
            select: {
              id: true,
              name: true,
              number: true,
              flats: {
                select: { flats: { select: { id: true, number: true } } },
              },
            },
          },
          status: true,
          direction: true,
          dateTime: true,
        },
        where: whereQuery,
        take: Number(size),
        skip: Number(size * offset),
        orderBy,
      });

      return {
        size: size,
        number: offset,
        total: count,
        sort: [
          {
            by: sort,
            order: order,
          },
        ],
        content: listVehicleLog,
      };
    } else {
      const listVehicleLog = await this.prisma.deviceLog.findMany({
        select: {
          id: true,
          device: { select: { id: true, name: true, deviceId: true } },
          vehicle: {
            select: {
              id: true,
              name: true,
              number: true,
              flats: {
                select: { flats: { select: { id: true, number: true } } },
              },
            },
          },
          status: true,
          direction: true,
          dateTime: true,
        },
        where: whereQuery,
      });

      return listVehicleLog;
    }
  }


  async getDeviceLogs(
    pageSize: number,
    pageOffset: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    isPaginated: string,
    societyCode: string,
    deviceId: number,
    vehicleId: number,
    startDate: string,
    endDate: string
  ) {
    const society = await this.prisma.society.findFirst({
      where: { code : societyCode },
      include: {
        buildings: {
          select: {
            floors: {
              select: { flats: { select: { id: true, number: true } } },
            },
          },
        },
      },
    });


    if(!society) throw new HttpException("society not found", HttpStatus.NOT_FOUND);

    const whereArray = [];
    let whereQuery = {};

    //list all building for the perticular society
    whereArray.push({ societyId: society.id });

    //construct wherequery
    if (vehicleId) {
      whereArray.push({
        vehicleId: vehicleId,
      });
    }
    if (deviceId) {
      whereArray.push({
        deviceId: deviceId,
      });
    }

    if (startDate !== undefined) {
      whereArray.push({
        dateTime: { gte: new Date(startDate) },
      });
    }
    if (endDate !== undefined) {
      whereArray.push({
        dateTime: { lte: new Date(endDate) },
      });
    }

    if (whereArray.length > 0) {
      if (whereArray.length > 1) {
        whereQuery = { AND: whereArray };
      } else {
        whereQuery = whereArray[0];
      }
    }

    const sort = (sortBy ? sortBy : 'createdAt').toString();
    const order = sortOrder ? sortOrder : 'desc';
    const size = pageSize ? pageSize : 10;
    const offset = pageOffset ? pageOffset : 0;
    const orderBy = { [sort]: order };
    const isPaginate = isPaginated ? isPaginated : 'true';

    if (isPaginate == 'true') {
      const count = await this.prisma.deviceLog.count({
        where: whereQuery,
      });
      const listVehicleLog = await this.prisma.deviceLog.findMany({
        select: {
          id: true,
          device: { select: { name: true, deviceId: true } },
          card: {
            select: {
              number: true,
              type: true,
              flat: {
                select: { number: true },
              },
            },
          },
          vehicle: {
            select: {
              id: true,
              name: true,
              number: true,
              flats: {
                select: { flats: { select: { id: true, number: true } } },
              },
            },
          },
          status: true,
          direction: true,
          dateTime: true,
        },
        where: whereQuery,
        take: Number(size),
        skip: Number(size * offset),
        orderBy,
      });

      return {
        size: size,
        number: offset,
        total: count,
        sort: [
          {
            by: sort,
            order: order,
          },
        ],
        content: listVehicleLog,
      };
    } else {
      const listVehicleLog = await this.prisma.deviceLog.findMany({
        select: {
          id: true,
          device: { select: { id: true, name: true, deviceId: true } },
          vehicle: {
            select: {
              id: true,
              name: true,
              number: true,
              flats: {
                select: { flats: { select: { id: true, number: true } } },
              },
            },
          },
          status: true,
          direction: true,
          dateTime: true,
        },
        where: whereQuery,
      });

      return listVehicleLog;
    }
  }
}

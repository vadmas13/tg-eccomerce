import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class DocumentService {
    constructor(private readonly prismaService: PrismaService) {}
}

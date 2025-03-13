import { PaginationDto } from "../models";

export const mapPaginationDtoData = <TData, TMapped>(
  dto: PaginationDto<TData[]>,
  mapper: (d: TData) => TMapped,
): PaginationDto<TMapped[]> => ({
  ...dto,
  data: dto.data.map((x) => mapper(x)),
});

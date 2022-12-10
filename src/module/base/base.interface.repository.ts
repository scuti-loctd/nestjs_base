import {PageOptionDto} from "../../common/pagination/page-option.dto";
import {PageDto} from "../../common/pagination/page.dto";
import {FindManyOptions, FindOptionsOrder, FindOptionsWhere} from "typeorm";

export interface BaseInterfaceRepository<T> {
    createOrUpdate(data: T | any): Promise<T[]>;

    findOneById(id: number | string) : Promise<T>;

    findByCondition(filterCondition: any): Promise<T>;

    findAll(options?: FindManyOptions<T>): Promise<T[]>;

    findWithRelations(relations: any): Promise<T[]>;

    pagination(
        pageOptionDto: PageOptionDto,
        condition: FindOptionsWhere<T>,
        orderOption: FindOptionsOrder<T>,
    ): Promise<PageDto<T>>;
}

import { BaseInterfaceRepository} from "./base.interface.repository";
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsOrder,
    FindOptionsWhere,
    Repository
} from "typeorm";
import {PageOptionDto} from "../../common/pagination/page-option.dto";
import {PageDto} from "../../common/pagination/page.dto";
import {PageMetaDto} from "../../common/pagination/page-meta.dto";
import {plainToInstance} from "class-transformer";

export abstract class BaseAbstractRepository<T> extends Repository<T> implements BaseInterfaceRepository<T>{
    private repository: Repository<T>;

    protected constructor(repository: Repository<T>) {
        super(repository.target, repository.manager, repository.queryRunner);
        this.repository = repository;
    }

    public async createOrUpdate(data: T | any): Promise<T[]> {
        return await this.repository.save(data);
    }

    public async findOneById(id: number | string): Promise<T> {
        const condition = {
            where: { id },
        } as FindOneOptions;
        return this.repository.findOneOrFail(condition);
    }

    public async findOne(condition: FindOneOptions<T>): Promise<T> {
        return this.repository.findOne(condition);
    }

    public async findByCondition(filterCondition: any): Promise<T> {
        return await this.repository.findOne({ where: filterCondition });
    }

    public async findWithRelations(relations: any): Promise<T[]> {
        return await this.repository.find(relations);
    }

    public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return await this.repository.find(options);
    }

    public async query(queryStrings: string): Promise<T[]> {
        return await this.repository.query(queryStrings);
    }

    public async count(condition?: FindManyOptions): Promise<number> {
        return await this.repository.count(condition);
    }

    public async pagination(
        pageOptionsDto: PageOptionDto,
        whereCondition?: FindOptionsWhere<T>,
        orderOption?: FindOptionsOrder<T>,
        dto?: any,
    ): Promise<PageDto<any>> {
        const entities = await this.repository.find({
            skip: (pageOptionsDto.page - 1) * pageOptionsDto.take || 0,
            take: pageOptionsDto.take,
            where: {
                ...whereCondition,
            },
            order: {
                ...orderOption,
            },
        });
        const itemCount = await this.repository.count({
            where: {
                ...whereCondition,
            }
        });
        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
        return new PageDto<any>(
            entities.map((entity) => {
                return plainToInstance(dto, entity);
            }),
            pageMetaDto
        )
    }
}
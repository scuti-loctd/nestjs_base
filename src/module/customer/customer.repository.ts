import { Injectable } from "@nestjs/common";
import { Customer } from "./entities/customer.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DB_NAME } from "../../constant";
import {BaseAbstractRepository} from "../base/base.abstract.repository";

@Injectable()
export class CustomerRepository extends BaseAbstractRepository<Customer>{
    private _repository: Repository<Customer>;

    constructor(
        @InjectRepository(Customer, DB_NAME)
        repository: Repository<Customer>
    ) {
        super(repository);
        this._repository = repository;
    }
}
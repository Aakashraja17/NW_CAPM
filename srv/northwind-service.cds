using { northwind as ext } from './external/northwind';

service NorthwindService {
    entity Products   as projection on ext.Products;
        entity Orders     as projection on ext.Orders;
            entity Customers  as projection on ext.Customers;
                entity Categories as projection on ext.Categories;
                
                }
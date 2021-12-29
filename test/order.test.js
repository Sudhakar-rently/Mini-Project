const chai =require('chai');

const pg=require('pg');

const expect = chai.expect;
const db=require('../models/index');

const dbConfig = require('../config/config')['test'];
const conString=`postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:5432/${dbConfig.database}`

const client=new pg.Client(conString);

client.connect();
const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('postgresql');

describe('Testing the order model ', () => {
    beforeEach(function(done) {
        databaseCleaner.clean(client,()=> {done()});
    });

    afterEach(function(done) {
        databaseCleaner.clean(client,()=> {done()});
    });
      
  describe('#insertdata',()=>{
    
      it('It should create an order', async () => {
        const user={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(user);
        
        const record=await db.sequelize.models.users.findOne({
            where: {
              username:user.username
            }
        });
        const row={
            product:"lock3",
            price:876,
            quantity:854,
            user_id:record.id
        };

        await db.sequelize.models.orders.Insertdata(row);
        const data=await db.sequelize.models.orders.findOne({
            where: {
                product:row.product
            }
        });
        expect(data.product).to.be.equal("lock3");
        expect(data.price).to.be.equal(876);
        expect(data.quantity).to.be.equal(854);
        expect(data.user_id).to.be.equal(record.id);
      });
  });

  describe('#deletedata',()=>{
    
    it('It should delete the order', async () => {
        const user={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(user);
        
        const record=await db.sequelize.models.users.findOne({
            where: {
              username:user.username
            }
        });
        const row={
            product:"lock3",
            price:876,
            quantity:854,
            user_id:record.id
        };

        await db.sequelize.models.orders.Insertdata(row);

        const rowvalue= await db.sequelize.models.orders.findOne({
            where : { product : row.product }
        });
        const value=await db.sequelize.models.orders.Deletedata(rowvalue.id,record.id);
        
        const flag= await db.sequelize.models.orders.findOne({
            where : { product : row.product }
        });
        expect(flag).to.be.null;
        expect(value).to.be.equal('Success');
    });

    it('It should handle deleting non-existed order', async () => {
        const user={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(user);
        
        const record=await db.sequelize.models.users.findOne({
            where: {
              username:user.username
            }
        });
        const row={
            product:"lock3",
            price:876,
            quantity:854,
            user_id:record.id
        };

        await db.sequelize.models.orders.Insertdata(row);

        const rowvalue= await db.sequelize.models.orders.findOne({
            where : { product : row.product }
        });
        const value=await db.sequelize.models.orders.Deletedata(900,record.id);
        
        const flag= await db.sequelize.models.orders.findOne({
            where : { product : row.product }
        });
        expect(flag.product).to.be.equal("lock3");
        expect(flag.price).to.be.equal(876);
        expect(flag.quantity).to.be.equal(854);
        expect(flag.user_id).to.be.equal(record.id);
        expect(value).to.be.equal('Order not found');
    });
  });

  describe('#ordersdata',()=>{
    it('It should return the orders', async () => {
        const user={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(user);
        
        const record=await db.sequelize.models.users.findOne({
            where: {
              username:user.username
            }
        });
        const row={
            product:"lock3",
            price:876,
            quantity:854,
            user_id:record.id
        };

        const row2={
            product:"lock2",
            price:8,
            quantity:4,
            user_id:record.id
        };

        await db.sequelize.models.orders.Insertdata(row);
        await db.sequelize.models.orders.Insertdata(row2);

        const rowvalue= await db.sequelize.models.orders.findOne({
            where : { product : row.product }
        });

        const data=await db.sequelize.models.orders.ordersdata(rowvalue.user_id);

        expect(data[0].product).to.be.equal("lock3");
        expect(data[0].price).to.be.equal(876);
        expect(data[0].quantity).to.be.equal(854);
        expect(data[0].user_id).to.be.equal(record.id);
        expect(data[1].product).to.be.equal("lock2");
        expect(data[1].price).to.be.equal(8);
        expect(data[1].quantity).to.be.equal(4);
        expect(data[1].user_id).to.be.equal(record.id);
    });

    it('It should handle accessing non-existing orders', async () => {
        const user={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(user);
        
        const record=await db.sequelize.models.users.findOne({
            where: {
              username:user.username
            }
        });
        const row={
            product:"lock3",
            price:876,
            quantity:854,
            user_id:record.id
        };

        await db.sequelize.models.orders.Insertdata(row);

        const rowvalue= await db.sequelize.models.orders.findOne({
            where : { product : row.product }
        });

        const data=await db.sequelize.models.orders.ordersdata(1000);
        
        expect(data[0]).to.be.undefined;
    });
  
  });
});

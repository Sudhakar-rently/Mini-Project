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

describe('Testing the user model ', () => {
    beforeEach(function(done) {
        databaseCleaner.clean(client,()=> {done()});
    });

    afterEach(function(done) {
        databaseCleaner.clean(client,()=> {done()});
    });
      
  describe('#insertdata',()=>{
    
      it('It should create a user', async () => {
        const row={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(row);
        const data=await db.sequelize.models.users.findOne({
            where: {
              username:row.username
            }
        });
        expect(data.username).to.be.equal("zxckvg");
        expect(data.password).to.be.equal("zxc@123");
        expect(data.email).to.be.equal("zxc123@qwe.com");
        expect(data.ph_number).to.be.equal(87564747);
      });
  });

  describe('#deletedata',()=>{
    
    it('It should delete the user', async () => {
        const row={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(row);
        const rowvalue= await db.sequelize.models.users.findOne({
            where : { username : row.username }
        });
        const value=await db.sequelize.models.users.Deletedata(rowvalue.id);
        
        const flag= await db.sequelize.models.users.findOne({
            where : { username : row.username }
        });
        expect(flag).to.be.null;
        expect(value).to.be.equal('Success');
    });

    it('It should handle deleting non-existing user', async () => {
        const row={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(row);
        const rowvalue= await db.sequelize.models.users.findOne({
            where : { username : row.username }
        });
        const value=await db.sequelize.models.users.Deletedata(1001);
        
        const flag= await db.sequelize.models.users.findOne({
            where : { username : row.username }
        });
        expect(flag.username).to.be.equal("zxckvg");
        expect(flag.password).to.be.equal("zxc@123");
        expect(flag.email).to.be.equal("zxc123@qwe.com");
        expect(flag.ph_number).to.be.equal(87564747);
        expect(value).to.be.equal('Failed');
    });
  });

  describe('#readdata',()=>{
    it('It should return a user', async () => {
        const row={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(row);

        const rowvalue= await db.sequelize.models.users.findOne({
            where : { username : row.username }
        });
        const data=await db.sequelize.models.users.readdata(rowvalue.id);
        expect(data.username).to.be.equal("zxckvg");
        expect(data.password).to.be.equal("zxc@123");
        expect(data.email).to.be.equal("zxc123@qwe.com");
        expect(data.ph_number).to.be.equal(87564747);
    });

    it('It should handle accessing non-existing user', async () => {
        const row={
            username: "zxckvg",
            password: "zxc@123",
            email: "zxc123@qwe.com",
            ph_number: 87564747
        };
        await db.sequelize.models.users.Insertdata(row);

        const rowvalue= await db.sequelize.models.users.findOne({
            where : { username : row.username }
        });
        const data=await db.sequelize.models.users.readdata(97576);
        expect(data).to.be.null;
    });
  });
});

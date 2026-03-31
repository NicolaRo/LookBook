const { expect } = require("chai");
const sinon = require("sinon");

const { createArticle } = require("../../../controllers/articleController");
const Article = require("../../../models/Article");

describe("createArticle Controller", () => {

    afterEach(()=> {
        sinon.restore();
    });

    it("should return 400 if no file is provided", async () => {

        const req = {
            body: {
                categoria: "T-shirt",
                brand: "nike",
                stato: "Usato"
            },
            file: null
        };

        //fakeArticle 
        const fakeArticle = {
            categoria: "T-shirt",
            brand: "nike",
            stato:"Usato",
            _id: "123fakeArticleId"
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        const createStub = sinon.stub(Article, 'create').resolves(fakeArticle);
        
        //ACT
        await createArticle(req, res);

        //ASSERT
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.status.calledWith(201)).to.be.false;
        expect(res.json.calledWithMatch({
             message: "Foto articolo mancante" 
            })).to.be.true;
        expect(createStub.notCalled).to.be.true;


    });
    it('should return 400 if required data are missing', async ()=> {
        const req = {
            body:{
                categoria: "T-shirt",
                brand: "nike",
            },
            file: {
                path: "fake/path.jpg"
            }
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        const createStub = sinon.stub(Article, "create");

        //ACT
        await createArticle(req, res);

        //ASSERT
        expect(res.status.calledWith(400)).to.be.true;

        expect(res.json.calledWithMatch({
            message: "Dati articolo mancanti"
        })).to.be.true;

        expect(createStub.notCalled).to.be.true;


    });

    it('should create article and return 201', async () => {
        const req = {
            body:{
                categoria: "T-shirt",
                brand: "nike",
                stato: "Usato"
            },
            file: {
                path: "fake/path.jpg"
            }
        };

        const fakeArticle = {
            categoria: "T-shirt",
            brand: "nike",
            stato: "Usato",
            foto: "fake/path.jpg",
            _id: "123fakeArticleId"
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        const createStub = sinon.stub(Article, "create").resolves(fakeArticle);

        //ACT 
        await createArticle(req, res);

        //ASSERT
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWith(fakeArticle)).to.be.true;
        expect(createStub.calledOnce).to.be.true;
        expect (createStub.calledWith({
            categoria: "T-shirt",
            brand: "nike",
            stato: "Usato",
            foto: "fake/path.jpg"
        })).to.be.true;


    });
it('should return 500 if database throw error', async()=> {
    const req = {
        body:{
            categoria: "T-shirt",
            brand: "nike",
            stato: "Usato"
        },
        file: {
            path: "fake/path.jpg"
        }
    };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
    };

    const createStub = sinon.stub(Article, 'create').rejects(new Error("DB failure"));

    //ACT
    await createArticle(req,res);

    //ASSERT
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({message:"DB failure"})).to.be.true;

});
});
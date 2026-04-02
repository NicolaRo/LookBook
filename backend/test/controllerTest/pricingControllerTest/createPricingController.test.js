/* HTTP Status code da testare
1. Article.findById
    1.2 HTTP status 404: articleId message: "Articolo non trovato"
    1.2 HTTP status 500: Errore generico
2. llmResponse article.save()
    2.1 HTTP status 200: OK
    2.2 HTTP status 500: "DB failure"
3. Session is not found
    3.1 HTTP 404 session is not found
    3.2 HTTP 500 Session throws an error
*/

const {expect} = require ('chai');
const sinon = require ('sinon');
const llmService = require ('../../../services/llmService'); //<-- 

//Importo sessionController contenente le funzioni che voglio testare
const pricingController = require ('../../../controllers/pricingController');
const Article = require('../../../models/Article');
const Session = require ('../../../models/Session');//<==

//Descrivo il gruppo di test relativo al controller
describe("createPricing Controller", () => {
   
    //afterEach dopo ogni test ripulisce gli stub
    afterEach ( () => {
        sinon.restore();
    });

    it('should return 404 if articleId is missing', async ()=> {
        
        //ARRANGE
        const fakeSession = { //<==
            messages: [],
            save: sinon.stub().resolves()
        };

        const req = {
            params: {articleId: null},
            body: {
                sessionId: '123fakeSessionId',//<-- 
                categoria: "jeans",
                brand: "Levi's",
                stato: "Ottimo",
                foto: "url.jpg"
            }
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        } ;

        //Simulo articolo non trovato
    
        sinon.stub(Article, "findById").resolves(null);
        sinon.stub(Session, 'findOne').resolves(fakeSession);//<==

        //ACT
        await pricingController.createPricing(req, res);

        //ASSERT
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({message: "Articolo non trovato"})).to.be.true;
    });

    it('should return 500 if the DB fails', async ()=> {

        //ARRANGE
        const fakeSession = { //<==
            messages: [],
            save: sinon.stub().resolves()
        };

        const req = {
            params: {articleId: '123fakeId'},
            body: {
                sessionId: '123fakeSessionId',//<-- 
                categoria: "jeans",
                brand: "Levi's",
                stato: "Ottimo",
                foto: "url.jpg"
            }
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //Stub di findById per simulare errore nel DB
        const error = new Error('DB failure');
        const findByIdStub = sinon.stub(Article, 'findById').rejects(error);
        sinon.stub(Session, 'findOne').resolves(fakeSession);//<==

        //ACT
        await pricingController.createPricing(req, res);

        //ASSERT
        expect(findByIdStub.calledOnce).to.be.true;
        expect(res.status.calledOnceWith(500)).to.be.true;
        expect(res.json.calledOnceWith({message: "DB failure"})).to.be.true;
    });
    it('should return 200 when article gets updated with LLM input', async ()=> {
        //ARRANGE
        const fakeSession = { //<==
            messages: [],
            save: sinon.stub().resolves()
        };

        const req = {
            params: { articleId: '123fakeId'},
            body: {
                sessionId: '123fakeSessionId',//<-- 
                categoria: "jeans", 
                brand: "Levi's", 
                stato: "Ottimo", 
                foto: "url.png"
            }
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //Articolo finto con save() già stubbato
        const fakeArticle = {
            sessionId: '123fakeSessionId',//<-- 
            categoria: "jeans", 
            brand: "Levi's", 
            stato: "Ottimo", 
            foto: "url.png",
            pricing: null,
            save: sinon.stub().resolves()
        };

        sinon.stub(Article, 'findById').resolves(fakeArticle);
        sinon.stub(Session, 'findOne').resolves(fakeSession);//<==
        sinon.stub(llmService, 'callLLM').resolves ({
            suggested_price: 50,
            range: {min: 45, max: 55},
            motivation: "Marca famosa",
            selling_tips:["tip1", "tip2"]
        });
    

        //ACT 
        await pricingController.createPricing(req, res);

        //ASSERT
        expect (fakeSession.save.calledOnce).to.be.true;
        expect (fakeArticle.save.calledOnce).to.be.true;
        expect (res.status.calledWith(200)).to.be.true;
        expect (res.json.calledWith({article: fakeArticle, session: fakeSession})).to.be.true;
        }
    )
    it('should return 500 if save() fails', async ()=> {
        //ARRANGE
        const fakeSession = { //<==
            messages: [],
            save: sinon.stub().resolves()
        };



        const req = {
            params: { articleId: '123fakeId'},
            body: {
                sessionId: '123fakeSessionId',//<-- 
                categoria: "jeans", 
                brand: "Levi's", 
                stato: "Ottimo", 
                foto: "url.png"
            },
        }
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };

        //FakeArticle trovato correttamente, ma save() lancia errore

        const fakeArticle = {
            sessionId: '123fakeSessionId',//<-- 
            categoria: "jeans",
            brand: "Levi's",
            stato: "Ottimo",
            foto: "url.png",
            pricing: null,
            save: sinon.stub().rejects(new Error('DB failure')) // ← save fallisce
        };


        sinon.stub(Article, 'findById').resolves(fakeArticle);
        sinon.stub(Session, 'findOne').resolves(fakeSession);//<==
        sinon.stub(llmService, 'callLLM').resolves ({
            suggested_price: 50,
            range: {min: 45, max: 55},
            motivation: "Marca famosa",
            selling_tips:["tip1", "tip2"]
        });

        //ACT
        await pricingController.createPricing(req, res);

        //ASSERT
        expect(fakeArticle.save.calledOnce).to.be.true;
        expect(fakeSession.save.called).to.be.false;
        expect (res.status.calledOnceWith(500)).to.be.true;
        expect(res.json.calledOnceWithMatch({message: 'DB failure'})).to.be.true;

    }),
    it('should retourn 404 if session is not found', async ()=> {
        
        //ARRANGE
        const fakeSession = {
            messages: [],
            save: sinon.stub().resolves()
        }

        const req = {
            params: {articleId: null},
            body: {
                sessionId: '123fakeSessionId',//<-- 
                categoria: "jeans",
                brand: "Levi's",
                stato: "Ottimo",
                foto: "url.jpg"
            }
        }

        const res = {
            status: sinon.stub().returnsThis(), 
            json: sinon.spy()
        }

        sinon.stub(Session, 'findOne').resolves(null);
        sinon.stub(Article, 'findById').resolves(null);

        //ACT
    await pricingController.createPricing(req, res);

    //ASSERT
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({message: "Session non trovata"})).to.be.true;
    expect(fakeSession.save.called).to.be.false;
    }),
    it('should return 500 if Session find throws an error', async ()=> {
        //ARRANGE
        const fakeSession = {
            messages: [],
            save: sinon.stub().resolves()
        }

        const req = {
            params: {articleId: null},
            body: {
                sessionId: '123fakeSessionId',//<-- 
                categoria: "jeans",
                brand: "Levi's",
                stato: "Ottimo",
                foto: "url.jpg"
            }
        }

        const res = {
            status: sinon.stub().returnsThis(), 
            json: sinon.spy()
        }

        const error = new Error('DB failure');
        sinon.stub(Session, 'findOne').rejects(error);
       

        //ACT
    await pricingController.createPricing(req, res);

    //ASSERT
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.json.calledOnceWith({message: error.message})).to.be.true;
    })
});